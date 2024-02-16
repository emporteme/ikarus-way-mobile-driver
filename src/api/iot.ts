// Interface for order data
import { IotType } from "@/types";


// Mock data of orders
export const orders: IotType[] = [
    {
        id: 1,
        name: 'Speed',
        value: 60,
        unit: 'km/h',
        icon: `speed`,
    },
    {
        id: 2,
        name: 'RPM',
        value: 2500,
        unit: 'rpm',
        icon: `rpm`,
    },
    {
        id: 3,
        name: 'Fuel Level',
        value: 70,
        unit: '%',
        icon: `fuel`,
    },
    {
        id: 4,
        name: 'Engine Temperature',
        value: 90,
        unit: '°C',
        icon: `temperature`,
    },
    {
        id: 5,
        name: 'Battery Voltage',
        value: 12.5,
        unit: 'V',
        icon: `battery`,
    },
];