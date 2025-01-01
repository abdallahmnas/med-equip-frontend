import { useEquipmentForm } from "../../../contexts/Equipment-form-context"
import { equpmentsService } from "../../../services/equipments.service"
import { Button } from "../button"


export function ReviewStep() {
    const { formData, goToNextStep, goToPreviousStep, updateFormData, } = useEquipmentForm()

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
        const equipmentDetail: any = {
            name: formData.name,
            categoryId: formData.category.id,
            description: formData.description,
            images: formData.images,
            properties: formData.specifications,
            keywords: formData.keywords,
            usecases: formData.usecases
        }

        console.log(equipmentDetail)


        const createEquipment = await equpmentsService.addEquipment(equipmentDetail)
        if (createEquipment) {
            // alert('Equipment added successfully!')
            updateFormData(initialFormData)
            goToNextStep()
        } else {
            alert('Failed to add equipment. Please try again.')
        }
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Review Information</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Review all equipment information before submitting
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-medium">Basic Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p><span className="font-medium">Name:</span> {formData.name}</p>
                        <p><span className="font-medium">Category:</span> {formData.category.name}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-medium">Images</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={`Equipment ${index + 1}`}
                                className="rounded-lg aspect-square object-cover"
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-medium">Specifications</h3>
                    <div className="bg-gray-50 p-4 rounded-md space-y-2">
                        {formData.specifications.map((spec: any, index: any) => (
                            <p key={index}>
                                <span className="font-medium">{spec.name}{spec.value ? `: ${spec.value}` : ''} {spec.rangeFrom ? `${spec.rangeFrom} - ${spec.rangeTo}` : ''}</span> <br />
                            </p>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-medium">Keywords</h3>
                    <div className="bg-gray-50 p-4 rounded-md space-y-4">
                        {formData.keywords.map((keyword, index) => (
                            <div key={index}>
                                <h4 className="font-medium">{keyword}</h4>
                                {/* <p className="text-sm text-gray-600">{step.description}</p> */}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-medium">Use Cases</h3>
                    <div className="bg-gray-50 p-4 rounded-md space-y-4">
                        {formData.usecases.map((usecase: any, index: any) => (
                            <div key={index}>
                                <p className="text-sm text-gray-600">{usecase}</p>
                            </div>
                        ))}
                    </div>
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
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

