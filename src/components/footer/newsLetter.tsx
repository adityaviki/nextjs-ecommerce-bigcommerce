const NewsLetter = () => {
  return (
    <div className="flex md:bg-white bg-[#F8F8F9] p-2.5 flex-col md:flex-row md:items-center md:justify-center md:gap-4 gap-2">
      <div className="font-bold text-lg text-[#3B4353]">
        Sign up to our newsletter
      </div>
      <div className="flex gap-2">
        <input
          className="w-full h-9 px-4 text-[#202020] border rounded border-[#D9EDFF]"
          placeholder="Enter your email address"
        />
        <button className="w-32 h-9 px-4 py-2 rounded text-white bg-[#003459]">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
