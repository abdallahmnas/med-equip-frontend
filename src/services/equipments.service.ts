import api from "./api";


export const equpmentsService = {
    getCategories: async () => {
        const response = await api.get(`/categories`)
        return response.data
    },

    addCategory: async (categoryName: string) => {
        const response = await api.post(`/categories`, { name: categoryName })
        return response.data
    },

    addEquipment: async (equipmentData: any) => {
        const response = await api.post(`/equipments/${equipmentData.categoryId}`, equipmentData)
        return response.data
    },

    getEquipment: async (equipmentId: any) => {
        const response = await api.get(`/equipments/find/${equipmentId}`)
        return response.data
    },

    getEquipmentList: async () => {
        const response = await api.get(`/equipments/all`)
        return response.data
    },

    getSearches: async () => {
        const response = await api.get(`/equipments/search-records`)
        return response
    },

    getProperties: async (id: any) => {
        const response = await api.get(`/properties/${id}`)
        return response.data
    },

    addProperty: async (propertyData: any) => {
        const response = await api.post(`/properties`, propertyData)
        return response.data
    },

    getAllProperties: async () => {
        const response = await api.get(`/properties`)
        return response.data
    },

    uploadImage: async (file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        const response = await api.post(`/uploads/single`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data.filePath
    },
}
