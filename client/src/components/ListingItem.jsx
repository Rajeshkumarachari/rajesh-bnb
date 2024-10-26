import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
export default function ListingItem({ listing }) {
  return (
    <div className=" bg-white shadow-sm hover:shadow-md  transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px] ">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing?.imageUrls[0] ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi191Obs86TXb9NO5ATEEjC4zAn_Qo6-QLjw&s"
          }
          alt="listing-cover"
          className=" h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className=" text-base font-medium text-slate-600 truncate">
            {listing?.name}
          </p>
          <div className=" flex item-center gap-1 ">
            <MdLocationOn className=" text-blue-800 size-4 mt-[2px]" />
            <p className=" text-sm text-gray-600 truncate w-full ">
              {listing.address}
            </p>
          </div>
          <p className=" text-sm text-gray-600 line-clamp-3">
            {listing.description}{" "}
          </p>
          <p className=" text-slate-500 mt-2 font-medium">
            ₹
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}{" "}
            {listing.type === "rent" && "/ month"}
          </p>
          <div className=" text-slate-700 flex gap-4">
            <div className=" font-medium text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className=" font-medium text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}