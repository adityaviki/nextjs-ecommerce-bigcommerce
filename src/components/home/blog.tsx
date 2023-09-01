import { getBlogs } from "@/lib/bigCommerce";
import Link from "next/link";
import Image from "next/image";

const Blog = async () => {
  const blogs = await getBlogs();
  return (
    <div className="mt-12">
      <div className="text-center text-[32px] mb-4 font-bold">Blog</div>
      <div className="flex flex-col md:flex-row gap-5">
        {blogs.map((blog) => {
          return (
            <div
              key={blog.entityId}
              className="text-center md:text-left text-[16px] text-[#202020] flex md:flex-1 flex-col gap-2"
            >
              <div className="w-full h-[244px] md:h-[280px] ">
                <Image
                  width={416}
                  height={280}
                  alt="blog thumbnail"
                  className="w-full h-full object-cover"
                  src={blog.thumbnailImage?.urlOriginal}
                />
              </div>
              <div className="font-bold">{blog.name}</div>

              <div className="text-[16px] underline text-[#202020]">
                Read More
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
