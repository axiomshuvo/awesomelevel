//? array

let bazarList: string[] = ["rice", "dal", "oil", "salt", "sugar"];

bazarList.push(true); // error কারন bazarList এর type string[] অর্থাৎ bazarList এ শুধুমাত্র string type এর value গুলোই রাখা যাবে। কিন্তু এখানে আমরা boolean type এর value push করতে চাচ্ছি, তাই TypeScript error দেখাবে।

let mixedArr = ["hello", 42, true];
// implicitly জেনে  যাচ্ছে typescript যে mixedArr এর type (string | number | boolean)[]
//  অর্থাৎ mixedArr এ string, number, এবং boolean type এর value গুলো রাখা যাবে।

mixedArr.push(12);
// error কারন mixedArr এর type (string | number | boolean)
// অর্থাৎ mixedArr এ string, number, এবং boolean type এর value গুলো রাখা যাবে।
// কিন্তু এখানে আমরা number type এর value push করতে চাচ্ছি, তাই TypeScript error দেখাবে।

//? Tuple

let coordinates: [number, number] = [20, 20, 50];
// error কারন coordinates এর type [number, number]
// অর্থাৎ coordinates এ শুধুমাত্র দুইটা number type এর value রাখা যাবে।
// কিন্তু এখানে আমরা তিনটা number type এর value রাখার চেষ্টা করছি, তাই TypeScript error দেখাবে।

let nameAndAge: [string, number] = ["Alice", 30];
// এখানে nameAndAge এর type [string, number]
// অর্থাৎ nameAndAge এ প্রথমে string type এর value এবং তারপর number type এর value রাখা যাবে।

nameAndAge[0] = 42;
// error কারন nameAndAge এর type [string, number]
// অর্থাৎ nameAndAge এ প্রথমে string type এর value এবং তারপর number type এর value রাখা যাবে।
// কিন্তু এখানে আমরা প্রথমে number type এর value রাখার চেষ্টা করছি, তাই TypeScript error দেখাবে।

//? Object

const person: { name: string; age: number; address: string } = {
  name: "Alice",
  age: 30,
  address: "dhaka",
};
// এখানে person এর type { name: string; age: number; address: string }

const person2: { name: string; age: number; address: string } = {
  name: "Bob",
  age: 25,
};
// required property address টি বাদ দেওয়া হয়েছে, তাই TypeScript error দেখাবে।
// কারণ person2 এর type { name: string; age: number; address: string }
//  অর্থাৎ person2 এ name, age, এবং address property গুলো থাকা উচিত।
// কিন্তু এখানে আমরা address property টি বাদ দিয়েছি, তাই TypeScript error দেখাবে।

const person3: { name: string; age: number; address?: string } = {
  name: "aritra",
  age: 20,
};

//! এইখানে address property টি optional করা হয়েছে, তাই person3 এর type { name: string; age: number; address?: string }
//! অর্থাৎ person3 এ name এবং age property গুলো থাকা উচিত, কিন্তু address property টি থাকা বাধ্যতামূলক নয়।
//! তাই এখানে আমরা address property টি বাদ দিয়েছি, কিন্তু TypeScript error দেখাবে না।

person3.age = 21;
// এখানে person3 এর age property তে নতুন value 21 assign করা হয়েছে, যা number type এর value।
console.log(person3.age); // এখানে person3 এর age property এর value 21 হবে, তাই console এ 21 print হবে।

const user: {
  organization: "OpenAI"; // এইটাকে literal type বলা হয়, অর্থাৎ organization property এর value "OpenAI" হতে হবে।
  role: string;
  experience: number;
} = {
  organization: "OpenAI",
  role: "AI Researcher",
  experience: 5,
};

// এখানে user এর type { organization: "OpenAI"; role: string; experience: number }
// অর্থাৎ user এ organization property এর value "OpenAI" হতে হবে,
//  role property এর value string type হতে হবে, এবং experience property এর value number type হতে হবে।

user.organization = "Google";
// error কারন user এর organization property এর type "OpenAI"
// অর্থাৎ user এর organization property এর value "OpenAI" হতে হবে।
// কিন্তু এখানে আমরা organization property তে "Google" assign করতে চাচ্ছি, তাই TypeScript error দেখাবে।

const user2: {
  readonly organization: string;
  role: string;
  experience: number;
} = {
  organization: "Google",
  role: "Software Engineer",
  experience: 3,
};

user2.organization = "OpenAI";
// error কারন user2 এর organization property তে readonly modifier ব্যবহার করা হয়েছে,
//  অর্থাৎ organization property তে একবার value assign করার পরে তা পরিবর্তন করা যাবে না।
// কিন্তু এখানে আমরা organization property তে "OpenAI" assign করতে চাচ্ছি, তাই TypeScript error দেখাবে।

const user: {
  organization: "OpenAI" | "Google";
  // এইটাকে union type বলা হয়, অর্থাৎ organization property এর value "OpenAI" অথবা "Google" হতে পারে।
  role: string;
  experience: number;
} = {
  organization: "OpenAI",
  role: "AI Researcher",
  experience: 5,
};
