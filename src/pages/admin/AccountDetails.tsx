import { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout"
import { UserDetails } from "../../components/user-details"
import { getUser } from "../../services/users.service";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { PageLoading } from "../../components/page-loading";

// const mockUser = {
//     firstName: "John",
//     lastName: "Chao",
//     email: "johnchao@email.com",
//     occupation: "Gynecologist",
//     address: "San Jose, California, USA",
//     phoneNumber: "546-933-2772",
//     statistics: {
//         searches: 450,
//         saves: 21
//     }
// }


export default function AccountDetails() {

    const {id} = useParams()
    const [user, setUser] = useState<any>({
        firstName: "",
        lastName: "",
        email: "",
        occupation: "",
        address: "",
        phoneNumber: "",
        statistics: {
            searches: 450,
            saves: 21
        }
    })
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await getUser(id);
            setUser(res.data);
            console.log(res.data)
            setIsLoading(false)
          } catch (error) {
            console.error('Failed to fetch equipment details:', error);
            toast.error('Failed to load equipment details');
          }

          setIsLoading(false)
        };
        fetchUser();
      }, []);

if(isLoading){
    return <PageLoading />
}

    return (
        <MainLayout title="">
            <div className="p-6">
                <UserDetails
                    user={user}
                    onEdit={() => console.log("Edit user")}
                    onDelete={() => console.log("Delete user")}
                />
            </div>
        </MainLayout>
    )
}

// import { MainLayout } from "../../components/layout"
// import { UserDetails } from "../../components/user-details"
// import { getUser } from "../../services/users.service";

// const mockUser = {
//     firstName: "John",
//     lastName: "Chao",
//     email: "johnchao@email.com",
//     occupation: "Gynecologist",
//     address: "San Jose, California, USA",
//     phoneNumber: "546-933-2772",
//     statistics: {
//         searches: 450,
//         saves: 21
//     }
// }


// export default function AccountDetails() {



    
//     return (
//         <MainLayout title="">
//             <div className="p-6">
//                 <UserDetails
//                     user={mockUser}
//                     onEdit={() => console.log("Edit user")}
//                     onDelete={() => console.log("Delete user")}
//                 />
//             </div>
//         </MainLayout>
//     )
// }

