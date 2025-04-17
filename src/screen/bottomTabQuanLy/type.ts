export interface StoreData {
  type: string;
  name: string;
  images: string;
  address: string;
  openingHours: OpeningHours[];
  numberOfRatings: number;
  rating: number;
  restaurantId: string;
  createdAt: Date;
  location?: LocationStore;
}
export interface OpeningHours {
  close: string;
  day: string;
  open: string;
}

export interface LocationStore {
  _latitude: number;
  _longitude: number;
}

export interface CuaHang {
  address: string;
  images: string;
  name: string;
  numberOfRatings: number;
  rating: number;
  restaurantId: number;
  type: string;
  location: Location[];
  openingHours: OpeningHour[];
  createdAt: number;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface OpeningHour {
  open: string;
  close: string;
  day: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}
