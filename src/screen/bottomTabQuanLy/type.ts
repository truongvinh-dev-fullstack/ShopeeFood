export interface StoreData {
    type: string,
    name: string,
    images: string,
    address: string,
    openingHours: OpeningHours[],
    numberOfRatings: number,
    rating: number,
    restaurantId: string,
    createdAt: Date,
    location?: Location
}
export interface OpeningHours {
    close: string,
    day: string,
    open: string
}

export interface Location {
    _latitude: number,
    _longitude: number,
}

export interface CuaHang {
    restaurantId:    string;
    type:            string;
    openingHours:    OpeningHour[];
    rating:          number;
    numberOfRatings: number;
    address:         string;
    name:            string;
    images:          string;
    createdAt:       CreatedAt;
}

export interface CreatedAt {
    seconds:     number;
    nanoseconds: number;
}

export interface OpeningHour {
    open:  string;
    close: string;
    day:   string;
}
