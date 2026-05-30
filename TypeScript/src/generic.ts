// Generics in TypeScript
// Generic ফাংশন, interface এবং type alias দিয়ে reusable, type-safe code লেখা যায়।

// Generic function — works with any type T
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("hello"));  // "hello"
console.log(identity<number>(42));        // 42
console.log(identity(true));              // true — T inferred as boolean

// Generic function with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair("age", 30); // [string, number]
console.log(result);

// Generic interface — reusable API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type User = { id: number; name: string };

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "OK",
};

console.log(userResponse);

// Generic with constraint — T must have a 'length' property
function logLength<T extends { length: number }>(value: T): T {
  console.log(`Length: ${value.length}`);
  return value;
}

logLength("hello");        // Length: 5
logLength([1, 2, 3]);      // Length: 3
// logLength(42);          // ❌ Error: number has no .length

// Generic type alias
type Maybe<T> = T | null | undefined;

const username: Maybe<string> = null;
const userId: Maybe<number>   = 42;

// Generic with default type parameter
interface Wrapper<T = string> {
  value: T;
}

const w1: Wrapper         = { value: "hello" };  // T defaults to string
const w2: Wrapper<number>  = { value: 99 };       // T = number

console.log(w1, w2);
