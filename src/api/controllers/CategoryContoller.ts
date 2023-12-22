import { Request, Response } from "express";
import { CategoryServiceConatiner } from "../Container";

interface ICategoryData {
  name: string;
}

export class CategoryController {
  private categoryService = CategoryServiceConatiner;


  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json( categories );
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = req.params.id;
      const response = await this.categoryService.getCategoryById(categoryId);

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name }: ICategoryData = req.body;

      const response = await this.categoryService.createCategory({name});

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(201).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = req.params.id;
     const response =  await this.categoryService.deleteCategory(categoryId);

     if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
