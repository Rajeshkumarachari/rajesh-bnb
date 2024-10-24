import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { MdExpandMore } from "react-icons/md";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logOutUserStart,
  logOutUserFailure,
  logOutUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // console.log("CUR-USER--" + currentUser);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(JSON.stringify(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  setTimeout(() => {
    setUpdateSuccess(false);
  }, 3000);

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(logOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(logOutUserFailure(data.message));
      }
      dispatch(logOutUserSuccess(data));
    } catch (error) {
      dispatch(logOutUserFailure(error.message));
    }
  };
  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
      console.log(error);
    }
  };
  return (
    <div className=" bg-slate-50 w-[40%] my-4  mx-auto rounded-lg shadow-md">
      <div className=" pb-9">
        <h1 className=" text-2xl text-center font-medium py-4">
          Update Your Profile
        </h1>
        <form onSubmit={handleSubmit} className=" flex flex-col mx-5 gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            src={formData?.avatar || currentUser.avatar}
            alt={currentUser.username}
            onClick={() => fileRef.current.click()}
            className=" rounded-full size-24 object-cover cursor-pointer self-center "
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <span className="text-orange-700">{`Uploading ${filePercentage}%`}</span>
            ) : filePercentage === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded..!
              </span>
            ) : (
              ""
            )}
          </p>
          <hr className=" my-5 w-[50%] flex justify-center items-center mx-auto border-slate-400" />
          <input
            type="text"
            placeholder="User Name"
            defaultValue={currentUser.username}
            id="username"
            className=" border p-3 rounded-lg hover:bg-slate-100 "
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="User Email"
            defaultValue={currentUser.email}
            id="email"
            className=" border p-3 rounded-lg hover:bg-slate-100  "
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Your Password"
            id="password"
            className=" border p-3 rounded-lg hover:bg-slate-100 "
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-85"
          >
            {loading ? "Loading.." : "Update"}
          </button>
          <Link
            className=" bg-green-700 text-white p-3 rounded-lg text-center hover:opacity-95"
            to={"/create-listing"}
          >
            Create listing
          </Link>
        </form>
        <div className=" flex justify-between mx-7 mt-4">
          <span
            className="flex items-center gap-2 text-red-700 cursor-pointer  text-lg font-medium px-2 py-1 hover:bg-red-100 rounded-lg"
            onClick={handleDeleteUser}
          >
            Delete Account <FiDelete className=" size-5" />
          </span>
          <span
            className=" flex items-center gap-2 text-red-700 cursor-pointer text-lg font-medium  p-2 hover:bg-red-100 rounded-lg"
            onClick={handleSignOut}
          >
            Sign Out <IoMdLogOut className=" size-5" />
          </span>
        </div>
        <div className=" mx-9">
          <p className=" text-orange-700 mt-5"> {error ? error : ""} </p>
          <p className=" text-green-700 mt-5">
            {updateSuccess ? "Updated successfully" : ""}
          </p>
        </div>
        <button
          onClick={handleShowListings}
          className=" text-green-700 w-full justify-center hover:bg-green-100 p-3 text-lg  flex items-center "
        >
          Show Listings <MdExpandMore className=" size-8" />
        </button>
        <p className=" text-orange-700 mt-4">
          {showListingsError ? "Error showing listings" : ""}
        </p>
        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className=" text-center mt-7 text-2xl font-semibold">
              Your listings
            </h1>
            {userListings.map((listing) => (
              <div
                className="border flex rounded-lg p-3 justify-between items-center gap-3"
                key={listing._id}
              >
                <Link to={`/listing/${listing._id}`} className="">
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing-cover"
                    className=" size-16 object-contain"
                  />
                </Link>
                <Link
                  to={`/listing/${listing._id}`}
                  className="flex-1 text-slate-500 font-medium  hover:underline text-base truncate"
                >
                  <p>{listing.name}</p>
                </Link>
                <div className=" flex flex-col items-center">
                  <button className="  text-orange-700 text-base flex items-center gap-2 ">
                    Delete <CiCircleRemove className=" size-5" />
                  </button>
                  <button className="flex items-center gap-2  text-green-700 text-base">
                    Edit <CiEdit className=" size-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
