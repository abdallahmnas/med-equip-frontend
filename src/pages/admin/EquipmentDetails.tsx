import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Breadcrumb } from '../../components/breadcrumb'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { MainLayout } from '../../components/layout'
import { useEffect, useState } from 'react'
import { equpmentsService } from '../../services/equipments.service'

const breadcrumbItems = [
    { label: 'Equipment List', link: '/equipment' },
    { label: 'Basic Information', link: '/equipment/1/basic' },
    { label: 'Product Description', link: '/equipment/1/description' },
    { label: 'Upload Images', link: '/equipment/1/images' },
    { label: 'Add Specifications', link: '/equipment/1/properties' },
    { label: 'Review', link: '/equipment/1/review' },
]

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

const equipmentDetailss: EquipmentDetails = {
    name: "Scissors",
    category: "Surgery",
    description: "Lorem ipsum dolor sit amet consectetur. Tellus sapien laoreet quisque lorem dignissim adipiscing sit. Enim preger viverra pellentesque tempus turpis nunc. Amet vel amet morbi elit ultricies quisque a feugiat. Gravida nunc sit sit at mauris viverra a ac nunc.",
    properties: {
        age: "19 - 35",
        gender: "Female",
        length: "15cm",
        width: "30cm"
    },
    keywords: ["Scissors", "Surgery", "Medical"],
    images: [
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200"
    ]
}

export function EquipmentDetails() {

    //  equipment Id from url
    const equipmentId = useParams().id
    const [equipmentDetails, setEquipmentDetails] = useState<any>({})

    useEffect(() => {
        const fetchEquipments = async () => {
            const data = await equpmentsService.getEquipment(equipmentId)
            setEquipmentDetails(data)
            console.log(data)
        }
        fetchEquipments() // Fetch equipment data on component mount
    }, [])


    return (

        <MainLayout title=''>
            {equipmentDetails.name ? (<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
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
                        <Button variant="outline">Edit</Button>
                        <Button variant="destructive">Delete</Button>
                    </div>
                </div>

                {/* <Breadcrumb items={breadcrumbItems} /> */}

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
                                {equipmentDetails.properties.map((spec: any, index: any) => (
                                    <div>
                                        <label className="text-sm text-gray-500">{spec?.name}</label>
                                        <p className="font-medium">{spec?.value}</p>
                                        <p className="font-medium">{spec.rangeFrom && `${spec?.rangeFrom} - ${spec.rangeTo}`}</p>
                                    </div>

                                ))}

                            </div>
                            <div>
                                <label className="text-sm text-gray-500 block mb-2">Keywords</label>
                                <div className="flex flex-wrap gap-2">
                                    {equipmentDetails.keywords.map((keyword: any, index: any) => (
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
                                {equipmentDetails.images.map((image: any, index: any) => (
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
            </div>)
                :
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold text-gray-500">Loading ...</h1>
                </div>
            }
        </MainLayout>
    )
}

