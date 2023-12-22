import { Request, Response } from "express";
import { OrderServiceContainer } from "../Container";
import { CreateOrderInputModel } from "../../core/Contracts/repository/IOrderRepository";
import { io } from "../app";

export class OrderController {
  private orderService = OrderServiceContainer;


  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderData: CreateOrderInputModel = req.body;
      const result = await this.orderService.createOrder(orderData);

      
      
      io.emit(`createOrder`, result);
      res.status(result.message === "success" ? 201 : 400).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.orderService.getAllOrders();
      res.status(result.message === "success" ? 200 : 400).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.params.id;
      const result = await this.orderService.getOrderById(orderId);
      res.status(result.message === "success" ? 200 : 400).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllOrdersByClientId(req: Request, res: Response): Promise<void> {
    try {
      const clientId = req.params.clientId;
      const result = await this.orderService.getAllOrdersByClientId(clientId);
      res.status(result.message === "success" ? 200 : 400).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.params.id;
      const status = req.body.status as 'preparing' | 'sent' | 'delivered';
      const result = await this.orderService.updateOrderStatus(orderId, status);

      io.emit(`orderStatusUpdate:${orderId}`, result);

      res.status(result.message === "success" ? 200 : 400).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
