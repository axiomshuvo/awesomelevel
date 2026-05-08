//  ? ternary operator

// TypeScript এ আমরা ternary operator ব্যবহার করতে পারি একটি condition এর উপর ভিত্তি করে value assign করার জন্য।
// এটি একটি shorthand way যা if-else statement এর বিকল্প হিসেবে ব্যবহৃত হয়।

const isEligibleToMarriage = (age: number) =>
  age >= 21
    ? "You are eligible to marriage."
    : "You are not eligible to marriage.";

isEligibleToMarriage(25); // You are eligible to marriage.
isEligibleToMarriage(18); // You are not eligible to marriage.

// if (userAge >= 21) {
//   console.log("You are eligible to marriage.");
// }

// ?? : nullish coalescing operator

// TypeScript এ nullish coalescing operator (??) ব্যবহার করা হয়
// একটি expression এর value null বা undefined হলে একটি default value assign করার জন্য।
// এটি logical OR operator (||) এর মত কাজ করে, তবে এটি শুধুমাত্র null এবং
//  undefined values এর জন্য কাজ করে, false, 0, বা "" এর জন্য নয়।

const userTheme = "dark";
const defaultTheme = "light";

const currentTheme = userTheme ?? defaultTheme; // dark
// এখানে currentTheme এর value হবে userTheme এর value যদি তা null বা undefined না হয়, অন্যথায় defaultTheme এর value হবে।

// ?. : optional chaining operator

// TypeScript এ optional chaining operator (?.) ব্যবহার করা হয়
// একটি object এর property বা method access করার সময় যদি object null বা undefined হয়,
// তাহলে এটি error throw না করে undefined return করে।
// এটি code কে আরও concise এবং safe করে তোলে, কারণ আমরা explicit null checks না করেই nested properties access করতে পারি।

const user: {
  name: string;
  age: number;
  address?: {
    city: string;
    country: string;
  };
} = {
  name: "Alice",
  age: 30,
};

const userCity = user.address?.city; // undefined
// এখানে userCity এর value হবে user.address.city যদি user.address null বা undefined না হয়, অন্যথায় undefined হবে।
