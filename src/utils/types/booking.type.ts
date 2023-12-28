import { Showtime } from "./timeshow.type";
import { User } from "./user.type";

export interface Booking {
    // id: string;
    user: String | null;
    fullname: string |null;
    email: string |null;
    number: string | null;
    titleMovie: string;
    bookedAt: string;
    totalPrice: number;
    expiresIn: number;
    paypal_payment_id: string | null
    seat: any[]
    voucher: string | null
    snacks: string | null
    status: string
}

export interface Pay{
    id: String[]
    link: String
}