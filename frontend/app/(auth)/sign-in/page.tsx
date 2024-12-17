import { AnimatedGrid } from "@/components/animated-grid";
import { SignInForm } from "@/components/sign-in-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  let isAuthenticated = false;

  if (token) {
    const res = await fetch("http://127.0.0.1:5000/api/v1/auth/login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      isAuthenticated = true;
    }
  }

  if (isAuthenticated) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">
          <AnimatedGrid />
          <div className="flex items-center justify-center">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
