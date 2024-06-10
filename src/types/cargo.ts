export interface CargoType {
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