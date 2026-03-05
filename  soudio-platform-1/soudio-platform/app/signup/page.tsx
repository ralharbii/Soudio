import { redirect } from "next/navigation";

// Redirect to login page with signup tab
export default function SignupPage() {
  redirect("/login");
}
