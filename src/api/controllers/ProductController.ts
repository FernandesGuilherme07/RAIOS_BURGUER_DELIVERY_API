import { Request, Response } from "express";

import { CreateProductInputModel } from "../../core/Contracts/inputModel/CreateProductInputModel";
import { UpdateProductInputModel } from "../../core/Contracts/inputModel/UpdateProductInputModel";
import { ProductServiceContainer } from "../Container";

interface IProductData {
  id: string;
  name: string,
  description: string,
  category: string,
  price: number,
  imgUrl: string,
}

export class ProductController {
    private productService = ProductServiceContainer

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const response = await this.productService.getProductById(productId);
      if(response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { description, imgUrl, name, price, category}: IProductData = req.body;
  
      const createProductInputModel = new CreateProductInputModel(name, description, price, category, imgUrl)

      const response =  await this.productService.createProduct(createProductInputModel);

      if(response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(201).json(response);
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      
      const {id, description, imgUrl, name, price, category}: IProductData = req.body;
      
      const updateProductInputModel = new UpdateProductInputModel(id, name, description, price, category, imgUrl)
      const response = await this.productService.updateProduct(updateProductInputModel);
      
      if(response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const response = await this.productService.deleteProduct(productId);

      if(response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}