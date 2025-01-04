
import { CheckCircle } from 'lucide-react'
import { Button } from '../button'

export function SuccessStep() {
    return (
        <div className="space-y-6 text-center">
            <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            <div>
                <h2 className="text-xl font-semibold">Equipment Added Successfully</h2>
                <p className="text-sm text-gray-500 mt-1">
                    The equipment has been added to the system
                </p>
            </div>

            <Button
                className="w-full bg-[#2A7C7C] hover:bg-[#246666] h-12"
                onClick={() => window.location.href = '/equipments'}
            >
                Back to Equipment List
            </Button>
        </div>
    )
}

