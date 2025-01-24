import { useEffect, useState } from "react";
import { useEquipmentForm } from "../../../contexts/Equipment-form-context";
import { Input } from "../input";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
// import { useAuth } from '../../../contexts/AuthContext'
import { equpmentsService } from "../../../services/equipments.service";

export function BasicInfoStep() {
  const { formData, updateFormData, goToNextStep } = useEquipmentForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "Select a category",
  });
  const [newCategory, setNewCategory] = useState<{
    name?: string;
    description?: string;
  }>({ name: "", description: "" });
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await equpmentsService.getCategories();
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleCreateNewCategory = async (catData: {
    name?: string;
    description?: string;
  }) => {
    const { data } = await equpmentsService.addCategory(catData);
    if (data) {
      setCategories((prev) => [...prev, data]);
      setSelectedCategory({ id: data.id, name: data.name });
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter the equipment name and category
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="Enter equipment name"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="category">
              Category {selectedCategory.name}
            </label>
            <div className="flex gap-2">
              <select
                id="category"
                onChange={(e) =>
                  updateFormData({
                    categoryId: e.target.value,
                    // category: {
                    //   id: e.target.value,
                    //   name: selectedCategory.name,
                    // },
                  })
                }
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option defaultChecked value={0}>
                  Select a category
                </option>

                {categories &&
                  categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              <Button
                type="button"
                variant="secondary"
                className="bg-[#F8D57E] hover:bg-[#f0c85e] text-black p-6"
                onClick={() => setIsDialogOpen(true)}
              >
                Add Category
              </Button>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-[#2A7C7C] hover:bg-[#246666] h-12"
          onClick={goToNextStep}
          disabled={!formData.name || !formData.categoryId}
        >
          Next
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent
          className="DialogContent"
          aria-describedby="create-category-description"
        >
          <DialogTitle>Create a New Category</DialogTitle>
          <DialogDescription id="create-category-description">
            Enter a name for the new category you wish to add.
          </DialogDescription>

          <DialogClose asChild>
            <button className="absolute top-2 right-2">✖</button>
          </DialogClose>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="categoryName">
                Category Name
              </label>
              <Input
                id="categoryName"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                placeholder="Enter category name"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="categoryName">
                Category Description
              </label>
              <Input
                id="categoryDesc"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                placeholder="Enter category Description"
                className="h-12"
              />
            </div>
          </div>

          <Button
            className="w-full bg-[#2A7C7C] hover:bg-[#246666] h-12"
            onClick={() => handleCreateNewCategory(newCategory)}
            disabled={!newCategory}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
