export interface EquipmentFormData {
    // Basic Information
    name: string
    category: { id: number | string; name: string }

    // Descriptive Information
    description: string

    // Images
    images: any[]

    // Specifications
    specifications: any

    // Keywords
    keywords: string[]

    //useCases
    usecases: string[]

}

export type FormStep =
    | 'basic-info'
    | 'description'
    | 'images'
    | 'specifications'
    | 'keywords'
    | 'usecases'
    | 'review'
    | 'success'

