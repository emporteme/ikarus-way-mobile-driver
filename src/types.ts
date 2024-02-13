// Interface for order data
export interface OrderType {
    id: number;
    pickupAddress: string;
    dropOffAddress: string;
    dateStart: string;
    dateFinish: string;
    timeStart: string;
    timeEnd: string;
    price: number;
    status: string;
    volume: number;
    packageType: string;
    weight: number;
    distance: number;
}