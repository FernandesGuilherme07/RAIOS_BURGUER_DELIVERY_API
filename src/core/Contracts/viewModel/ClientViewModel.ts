import { AddressViewModel } from "./AddressViewModel";

export type ClientViewModel = {
    _id: string;
    rule: "admin" | "client";
    name: string;
    email: string;
    password: string;
    Addresses?: AddressViewModel[];
    createdAt: Date;
    updatedAt: Date;
}