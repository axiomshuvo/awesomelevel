//InterFace

// interface only  works for object , array and function
//! interface can not be used for primitive types like number , string , boolean

interface Person {
  name: string;
  age: number;
}

const person1: Person = {
  name: "John",
  age: 30,
};

console.log(person1);

type Role = "admin" | "user" | "guest";

type PersonWithRole = Person & Role; // This will cause an error because 'Role' is not an object type

type PersonWithRole2 = Person & {
  role: Role;
}; // This is correct, we are adding a 'role' property to the 'Person' interface

const person2: PersonWithRole2 = {
  name: "Jane",
  age: 25,
  role: "admin",
};

// extending interfaces

interface Employee extends Person {
  employeeId: number;
}

const employee1: Employee = {
  name: "Alice",
  age: 28,
  employeeId: 12345,
};

console.log(employee1);

//! Function interface

interface Add {
  (a: number, b: number): number;
  // param er type and return type বলে দেওয়া হয়,
  // এখানে আমরা বলছি যে এই ফাংশনটি দুইটি number নেবে এবং একটি number রিটার্ন করবে
}

const add: Add = (a, b) => a + b;

console.log(add(5, 3)); // Output: 8

// Array interface

interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Hello", "World"];

console.log(myArray[0]); // Output: Hello
console.log(myArray[1]); // Output: World
