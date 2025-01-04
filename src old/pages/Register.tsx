import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Checkbox } from '../components/ui/checkbox'
import { Button } from '../components/ui/button'
import { AuthLayout } from '../components/layout/auth-Layout'

export function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically handle registration
        navigate('/verify')
    }

    return (
        <AuthLayout>
            <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-2">Create an Account</h1>
                <p className="text-center text-gray-500 mb-6">Create an account to continue</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="username">Username</label>
                        <Input
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="email">Email Address</label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="password">Create Password</label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={formData.terms}
                            onCheckedChange={(checked: any) =>
                                setFormData({ ...formData, terms: checked as boolean })
                            }
                            required
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the terms and conditions
                        </label>
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700" type="submit">
                        Create Account
                    </Button>
                </form>

                <p className="text-center text-sm mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-teal-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}

