import Layout from "@/components/lp/Layout";
import { authService } from "@/data/services/authService";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const session = await authService.checkSession(token);
  return (
    <>
      <Layout session={session?.data || null} />
    </>
  );
}
