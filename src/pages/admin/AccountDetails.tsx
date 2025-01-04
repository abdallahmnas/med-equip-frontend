import { MainLayout } from "../../components/layout"
import { UserDetails } from "../../components/user-details"

const mockUser = {
    firstName: "John",
    lastName: "Chao",
    email: "johnchao@email.com",
    occupation: "Gynecologist",
    address: "San Jose, California, USA",
    phoneNumber: "546-933-2772",
    statistics: {
        searches: 450,
        saves: 21
    }
}

export default function AccountDetails() {
    return (
        <MainLayout title="">
            <div className="p-6">
                <UserDetails
                    user={mockUser}
                    onEdit={() => console.log("Edit user")}
                    onDelete={() => console.log("Delete user")}
                />
            </div>
        </MainLayout>
    )
}

