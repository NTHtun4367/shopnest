import UserStatusDropDown from "@/components/admin/UserStatusDropDown";
import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/store/slices/userApi";

function userManagement() {
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    <Loader />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users</h2>
      <Table>
        <TableCaption>A list of your all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">User Id</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">INV - {user._id}</TableCell>
              <TableCell className="text-center">{user.name}</TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="text-center">
                <Badge
                  className={
                    user.status === "active" ? "bg-green-600" : "bg-red-600"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center justify-end">
                <UserStatusDropDown
                  userId={user._id}
                  userStatus={user.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default userManagement;
