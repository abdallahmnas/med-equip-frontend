import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useEquipmentForm } from '../../../contexts/Equipment-form-context'
import { Input } from '../input'
import { Button } from '../button'

export function KeywordsStep() {
    const { formData, updateFormData, goToNextStep, goToPreviousStep } = useEquipmentForm()
    const [newKeyword, setNewKeyword] = useState('')

    const addKeyword = () => {
        if (newKeyword) {
            updateFormData({
                keywords: [...formData.keywords, newKeyword]
            })
            setNewKeyword('')
        }
    }

    const removeKeyword = (index: number) => {
        const newKeyword = formData.keywords.filter((_: any, i: number) => i !== index)
        updateFormData({ keywords: newKeyword })
    }


    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Keywords</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Add relevant keywords to improve searchability
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Specification name"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        className="h-12"
                    />

                    <Button
                        type="button"
                        onClick={addKeyword}
                        disabled={!newKeyword}
                        className="bg-[#F8D57E] hover:bg-[#f0c85e] text-black px-4"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-2">
                    {formData.keywords.map((keyword: any, index: any) => (
                        <div key={index} className="flex items-center gap-2 border border-gray-200 p-3 rounded-md">
                            <div className="flex-1">
                                {keyword}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeKeyword(index)}
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
                // disabled={formData.keywords.length === 0}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

