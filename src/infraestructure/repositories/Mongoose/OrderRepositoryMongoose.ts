import { CreateOrderInputModel, IOrderRepository, OrderViewModel } from "../../../core/Contracts/repository/IOrderRepository";
import OrderModel from "../../models/OrderModel";

export class MongooseOrderRepository implements IOrderRepository {
    async CreateOrder(data: CreateOrderInputModel): Promise<void> {
      await OrderModel.create(data.ToEntity());
    }
  
    async GetAllOrders(): Promise<OrderViewModel[]> {
      const orders = await OrderModel.find().lean();
      return orders.map((order) => this.mapToViewModel(order));
    }
  
    async GetOrderById(id: string): Promise<OrderViewModel | null> {
      const order = await OrderModel.findById(id).lean();
      return order ? this.mapToViewModel(order) : null;
    }
  
    async GetAllOrdersByClientId(clientId: string): Promise<OrderViewModel[]> {
      const orders = await OrderModel.find({ clientId }).lean();
      return orders.map((order) => this.mapToViewModel(order));
    }
  
    async UpdateOrderStatus(id: string, status: 'preparing' | 'sent' | 'delivered', date: string): Promise<void> {

      if(status === "sent") {
        await OrderModel.findByIdAndUpdate(id, { status, outToDeliveryDateTime: date});
      } else {
        await OrderModel.findByIdAndUpdate(id, { status, dateTimeOrderDelivered: date});

      }
    }
  
    private mapToViewModel(data: any): OrderViewModel {
      return {
        _id: data._id,
        status: data.status,
        orderDate: data.orderDate,
        clientId: data.clientId,
        shippingAddress: data.shippingAddress,
        shippingPrice: data.shippingPrice,
        paymentType: data.paymentType,
        products: data.products,
        readonlypaymentChange: data.readonlypaymentChange,
        cupom: data.cupom,
        cupomDiscount: data.cupomDiscount,
      };
    }
  }