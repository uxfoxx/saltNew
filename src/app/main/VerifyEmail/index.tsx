import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { POST } from '../../auth/AxiosHelper';
import Api from '../../../api/api';

const VerifyEmail: React.FC = () => {
    const state = useLocation().state as { email: string };
    const navigate = useNavigate();

    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [resendTimer, setResendTimer] = useState(60);
    const [error, setError] = useState<string | null>(null);
    const [isVerifiedLoading, setIsVerifiedLoading] = useState(false);
    const [isResendLoading, setIsResendLoading] = useState(false);

    // Redirect if email is not present
    useEffect(() => {
        if (!state?.email) {
            navigate('/sign-up');
        }
    }, [state, navigate]);

    // Countdown for resend
    useEffect(() => {
        if (resendTimer === 0) return;
        const timer = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [resendTimer]);

    // Clear error when otp changes
    useEffect(() => {
        setError(null);
    }, [otp]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            (nextInput as HTMLElement)?.focus();
        }

        // Auto-submit when filled
        if (index === 5 && newOtp.every((digit) => digit !== '')) {
            handleSubmit();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d{6}$/.test(pasted)) return;

        const pastedArray = pasted.split('');
        setOtp(pastedArray);

        const lastInput = document.getElementById(`otp-5`);
        (lastInput as HTMLElement)?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const key = e.key;

        if (key === 'Backspace') {
            if (otp[index]) {
                // Just clear current digit
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                // Move to previous and clear
                const prevInput = document.getElementById(`otp-${index - 1}`);
                (prevInput as HTMLElement)?.focus();

                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
            }
        }

        if (key === 'ArrowLeft' && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            (prevInput as HTMLElement)?.focus();
        }

        if (key === 'ArrowRight' && index < otp.length - 1) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            (nextInput as HTMLElement)?.focus();
        }
    };


    const handleSubmit = async () => {
        try {
            setIsVerifiedLoading(true);
            if (otp.some(digit => digit === '')) {
                setIsVerifiedLoading(false);
                setError("Please fill all OTP fields.");
                return;
            }

            if (state === null || state.email === undefined) {
                setIsVerifiedLoading(false);
                setError("Email is not provided.");
                return;
            }

            const enteredCode = otp.join('');
            console.log("Verifying OTP:", enteredCode);
            const response = await POST(Api.user.verifyEmail, {
                email: state ? state.email : '',
                otp_code: enteredCode
            });

            if (response.status === 200) {
                navigate('/sign-in');
            } else {
                setError("Verification failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Error verifying OTP:", error);
            setError(error.response.data.error);
        } finally {
            setIsVerifiedLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;

        if (state === null || state.email === undefined) {
            setError("Email is not provided.");
            return;
        }

        if (isResendLoading) return;

        try {
            setIsResendLoading(true);
            const response = await POST(Api.user.resendOtp, {
                email: state ? state.email : ''
            });

            if (response.status === 200) {
                setResendTimer(60);
                setError(null);
            } else {
                setError("Failed to resend OTP. Please try again.");
            }
        } catch (error: any) {
            console.error("Error resending OTP:", error?.response || error);
            setError(error?.response?.data?.error || "Failed to resend OTP. Please try again.");
        } finally {
            setIsResendLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 flex items-center justify-center px-4 pb-4 pt-[96px]">
            <div className="bg-white p-6 rounded-lg shadow-custom3 w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold">Verify your email</h2>
                <p className="text-sm text-gray-500">We sent your code to {state?.email || 'your email'}.</p>

                <form
                    className='flex flex-col items-center justify-center gap-6'
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className="flex justify-between gap-2 w-full">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onPaste={handlePaste}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-10 h-12 border border-gray-300 text-center rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        ))}
                    </div>

                    <button
                        type='submit'
                        className="bg-teal-700 text-white w-full py-2 rounded hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={otp.join('').length < 6 || isVerifiedLoading || isResendLoading}
                    >
                        {isVerifiedLoading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                {error && <div className="text-red-500 text-xs mb-2">{error}</div>}

                <div className="text-sm text-center">
                    Didn't get the code?{" "}
                    <button
                        className={`font-medium ${(resendTimer === 0 && !isResendLoading) ? 'text-teal-600 hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
                        onClick={handleResend}
                        disabled={resendTimer > 0 || isResendLoading}
                    >
                        {isResendLoading ? 'Resending...' : resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend now'}
                    </button>
                </div>

                <div className="text-sm text-center">
                    <button
                        onClick={() => navigate('/sign-up')}
                        className="text-gray-600 hover:underline flex items-center justify-center gap-2 mt-2"
                    >
                        ← Back to sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
