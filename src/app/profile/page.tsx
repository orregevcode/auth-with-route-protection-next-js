import { getSession } from "@/actions";

import { redirect } from "next/navigation";
const ProfilePage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome {session.username}</p>
      <span>You are logged in as {session.role}</span>
    </div>
  );
};

export default ProfilePage;
