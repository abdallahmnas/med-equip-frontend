import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useEquipmentForm } from '../../../contexts/Equipment-form-context'
import { Input } from '../input'
import { Button } from '../button'
import { Textarea } from '../textarea'

export function UseCasesStep() {
    const { formData, updateFormData, goToNextStep, goToPreviousStep } = useEquipmentForm()
    const [newUsecase, setNewUsecase] = useState('')

    const addUsecase = () => {
        if (newUsecase) {
            updateFormData({
                usecases: [...formData.usecases, newUsecase]
            })
            setNewUsecase('')
        }
    }

    const removeUsecase = (index: number) => {
        const newUsecase = formData.usecases.filter((_: any, i: number) => i !== index)
        updateFormData({ usecases: newUsecase })
    }


    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Usecases</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Add relevant usecases to improve searchability
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <Textarea
                        placeholder="Usecase description"
                        value={newUsecase}
                        onChange={(e) => setNewUsecase(e.target.value)}
                        className="h-12"
                    />

                    <Button
                        type="button"
                        onClick={addUsecase}
                        disabled={!newUsecase}
                        className="bg-[#F8D57E] hover:bg-[#f0c85e] text-black px-4"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-2">
                    {formData.usecases.map((keyword: any, index: any) => (
                        <div key={index} className="flex items-center gap-2 border border-gray-200 p-3 rounded-md">
                            <div className="flex-1">
                                {keyword}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeUsecase(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
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
                    onClick={goToNextStep}
                    disabled={formData.specifications.length === 0}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

