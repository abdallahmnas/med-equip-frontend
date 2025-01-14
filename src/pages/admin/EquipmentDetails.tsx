import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { useEquipment } from '../../contexts/EquipmentContext'
import { equpmentsService } from '../../services/equipments.service'
import { MainLayout } from '../../components/layout'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { DeleteDialog } from '../../components/delete-dialog'
interface EquipmentDetails {
    name: string
    category: string
    description: string
    properties: {
        age: string
        gender: string
        length: string
        width: string
    }
    keywords: string[]
    images: string[]
}

export function EquipmentDetails() {
    const { id: equipmentId }: any = useParams()
    const navigate = useNavigate()
    const [equipmentDetails, setEquipmentDetails] = useState<any>({})
    const { setEquipment } = useEquipment()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useState(() => {
        const fetchEquipments = async () => {
            try {
                const data = await equpmentsService.getEquipment(equipmentId)
                setEquipmentDetails(data)
            } catch (error) {
                console.error('Failed to fetch equipment details:', error)
                toast.error('Failed to load equipment details')
            }
        }
        fetchEquipments()
    }, [equipmentId])

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await equpmentsService.deleteEquipment(equipmentId)
            toast.success('Equipment deleted successfully')
            navigate('/equipment')
        } catch (error) {
            toast.error('Failed to delete equipment')
            console.log(error)
            console.error('Failed to delete equipment:', error)
            
        } finally {
            setIsDeleting(false)
            setIsDeleteDialogOpen(false)
        }
    }

    return (
        <MainLayout title=''>
            <Toaster />
            {equipmentDetails.name ? (
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
                                    setEquipment(equipmentDetails)
                                    navigate(`/equipments/${equipmentId}/edit`)
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
                                        <p className="font-medium">{equipmentDetails?.category?.name}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Product Description</h2>
                                <p className="text-gray-600">{equipmentDetails.description}</p>
                            </Card>

                            <Card className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Specifications & Keywords</h2>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {equipmentDetails.properties.map((spec: any, index: number) => (
                                        <div key={index}>
                                            <label className="text-sm text-gray-500">{spec?.name}</label>
                                            <p className="font-medium">{spec?.value}</p>
                                            <p className="font-medium">{spec.rangeFrom && `${spec?.rangeFrom} - ${spec.rangeTo}`}</p>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 block mb-2">Keywords</label>
                                    <div className="flex flex-wrap gap-2">
                                        {equipmentDetails.keywords.map((keyword: string, index: number) => (
                                            <Badge key={index} variant="secondary">
                                                {keyword}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div>
                            <Card className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Images</h2>
                                <div className="space-y-4">
                                    {equipmentDetails.images.map((image: any, index: number) => (
                                        <div key={index} className="aspect-square rounded-lg overflow-hidden border">
                                            <img
                                                src={image.url}
                                                alt={`Equipment ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold text-gray-500">Loading ...</h1>
                </div>
            )}

            <DeleteDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Delete Equipment"
                description="Are you sure you want to delete this equipment? This action cannot be undone."
                isLoading={isDeleting}
            />
        </MainLayout>
    )
}

