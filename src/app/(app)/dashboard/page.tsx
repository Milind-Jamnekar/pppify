import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

function DashboardPage() {
  return (
    <div>
      <SignOutButton>
        <Button>Signout</Button>
      </SignOutButton>
    </div>
  );
}

export default DashboardPage;
