import { useEquipmentForm } from "../contexts/Equipment-form-context"
import { MainLayout } from "./layout"
import { BasicInfoStep } from "./ui/equipment-form/basic-info-step"
import { DescriptionStep } from "./ui/equipment-form/description-step"
import { ImagesStep } from "./ui/equipment-form/images-step"
import { KeywordsStep } from "./ui/equipment-form/keywords-step"
// import { MaintenanceStep } from "./ui/equipment-form/maintenance-step"
import { ReviewStep } from "./ui/equipment-form/review-step"
import { SpecificationsStep } from "./ui/equipment-form/specifications-step"
// import { SpecificationsStep } from "./ui/equipment-form/specifications-step"
import { SuccessStep } from "./ui/equipment-form/success-step"
import { UseCasesStep } from "./ui/equipment-form/usecases-step"
// import { UsageStep } from "./ui/equipment-form/usage-step"


const TOTAL_STEPS = 9

export function AddEquipmentForm() {
    const { currentStep } = useEquipmentForm()

    const getCurrentStepNumber = () => {
        const stepMap = {
            'basic-info': 1,
            'description': 2,
            'images': 3,
            'specifications': 4,
            'keywords': 5,
            'usecases': 6,
            'review': 7,
            'success': 8
        }
        return stepMap[currentStep]
    }

    const renderStep = () => {
        switch (currentStep) {
            case 'basic-info':
                return <BasicInfoStep />
            case 'description':
                return <DescriptionStep />
            case 'images':
                return <ImagesStep />
            case 'specifications':
                return <SpecificationsStep />
            case 'keywords':
                return <KeywordsStep />
            case 'usecases':
                return <UseCasesStep />
            case 'review':
                return <ReviewStep />
            case 'success':
                return <SuccessStep />
            default:
                return null
        }
    }

    return (
        <MainLayout title="Add Equipment">
            {/* {JSON.stringify(formData)} */}
            {
                currentStep === 'review' && <ReviewStep />
                || <div className="w-full max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        {currentStep !== 'success' && (
                            <div className="flex justify-center mb-8">
                                <div className="flex gap-2">
                                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 w-12 rounded-full ${i + 1 === getCurrentStepNumber() ? 'bg-[#2A7C7C]' : 'bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {renderStep()}
                    </div>
                </div>
            }
        </MainLayout>
    )
}
