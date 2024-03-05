interface Address {
    lat: string;
    lon: string;
    name: string;
    type: string;
    osm_id: number;
    address: {
        city: string;
        road: string;
        state?: string;
        county?: string;
        region?: string;
        suburb?: string;
        country: string;
        postcode: string;
        city_block?: string;
        country_code: string;
        house_number: string;
        city_district?: string;
        ISO3166_2_lvl4?: string;
        ISO3166_2_lvl6?: string;
    };
    licence: string;
    category: string;
    osm_type: string;
    place_id: number;
    importance: number;
    place_rank: number;
    addresstype: string;
    boundingbox: string[];
    display_name: string;
}

interface Checkpoint {
    id: number;
    address: Address;
    time: number;
}

interface CargoDetails {
    cargo_name: string;
    nature_of_goods: string;
    id_number: string;
    hscode: string;
    bar_code: string;
    packaging_type: string;
    length: string;
    width: string;
    height: string;
    quantity: string;
    value_of_cargo: string;
    currency: string;
    weight: string;
    volume: number;
    stackable_cargo: boolean;
    special_instruction: string;
}

interface Temperature {
    min: string;
    max: string;
}

interface Humidity {
    min: string;
    max: string;
}

interface Pressure {
    min: string;
    max: string;
}

interface CargoCondition {
    temperature: Temperature;
    humidity: Humidity;
    pressure: Pressure;
    freight_trucking: boolean;
}

interface UserAccess {
    id: number;
    email: string;
    name: string;
    role: string;
}

interface Company {
    company_name: string;
    company_id_number: string;
    full_address: string;
    email: string;
    phone: string;
    department: string;
    contact_person: {
        full_name: string;
        phone: string;
    };
}

interface PaymentCondition {
    type: string;
    fine: number;
    time: string | null;
    id: number;
}

interface TransportInfo {
    id: number;
    startPoint: number;
    endPoint: number;
    startTime: number;
    endTime: number;
    price: number;
    currency: string;
    status: string;
    devices: any[]; // Replace any with appropriate type
    transport: any; // Replace any with appropriate type
    driver: any; // Replace any with appropriate type
    value: any; // Replace any with appropriate type
    name: string;
    payment: any[]; // Replace any with appropriate type
}

interface Budget {
    value: number;
    currency: string;
}

export interface OrderType {
    order_id: number;
    order_number: number;
    departure_date: number;
    arrival_date: number;
    cargo_details_list: CargoDetails[];
    cargo_condition: CargoCondition;
    checkpoints: Checkpoint[];
    // status: string;
    client_name: string;
    marketplaceType: string;
    incoterm_type: string;
    loading_type: string;
    unloading_type: string;
    payment_condition: PaymentCondition[];
    blacklist_companies: any[]; // Replace any with appropriate type
    users_access: UserAccess[];
    sender: Company;
    receiver: Company;
    budget: Budget;
    transport_info: TransportInfo[];
    transactions: any[]; // Replace any with appropriate type

    // Additional fields
    pickupAddress: string;
    dropOffAddress: string;
    timeStart: string;
    timeEnd: string;
    price: number;
    status: string;
    volume: number;
    packageType: string;
    weight: number;
    distance: number;
}