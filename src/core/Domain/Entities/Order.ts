import { Address } from "./Address";
import { CartItem } from "./CartItem";
import Entity from "./Entity";

export class Order extends Entity {
    readonly status: "preparing" | "sent" | "delivered"  = "preparing";
    readonly orderDate: string = this.getDate();
    readonly clientId: string;
    readonly shippingAddress: Address;
    readonly shippingPrice: number;
    readonly paymentType: "money" | "card" | "pix";
    readonly readonlypaymentChange?: number;
    readonly cupom?: string;
    readonly cupomDiscount?: number;
    readonly products: CartItem[];
    readonly subtotal: number;
    readonly total: number;
    outToDeliveryDateTime?: string | null = null;
    dateTimeOrderDelivered?: string | null = null;
    

    constructor(
        clientId: string,
        shippingAddress: Address,
        shippingPrice: number,
        paymentType: "money" | "card" | "pix",
        products: CartItem[],
        readonlypaymentChange?: number,
        cupom?: string,
        cupomDiscount?: number
    ) {

        super()
        this.clientId = clientId
        this.shippingAddress = shippingAddress
        this.shippingPrice = shippingPrice
        this.paymentType = paymentType
        this.readonlypaymentChange = readonlypaymentChange
        this.cupom = cupom
        this.cupomDiscount = cupomDiscount
        this.products = products
        this.subtotal = this.CalculateOrderSubTotal(products);
        this.total = this.calculatePriceOrderTotal(products, shippingPrice, cupomDiscount);

        this.validateOrderData(
            clientId, 
            shippingAddress, 
            shippingPrice, 
            paymentType, 
            products
            )
    }

    validateOrderData(
        clientId: string,
        shippingAddress: Address,
        shippingPrice: number,
        paymentType: "money" | "card" | "pix",
        products: CartItem[],
    ) {
        this.IsRequired(clientId, "Id do usuário que fez o pedido é requerido.")
        this.IsRequired(shippingAddress, "Endereço de entrega do pedido é requerido.")
        this.IsRequired(shippingPrice, "preço de entrega do pedido é requerido.")
        this.IsRequired(paymentType, "Tipo de pagamento do pedido é requerido.")
        this.IsRequired(products, "Produtos são necessários para fazer um pedido.")
    }

    private calculatePriceOrderTotal(
        products: CartItem[], 
        shippingPrice: number,
        cupomDiscount?: number
        ): number {

        let total: number = this.CalculateOrderSubTotal(products) + shippingPrice;

        if (cupomDiscount && cupomDiscount > 0) {
            total -= cupomDiscount;
        }

        return total
    }

    private CalculateOrderSubTotal(products: CartItem[]): number {
        return products.reduce((total, product) => {
            const productPrice = product.price * product.quantity;

            const productWithAdditionalsPrice = product.itemAditionals
                ? product.itemAditionals.reduce((subtotal, additional) => subtotal + additional.price, productPrice)
                : productPrice;

            return total + productWithAdditionalsPrice;
        }, 0);
    }

    private getDate() {
        const dataHoraUTC = new Date();
        const dataHoraBrasil = new Date(dataHoraUTC.getTime());

        return dataHoraBrasil.toLocaleString('pt-BR').toString().replace(", ", " - ");
    }
}