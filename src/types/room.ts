export interface RoomIf {
  id: string;
  image: string;
  price: string;
  title: string;
  description: string;
  amenities: string[];
  moreDetails: {
    id: string;
    title: string;
    description: string;
    overview: {
      highlights: string[];
      notes: string;
    };
    facilities: {
      icon: string;
      label: string;
    }[];
    images: {
      id: number;
      image: string;
    }[];
  };
}