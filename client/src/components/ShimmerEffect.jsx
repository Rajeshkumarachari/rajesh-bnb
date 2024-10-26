export default function ShimmerEffect() {
  return (
    <div className=" flex flex-wrap gap-3">
      <div className="flex w-[350px] flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4"></div>
        </div>
        <div className="skeleton h-[400px] w-full"></div>
      </div>
      <div className="flex w-[350px] flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4"></div>
        </div>
        <div className="skeleton h-[400px] w-full"></div>
      </div>
      <div className="flex w-[350px] flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4"></div>
        </div>
        <div className="skeleton h-[400px] w-full"></div>
      </div>
      <div className="flex w-[350px] flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4"></div>
        </div>
        <div className="skeleton h-[400px] w-full"></div>
      </div>
    </div>
  );
}
