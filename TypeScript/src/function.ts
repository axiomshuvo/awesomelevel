// Function

// normal function

function add(number: number, number2: number): number {
  return number + number2;
}
console.log(add(2, 3)); // normal function with explicit return
//

//@ arrow function
const add2 = (number: number, number2: number): number => number + number2;

console.log(add2(5, 7)); // arrow function with implicit return

// object -> fuction -> method

const miskinUser = {
  name: "axiomshuvo",
  age: 22,
  isMarried: false,
  job: "Software Engineer",
  salary: 0,
  addBalance(value: number) {
    return this.salary + value;
  },
};

console.log(miskinUser.addBalance(1000)); // method using this keyword

// callback function
const arr: number[] = [1, 2, 3, 4, 5];
const sqrArr = arr.map((elem: number): number => elem * elem);

console.log(sqrArr); // callback function using map method
