import api from "./api";

export const equpmentsService = {
  getCategories: async () => {
    const response = await api.get(`/admin/equipments/categories`);
    return response.data;
  },

  addCategory: async (body: { name?: string; description?: string }) => {
    const response = await api.post(`/admin/equipments/categories`, body);
    return response.data;
  },
  deleteCategory: async (categoryId: string) => {
    const response = await api.delete(
      `/admin/equipments/categories/${categoryId}`
    );
    return response.data;
  },

  addImages: async (equipmentId: any, image: any) => {
    const response = await api.post(`/images/`, {
      url: image,
      equipmentId,
    });
    console.log(response);
    return response.data;
  },
  removeImage: async (imageId: string) => {
    const response = await api.delete(`/images/${imageId}`);
    return response.data;
  },

  addEquipment: async (equipmentData: any) => {
    const response = await api.post(
      `/admin/equipments`, ///${equipmentData.categoryId}
      equipmentData
    );
    return response.data;
  },
  updateEquipment: async (equipmentId: any, equipmentData: any) => {
    const response = await api.put(
      `/admin/equipments/${equipmentId}`,
      equipmentData
    );
    return response.data;
  },

  getEquipment: async (equipmentId: any) => {
    const response = await api.get(`/admin/equipments/${equipmentId}`);
    return response.data;
  },
  deleteEquipment: async (categoryId: any) => {
    const response = await api.delete(`/admin/equipments/${categoryId}`);
    return response.data;
  },

  getEquipmentList: async () => {
    const response = await api.get(`/admin/equipments`);
    return response.data;
  },

  getSearches: async () => {
    const response = await api.get(`/admin/equipments/searches`);
    return response;
  },

  getProperties: async (id: any) => {
    const response = await api.get(`/admin/properties/${id}`);
    return response.data;
  },

  addProperty: async (propertyData: any) => {
    const response = await api.post(`/admin/properties`, propertyData);
    return response.data;
  },

  getAllProperties: async () => {
    const response = await api.get(`/admin/properties`);
    return response.data;
  },

  addSpecification: async (equipmentId: any, spec: any) => {
    const response = await api.post(`/admin/properties/${equipmentId}`, spec);
    console.log(response);
    return response.data;
  },
  removeSpecification: async (specId: any) => {
    const response = await api.delete(`/admin/properties/${specId}`);
    return response.data;
  },

  uploadImage: async (files: any) => {
    const formData = new FormData();
    console.log("Length of files ", files.length);
    for (let i = 0; i < files.length; i++) {
      //   productimages.push(files[i]);
      formData.append("images", files[i]);
    }
    // formData.append("images", files);
    const response = await api.post(`/admin/upload/bulk`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  addEquipmentsImages: async (id: any, formData: any) => {
    // const formData = new FormData();
    // console.log("Length of files ", files.length);
    // for (let i = 0; i < files.length; i++) {
    //   //   productimages.push(files[i]);
    //   formData.append("images", files[i]);
    // }
    // formData.append("images", files);
    const response = await api.post(
      `/admin/equipments/${id}/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};
