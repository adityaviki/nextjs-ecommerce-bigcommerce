export * from "./auth";
export * from "./data";
export * from "./db";
export * from "./error";
export * from "./order";

export interface BannerType {
  id: number;
  name: string;
  content: string;
  page: string;
  item_id: string;
  location: string;
  date_created: string;
  date_type: string;
  date_from: string;
  date_to: string;
  visible: string;
}

export interface Slide {
  image: string;
  heading: string;
  text: string;
}

export interface CarouselProps {
  slides: Slide[];
}

export interface SingleCarouselProps {
  slide: Slide;
}
