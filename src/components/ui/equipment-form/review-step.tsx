
import { ChevronRight } from 'lucide-react'
import { useEquipmentForm } from '../../../contexts/Equipment-form-context'
import { equpmentsService } from '../../../services/equipments.service'
import { Button } from '../button'

export function ReviewStep() {
    const { formData, goToNextStep, goToPreviousStep, updateFormData } = useEquipmentForm()

    const initialFormData = {
        name: '',
        category: { id: '', name: '' },
        description: '',
        images: [],
        specifications: [],
        keywords: [],
        usecases: []
    }

    const handleSubmit = async () => {
        const equipmentDetail = {
            name: formData.name,
            categoryId: formData.category.id,
            description: formData.description,
            images: formData.images,
            properties: formData.specifications,
            keywords: formData.keywords,
            usecases: formData.usecases
        }

        const createEquipment = await equpmentsService.addEquipment(equipmentDetail)
        if (createEquipment) {
            updateFormData(initialFormData)
            goToNextStep()
        } else {
            alert('Failed to add equipment. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <span>Equipment List</span>
                <ChevronRight className="h-4 w-4" />
                <span>Basic Information</span>
                <ChevronRight className="h-4 w-4" />
                <span>Equipment Description</span>
                <ChevronRight className="h-4 w-4" />
                <span>Upload Images</span>
                <ChevronRight className="h-4 w-4" />
                <span>Add Specifications</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-[#2A7C7C] font-medium">Review</span>
            </div>

            <div className="flex gap-8">
                <div className="flex-1">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-xl font-semibold">Review</h1>
                            <div className="flex gap-2">
                                <Button variant="outline">Edit</Button>
                                <Button
                                    className="bg-[#2A7C7C] hover:bg-[#246666]"
                                    onClick={handleSubmit}
                                >
                                    Save & Upload
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Basic Information */}
                            <section>
                                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-500">Name</label>
                                        <p>{formData.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500">Category</label>
                                        <p>{formData.category.name}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm text-gray-500">Product Description</label>
                                    <p className="whitespace-pre-wrap">{formData.description}</p>
                                </div>
                            </section>

                            {/* Specifications */}
                            <section>
                                <h2 className="text-lg font-semibold mb-4">Specifications</h2>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                    {formData.specifications.map((spec: any, index: number) => (
                                        <div key={index}>
                                            <label className="block text-sm text-gray-500">{spec.name}</label>
                                            <p>
                                                {spec.value ? spec.value : ''}
                                                {spec.rangeFrom ? `${spec.rangeFrom} - ${spec.rangeTo}` : ''}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Keywords & Use Cases */}
                            <section>
                                <h2 className="text-lg font-semibold mb-4">Keywords & Use Cases</h2>
                                <div className="mb-4">
                                    <label className="block text-sm text-gray-500 mb-2">Keywords</label>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.keywords.map((keyword: any, index: any) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[#F8D57E] text-black rounded-full text-sm"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Use Cases</label>
                                    <div className="space-y-2">
                                        {formData.usecases.map((usecase: string, index: number) => (
                                            <p key={index} className="text-sm">{usecase}</p>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Images Sidebar */}
                <div className="w-80">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h2 className="font-medium mb-4">Images</h2>
                        <div className="space-y-4">
                            {formData.images.map((image: any, index: number) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={`Equipment ${index + 1}`}
                                    className="w-full rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

