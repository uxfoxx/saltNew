import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../components';
import { POST } from '../../auth/AxiosHelper';
import { toast } from 'react-toastify';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const response = await POST('/auth/forgot-password', { email });
            console.log(response);
            toast.success('Reset instructions sent to your email');
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 px-4 pb-4 pt-[96px]">
            <div className="bg-white p-6 rounded-lg shadow-custom3 w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold">Forgot password?</h2>
                <p className="text-sm text-gray-600">No worries, we’ll send you reset instructions.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        type='email'
                        id="email"
                        label="Email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='px-2 py-2'
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading || !email}
                        className="bg-teal-700 text-white w-full py-2 rounded hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>

                <div className="text-sm text-center flex justify-center">
                    <button
                        type="button"
                        onClick={() => navigate('/sign-in')}
                        className="text-gray-600 flex items-center justify-center gap-2 mt-2"
                    >
                        <span className="text-xl">←</span> Back to log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
