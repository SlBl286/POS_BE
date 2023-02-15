import type { Request, Response } from "express";
import express from "express";
import { body, validationResult } from "express-validator";
import * as CategoryService from "./category.service";

export const CategoryRouter = express.Router();

CategoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await CategoryService.listCategory();
    return res.status(200).json(categories);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

CategoryRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const category = await CategoryService.getCategory(id);
    if (category) {
      return res.status(200).json(category);
    }
    return res.status(404).json("Category not found");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

CategoryRouter.post(
  "/",
  body("name").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const category = req.body;
      const newCategory = await CategoryService.createCategory(category);
      return res.status(201).json(newCategory);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
);
CategoryRouter.put(
  "/:id",
  body("name").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(req.params.id, 10);
    try {
      const category = req.body;
      const updatedCategory = await CategoryService.updateCategory(
        category,
        id
      );
      return res.status(200).json(updatedCategory);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
);

CategoryRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await CategoryService.deleteCategory(id);
    return res.status(204).json("Deleted");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
