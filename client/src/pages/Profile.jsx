import { useSelector } from "react-redux";
import { FiDelete } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" bg-slate-50 w-[40%] my-4  mx-auto rounded-lg shadow-md">
      <div className=" pb-9">
        <h1 className=" text-2xl text-center font-medium py-4">
          Update Your Profile
        </h1>
        <form action="" className=" flex flex-col mx-5 gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className=" rounded-full size-24 object-cover cursor-pointer self-center "
          />
          <hr className=" my-5 w-[50%] flex justify-center items-center mx-auto border-slate-400" />
          <input
            type="text"
            placeholder="User Name"
            id="username"
            className=" border p-3 rounded-lg hover:bg-slate-100 "
          />
          <input
            type="email"
            placeholder="User Email"
            id="email"
            className=" border p-3 rounded-lg hover:bg-slate-100  "
          />
          <input
            type="password"
            placeholder="Your Password"
            id="password"
            className=" border p-3 rounded-lg hover:bg-slate-100 "
          />
          <button className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-85">
            {" "}
            Update
          </button>
        </form>
        <div className=" flex justify-between mx-7 mt-4">
          <span className="flex items-center gap-2 text-red-700 cursor-pointer  text-lg font-medium px-2 py-1 hover:bg-red-100 rounded-lg">
            Delete Account <FiDelete className=" size-5" />
          </span>
          <span className=" flex items-center gap-2 text-red-700 cursor-pointer text-lg font-medium  p-2 hover:bg-red-100 rounded-lg">
            Sign Out <IoMdLogOut className=" size-5" />
          </span>
        </div>
      </div>
    </div>
  );
}
