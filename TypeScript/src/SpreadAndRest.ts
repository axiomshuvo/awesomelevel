//@ Spread Operator in array
const vegetables = ["carrot", "broccoli", "spinach"];
const fruits = ["apple", "banana", "orange"];

vegetables.push(fruits);
// error কারন push method এ array কে push করা যায় না,
// এটা একটা single element হিসেবে treat করে। তাই এখানে spread operator ব্যবহার করতে হবে।

vegetables.push(...fruits);
// এইখানে spread operator ব্যবহার করা হয়েছে,
// যা fruits array এর সব elements কে individual elements হিসেবে push করবে।
console.log(vegetables); // Output: ['carrot', 'broccoli', 'spinach', 'apple', 'banana', 'orange']

//@ Spread Operator in object
const person1 = {
  name: "Alice",
  age: 30,
};

const person2 = {
  name: "Bob",
  city: "New York",
};

// person1 এবং person2 এর properties কে combine করে একটি নতুন object তৈরি করা হচ্ছে।
const combinedPerson = { ...person1, ...person2 };

console.log(combinedPerson);
// Output: { name: 'Bob', age: 30, city: 'New York' }
// এখানে name property এর value person2 এর value দ্বারা overwrite হয়েছে,
// কারণ spread operator এ পরে আসা object এর properties আগের object এর properties কে overwrite করে দেয়।

//@ Rest Operator

const sendInvite = (friend1: string, friend2: string) => {
  console.log(`Inviting ${friend1} and ${friend2} to the party!`);
};

sendInvite("Alice", "Bob"); // Output: Inviting Alice and Bob to the party!

const foodDetailList = (...food: string[]) => {
  food.forEach((item: string) => {
    console.log(`eating ${item}`);
  });
};

foodDetailList("pizza", "burger", "pasta"); // Output: eating pizza, eating burger, eating pasta
// এখানে rest operator ব্যবহার করা হয়েছে, যা food parameter কে একটি array হিসেবে treat করে,
// এবং function কে variable number of arguments গ্রহণ করার অনুমতি দেয়।
