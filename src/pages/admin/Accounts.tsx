import { Eye, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { MainLayout } from "../../components/layout";
import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../services/users.service.js";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmationDialog } from "../../components/delete-confirmation-dialog.js";
import { toast } from "sonner";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  occupation: string;
  address: string;
}

export function Accounts() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const handleOpenDeleteDialog = (user: User) => {
    setUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteUser(id);
      toast.success("User deleted successfully.");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user?.");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const UserRow = ({ user }: { user: User }) => (
    <TableRow key={user?.id}>
      <TableCell>{user?.firstname} {user?.lastname}</TableCell>
      <TableCell>{user?.occupation}</TableCell>
      <TableCell>{user?.address}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(`../accounts/${user?.id}`)}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">View user</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-red-200 text-red-500 hover:bg-red-50"
            onClick={() => handleOpenDeleteDialog(user)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete user</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <MainLayout title={"Accounts"}>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Accounts</h2>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">All Users</h3>
              <Button
                variant="default"
                className="text-[#2A7C7C] border border-[#2A7C7C] hover:bg-[#2A7C7C] hover:text-white my-3"
              >
                View All &gt;
              </Button>
            </div>

            <Table className="border gray-200 rounded-lg shadow-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Occupation</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-lg font-medium text-gray-500">No records found</p>
                        <p className="text-sm text-gray-400">There are no users to display at the moment.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => <UserRow key={user?.id} user={user} />)
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between pt-4">
              <h3 className="text-lg font-medium">Top Users</h3>
              <select className="my-3 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option>June</option>
                <option>July</option>
                <option>August</option>
              </select>
            </div>

            <Table className="border gray-200 rounded-lg shadow-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Searches</TableHead>
                  <TableHead>Saved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-lg font-medium text-gray-500">No top users found</p>
                        <p className="text-sm text-gray-400">There are no top users to display for the selected period.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user?.id}>
                      <TableCell>{user?.firstname} {user?.lastname}</TableCell>
                      <TableCell>500+</TableCell>
                      <TableCell>45</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => handleDeleteUser(user?.id!)}
        title="Delete User"
        description={`Are you sure you want to delete this record? This action cannot be undone.`}
        // description={`Are you sure you want to delete ${user?.firstname} ${user?.lastname}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </MainLayout>
  );
}
