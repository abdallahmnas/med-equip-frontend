import { useState } from "react";
import { useEquipmentForm } from "../../../contexts/Equipment-form-context";
import { Upload, X } from "lucide-react";
import { equpmentsService } from "../../../services/equipments.service";
import { Button } from "../button";

export function ImagesStep() {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } =
    useEquipmentForm();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("FIles Selectd ", files);
    setUploadError("");
    if (files) {
      if (files.length <= 1) {
        setUploadError("U need to select more than one image");
        return;
      }
      setIsUploading(true);
      setUploadError(null);
      let uploadedImages = [...formData.images];

      //   let productimages = [];

      //   for (let i = 0; i < files.length; i++) {
      try {
        const imageData = await equpmentsService.uploadImage(files); //[i]
        uploadedImages = [...uploadedImages, ...imageData.data];
        // uploadedImages.push({ url: imageData.data });
      } catch (error: any) {
        console.error("Error uploading image:", error);
        setUploadError(
          error?.response?.data?.message ??
            error?.response?.message ??
            error?.message ??
            "Failed to upload one or more images. Please try again."
        );
        // break; // Stop uploading more images if one fails
      }
      //   }

      updateFormData({ images: uploadedImages });
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData({ images: newImages });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Upload Images</h2>
        <p className="text-sm text-gray-500 mt-1">
          Add images of the equipment
        </p>
      </div>

      {uploadError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Upload Error: </strong>
          <span className="block sm:inline">{uploadError}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          <label
            htmlFor="images"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-500">
              {isUploading
                ? "Uploading..."
                : "Click to upload or drag and drop"}
            </span>
          </label>
        </div>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt={`Equipment ${index + 1}`}
                  className="rounded-lg aspect-square object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
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
          disabled={formData.images.length === 0 || isUploading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
