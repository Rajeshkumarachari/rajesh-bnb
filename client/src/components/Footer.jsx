import { CiGlobe } from "react-icons/ci";
import fb from "../assets/fb.png";
import insta from "../assets/insta.jpeg";
import twitter from "../assets/twitter.png";

export default function Footer() {
  const values = ["Privacy", "Terms", "Sitemap", "Company details"];
  return (
    <div>
      <hr className=" border " />
      <div className="h-20 flex justify-between">
        <div className=" flex my-6 ml-10 ">
          <ol type="a" className=" flex items-center gap-3 ">
            <ul className=" text-lg">© 2024 Rajeshbnb, Inc.</ul>
            {values.map((val) => (
              <li className=" hover:underline cursor-pointer text-lg" key={val}>
                <span> {val}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="my-6 flex gap-5  font-semibold mr-32">
          <p className=" flex justify-center gap-1 cursor-pointer  hover:underline">
            <CiGlobe className=" size-5 " /> English (IN)
          </p>
          <p className=" hover:underline cursor-pointer">₹ INR</p>
          <img
            className=" size-6 cursor-pointer object-cover"
            src={fb}
            alt="fb"
          />
          <img
            className=" size-6 cursor-pointer object-cover"
            src={twitter}
            alt="fb"
          />{" "}
          <img
            className=" size-6 cursor-pointer object-cover rounded"
            src={insta}
            alt="fb"
          />
        </div>
      </div>
    </div>
  );
}
