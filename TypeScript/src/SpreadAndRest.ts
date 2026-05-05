// Spread Operator
const vegetables = ["carrot", "broccoli", "spinach"];
const fruits = ["apple", "banana", "orange"];

vegetables.push(fruits);

const bazar = [...vegetables, ...fruits];
console.log(bazar); // Output: ['carrot', 'broccoli', 'spinach', 'apple', 'banana', 'orange']
