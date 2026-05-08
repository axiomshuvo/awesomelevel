// Type Alias in TypeScript

// Type Alias হল একটি feature যা TypeScript এ ব্যবহার করা হয় একটি নতুন type তৈরি করার জন্য।
// এটি একটি existing type এর alias বা nickname হিসেবে কাজ করে।
// Type Alias ব্যবহার করে আমরা একটি complex type কে একটি simple name দিয়ে refer করতে পারি,
// যা code readability এবং maintainability উন্নত করে।
// Type Alias তৈরি করার জন্য আমরা type keyword ব্যবহার করি, followed by the name of the alias and the type definition.

const user: {
  name: string;
  age: number;
  email: string;
  gender?: string; // optional property
} = {
  name: "Aritra Sarker",
  age: 25,
  email: "aritra.sarker@example.com",
  gender: "male",
};

// এখানে user এর type { name: string; age: number; email: string }
// অর্থাৎ user এ name property এর value string type হতে হবে,
// age property এর value number type হতে হবে, এবং email property এর value string type হতে হবে।

//@ এখন আমরা এই complex type কে একটি simple name দিয়ে refer করতে চাই, তাহলে আমরা Type Alias ব্যবহার করতে পারি।
type person = {
  name: string;
  age: number;
  email: string;
  gender?: "male" | "female"; // union type for gender
  address: {
    division: string;
    city: string;
  };
};

//# এখন আমরা person type কে ব্যবহার করে একটি variable declare করতে পারি।
const user1: person = {
  name: "Aritra Sarker",
  age: 25,
  email: "aritra.sarker@example.com",
  gender: "male",
  address: {
    division: "Dhaka",
    city: "Dhaka",
  },
};
// এখানে user1 এর type person, যা আমরা Type Alias হিসেবে declare করেছি।
// এখন আমরা person type কে ব্যবহার করে আরও variables declare করতে পারি,
// যা code readability এবং maintainability উন্নত করে।

//@ boolean type এর জন্য আমরা একটি Type Alias তৈরি করতে পারি।
type isActive = boolean;

const user2: isActive = true;
// এখানে user2 এর type isActive, যা boolean type এর alias হিসেবে কাজ করে।
// এখন আমরা isActive type কে ব্যবহার করে আরও variables declare করতে পারি,
// যা code readability এবং maintainability উন্নত করে।

//@ Type Alias এর মাধ্যমে আমরা function type ও declare করতে পারি।
type greetFunction = (name: string) => string;

const greet: greetFunction = (name) => {
  return `Hello, ${name}!`;
};
// এখানে greet এর type greetFunction, যা একটি function type এর alias হিসেবে কাজ করে।
// এখন আমরা greetFunction type কে ব্যবহার করে আরও functions declare করতে পারি,
// যা code readability এবং maintainability উন্নত করে।

type addFunction = (a: number, b: number) => number;

const add: addFunction = (a, b) => {
  return a + b;
};
// এখানে add এর type addFunction, যা একটি function type এর alias হিসেবে কাজ করে।
// এখন আমরা addFunction type কে ব্যবহার করে আরও functions declare করতে পারি,
// যা code readability এবং maintainability উন্নত করে।

//@ Type Alias এর মাধ্যমে আমরা union type ও declare করতে পারি।
type status = "active" | "inactive" | "pending";

const userStatus: status = "active";
// এখানে userStatus এর type status, যা একটি union type এর alias হিসেবে কাজ করে।
// এখন আমরা status type কে ব্যবহার করে আরও variables declare করতে পারি,
// যা code readability এবং maintainability উন্নত করে।

//@ Type Alias এর মাধ্যমে আমরা intersection type ও declare করতে পারি।
type employee = {
  name: string;
  age: number;
};

type manager = {
  department: string;
};

type employeeManager = employee & manager;

const empManager: employeeManager = {
  name: "Aritra Sarker",
  age: 25,
  department: "IT",
};
// এখানে empManager এর type employeeManager, যা একটি intersection type এর alias হিসেবে কাজ করে।
// এখন আমরা employeeManager type কে ব্যবহার করে আরও variables declare করতে পারি,
// যা code readability এবং maintainability উন্নত করে।

//@ Type Alias এর মাধ্যমে আমরা generic type ও declare করতে পারি।
type response<T> = {
  data: T;
  error: string | null;
};

const userResponse: response<person> = {
  data: {
    name: "Aritra Sarker",
    age: 25,
    email: "aritra.sarker@example.com",
    gender: "male",
    address: {
      division: "Dhaka",
      city: "Dhaka",
    },
  },
  error: null,
};
// এখানে userResponse এর type response<person>, যা একটি generic type এর alias হিসেবে কাজ করে।
// এখন আমরা response type কে ব্যবহার করে আরও variables declare করতে পারি,
// যা code readability এবং maintainability উন্নত করে।

//@ Type Alias এর মাধ্যমে আমরা recursive type ও declare করতে পারি।
type treeNode = {
  value: number;
  left?: treeNode;
  right?: treeNode;
};

const rootNode: treeNode = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    },
    right: {
      value: 5,
    },
  },
  right: {
    value: 3,
  },
};
// এখানে rootNode এর type treeNode, যা একটি recursive type এর alias হিসেবে কাজ করে।
// এখন আমরা treeNode type কে ব্যবহার করে আরও variables declare করতে পারি,
// যা code readability এবং maintainability উন্নত করে।
