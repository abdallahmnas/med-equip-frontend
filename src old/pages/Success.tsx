import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { AuthLayout } from '../components/layout/auth-Layout'

export function Success() {
    const navigate = useNavigate()

    return (
        <AuthLayout>
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
                <div className="mb-6">
                    <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Success"
                        className="mx-auto w-40 h-40"
                    />
                </div>
                <h1 className="text-2xl font-semibold mb-2">Verification Successful</h1>
                <Button
                    className="w-full bg-teal-600 hover:bg-teal-700 mt-6"
                    onClick={() => navigate('/dashboard')}
                >
                    Proceed
                </Button>
            </div>
        </AuthLayout>
    )
}

