import path from 'path';
import fs from 'fs/promises';

export type Product = { id: number; title: string; description: string };
type JsonData = { products: Product[] };

export const getProducts = async () => {
  const filePath = path.join(process.cwd(), '..', 'shared', 'backend.json');
  // await delay(2000);
  const jsonData = await fs.readFile(filePath, 'utf-8');

  const data = JSON.parse(jsonData) as JsonData;
  return data.products;
};

export const getProductById = async (productId: string) => {
  if (!productId) return null;
  const id = parseInt(productId);

  const data = await getProducts();

  const product = data.find(p => p.id === id) || null;
  return product;
};

const delay = async (ms: number) => {
  return new Promise(r => setTimeout(r, ms));
};
