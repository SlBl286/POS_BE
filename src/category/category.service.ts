import { db } from "../utils/db.server";

type Category = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
};
export const listCategory = async (): Promise<Category[]> => {
  return db.category.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
    },
  });
};
export const getCategory = async (id: number): Promise<Category | null> => {
  const category = db.category.findUnique({
    where: {
      id,
    },
  });
  return category;
};

export const createCategory = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const { name } = category;
  return db.category.create({
    data: {
      name,
    },
  });
};
export const updateCategory = async (
  category: Omit<Category, "id">,
  id: number
): Promise<Category> => {
  const { name } = category;
  return db.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
};
export const deleteCategory = async (id: number): Promise<void> => {
  db.category.delete({
    where: {
      id,
    },
  });
};
