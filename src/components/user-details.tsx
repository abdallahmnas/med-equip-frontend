import { ChevronRight } from 'lucide-react'
import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
} from "../components/ui/card"
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../../components/ui/breadcrumb"

interface UserDetails {
    firstName: string
    lastName: string
    email: string
    occupation: string
    address: string
    phoneNumber: string
    statistics: {
        searches: number
        saves: number
    }
}

interface UserDetailsProps {
    user: UserDetails
    onEdit: () => void
    onDelete: () => void
}

export function UserDetails({ user, onEdit, onDelete }: UserDetailsProps) {
    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            {/* <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/accounts">Accounts</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/accounts/users">All Users</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>User Details</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb> */}

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">User Details</h1>
                {/* <Button
                    variant="outline"
                    onClick={onEdit}
                    className="px-8"
                >
                    Edit
                </Button> */}
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        <div className="space-y-1.5">
                            <label className="text-sm text-gray-500">First Name</label>
                            <p className="font-medium">{user.firstName}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm text-gray-500">Last Name</label>
                            <p className="font-medium">{user.lastName}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm text-gray-500">Email Address</label>
                            <p className="font-medium">{user.email}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm text-gray-500">Occupation</label>
                            <p className="font-medium">{user.occupation}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm text-gray-500">Address</label>
                            <p className="font-medium">{user.address}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm text-gray-500">Phone Number</label>
                            <p className="font-medium">{user.phoneNumber}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Statistics</h2>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-2xl font-semibold">{user.statistics.searches}</p>
                            <p className="text-sm text-gray-500">Searches</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-2xl font-semibold">{user.statistics.saves}</p>
                            <p className="text-sm text-gray-500">Saves</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    variant="destructive"
                    onClick={onDelete}
                    className="px-8"
                >
                    Delete User
                </Button>
            </div>
        </div>
    )
}

