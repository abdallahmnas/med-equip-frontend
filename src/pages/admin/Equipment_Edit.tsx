import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MainLayout } from "../../components/layout";
import { useEquipment } from "../../contexts/EquipmentContext";
import { equpmentsService } from "../../services/equipments.service";
import { PageLoading } from "../../components/page-loading";

export function EquipmentEdit() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { equipment, setEquipment } = useEquipment();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: equipment?.name || "",
    category: equipment?.categoryId, //category.name || "",
    description: equipment?.description || "",
    keywords: equipment?.keywords || [],
  });

  const getCategories = async () => {
    const categories = await equpmentsService.getCategories();
    setCategories(categories.data);
  };

  const getEquipment = async () => {
    try {
      const equipment = await equpmentsService.getEquipment(id);
      setEquipment(equipment);
      setFormData({
        name: equipment?.data?.name,
        category: equipment?.data?.category, //.category.name,
        description: equipment?.data?.description,
        keywords: equipment?.data?.keywords,
      });
    } catch (e: any) {}
    setIsLoading(false);
  };

  const [inputValue, setInputValue] = useState("");

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  // const handleInputBlur = () => {
  //   const keywords = inputValue
  //     .split(",")
  //     .map((k) => k.trim())
  //     .filter(Boolean); // Parse and clean keywords on blur
  //   setFormData((prev) => ({ ...prev, keywords }));
  //   setInputValue(""); // Clear input field after parsing
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updateRecord = await equpmentsService.updateEquipment(id, formData);
      console.log(updateRecord);
      toast.success("Equipment updated successfully");
      navigate(`/equipments/${id}`);
    } catch (error) {
      toast.error("Failed to update equipment");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getEquipment();
    getCategories();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }
  return (
    <MainLayout title="">
      <div className="container mx-auto max-w-5xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-semibold">Edit Equipment</h1>
          <div className="w-[52px]" /> {/* Spacer for alignment */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-medium">Basic Information</h2>
            <div className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-md border bg-background px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-gray-900"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category: any, index: number) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-medium">Description</h2>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="w-full rounded-md border bg-background px-3 py-2"
            />
          </div>

          {/* Keywords */}
          {/* <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-medium">Keywords</h2>
          <div className="grid gap-4">
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur} // Parse keywords when input loses focus
              className="w-full rounded-md border bg-background px-3 py-2"
              placeholder="Enter keywords separated by commas"
            />
            <p className="mt-2 text-sm text-muted">
              Current keywords: {formData.keywords.join(", ")}
            </p>
          </div>
        </div> */}
          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
