import { IoCloudUploadOutline } from "react-icons/io5";
export default function CreateListing() {
  return (
    <main className=" p-3 mt-5 rounded-lg shadow-sm max-w-4xl mx-auto bg-slate-50">
      <h1 className=" text-2xl font-medium text-center my-5">
        Create a Listing
      </h1>
      <form className=" flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1  ">
          <input
            type="text"
            placeholder="Name"
            className=" border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className=" border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className=" border p-3 rounded-lg"
            id="address"
            required
          />
          <div className=" flex gap-2 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex  flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className=" px-2 py-1 border border-gray-300 rounded-md "
              />
              <span>Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathroom"
                min={1}
                max={10}
                required
                className=" px-2 py-1 border border-gray-300 rounded-md "
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regulartprice"
                min={1}
                max={10}
                required
                className=" px-2 py-1 border border-gray-300 rounded-md "
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className=" text-xs">(₹/month) </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedprice"
                min={1}
                max={10}
                required
                className=" px-2 py-1 border border-gray-300 rounded-md "
              />
              <div className="flex flex-col items-center ">
                <p>Discounted price</p>
                <span className=" text-xs">(₹/month) </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className=" font-semibold">
            Images:{" "}
            <span className=" font-normal text-gray-700 ml-2">
              {" "}
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className=" p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="flex items-center gap-2 p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80">
              <IoCloudUploadOutline className=" size-6" />
              Upload
            </button>
          </div>
          <button className=" mt-4 p-3 bg-slate-700 text-white rounded-lg  hover:opacity-95 ">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
