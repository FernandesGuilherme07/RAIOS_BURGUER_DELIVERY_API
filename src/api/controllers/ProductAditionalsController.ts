import { Request, Response } from "express";
import { CreateProductAdtionalsInputModel } from "../../core/Contracts/inputModel/CreateProductAdtionalsInputModel";
import { UpdateProductAdtionalsInputModel } from "../../core/Contracts/inputModel/UpdateProductAditionalsInputModel";
import { ProductAditionalsServiceContainer } from "../Container";

interface IProductAditionalsData {
  productId: string;
  aditionalIds: string[];
}

export class ProductAditionalsController {
  private productAditionalsService = ProductAditionalsServiceContainer;

  async getAllProductsWithAditionals(req: Request, res: Response): Promise<void> {
    try {
      const productsAditionals = await this.productAditionalsService.getAllProductsWithAditionals();
      res.status(200).json(productsAditionals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getProductWithAditionalsByProductId(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const response = await this.productAditionalsService.getProductWithAditionalsByProductId(productId);
      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createProductAditionals(req: Request, res: Response): Promise<void> {
    try {
      const { productId, aditionalIds }: IProductAditionalsData = req.body;
      const createProductAditionalsInputModel = new CreateProductAdtionalsInputModel(productId, aditionalIds);

      const response = await this.productAditionalsService.createProductAditionals(createProductAditionalsInputModel);

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(201).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addAditionalsIntoProductAditionalsByProductId(req: Request, res: Response): Promise<void> {
    try {
      const { productId, aditionalIds }: IProductAditionalsData = req.body;
      const updateProductAditionalsInputModel = new UpdateProductAdtionalsInputModel(productId, aditionalIds);

      const response = await this.productAditionalsService.addAditionalsIntoProductAditionalsByProductId(updateProductAditionalsInputModel);

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeProductAditionalsByProductId(req: Request, res: Response): Promise<void> {
    try {
      const { productId, aditionalIds }: IProductAditionalsData = req.body;
      const updateProductAditionalsInputModel = new UpdateProductAdtionalsInputModel(productId, aditionalIds);

      const response = await this.productAditionalsService.removeProductAditionalsByProductId(updateProductAditionalsInputModel);

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteProductAditionalsByProductId(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const response = await this.productAditionalsService.deleteProductAditionalsByProductId(productId);

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
