import Analytics from "@/components/modules/admin-dashboard/analytics/analytics";
import { adminService } from "@/services/admin-service";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const stats = await adminService.getAdminStats(cookieHeader).catch(() => null);

  return (
    <div>
      <h1 className="text-4xl font-bold text-custom-primary">
        Welcome To Admin Dashboard
      </h1>
      <main>
        <Analytics stats={stats} />
      </main>
    </div>
  );
}
