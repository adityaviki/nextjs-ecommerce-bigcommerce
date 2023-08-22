import useSWR from "swr";

async function fetcher(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw {
      error: "An error occured while fetching the data",
      status: res.status,
    };
  }

  return res.json();
}

export function useBanners(pathname: string) {
  let page = pathname.split("/")[1];

  if (page === "") {
    page = "home_page";
  } else if (page === "category") {
    page = "category_page";
  } else if (page === "brand") {
    page = "brand_page";
  } else if (page === "search") {
    page = "search_page";
  } else {
    page = "";
  }

  const url = `/api/banners?page=${page}`;
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    error,
  };
}
