import api from "./api";


async function uploadFile(file: File): Promise<any> {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post<any>('/upload/single', formData);
        return response.data;
    } catch (error: any) {
        console.error('Error uploading firmware:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error uploading firmware');
    }
}

async function uploadFiles(files: File[]): Promise<any> {
    try {
        const formData = new FormData();
        files.forEach(file => formData.append('file', file));
        const response = await api.post<any>('/upload/multiple', formData);
        return response.data;
    } catch (error: any) {
        console.error('Error uploading firmware:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Error uploading firmware');
    }
}


export { uploadFile, uploadFiles };