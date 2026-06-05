// Constrain মানে কোনো জিনিসকে সীমাবদ্ধ করা। Stric Rules Setup করা।
// TypeScript এ আমরা generic type এর সাথে constraint ব্যবহার করতে পারি,
//  যাতে আমরা নির্দিষ্ট ধরনের data type কে সীমাবদ্ধ করতে পারি।

const addStudent = <T>(student: T): T => {
  return student;
};

const std1 = {
  name: "John Doe",
  id: 12345,
  grade: "A",
};

const std2 = {
  name: "Jane Doe",
  id: 67890,
  grade: "B",
  hasScholarship: true,
};

const res1 = addStudent(std1);
const res2 = addStudent(std2);
// এই ক্ষেত্রে, addStudent ফাংশনটি কোনো ধরনের data type গ্রহণ করতে পারে,

const std3 = {
  grade: "C",
};

const res3 = addStudent(std3); // এই ক্ষেত্রে, std3 তে name এবং id নেই, তাই এটি একটি সমস্যা হতে পারে।
// এই সমস্যা থেকে বাঁচতে আমরা constraint ব্যবহার করতে পারি।

interface Student {
  name: string;
  id: number;
  grade: string;
}

const addConstrainedStudent = <T extends Student>(student: T): T => {
  return student;
};

const res4 = addConstrainedStudent(std1); // এই ক্ষেত্রে, std1 তে name, id এবং grade আছে, তাই এটি কাজ করবে।
const res5 = addConstrainedStudent(std2); // এই ক্ষেত্রে, std2 তে name, id এবং grade আছে, তাই এটি কাজ করবে।
const res6 = addConstrainedStudent(std3); // এই ক্ষেত্রে, std3 তে name এবং id নেই, তাই এটি একটি error হবে।
// এইভাবে, আমরা constraint ব্যবহার করে generic type কে নির্দিষ্ট ধরনের data type এর সাথে সীমাবদ্ধ করতে পারি,
// যা আমাদের কোডকে আরও নিরাপদ এবং নির্ভরযোগ্য করে তোলে।

//@ Keyof ? need because we want to get the keys of an object as a type.

type RichPeopleVechicle = {
  car: string;
  bike: string;
  yacht: string;
};

type myVechicle = "car" | "bike" | "yacht";

type myVechicle2 = keyof RichPeopleVechicle;
// এই ক্ষেত্রে, myVechicle2 তে "car", "bike" এবং "yacht" থাকবে, কারণ এগুলো RichPeopleVechicle এর key।

const mycar: myVechicle2 = "car"; // এই ক্ষেত্রে, mycar তে "car" থাকবে, কারণ এটি RichPeopleVechicle এর key এর মধ্যে একটি।
const myyacht: myVechicle2 = "cng"; // এই ক্ষেত্রে, myyacht তে "cng" থাকবে না, কারণ এটি RichPeopleVechicle এর key এর মধ্যে নেই। তাই এটি একটি error হবে।

//@ keyof constraint ? need because we want to get the value of a key from an object.

const user = {
  name: "Soshi B",
  id: 12345,
  address: {
    city: "New York",
    country: "USA",
  },
  age: 30,
};

//const myId = user.id; // এই ক্ষেত্রে, myId তে 12345 থাকবে, কারণ এটি user এর id property এর value।
const myId = user["id"]; // এই ক্ষেত্রে ও , myId তে 12345 থাকবে, কারণ এটি user এর id property এর value।
const myCity = user["address"]; // এই ক্ষেত্রে, myCity তে { city: "New York", country: "USA" } থাকবে, কারণ এটি user এর address property এর value।

console.log(myId); // এই ক্ষেত্রে, myId তে 12345 থাকবে।
console.log(myCity); // এই ক্ষেত্রে, myId তে 12345 থাকবে এবং myCity তে { city: "New York", country: "USA" } থাকবে।

const getPropertyFromObj = (obj: object, key: string) => {
  return obj[key];
};

// এই ক্ষেত্রে, getPropertyFromObj ফাংশনটি একটি object এবং একটি key গ্রহণ করে এবং সেই key এর value return করে।
//  কিন্তু এই ফাংশনটি কাজ করবে না, কারণ obj[key] তে error হবে, কারণ obj এর type object এবং key এর type string,
// তাই TypeScript এটি বুঝতে পারবে না যে obj[key] কি ধরনের value return করবে।

const result = getPropertyFromObj(user, "name"); // এই ক্ষেত্রে, result তে "John Doe" থাকবে, কারণ user এর name property এর value।
console.log(result); // এই ক্ষেত্রে, result তে "John Doe" থাকবে।

// এই সমস্যা থেকে বাঁচতে আমরা keyof constraint ব্যবহার করতে পারি。

type Person = {
  id: number;
  name: string;
  age: number;
  address: {
    city: string;
    country: string;
  };
};

const person1: Person = {
  id: 12345,
  name: "John Doe",
  age: 30,
  address: {
    city: "New York",
    country: "USA",
  },
};

const getPropertyFromPerson1 = (obj: Person, key: keyof Person) => {
  return obj[key];
};

const result1 = getPropertyFromPerson1(person1, "name");

console.log(result1);
// এই ক্ষেত্রে, result1 তে "John Doe" থাকবে, কারণ person1 এর name property এর value।

// এইভাবে, আমরা keyof constraint ব্যবহার করে একটি object এর key এর value কে নির্দিষ্ট করতে পারি,
// যা আমাদের কোডকে আরও নিরাপদ এবং নির্ভরযোগ্য করে তোলে।

const product = {
  id: 12345,
  brand: "Apple",
  price: 999.99,
  features: {
    color: "Silver",
    storage: "256GB",
  },
};

const result2 = getPropertyFromPerson1(product, "brand");
//  error হবে, কারণ product এর type Person নয়,
// তাই getPropertyFromPerson1 ফাংশনটি product এর brand property এর value return করতে পারবে না।

// এই সমস্যা থেকে বাঁচতে আমরা getPropertyFromPerson1 ফাংশনটি generic type এর সাথে constraint ব্যবহার করে তৈরি করতে পারি।

const getPropertyFromObjWithConstraint = <T>(obj: T, key: keyof T) => {
  return obj[key];
};

const result3 = getPropertyFromObjWithConstraint(product, "brand");
console.log(result3);
// এই ক্ষেত্রে, result3 তে "Apple" থাকবে, কারণ product এর brand property এর value।

const student4 = {
  name: "Alice",
  id: 54321,
  grade: "A",
  hasScholarship: true,
};

const result4 = getPropertyFromObjWithConstraint(student4, "hasScholarship");
console.log(result4);
// এই ক্ষেত্রে, result4 তে true থাকবে, কারণ student4 এর hasScholarship property এর value।
