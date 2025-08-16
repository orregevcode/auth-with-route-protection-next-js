import { login } from "@/actions";
const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <form action={login}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
