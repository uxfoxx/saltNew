import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomError } from '../../../types';
import { InputField } from '../../components';
import { POST } from '../../auth/AxiosHelper';
import { toast } from 'react-toastify';
import HelmetComponent from '../../../global/helmet';
import { IoMdArrowRoundBack } from 'react-icons/io';
import GoogleAuth from '../GoogleAuth';
import { useAppContext } from '../../../contexts/AppContext';
import { getRedirectPath } from '../../../utils/utils';
import Api from '../../../api/api';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const { me } = useAppContext();

    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        user_status: 1
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const IoMdArrowRoundBackIcon = IoMdArrowRoundBack as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;

        if (name === 'username') {
            setForm(prev => ({ ...prev, username: value }));
            setError(null);
        } else if (name === 'first_name') {
            setForm(prev => ({ ...prev, first_name: value }));
        } else if (name === 'last_name') {
            setForm(prev => ({ ...prev, last_name: value }));
        } else if (name === 'email') {
            setForm(prev => ({ ...prev, email: value }));
            setError(!emailRegex.test(value) && value ? 'Invalid email' : null);
        } else if (name === 'password') {
            setForm(prev => ({ ...prev, password: value }));
            setError(!passwordRegex.test(value) && value ? 'Password must include 8+ characters, letters, number & symbol' : null);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Uncomment and implement the login logic
        if (!form.username || !form.first_name || !form.last_name || !form.email || !form.password || !!error) {
            const { username, first_name, last_name, email, password } = form;
            if (!username) {
                setError('Username is required');
            } else if (!first_name) {
                setError('First name is required');
            } else if (!last_name) {
                setError('Last name is required');
            } else if (!email) {
                setError('Email is required');
            } else if (!password) {
                setError('Password is required');
            }
            return;
        }
        try {
            setLoading(true);
            const response = await POST(Api.user.register, {
                username: form.username,
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                password: form.password,
                user_status: 1
            });

            if (response.status === 201) {
                toast.success('User created successfully');
                navigate("/verify-email", { state: { email: form.email } });
            } else {
                setError('Registration failed');
                toast.error('Registration failed');
            }

        } catch (err) {
            setError((err as CustomError).response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token && me) navigate(getRedirectPath(me.role ?? 0));
    }, [me, navigate]);

    useEffect(() => {
        if (error) {
            const t = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(t);
        }
    }, [error]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // check confirmPassword
        if (confirmPassword && form.password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError(null);
        }

    }, [form.password, confirmPassword]);

    return (
        <div className="bg-gray-50 flex flex-col items-center justify-center px-4 pb-4 pt-[94px] min-h-[calc(100vh-94px)]">
            <HelmetComponent title={`Sign Up - SALT`} />
            <div className="bg-white rounded-lg shadow-custom3 w-full max-w-sm p-6 space-y-6">
                <div className='flex items-center justify-between'>
                    <h2 className="text-2xl font-bold">Get Started</h2>
                    <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-2 text-black hover:text-teal-700 transition">
                        <IoMdArrowRoundBackIcon className="text-2xl" />
                        <span className="">Go back</span>
                    </div>
                </div>
                <p className="text-sm text-gray-500">Ease up your recruitment process by using our AI powered tools.</p>

                <GoogleAuth />

                <div className="flex items-center justify-center text-sm gap-2">
                    <div className="h-px w-full bg-[#E2E2E2]"></div>
                    <div className="text-center text-gray-400 text-sm">or</div>
                    <div className="h-px w-full bg-[#E2E2E2]"></div>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <InputField
                        label="Username"
                        type='text'
                        name="username"
                        id="username"
                        value={form.username}
                        placeholder="Username"
                        onChange={(e) => handleInputChange(e)}
                        required
                        className='px-2 py-2'
                    />

                    <InputField
                        label="First Name"
                        type='text'
                        name="first_name"
                        id="first_name"
                        value={form.first_name}
                        placeholder="First Name"
                        onChange={(e) => handleInputChange(e)}
                        required
                        className='px-2 py-2'
                    />
                    <InputField
                        label="Last Name"
                        type='text'
                        name="last_name"
                        id="last_name"
                        value={form.last_name}
                        placeholder="Last Name"
                        onChange={(e) => handleInputChange(e)}
                        required
                        className='px-2 py-2'
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type='email'
                        id="email"
                        value={form.email}
                        placeholder="Email"
                        onChange={(e) => handleInputChange(e)}
                        required
                        className='px-2 py-2'
                    />
                    <InputField
                        label="Password"
                        name="password"
                        id="password"
                        value={form.password}
                        placeholder="Password"
                        type="password"
                        onChange={(e) => handleInputChange(e)}
                        required
                        className='px-2 py-2'
                    />
                    <InputField
                        label="Confirm Password"
                        name="confirm_password"
                        id="confirm_password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className='px-2 py-2'
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading || !form.first_name || !form.last_name || !form.email || !form.password || !!error}
                        className="bg-teal-700 text-white w-full py-2 rounded hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-sm text-center">
                    Already have an account?{' '}
                    <Link to="/sign-in" className="text-teal-600 font-medium hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
