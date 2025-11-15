import { AdminDashboardShell } from "@/components/admin/AdminDashboardShell";
import { getLandingContent } from "@/services/cms/landing";

export default async function AdminDashboardPage() {
  const content = await getLandingContent();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-10">
      <AdminDashboardShell initialContent={content} />
    </div>
  );
}

