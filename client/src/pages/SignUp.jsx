import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className=" max-w-lg mx-auto p-3 rounded-lg  ">
      <div className="shadow-lg px-4  flex justify-center flex-col">
        <h1 className=" text-2xl text-center font-medium my-2">Sign Up</h1>
        <hr className=" mt-2" />
        <h1 className=" text-2xl font-medium text-gray-800 my-4">
          Welcome to Rajeshbnb
        </h1>
        <form className=" flex flex-col gap-3 ">
          <input
            type="text"
            placeholder="User name"
            className=" border p-3 rounded-lg"
            id="username"
          />
          <input
            type="email"
            placeholder="Email"
            className=" border p-3 rounded-lg"
            id="email"
          />{" "}
          <input
            type="password"
            placeholder="Password"
            className=" border p-3 rounded-lg"
            id="password"
          />
          <button className=" bg-rose-600 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
            Sign up
          </button>
        </form>
        <div className=" flex gap-2 my-3 ">
          <p>
            Have an account?
            <Link to={"/sign-in"}>
              <span className=" text-blue-700 font-medium"> Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
