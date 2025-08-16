import { getSession } from "@/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  // Still get session for display data (username)
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return <AuthorizeAdmin />;
  }

  return (
    <div>
      <h1>Admin Content</h1>
      <p>This is the admin content area.</p>
      <p>Welcome, {session.username}!</p>
    </div>
  );
};

export default AdminPage;


const AuthorizeAdmin = () => {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};
