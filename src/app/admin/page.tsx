import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AdminClient } from "@/components/admin-client";
import type { PlatformRole } from "@/lib/auth-types";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to home if not authenticated
  if (!session) {
    redirect("/");
  }

  // Redirect to dashboard if not an admin
  if (session.user.platformRole !== "admin") {
    redirect("/dashboard");
  }

  return <AdminClient user={{
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    platformRole: session.user.platformRole as PlatformRole
  }} />;
}
