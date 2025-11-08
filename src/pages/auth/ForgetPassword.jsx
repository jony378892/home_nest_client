import { MdOutlineMail } from "react-icons/md";
import useAuthContext from "../../hooks/useAuthContext";
import { redirect } from "react-router";

export default function ForgetPassword() {
  const { user } = useAuthContext();

  const handleResetPassword = (e) => {
    e.preventDefault();
  };

  if (!user) {
    return redirect("/auth/signIn");
  }

  return (
    <div className="pt-20 flex flex-col gap-10 items-center">
      <h2 className="text-4xl font-bold">Signup here</h2>
      <form
        onSubmit={handleResetPassword}
        className="p-5 py-10 flex flex-col gap-2 border border-gray-300 rounded-2xl"
      >
        <div className="">
          <label className=" font-medium">Email</label>
          <div className="input validator outline-none mt-1 w-full">
            <MdOutlineMail className="text-gray-500" size={24} />
            <input
              type="email"
              placeholder="email@example.com"
              name="email"
              required
            />
          </div>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>

        <button className="btn btn-neutral mt-5">Send reset link</button>
      </form>
    </div>
  );
}
