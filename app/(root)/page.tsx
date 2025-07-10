import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { Home as HomeIcon } from "lucide-react"; // optional if using the icon

const Home = async () => {
  const session = await auth();

  // console.log(session);

  return (
    <>
      <h1 className="h1-bold">Welcome to the world of Next.js</h1>

      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";

          await signOut({ redirectTo: "/sign-in" });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
};

export default Home;
