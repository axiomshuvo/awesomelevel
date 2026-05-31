// some array types
const friends: string[] = ["Alice", "Bob", "Charlie"];
const numbers: number[] = [1, 2, 3, 4, 5];
const isActive: boolean[] = [true, false, true];

// Using Generics with Array

type GenericArray = Array<string>;
type GenericNumberArray = Array<number>;
type GenericBooleanArray = Array<boolean>;

const friends2: GenericArray = ["Alice", "Bob", "Charlie"];
const numbers2: GenericNumberArray = [1, 2, 3, 4, 5];
const isActive2: GenericBooleanArray = [true, false, true];

// Using Generics

type GenericType<T> = Array<T>;

const friends3: GenericType<string> = ["Alice", "Bob", "Charlie"];
const numbers3: GenericType<number> = [1, 2, 3, 4, 5];
const isActive3: GenericType<boolean> = [true, false, true];

type coordinate<T> = {
  x: T;
  y: T;
};

const point1: coordinate<number> = { x: 10, y: 20 };
const point2: coordinate<string> = { x: "10", y: "20" };

console.log(point1); // Output: { x: 10, y: 20 }
console.log(point2); // Output: { x: '10', y: '20' }

// Using Generics with Array of objects
type GenericObject2<T> = Array<T>;

const newstringObject: GenericObject2<{ name: string; age: number }> = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];
console.log(newstringObject); // Output: [ { name: 'Alice', age: 30 }, { name: 'Bob', age: 25 } ]

// Using Generics with objects

type GenericObject<T> = {
  value: T;
};

const stringObject: GenericObject<string> = { value: "Hello, World!" };
const numberObject: GenericObject<number> = { value: 42 };
const booleanObject: GenericObject<boolean> = { value: true };

console.log(stringObject); // Output: { value: 'Hello, World!' }
console.log(numberObject); // Output: { value: 42 }
console.log(booleanObject); // Output: { value: true }

// Using Generics with Functions

function identity<T>(arg: T): T {
  return arg;
}

const stringIdentity = identity<string>("Hello, World!");
const numberIdentity = identity<number>(42);
const booleanIdentity = identity<boolean>(true);

console.log(stringIdentity); // Output: Hello, World!
console.log(numberIdentity); // Output: 42
console.log(booleanIdentity); // Output: true

// Using Generics with Classes
class GenericClass<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const stringInstance = new GenericClass<string>("Hello, World!");
const numberInstance = new GenericClass<number>(42);
const booleanInstance = new GenericClass<boolean>(true);

console.log(stringInstance.getValue()); // Output: Hello, World!
console.log(numberInstance.getValue()); // Output: 42
console.log(booleanInstance.getValue()); // Output: true

// Using Generics with Interfaces
interface GenericInterface<T> {
  value: T;
  getValue(): T;
}

class GenericClassWithInterface<T> implements GenericInterface<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const stringInstance2 = new GenericClassWithInterface<string>("Hello, World!");
const numberInstance2 = new GenericClassWithInterface<number>(42);
const booleanInstance2 = new GenericClassWithInterface<boolean>(true);

console.log(stringInstance2.getValue()); // Output: Hello, World!
console.log(numberInstance2.getValue()); // Output: 42
console.log(booleanInstance2.getValue()); // Output: true

interface Developer<T, X = null> {
  name: string;
  age: number;
  device: {
    brand: string;
    model: string;
    releaseYear: string;
  };
  smartwatch: T;
  bike?: X;
}

interface litewatch {
  heartRate: number;
  stepCount: number;
}

interface prowatch {
  heartRate: number;
  stepCount: number;
  sleepHours: number;
  callSupport: boolean;
}

const poorDev: Developer<litewatch> = {
  name: "John Doe",
  age: 30,
  device: {
    brand: "Dell",
    model: "XPS 15",
    releaseYear: "2020",
  },
  smartwatch: {
    heartRate: 72,
    stepCount: 5000,
  },
  bike: {
    model: "Trek FX 3.0",
  },
};

console.log(poorDev);

const richDev: Developer<prowatch, { model: string; engine: string }> = {
  name: "Jane Doe",
  age: 28,
  device: {
    brand: "Apple",
    model: "MacBook Pro",
    releaseYear: "2025",
  },
  smartwatch: {
    heartRate: 68,
    stepCount: 8000,
    sleepHours: 7,
    callSupport: true,
  },
  bike: {
    model: "Trek FX 3.0",
    engine: "Electric",
  },
};

console.log(richDev);
