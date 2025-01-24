import { createContext, useContext, useState, ReactNode } from "react";
import type { EquipmentFormData, FormStep } from "../types/equipment";

interface EquipmentFormContextType {
  formData: EquipmentFormData;
  updateFormData: (data: Partial<EquipmentFormData>) => void;
  currentStep: FormStep;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: FormStep) => void;
}

const EquipmentFormContext = createContext<
  EquipmentFormContextType | undefined
>(undefined);

const STEPS: FormStep[] = [
  "basic-info",
  "description",
  "images",
  "specifications",
  "keywords",
  "usecases",
  "review",
  "success",
];

const initialFormData: EquipmentFormData = {
  name: "",
  categoryId: "", // { id: '', name: '' },
  description: "",
  images: [],
  specifications: [],
  keywords: [],
  usecases: [],
};

export function EquipmentFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<EquipmentFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<FormStep>("basic-info");

  const updateFormData = (data: Partial<EquipmentFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
  };

  return (
    <EquipmentFormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        goToNextStep,
        goToPreviousStep,
        goToStep,
      }}
    >
      {children}
    </EquipmentFormContext.Provider>
  );
}

export function useEquipmentForm() {
  const context = useContext(EquipmentFormContext);
  if (context === undefined) {
    throw new Error(
      "useEquipmentForm must be used within a EquipmentFormProvider"
    );
  }
  return context;
}
