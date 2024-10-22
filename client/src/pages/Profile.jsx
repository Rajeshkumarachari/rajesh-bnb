import { useSelector } from "react-redux";
import { FiDelete } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log("formData-> " + formData);
  console.log("filePercentage-> " + filePercentage);

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
  return (
    <div className=" bg-slate-50 w-[40%] my-4  mx-auto rounded-lg shadow-md">
      <div className=" pb-9">
        <h1 className=" text-2xl text-center font-medium py-4">
          Update Your Profile
        </h1>
        <form action="" className=" flex flex-col mx-5 gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            src={formData.avatar || currentUser.avatar}
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
