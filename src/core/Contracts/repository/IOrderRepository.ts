import { CartItem } from "../../Domain/Entities/CartItem";
import { ItemAditionals } from "../../Domain/Entities/ItemAditionals";
import { Order } from "../../Domain/Entities/Order";
import { CreateAddressInputModel } from "../inputModel/CreateAddressInputModel";
import { AddressViewModel } from "../viewModel/AddressViewModel"

export class CreateOrderInputModel {
    clientId: string;
    shippingAddress: CreateAddressInputModel;
    shippingPrice: number;
    paymentType: "money" | "card" | "pix";
    products: CartItemInputModel[];
    readonlypaymentChange?: number;
    cupom?: string;
    cupomDiscount?: number;

    constructor(
        clientId: string,
        shippingAddress: CreateAddressInputModel,
        shippingPrice: number,
        paymentType: "money" | "card" | "pix",
        products: CartItemInputModel[],
        readonlypaymentChange: number,
        cupom: string,
        cupomDiscount: number
    ) {
        this.clientId = clientId
        this.shippingAddress = shippingAddress
        this.shippingPrice = shippingPrice
        this.paymentType = paymentType
        this.products = products
        this.readonlypaymentChange = readonlypaymentChange
        this.cupom = cupom
        this.cupomDiscount = cupomDiscount
    }

    ToEntity(): Order {
        return new Order(
            this.clientId,
            this.shippingAddress.ToEntity(),
            this.shippingPrice,
            this.paymentType,
            this.products.map(product => product.ToEntity()),
            this.readonlypaymentChange,
            this.cupom,
            this.cupomDiscount
        )
    }
}

export class AditionalInputModel {
    name: string;
    quantity: number;
    price: number;

    constructor(name: string, quantity: number, price: number) {
        this.name = name
        this.quantity = quantity
        this.price = price
    }

    ToEntity(): ItemAditionals {
        return new ItemAditionals(this.name, this.price, this.quantity)
    }
}

export class CartItemInputModel {
    name: string;
    price: number;
    quantity: number;
    itemAditionals?: AditionalInputModel[];

    constructor(
        name: string,
        price: number,
        quantity: number,
        itemAditionals: AditionalInputModel[]
    ) {
        this.name = name
        this.price = price
        this.quantity = quantity
        this.itemAditionals = itemAditionals
    }

    ToEntity(): CartItem {
        return new CartItem(this.name, this.price, this.quantity, this.itemAditionals?.map(aditional => aditional.ToEntity()))
    }
}

export type ItemAditionalViewModel = {
    _id: string,
    name: string,
    price: number,
    quantity: number,

}

export type CartItemViewModel = {
    _id: string,
    name: string,
    price: number,
    quantity: number,
    itemAditionals?: ItemAditionalViewModel[]
}

export type OrderViewModel = {
    _id: string,
    status: "preparing" | "sent" | "delivered",
    orderDate: string,
    clientId: string,
    shippingAddress: AddressViewModel,
    shippingPrice: number,
    paymentType: "money" | "card" | "pix",
    products: CartItemViewModel[],
    readonlypaymentChange?: number,
    cupom?: string,
    cupomDiscount?: number
}

export interface IOrderRepository {
    CreateOrder(data: CreateOrderInputModel): Promise<void>;
    GetAllOrders(): Promise<OrderViewModel[]>;
    GetOrderById(id: string): Promise<OrderViewModel | null>;
    GetAllOrdersByClientId(clientId: string): Promise<OrderViewModel[]>;
    UpdateOrderStatus(id: string, status: "preparing" | "sent" | "delivered", date: string): Promise<void>
}