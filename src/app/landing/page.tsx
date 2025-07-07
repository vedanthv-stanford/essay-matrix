import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Landing from "@/components/landing";

export default async function LandingPage() {
    const session = await getServerSession();
    if (session) {
        redirect("/colleges");
    }
    return <Landing />;
}