import { Link } from "react-router-dom";
import logo from "../assets/favicon-bnb.ico";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((store) => store.user);

  return (
    currentUser && (
      <header className=" bg-slate-100 shadow-md">
        <div className="flex  justify-between items-center max-w-6xl mx-auto  p-3">
          <Link to="/">
            <div className=" flex gap-1">
              <img src={logo} alt="logo" />
              <h1 className="  text-rose-500  font-bold sm:text-xl flex flex-wrap cursor-pointer ">
                Rajeshbnb
              </h1>
            </div>
          </Link>
          <form className=" bg-slate-50 px-3 py-1 rounded-3xl flex items-center">
            <input
              type="text"
              placeholder="search destinations"
              className=" bg-transparent focus:outline-none w-24 px-3 sm:w-64"
            />
            <FaSearch className="text-slate-100 bg-rose-500 size-10 p-3 rounded-full cursor-pointer" />
          </form>
          <ul className=" flex items-center">
            <Link to="/">
              <li className=" hidden sm:inline text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-3xl  cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="about">
              <li className=" hidden sm:inline text-slate-700  hover:bg-slate-200 px-3 py-2 rounded-3xl  cursor-pointer">
                About
              </li>
            </Link>

            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className=" rounded-full size-9 object-cover cursor-pointer"
                />
              </Link>
            ) : (
              <Link to="sign-in">
                <li className=" text-slate-700  hover:bg-slate-200 px-3 py-2 rounded-3xl  cursor-pointer ">
                  Sign in
                </li>
              </Link>
            )}
          </ul>
        </div>
      </header>
    )
  );
}
