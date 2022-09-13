import { Timestamp } from "firebase/firestore";

export interface CartInterface {
    id: string;
    food: string;
    food_id: string;
    image_url: string;
    image_path: string;
    price: string;
    quantity: number;
    user_id: string | undefined;
    created_at: Timestamp;
}


export interface OrderInterface{
    id: string;
    customer: string;
    date: Timestamp;
    email: string;
    foods: any;
    price: string;
    status: boolean;
    table: string;
}

export interface OrderTableInterface {
    data: OrderInterface[];
}