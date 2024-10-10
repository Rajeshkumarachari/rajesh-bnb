import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className=" max-w-lg mx-auto rounded-lg bg-gray-50 mt-5 ">
      <div className="shadow-lg p-4   flex justify-center flex-col">
        <h1 className=" text-2xl text-center font-medium my-2">Sign Up</h1>
        <hr className=" mt-2" />
        <h1 className=" text-2xl font-medium text-gray-800 my-4">
          Welcome to Rajeshbnb
        </h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-3 ">
          <input
            type="text"
            placeholder="User name"
            className=" border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className=" border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />{" "}
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
            {loading ? "Loading..." : "Sign up"}
          </button>
        </form>
        <div className=" flex gap-2 my-3 ">
          <p>Have an account? </p>
          <Link to={"/sign-in"}>
            <span className=" text-blue-700 font-medium"> Sign in</span>
          </Link>
        </div>
        {error && <p className=" text-red-500 mt-5"> {error} </p>}
      </div>
    </div>
  );
}
