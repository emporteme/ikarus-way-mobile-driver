import { images } from '@/constants';
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

export interface IotType {
    id: number,
    name: string,
    value: number, // maybe later to number?
    unit: string,
    icon: string
}

export interface MessageType {
    id: number,
    photo: string,
    name: string,
    content: string,
    status: string,
    time: string, // 16:10
}