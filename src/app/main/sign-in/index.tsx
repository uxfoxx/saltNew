import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../contexts/AppContext';
import { CustomError } from '../../../types';
import { InputField } from '../../components';
import HelmetComponent from '../../../global/helmet';
import { IoMdArrowRoundBack } from 'react-icons/io';
import TreeWaveBackground from '../../components/common/TreeWaveBackground';
import GoogleAuth from '../GoogleAuth';
import { getRedirectPath } from '../../../utils/utils';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { me, login } = useAppContext();

    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const IoMdArrowRoundBackIcon = IoMdArrowRoundBack as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setEmail(value);
            setError(null);
        } else if (name === 'password') {
            setPassword(value);
            setError(null);
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        try {
            setLoading(true);
            await login({ username, password });
            setLoading(false);
        } catch (err) {
            console.error('Login error s s:', err);
            // please verify your email before logging in
            if ((err as CustomError).response?.data?.error === 'please verify your email before logging in') {
                navigate('/verify-email', { state: { email: username } });
            }
            setError((err as CustomError)?.response?.data?.error || 'Login failed');
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token && me) navigate(getRedirectPath(me.role ?? 0));
    }, [me, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative bg-gray-50 flex flex-col items-center justify-center px-4 pb-4 pt-[94px] min-h-[calc(100vh-94px)]">
            <HelmetComponent title={`Sign In - SALT`} />
            <TreeWaveBackground />
            <div className="bg-white rounded-lg shadow-custom3 w-full max-w-sm p-6 space-y-6 z-10">
                <div className='flex items-center justify-between'>
                    <h2 className="text-2xl font-bold">Welcome back!</h2>
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

                <form onSubmit={handleLogin} className="space-y-4">
                    <InputField
                        label='User Name'
                        placeholder='User Name'
                        type='text'
                        id='username'
                        name='username'
                        value={username}
                        onChange={(e) => handleInputChange(e)}
                        className='px-2 py-2'
                    />

                    <InputField
                        label='Password'
                        placeholder='Password'
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => handleInputChange(e)}
                        className='px-2 py-2'
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <div className="text-left text-sm">
                        Forgot your password?{" "}
                        <Link to="/forgot-password" className="text-teal-600 font-medium hover:underline">Reset</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !username || !password || !!error}
                        className="bg-teal-700 text-white w-full py-2 rounded hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-sm text-center">
                    Don’t have an account?{" "}
                    <Link to="/sign-up" className="text-teal-600 font-medium hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
