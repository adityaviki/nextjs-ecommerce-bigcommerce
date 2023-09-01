import Image from "next/image";
const Review = () => {
  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
      <div>
        Check out our <b>8,202</b> reviews
      </div>
      <div className="flex gap-2">
        <Image height={20} width={106} src="/images/rating.png" alt="..." />
        <Image
          height={20}
          width={81}
          src="/images/trustpilot-logo.png"
          alt="..."
        />
      </div>
    </div>
  );
};

export default Review;
