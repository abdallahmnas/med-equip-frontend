import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { AuthLayout } from '../components/layout/auth-Layout'

export function Verify() {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Move to next input if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/success')
    }

    const handleResend = () => {
        // Handle resend logic here
    }

    return (
        <AuthLayout>
            <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-2">Verify your Account</h1>
                <p className="text-center text-gray-500 mb-6">
                    Input the 6-digit code sent to the email account you registered with
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-2">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength={1}
                                className="w-12 h-12 text-center text-lg"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        ))}
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700" type="submit">
                        Continue
                    </Button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">Didn't receive an OTP?</p>
                    <button
                        onClick={handleResend}
                        className="text-sm text-teal-600 hover:underline mt-1"
                    >
                        Resend Code
                    </button>
                </div>
            </div>
        </AuthLayout>
    )
}

