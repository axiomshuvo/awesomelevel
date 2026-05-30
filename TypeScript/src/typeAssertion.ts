// Type Assertion হলো একটি TypeScript ফিচার যা ডেভেলপারদের একটি ভেরিয়েবলকে একটি নির্দিষ্ট টাইপ হিসেবে বিবেচনা করার অনুমতি দেয়,
//  যদিও TypeScript কম্পাইলার সেই টাইপটি নিশ্চিত করতে পারে না।
// এটি সাধারণত ব্যবহৃত হয় যখন ডেভেলপার জানেন যে একটি ভেরিয়েবল একটি নির্দিষ্ট টাইপ ধারণ করবে,
// কিন্তু TypeScript কম্পাইলার সেই তথ্যটি বুঝতে পারে না।

let anything: any;

anything = 42; // No error, 'anything' can be reassigned to any type

(anything as number).toFixed(2); // Type assertion to treat 'anything' as a number

const kgtoGm = (input: number | string): number | string | undefined => {
  if (typeof input === "number") {
    return input * 1000;
  } else if (typeof input === "string") {
    const [value] = input.split(" ");
    return ` Converting string to number: ${Number(value) * 1000}`;
  }
};

const result1 = kgtoGm(2) as number; // 2000
const result2 = kgtoGm("2.5 kg") as string; // " Converting string to number: 2500"

console.log(result1);
console.log(result2);
