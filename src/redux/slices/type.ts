export interface CuaHangState {
    isLoading: boolean,
    items:  CuaHangType[]
}

export interface CuaHangType {
    address:         string;
    images:          string;
    name:            string;
    numberOfRatings: number;
    rating:          number;
    restaurantId:    string;
    type:            string;
    location: Location[];
    openingHours: OpeningHour[],
    createdAt: CreatedAt[]
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


export interface Location {
    latitude:  number;
    longitude: number;
}
