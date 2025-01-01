import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { AuthLayout } from '../components/layout/auth-Layout';

export function Login() {
    const navigate = useNavigate();
    const { signIn } = useAuth(); // Access the signIn function from AuthContext
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await signIn(formData.email, formData.password);
        if (success) {
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } else {
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <AuthLayout>
            <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-md mx-auto">
                <h1 className="text-2xl font-semibold text-center mb-2">Welcome Back</h1>
                <p className="text-center text-gray-500 mb-6">Enter your email and password to continue</p>

                {errorMessage && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, password: e.target.value }))
                            }
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, rememberMe: !!checked }))
                            }
                        />
                        <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none cursor-pointer"
                        >
                            Remember Me
                        </label>
                    </div>

                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                        Sign In
                    </Button>
                </form>

                <p className="text-center text-sm mt-6">
                    Don't have an account?{' '}
                    <a href="/register" className="text-teal-600 hover:underline">
                        Create Account
                    </a>
                </p>
            </div>
        </AuthLayout>
    );
}
