
import { CreateOrderInputModel, IOrderRepository, OrderViewModel } from '../Contracts/repository/IOrderRepository';
import { ApplicationViewModel } from '../Contracts/viewModel/ApplicationViewModel';

export class OrderService {
  private notifications: string[] = [];

  constructor(private orderRepository: IOrderRepository) {}

  async createOrder(data: CreateOrderInputModel): Promise<ApplicationViewModel> {
    !data.shippingAddress.ToEntity().IsValid() && data.shippingAddress.ToEntity().notifications.map(notification => {
        this.notifications.push(notification)
    }) 

    data.products.map(product => {
        !product.ToEntity().IsValid() && product.ToEntity().notifications.map(notification => {
            this.notifications.push(notification)
        }) 

        product.itemAditionals?.map(aditional => {
            !aditional.ToEntity().IsValid() && aditional.ToEntity().notifications.map(notification => {
                this.notifications.push(notification)
            }) 
        })
    })  

    !data.ToEntity().IsValid() && data.ToEntity().notifications.map(notification => {
        this.notifications.push(notification)
    }) 

    if (this.notifications.length > 0) {
      return new ApplicationViewModel({ errors: this.notifications, message: 'error', data: null });
    }

    await this.orderRepository.CreateOrder(data);

    return new ApplicationViewModel({ errors: null, message: 'success', data });
  }

  async getAllOrders(): Promise<ApplicationViewModel<OrderViewModel[]>> {
    const orders = await this.orderRepository.GetAllOrders();

    return new ApplicationViewModel({ errors: null, message: 'success', data: orders });
  }

  async getOrderById(id: string): Promise<ApplicationViewModel<OrderViewModel | null>> {
    const order = await this.orderRepository.GetOrderById(id);

    if (!order) {
      return new ApplicationViewModel({ errors: [`Não existe pedido cadastrado com o id: ${id}`], message: 'error', data: null });
    }

    return new ApplicationViewModel({ errors: null, message: 'success', data: order });
  }

  async getOrderStatusById(id: string): Promise<ApplicationViewModel> {
    const order = await this.orderRepository.GetOrderById(id);

    if (!order) {
      return new ApplicationViewModel({ errors: [`Não existe pedido cadastrado com o id: ${id}`], message: 'error', data: null });
    }

    return new ApplicationViewModel({ errors: null, message: 'success', data: order.status });
  }

  async getAllOrdersByClientId(clientId: string): Promise<ApplicationViewModel<OrderViewModel[]>> {
    const orders = await this.orderRepository.GetAllOrdersByClientId(clientId);

    return new ApplicationViewModel({ errors: null, message: 'success', data: orders });
  }

  async updateOrderStatus(id: string, status: 'preparing' | 'sent' | 'delivered'): Promise<ApplicationViewModel> {
    const order = await this.orderRepository.GetOrderById(id);

    if (!order) {
      return new ApplicationViewModel({ errors: [`Não existe pedido cadastrado com o id: ${id}`], message: 'error', data: null });
    }

    await this.orderRepository.UpdateOrderStatus(id, status, this.getDate());

    return new ApplicationViewModel({ errors: null, message: 'success', data: `Status do pedido ${id} atualizado para ${status}` });
  }

  private getDate() {
    const dataHoraUTC = new Date();
    const dataHoraBrasil = new Date(dataHoraUTC.getTime());

    return dataHoraBrasil.toLocaleString('pt-BR').toString().replace(", ", " - ");
}
}
