// Nullable Types

const getUser = (input: string | null) => {
  if (input) {
    console.log(`User input: ${input}`);
  } else {
    console.log("No user input provided.");
  }
};

getUser("Hello, TypeScript!"); // Output: User input: Hello, TypeScript!
getUser(""); // Output: No user input provided.
getUser(null); // Output: No user input provided.
getUser(undefined); // Output: No user input provided.

// এখানে getUser ফাংশনটি একটি string টাইপের input গ্রহণ করে এবং যদি input থাকে তবে তা console এ প্রিন্ট করে,
// অন্যথায় একটি বার্তা প্রিন্ট করে যে কোন user input প্রদান করা হয়নি।
// আমরা এই ফাংশনটিতে null এবং undefined মানও পাঠাতে পারি,
//  এবং এটি সঠিকভাবে কাজ করবে কারণ আমরা input এর truthiness পরীক্ষা করছি।

// unknown Type

let userInput: unknown;

userInput = "Hello, TypeScript!";
console.log(userInput); // Output: Hello, TypeScript!
userInput = 42;
console.log(userInput); // Output: 42
userInput = { name: "Alice", age: 30 };
console.log(userInput); // Output: { name: 'Alice', age: 30 }

// এখানে userInput একটি unknown টাইপের ভেরিয়েবল যা বিভিন্ন ধরনের মান গ্রহণ করতে পারে।
// আমরা এটি string, number, এবং object হিসাবে সেট করেছি এবং প্রতিটি সময় এটি console এ প্রিন্ট করেছি।
// unknown টাইপটি TypeScript এ একটি নিরাপদ টাইপ যা আমাদেরকে বিভিন্ন ধরনের মান গ্রহণ করতে দেয়,
// তবে আমরা যখন এটি ব্যবহার করি তখন আমাদেরকে অবশ্যই এটি সঠিকভাবে টাইপ কাস্ট করতে হবে যদি আমরা এর সাথে কাজ করতে চাই।

const discountedPrice = (price: unknown) => {
  if (typeof price === "number") {
    return price * 0.9; // 10% discount
  } else if (typeof price === "string") {
    const [numericPart] = price.split(" ");
    return Number(numericPart) * 0.9; // 10% discount
  } else {
    throw new Error("Invalid price format");
  }
};

console.log(discountedPrice(100)); // Output: 90
console.log(discountedPrice("100 USD")); // Output: 90
console.log(discountedPrice(true)); // Throws an error: Invalid price format
// এখানে discountedPrice ফাংশনটি একটি unknown টাইপের price গ্রহণ করে এবং এটি price এর টাইপ পরীক্ষা করে।
// যদি price একটি number হয়, তবে এটি 10% ডিসকাউন্ট প্রয়োগ করে এবং ফলাফল রিটার্ন করে।
// যদি price একটি string হয়, তবে এটি প্রথম অংশটি numeric অংশ হিসাবে গ্রহণ করে এবং তার উপর 10% ডিসকাউন্ট প্রয়োগ করে।
// অন্যথায়, এটি একটি ত্রুটি ছুড়ে দেয় যে price ফরম্যাট অবৈধ।
// এই উদাহরণটি দেখায় কিভাবে আমরা unknown টাইপের সাথে কাজ করতে পারি এবং এটি ব্যবহার করার সময় টাইপ পরীক্ষা করতে পারি।

// Never Type

const throwEror = (msg: string): never => {
  throw new Error(msg);
};

throwEror("This is an error message!"); // Throws an error: This is an error message!
// এখানে throwEror ফাংশনটি একটি string টাইপের msg গ্রহণ করে এবং এটি একটি ত্রুটি ছুড়ে দেয়।
// এই ফাংশনটির রিটার্ন টাইপ never, যা নির্দেশ করে যে এই ফাংশনটি কখনই সফলভাবে সম্পন্ন হবে না এবং এটি একটি ত্রুটি ছুড়ে দেয় বা অনন্ত লুপে চলে যাবে।
// যখন আমরা throwEror ফাংশনটি কল করি, তখন এটি একটি ত্রুটি ছুড়ে দেয় এবং প্রোগ্রামটি বন্ধ হয়ে যায়।
