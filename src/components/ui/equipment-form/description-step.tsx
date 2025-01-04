
import { useEquipmentForm } from '../../../contexts/Equipment-form-context'
import { useState } from 'react'
import { Textarea } from '../textarea'
import { Button } from '../button'

export function DescriptionStep() {
    const {  updateFormData, goToNextStep, goToPreviousStep } = useEquipmentForm()
    const [newStep, setNewStep] = useState({ description: '' })

    const nextStep = () => {
        if (newStep.description) {
            updateFormData({
                description: newStep.description
            })
            setNewStep({ description: '' })
        }
        goToNextStep()
    }

    // const removeStep = () => {
    // const newSteps = formData.description.filter((_: any, i: number) => i !== index)
    // updateFormData({ description: newSteps })

    // or
    // updateFormData({ description: '' })
    // }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Usage Instructions</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Add step-by-step usage instructions
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Textarea
                        placeholder="Step description"
                        value={newStep.description}
                        onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                        className="min-h-[100px]"
                    />
                </div>

                {/* <div className="space-y-4">
                    {formData.usageSteps.map((step, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium">Step {index + 1}: {step.title}</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeStep(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div> */}
            </div>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    className="flex-1 h-12"
                    onClick={goToPreviousStep}
                >
                    Previous
                </Button>
                <Button
                    className="flex-1 bg-[#2A7C7C] hover:bg-[#246666] h-12"
                    onClick={nextStep}
                    disabled={!newStep.description}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

