// utilities.ts

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  color?: string;
};

// type ProductSummary = {
//   id: number;
//   name: string;
//   price: number;
// };

type ProductSummary = Pick<Product, "id" | "name" | "price">;
// এখানে আমরা Pick utility type ব্যবহার করে Product type থেকে
// শুধুমাত্র id, name, এবং price property গুলোকে নিয়ে একটি নতুন type ProductSummary তৈরি করেছি।

//@ Omit utility type ব্যবহার করে আপনি কোনো existing type থেকে নির্দিষ্ট কিছু property remove করে নতুন type তৈরি করতে পারি।

type ProductWithoutStock = Omit<Product, "stock">;
// এখানে আমরা Omit utility type ব্যবহার করে Product type থেকে stock property কে remove করে একটি নতুন type ProductWithoutStock তৈরি করেছি।

//@ required type utility type ব্যবহার করে আপনি একটি existing type এর সব property কে required করতে পারেন।

type ProductWithColor = Required<Product>;
// এখানে আমরা Required utility type ব্যবহার করে Product type এর সব property কে required করেছি,
// যার ফলে color property এখন required হয়ে গেছে।

//@ Partial utility type ব্যবহার করে আপনি একটি existing type এর সব property কে optional করতে পারেন।

type PartialProduct = Partial<Product>;
// এখানে আমরা Partial utility type ব্যবহার করে Product type এর সব property কে optional করেছি,
// যার ফলে এখন Product type এর সব property optional হয়ে গেছে।
// 🧠 Important insight

//@ Readonly utility type ব্যবহার করে আপনি একটি existing type এর সব property কে readonly করতে পারেন।

type ReadonlyProduct = Readonly<Product>;
// এখানে আমরা Readonly utility type ব্যবহার করে Product type এর সব property কে readonly করেছি,
// যার ফলে এখন Product type এর সব property readonly হয়ে গেছে।
// 🧠 Important insight
// এটি শুধু property reassign করা বন্ধ করে
// কিন্তু nested object গুলোকে fully freeze করে না

// @ Record utility type ব্যবহার করে আপনি একটি type এর keys এবং values কে define করতে পারেন।

type ProductRecord = Record<string, Product>;
// এখানে আমরা Record utility type ব্যবহার করে একটি নতুন type ProductRecord তৈরি করেছি,
// যার keys string type এবং values Product type।
// এখন আমরা ProductRecord type এর object তৈরি করতে পারি যেখানে keys string এবং values Product type হবে।

const products: ProductRecord = {
  product1: { id: 1, name: "Product 1", price: 100, stock: 10 },
  product2: { id: 2, name: "Product 2", price: 200, stock: 20 },
};
// এখানে আমরা ProductRecord type এর একটি object তৈরি করেছি যার keys string এবং values Product type।
// এখন আমরা products object এ product1 এবং product2 নামে দুইটি product store করেছি।
