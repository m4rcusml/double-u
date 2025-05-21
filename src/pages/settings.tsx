import { Button } from "@/components/ui/button";
import { signOut } from "@/services/authService";

export function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <Button onClick={signOut}>Logout</Button>
    </div>
  )
}