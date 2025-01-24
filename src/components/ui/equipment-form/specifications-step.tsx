import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useEquipmentForm } from "../../../contexts/Equipment-form-context";
import { Input } from "../input";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";

// type Spec = {
//     name: string;
//     value: string | null,
//     rangeFrom: string | null;
//     rangeTo: string | null;
// }
export function SpecificationsStep() {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } =
    useEquipmentForm();
  const [newSpec, setNewSpec] = useState<any>({});
  // const [specifications, setSpecifications] = useState<any>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const addSpecification = () => {
  //     setSpecifications([...specifications, newSpec])
  // }

  const addSpecification = () => {
    updateFormData({
      specifications: [...formData.specifications, newSpec],
    });
  };

  const removeSpecification = (index: number) => {
    const newSpecs = formData.specifications.filter(
      (_: any, i: number) => i !== index
    );
    updateFormData({ specifications: newSpecs });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Specifications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Add specifications for the equipment
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 p-6 item-center justify-center items-center flex-col">
            <Button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#F8D57E] hover:bg-[#f0c85e] text-black px-4 w-12"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <p className="text-sm text-gray-500">Add New</p>
          </div>

          <div className="space-y-2">
            {formData.specifications.map((spec: any, index: any) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-gray-200 p-3 rounded-md"
              >
                <div className="flex-1">
                  <span className="font-medium">{spec.name}:</span> {spec.value}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSpecification(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
            onClick={goToNextStep}
            disabled={formData.specifications.length === 0}
          >
            Next
          </Button>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent
          className="DialogContent"
          aria-describedby="create-category-description"
        >
          <DialogTitle>Create Property</DialogTitle>
          {/* <DialogDescription id="create-category-description">
                        Enter a name for the new category you wish to add.
                    </DialogDescription> */}

          <DialogClose asChild>
            <button className="absolute top-2 right-2">✖</button>
          </DialogClose>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm " htmlFor="propertyName">
                Property
              </label>
              <Input
                id="propertyName"
                // value={newCategory}
                onChange={(e) =>
                  setNewSpec({ ...newSpec, name: e.target.value })
                }
                placeholder=""
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm " htmlFor="propertyName">
                Value
              </label>
              <Input
                id="propertyName"
                // value={newCategory}
                onChange={(e) =>
                  setNewSpec({ ...newSpec, value: e.target.value })
                }
                placeholder=""
                className="h-12"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm " htmlFor="propertyName">
                  From
                </label>
                <Input
                  id="propertyName"
                  // value={newCategory}
                  type="number"
                  onChange={(e) =>
                    setNewSpec({ ...newSpec, rangeFrom: e.target.value })
                  }
                  placeholder=""
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm " htmlFor="propertyName">
                  To
                </label>
                <Input
                  id="propertyName"
                  type="number"
                  // value={newCategory}
                  onChange={(e) =>
                    setNewSpec({ ...newSpec, rangeTo: e.target.value })
                  }
                  placeholder=""
                  className="h-12"
                />
              </div>
            </div>
          </div>
          <Button
            className="w-full bg-[#2A7C7C] hover:bg-[#246666] h-12"
            onClick={() => addSpecification()}
            disabled={
              !newSpec.name ||
              (!newSpec.value && (!newSpec.rangeFrom || !newSpec.rangeTo))
            }
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
