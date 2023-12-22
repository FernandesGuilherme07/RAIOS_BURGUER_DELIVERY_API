import { Request, Response } from "express";
import { AditionalServiceContainer } from "../Container";
import { CreateAditionalInputModel } from "../../core/Contracts/inputModel/CreateAditionalInputModel";
import { UpdateAditionalInputModel } from "../../core/Contracts/inputModel/UpdateAditionalInputModel";

export class AditionalController {
  private aditionalService = AditionalServiceContainer;

  async getAllAditionals(req: Request, res: Response): Promise<void> {
    try {
      const aditionals = await this.aditionalService.getAllAditionals();
      res.status(200).json(aditionals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAditionalById(req: Request, res: Response): Promise<void> {
    try {
      const aditionalId = req.params.id;
      const response = await this.aditionalService.getAditionalById(aditionalId);
      res.status(response.message === 'error' ? 400 : 200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createAditional(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price }: CreateAditionalInputModel = req.body;

      const createAditionalInputModel = new CreateAditionalInputModel(name, description, price);

      const response = await this.aditionalService.createAditional(createAditionalInputModel);

      res.status(response.message === 'error' ? 400 : 201).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateAditional(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, description, price }: UpdateAditionalInputModel = req.body;

      const updateAditionalInputModel = new UpdateAditionalInputModel(id, name, description, price);

      const response = await this.aditionalService.updateAditional(updateAditionalInputModel);

      res.status(response.message === 'error' ? 400 : 200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteAditional(req: Request, res: Response): Promise<void> {
    try {
      const aditionalId = req.params.id;
      const response = await this.aditionalService.deleteAditional(aditionalId);

      res.status(response.message === 'error' ? 400 : 200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
