import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { GenerateClient } from "@/components/generate-client";

export default async function GeneratePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return <GenerateClient initialCredits={session.user.credits} />;
}
