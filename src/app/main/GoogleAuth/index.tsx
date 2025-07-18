import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { POST } from '../../auth/AxiosHelper';
// import Api from '../../../api/api';

declare global {
    interface Window {
        google?: any;
    }
}

const GoogleAuth: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);

    const handleGoogleLogin = () => {
        if (typeof window !== 'undefined' && window.google) {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
                callback: async (response: any) => {
                    try {
                        console.log('ID Token:', response);

                        // 👇 FIXED: Use "id_token" instead of "idToken"
                        const data = { id_token: response.credential };

                        const res = await POST(
                            'https://salt-dev-production.up.railway.app/users/google-login',
                            data,
                            {
                                includeAuthorization: false,
                            }
                        );

                        console.log('Login successful:', res.data);
                        // TODO: Store token/cookies and redirect user here
                    } catch (err) {
                        console.error('Login failed:', err);
                    }
                },
            });

            window.google.accounts.id.prompt(); // shows the Google popup
        }
    };

    const FcGoogleIcon = FcGoogle as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    return (
        <button
            className="flex items-center justify-center gap-2 border border-gray-300 w-full py-2 rounded hover:bg-gray-100 transition"
            onClick={handleGoogleLogin}
        >
            <FcGoogleIcon className="text-xl" />
            <span className="text-sm">Continue with Google</span>
        </button>
    );
};

export default GoogleAuth;
