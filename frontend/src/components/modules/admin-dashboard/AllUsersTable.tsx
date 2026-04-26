"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { banUserAction } from "@/actions/admin.actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  status: string;
  isBanned?: boolean;
}

interface AllUsersTableProps {
  users: User[];
}

export default function AllUsersTable({ users }: AllUsersTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleBan = (userId: string, isBanned: boolean) => {
    startTransition(async () => {
      try {
        const result = await banUserAction({ userId, isBanned });
        toast.success(result?.message || "User status updated successfully");
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to update user status",
        );
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === "ACTIVE" ? "default" : "secondary";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Email Verified</TableHead>
            <TableHead>Ban Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-400">{user.status}</Badge>
              </TableCell>
              <TableCell>
                {user.emailVerified ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-red-600">✗</span>
                )}
              </TableCell>
              <TableCell>
                <Select
                  value={user.isBanned ? "banned" : "active"}
                  disabled={isPending}
                  onValueChange={(value) => {
                    handleBan(user.id, value === "banned");
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(user.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
