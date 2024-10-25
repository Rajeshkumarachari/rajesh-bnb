// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/favicon-bnb.ico";
// import { FaSearch } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";

// export default function Header() {
//   const { currentUser } = useSelector((store) => store.user);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(searchTerm);
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set("searchTerm", searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get("searchTerm");
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);
//   return (
//     currentUser && (
//       <header className=" bg-slate-100 shadow-md">
//         <div className="flex  justify-between items-center max-w-6xl mx-auto  p-3">
//           <Link to="/">
//             <div className=" flex gap-1">
//               <img src={logo} alt="logo" />
//               <h1 className="  text-rose-500  font-bold sm:text-xl flex flex-wrap cursor-pointer ">
//                 Rajeshbnb
//               </h1>
//             </div>
//           </Link>
//           <form className=" bg-slate-50 px-3 py-1 rounded-3xl flex items-center">
//             <input
//               onSubmit={handleSubmit}
//               type="text"
//               placeholder="search destinations"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className=" bg-transparent focus:outline-none w-24 px-3 sm:w-64"
//             />
//             <button type="submit">
//               <FaSearch className="text-slate-100 bg-rose-500 size-10 p-3 rounded-full cursor-pointer" />
//             </button>
//           </form>
//           <ul className=" flex items-center">
//             <Link to="/">
//               <li className=" hidden sm:inline text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-3xl  cursor-pointer">
//                 Home
//               </li>
//             </Link>
//             <Link to="about">
//               <li className=" hidden sm:inline text-slate-700  hover:bg-slate-200 px-3 py-2 rounded-3xl  cursor-pointer">
//                 About
//               </li>
//             </Link>

//             {currentUser ? (
//               <Link to="/profile">
//                 <img
//                   src={currentUser.avatar}
//                   alt="profile"
//                   className=" rounded-full size-9 object-cover cursor-pointer"
//                 />
//               </Link>
//             ) : (
//               <Link to="sign-in">
//                 <li className=" text-slate-700  hover:bg-slate-200 px-3 py-2 rounded-3xl  cursor-pointer ">
//                   Sign in
//                 </li>
//               </Link>
//             )}
//           </ul>
//         </div>
//       </header>
//     )
//   );
// }

import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import logo from "../assets/favicon-bnb.ico";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((store) => store.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get current location

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    console.log(searchQuery);
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]); // Depend on location.search for reactivity

  return (
    currentUser && (
      <header className=" bg-slate-100 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <div className="flex gap-1">
              <img src={logo} alt="logo" />
              <h1 className="text-rose-500 font-bold sm:text-xl flex flex-wrap cursor-pointer">
                Rajeshbnb
              </h1>
            </div>
          </Link>
          {/* Attach handleSubmit to the form */}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 px-3 py-1 rounded-3xl flex items-center"
          >
            <input
              type="text"
              placeholder="search destinations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-24 px-3 sm:w-64"
            />
            <button type="submit">
              <FaSearch className="text-slate-100 bg-rose-500 size-10 p-3 rounded-full cursor-pointer" />
            </button>
          </form>
          <ul className="flex items-center">
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-3xl cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="about">
              <li className="hidden sm:inline text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-3xl cursor-pointer">
                About
              </li>
            </Link>
            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="rounded-full size-9 object-cover cursor-pointer"
                />
              </Link>
            ) : (
              <Link to="sign-in">
                <li className="text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-3xl cursor-pointer">
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
