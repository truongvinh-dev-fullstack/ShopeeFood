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
    createdAt: number
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


export interface UserState {
    id:             string;
    email:          string;
    userId:         string;
    name:           string;
    paymentMethods: number[];
    phone:          string;
    role:           string;
    avatar:         string;
    password:       string;
    address:        string;
    restaurantInfo: string;
}

export interface OrderState {
    items: OrderType[]
}

export interface OrderType {
    id: string; 
    name: string; 
    originalPrice: number; 
    price: number; 
    quantity: number;
    images: string;
}

