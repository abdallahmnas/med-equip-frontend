import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { EquipmentFormProvider } from '../../contexts/Equipment-form-context'
import { AddEquipmentForm } from '../../components/add-equipment-form'
import { Button } from '../../components/ui/button'
import { EquipmentCard } from '../../components/layout/equipmentCard'
import { MainLayout } from '../../components/layout'
import { equpmentsService } from '../../services/equipments.service'

// const equipmentItems = Array(8).fill({
//     name: "2 Pack Trauma Shears",
//     category: "Scissors",
//     imageUrl: "/placeholder.svg?height=200&width=200",
// })

export function Equipment() {
    const [isAddingEquipment, setIsAddingEquipment] = useState(false)
    const [equipments, setEquipments] = useState([])

    useEffect(() => {
        const fetchEquipments = async () => {
            const response = await equpmentsService.getEquipmentList()
            setEquipments(response.data)
            // console.log(response.data)
        }
        fetchEquipments() // Fetch equipment data on component mount
    }, [])


    if (isAddingEquipment) {
        return (
            <EquipmentFormProvider>
                <AddEquipmentForm />
            </EquipmentFormProvider>
        )
    }

    return (
        <MainLayout title=''>
            <div className="flex-1 space-y-8 p-8 pt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Equipment List</h2>
                    <Button
                        className="bg-[#2A7C7C] hover:bg-[#246666]"
                        onClick={() => setIsAddingEquipment(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {equipments.length > 0 && equipments.map((item: any, index) => (
                        <EquipmentCard
                            key={index}
                            name={item?.name}
                            category={item?.categoryId}
                            imageUrl={item?.images[0]?.url}
                            onViewDetails={() => console.log(`View details for item ${index}`)}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}




















// import { useState } from 'react'
// import { Plus } from 'lucide-react'
// import { AddEquipmentForm } from '../../components/add-equipment-form'
// import { Button } from '../../components/ui/button'
// import { EquipmentCard } from '../../components/layout/equipmentCard'
// import { MainLayout } from '../../components/layout'


// const equipmentItems = Array(8).fill({
//     name: "2 Pack Trauma Shears",
//     category: "Scissors",
//     imageUrl: "/placeholder.svg?height=200&width=200",
// })

// export function Equipments() {
//     const [isAddingEquipment, setIsAddingEquipment] = useState(false)

//     if (isAddingEquipment) {
//         return <AddEquipmentForm />
//     }

//     return (
//         <MainLayout title='Equipments'>
//             <div className="flex-1 space-y-8 p-8 pt-6">
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-3xl font-bold tracking-tight">Equipment List</h2>
//                     <Button
//                         className="bg-[#2A7C7C] hover:bg-[#246666]"
//                         onClick={() => setIsAddingEquipment(true)}
//                     >
//                         <Plus className="mr-2 h-4 w-4" />
//                         Add New
//                     </Button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                     {equipmentItems.map((item, index) => (
//                         <EquipmentCard
//                             key={index}
//                             name={item.name}
//                             category={item.category}
//                             imageUrl={item.imageUrl}
//                             onViewDetails={() => console.log(`View details for item ${index}`)}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </MainLayout>
//     )
// }

