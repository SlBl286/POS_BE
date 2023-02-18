
import { db } from "../utils/db.server";

type Bill = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
};
export const listCategory = async (): Promise<Bill[]> => {
  return db.category.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
    },
  });
};
export const getCategory = async (id: number): Promise<Bill | null> => {
  const category = db.category.findUnique({
    where: {
      id,
    },
  });
  return category;
};

export const createBill = async (
  category: Omit<Bill, "id">
): Promise<Bill> => {
  const { name } = category;
  return db.category.create({
    data: {
      name,
    },
  });
};
export const updateBill = async (
  category: Omit<Bill, "id">,
  id: number
): Promise<Bill> => {
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
export const deleteBill = async (id: number): Promise<void> => {
  db.category.delete({
    where: {
      id,
    },
  });
};
