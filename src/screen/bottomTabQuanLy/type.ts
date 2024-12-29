export interface StoreData {
    type: string,
    name: string,
    images: string,
    address: string,
    openingHours: OpeningHours[],
    numberOfRatings: number,
    rating: number,
    restaurantId: string,
    createdAt: Date
}
export interface OpeningHours {
    close: string,
    day: string,
    open: string
}