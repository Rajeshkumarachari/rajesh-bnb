import { Link } from "react-router-dom";
import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListing = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  }, []);
  return (
    <div>
      {/* {Top} */}
      <div className=" flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className=" text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className=" text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className=" text-gray-400 text-xs sm:text-sm">
          <span className=" font-medium text-slate-600">Rajeshbnb</span> is the
          best place to find your next perfect place to <br /> We have a wide
          range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="-ml-2 flex gap-2 items-center text-base sm:text-sm text-blue-800  font-medium"
        >
          <span className=" flex hover:bg-blue-100 p-2 rounded-md hover:un">
            Let's get started...{" "}
            <HiOutlineArrowRightStartOnRectangle className=" size-6" />
          </span>
        </Link>
      </div>
      {/* {Swiper} */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className=" h-[500px] "
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* { results} */}
      <div className=" max-w-6xl w-full mx-auto p-2 flex flex-col gap-2 my-10 flex-wrap">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className=" my-3">
              <h1 className=" text-2xl font-medium text-slate-600">
                Recent offers
              </h1>
              <Link
                className=" text-sm text-blue-800 hover:underline p-1 hover:bg-blue-100 rounded-md"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className=" my-3">
              <h1 className=" text-2xl font-medium text-slate-600">
                Recent places for rent
              </h1>
              <Link
                className=" text-sm text-blue-800 hover:underline p-1 hover:bg-blue-100 rounded-md"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className=" my-3">
              <h1 className=" text-2xl font-medium text-slate-600">
                Recent places for sale
              </h1>
              <Link
                className=" text-sm text-blue-800 hover:underline p-1 hover:bg-blue-100 rounded-md"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
