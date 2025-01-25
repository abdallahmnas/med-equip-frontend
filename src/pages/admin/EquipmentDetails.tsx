import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Trash2, Clock } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useEquipment } from "../../contexts/EquipmentContext";
import { equpmentsService } from "../../services/equipments.service";
import { MainLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
// import { DeleteDialog } from '../../components/delete-dialog';
import { AddSpecificationDialog } from "../../components/add-specification-dialog";
import { AddImageDialog } from "../../components/add-image-dialog";
import { DeleteConfirmationDialog } from "../../components/delete-confirmation-dialog";
import { PageLoading } from "../../components/page-loading";

interface ChangeLogEntry {
  type: "add" | "delete";
  itemType: "specification" | "image";
  timestamp: Date;
  details: string;
}

interface EquipmentDetails {
  name: string;
  category: {
    id: string;
    name: string;
  };
  description: string;
  properties: {
    name: string;
    value: string;
    id: string;
    rangeFrom?: string;
    rangeTo?: string;
  }[];
  keywords: string[];
  images: {
    url: string;
    id: string;
  }[];
}

export function EquipmentDetails() {
  const { id: equipmentId } = useParams();
  const navigate = useNavigate();
  const [equipmentDetails, setEquipmentDetails] = useState<EquipmentDetails>({
    name: "",
    category: { id: "", name: "" },
    description: "",
    properties: [],
    keywords: [],
    images: [],
  });
  const { equipment, setEquipment } = useEquipment();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddSpecOpen, setIsAddSpecOpen] = useState(false);
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);
  const [isAddingSpec, setIsAddingSpec] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [deletingSpec, setDeletingSpec] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deletingImage, setDeletingImage] = useState<{
    id: string;
    index: number;
  } | null>(null);
  const [isDeletingSpec, setIsDeletingSpec] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const equipResult = await equpmentsService.getEquipment(equipmentId);
        setEquipmentDetails(equipResult.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch equipment details:", error);
        toast.error("Failed to load equipment details");
      }
    };
    fetchEquipments();
  }, [equipmentId]);

  const addToChangeLog = (entry: ChangeLogEntry) => {
    setChangeLog((prev) => [entry, ...prev].slice(0, 50));
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await equpmentsService.deleteEquipment(equipmentId);
      toast.success("Equipment deleted successfully");
      navigate("/equipments");
    } catch (error) {
      console.error("Failed to delete equipment:", error);
      toast.error("Failed to delete equipment");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleAddSpecification = async (spec: {
    name: string;
    value?: string;
    rangeFrom?: string;
    rangeTo?: string;
  }) => {
    console.log("Specification being added:", spec); // Check the passed specification

    setIsAddingSpec(true);
    try {
      // Call the API with the specification, including optional fields
      await equpmentsService.addSpecification(equipmentId, spec);
      const updatedEquipment = await equpmentsService.getEquipment(equipmentId);
      setEquipmentDetails(updatedEquipment);
      addToChangeLog({
        type: "add",
        itemType: "specification",
        timestamp: new Date(),
        details: `Added specification: ${spec.name}`,
      });
      toast.success("Specification added successfully");
      setIsAddSpecOpen(false);
    } catch (error) {
      toast.error("Failed to add specification");
      console.error(error);
    } finally {
      setIsAddingSpec(false);
    }
  };

  const handleRemoveSpecification = async (specId: string) => {
    setIsDeletingSpec(true);
    try {
      const del = await equpmentsService.removeSpecification(specId);
      if (del.success) {
        const updatedEquipment = await equpmentsService.getEquipment(
          equipmentId
        );
        setEquipmentDetails(updatedEquipment);
        addToChangeLog({
          type: "delete",
          itemType: "specification",
          timestamp: new Date(),
          details: `Removed specification: ${deletingSpec?.name || "Unknown"}`,
        });
        toast.success("Specification removed successfully");
      } else {
        toast.error("Failed to remove specification");
      }
    } catch (error) {
      console.error("Failed to remove specification:", error);
      toast.error("Failed to remove specification");
    } finally {
      setIsDeletingSpec(false);
      setDeletingSpec(null);
    }
  };

  const handleRemoveImage = async (imageId: string) => {
    setIsDeletingImage(true);
    try {
      const del = await equpmentsService.removeImage(imageId);
      console.log(del);
      const updatedEquipment = await equpmentsService.getEquipment(equipmentId);
      setEquipmentDetails(updatedEquipment);
      addToChangeLog({
        type: "delete",
        itemType: "image",
        timestamp: new Date(),
        details: "Removed image",
      });
      toast.success("Image removed successfully");
    } catch (error) {
      console.error("Failed to remove image:", error);
      toast.error("Failed to remove image");
    } finally {
      setIsDeletingImage(false);
      setDeletingImage(null);
    }
  };

  const handleAddImages = async (files: FileList) => {
    setIsAddingImage(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach(async (file) => {
        formData.append("images", file);
        try {
          const imageUrl = await equpmentsService.uploadImage(file);
          const imgDB = await equpmentsService.addImages(equipmentId, imageUrl);
          console.log(imgDB);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      });
      const updatedEquipment = await equpmentsService.getEquipment(equipmentId);
      setEquipmentDetails(updatedEquipment);
      addToChangeLog({
        type: "add",
        itemType: "image",
        timestamp: new Date(),
        details: `Added ${files.length} image(s)`,
      });
      toast.success("Images uploaded successfully");
      setIsAddImageOpen(false);
    } catch (error) {
      toast.error("Failed to upload images");
      console.error(error);
    } finally {
      setIsAddingImage(false);
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }
  return (
    <MainLayout title="">
      <Toaster />(
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/equipment">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Equipment Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEquipment(equipmentDetails);
                navigate(`/equipments/${equipmentId}/edit`);
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium">{equipmentDetails?.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Category</label>
                  <p className="font-medium">
                    {equipmentDetails.category?.name || "N/A"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Product Description
              </h2>
              <p className="text-gray-600">{equipmentDetails.description}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Specifications & Keywords
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddSpecOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Specification
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {equipmentDetails.properties.map((spec, index) => (
                  <div
                    key={index}
                    className="relative group p-4 rounded-lg border hover:border-destructive/50 transition-colors"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() =>
                        setDeletingSpec({ id: spec.id, name: spec.name })
                      }
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    <label className="text-sm text-gray-500">{spec.name}</label>
                    <p className="font-medium">{spec.value}</p>
                    {spec.rangeFrom && (
                      <p className="font-medium text-sm text-muted-foreground">
                        Range: {spec.rangeFrom} - {spec.rangeTo}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Keywords
                </label>
                <div className="flex flex-wrap gap-2">
                  {equipmentDetails.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Images</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddImageOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Images
                </Button>
              </div>
              <div className="grid gap-4">
                {equipmentDetails.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onClick={() =>
                        setDeletingImage({ id: image.id, index: index + 1 })
                      }
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    <div className="aspect-square rounded-lg overflow-hidden border hover:border-destructive/50 transition-colors">
                      <img
                        src={image.url}
                        alt={`Equipment ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Recent Changes</h2>
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {changeLog.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50"
                    >
                      <Badge
                        variant={entry.type === 'add' ? 'default' : 'destructive'}
                        className="mt-0.5"
                      >
                        {entry.type === 'add' ? 'Added' : 'Removed'}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm">{entry.details}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {changeLog.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No recent changes
                    </p>
                  )}
                </div>
              </Card> */}
          </div>
        </div>
      </div>
      )
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Equipment"
        description="Are you sure you want to delete this equipment? This action cannot be undone."
        isLoading={isDeleting}
      />
      <DeleteConfirmationDialog
        isOpen={!!deletingSpec}
        onClose={() => setDeletingSpec(null)}
        onConfirm={() => handleRemoveSpecification(deletingSpec!.id)}
        title="Delete Specification"
        description={`Are you sure you want to delete the specification "${deletingSpec?.name}"? This action cannot be undone.`}
        isLoading={isDeletingSpec}
      />
      <DeleteConfirmationDialog
        isOpen={!!deletingImage}
        onClose={() => setDeletingImage(null)}
        onConfirm={() => handleRemoveImage(deletingImage!.id)}
        title="Delete Image"
        description={`Are you sure you want to delete image #${deletingImage?.index}? This action cannot be undone.`}
        isLoading={isDeletingImage}
      />
      <AddSpecificationDialog
        isOpen={isAddSpecOpen}
        onClose={() => setIsAddSpecOpen(false)}
        onAdd={handleAddSpecification}
        isLoading={isAddingSpec}
      />
      <AddImageDialog
        isOpen={isAddImageOpen}
        onClose={() => setIsAddImageOpen(false)}
        onAdd={handleAddImages}
        isLoading={isAddingImage}
      />
    </MainLayout>
  );
}
