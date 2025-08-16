import Link from "next/link";
import LogoutForm from './logoutForm';
import { getSession } from "@/actions";

const Navbar = async () => {
 const session = await getSession();
 console.log("this is the session " , session);
return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/admin">Admin Dashboard</Link>
      <Link href="/login">login</Link>
      {session?.isLoggedIn && <LogoutForm />}
    </nav>
  );
};

export default Navbar;
