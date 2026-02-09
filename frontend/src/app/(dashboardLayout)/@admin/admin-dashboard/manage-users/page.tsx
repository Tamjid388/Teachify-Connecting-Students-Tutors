import AllUsersTable from '@/components/modules/admin-dashboard/AllUsersTable';
import { adminService } from '@/services/admin-service'


export default async function ManageUsers() {
    const {data}=await adminService.getAllUsers()
    console.log(data);
  return (
  <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground">
          View and manage all registered users
        </p>
      </div>
      <AllUsersTable users={data.result} />
    </div>
  )
}
