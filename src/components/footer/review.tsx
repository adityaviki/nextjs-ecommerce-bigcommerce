const Review = () => {
  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
      <div>
        Check out our <b>8,202</b> reviews
      </div>
      <div className="flex gap-2">
        <img className="h-5" src="/images/home/rating.png" alt="..." />
        <img className="h-5" src="/images/home/trustpilot-logo.png" alt="..." />
      </div>
    </div>
  );
};

export default Review;
