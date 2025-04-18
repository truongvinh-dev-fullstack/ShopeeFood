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
    restaurantId:    number;
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
    userId:         number;
    name:           string;
    paymentMethods: number[];
    phone:          string;
    role:           string;
    avatar:         string;
    password:       string;
    address:        Address[];
    restaurantInfo: string;
}

export interface Address {
    id:             string;
    userId:         number;
    name:           string;
    isMain:          number;
    location: Location
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

