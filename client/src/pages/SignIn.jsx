import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((store) => store.user);
  console.log("error->" + typeof error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className=" max-w-lg mx-auto rounded-lg bg-gray-50 mt-5 ">
      <div className="shadow-lg p-4   flex justify-center flex-col">
        <h1 className=" text-2xl text-center font-medium my-2">Sign In</h1>
        <hr className=" mt-2" />
        <h1 className=" text-2xl font-medium text-gray-800 my-4">
          Welcome to Rajeshbnb
        </h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-3 ">
          <input
            type="email"
            placeholder="Email"
            className=" border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className=" border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className=" bg-rose-600 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
          <OAuth />
        </form>
        <div className=" flex gap-2 my-3 ">
          <p>Don have an account? </p>
          <Link to={"/sign-up"}>
            <span className=" text-blue-700 font-medium"> Sign up</span>
          </Link>
        </div>
        {error && (
          <p className=" text-red-500 mt-5"> {JSON.stringify.error} </p>
        )}
      </div>
    </div>
  );
}
