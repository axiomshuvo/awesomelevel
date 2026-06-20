// Comprehensive Practice Tasks: From Basics to Advanced Types

/**
 *# Task 1: The "Optional" Shopping Cart {EASY}
 * Concepts: Destructuring, Optional Properties, Default Values
 * Scenario: You are building a checkout system. Users might buy one item by default,
 * or specify a bulk quantity.
 */

type CartItem = {
  name: string;
  price: number;
  quantity?: number;
};

/**
 *! Instructions:
 * Write a function calculateTotal that takes a CartItem object.
 * Use Destructuring to extract properties.
 * If quantity is missing, ensure the calculation treats it as 1.
 * Return the total cost (price * quantity).
 *? Hint: Set a default value during destructuring: { quantity = 1 } = item
 */

function calculateTotal(item: CartItem): number {
  const { price, quantity = 1 } = item; // Destructuring with default value
  return price * quantity; // Calculate total cost
}

console.log(calculateTotal({ name: "Book", price: 10 })); // Output: 10 (quantity defaults to 1)
console.log(calculateTotal({ name: "Pen", price: 25, quantity: 5 })); // Output: 125

// =========-------==========--------=========-------==========--------=========-------==========--------

/**
 *# Task 2: Merging User Profiles {EASY}
 * Concepts: Intersection Types (&)
 * Scenario: A user signs up as a basic Person, but when hired, they gain
 * JobDetails. An Employee is a union of both.
 *
 * type Person = { name: string; age: number };
 * type JobDetails = { role: string; salary: number };
 *
 *! Instructions:
 * Create a new type Employee that combines Person and JobDetails.
 * Write a function getProfile that accepts an Employee.
 * Return a string: "Name: [name], Role: [role]".
 *? Hint: Use the & operator to merge the two types.
 *
 *
 */

type Person = { name: string; age: number };
type JobDetails = { role: string; salary: number };

type Employee = Person & JobDetails; // Intersection type to combine Person and JobDetails

function getProfile(employee: Employee): string {
  return `Name: ${employee.name}, Role: ${employee.role}`; // Access properties directly from employee

  //   const { name, role } = employee; // Destructuring to extract name and role'
  //   return `Name: ${name}, Role: ${role}`; // Return formatted string
}

console.log(
  getProfile({ name: "Alice", age: 30, role: "Developer", salary: 80000 }),
); // Output: Name: Alice, Role: Developer

// =========-------==========--------=========-------==========--------=========-------==========--------

/**
 *# Task 3: The "Safe" Data Fetcher {MEDIUM}
 * Concepts: Optional Chaining (?.), Nullish Coalescing (??)
 * Scenario: API responses can be unpredictable. You need to safely access a deep
 * property without causing a crash.
 *
 * */

type UserResponse = {
  info?: {
    address?: {
      zipCode?: string;
    };
  };
};
/**
 *! Instructions:
 * Write a function getZipCode that reaches deep into the object.
 * If any part of the path is missing, or if the zipCode is null/undefined, return
 * "00000".
 *? Hint: Chain ?. for every level and end with ?? "00000".
 *
 * */

function getZipCode(res: UserResponse): string {
  return res.info?.address?.zipCode ?? "00000"; // Use optional chaining and nullish coalescing to safely access zipCode
}

console.log(getZipCode({ info: { address: { zipCode: "12345" } } })); // Output: 12345
console.log(getZipCode({ info: { address: {} } })); // Output: 00000
console.log(getZipCode({})); // Output: 00000

// =========-------==========--------=========-------==========--------=========-------==========--------

/**
 *# Task 4: Type Assertion MEDIUM
 * Concepts: Type Assertion (as), unknown type
 * Scenario: You receive a value from a 3rd-party library typed as unknown. You are
 * certain it's a string and need to manipulate it. */

let secretValue: unknown = "typescript is awesome";

/**
 *! Instructions:
 * Create a variable upperValue.
 * Assign secretValue to it using Type Assertion.
 * Call .toUpperCase() on the resulting value.
 *? Hint: Use the value as string syntax. */

const upperValue = (secretValue as string).toUpperCase();
console.log(upperValue); // Output: TYPESCRIPT IS AWESOME

// =========-------==========--------=========-------==========--------=========-------==========--------

/**
 *# Task 5: Generic Constraints {MEDIUM}
 * Concepts: Generics, Extends Constraint
 * Scenario: You want a function that logs the length of various inputs (strings, arrays)
 * but rejects types that don't have a .length.
 *
 *! Instructions:
 * Write a generic function logLength<T>(input: T).
 * Constrain T to ensure it must have a length property of type number.
 * Return the length value.
 *? Hint: Use <T extends { length: number }>.
 * */

function logLength<T extends { length: number }>(input: T): number {
  return input.length;
}

/**
 *# Task 6: The Property Guard [HARD]
 * Concepts: keyof, Generics
 * Scenario: Create a utility that gets a property from an object while preventing typos
 * at compile-time.
 */

const product = { id: 101, name: "Keyboard", price: 50 };

/**
 *! Instructions:
 * Create a function getProductProp<T, K>(obj: T, key: K).
 * Constraint K to be a valid key of T.
 * Return obj[key].
 *? Hint: Use <T, K extends keyof T>.
 */

function getProductProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
console.log(getProductProp(product, "name")); // Output: Keyboard
console.log(getProductProp(product, "color"));
// Error: Argument of type '"color"' is not assignable to parameter of type '"id" | "name" | "price"'

// =========-------==========--------=========-------==========--------=========-------==========--------

/**
 *# Task 7: Constant Literal Types HARD
 * Concepts: as const, typeof, Index Access Types
 * Scenario: Define fixed theme colors that serve as the single source of truth for your
 * application.
 */

const Colors = {
  Primary: "RED",
  Secondary: "BLUE",
} as const;

/**
 *! Instructions:
 * Create a type ValidColor derived directly from the values of the Colors
 * object.
 * Write a function setColor(c: ValidColor) that only accepts "RED" or
 * "BLUE".
 *? Hint: type ValidColor = typeof Colors[keyof typeof Colors].
 * */

type ValidColor = (typeof Colors)[keyof typeof Colors]; // Extract values from Colors as a union type

function setColor(c: ValidColor) {
  console.log(`Color set to: ${c}`);
}

setColor("RED"); // Output: Color set to: RED

// =========-------==========--------=========-------==========--------=========-------==========--------

/**
 *# Task 8: The "Draft" Mode HARD
 * Concepts: Mapped Types, Readonly, Optional
 * Scenario: Transform a strict interface into a "Draft" version where everything is
 * optional and immutable.
 */
interface MyDocument {
  title: string;
  content: string;
  author: string;
}

/**
 *! Instructions:
 * Create a Mapped Type Draft<T>.
 * Iterate through all keys of T, making them readonly and ? (optional).
 * Declare a variable myDraft of type Draft<MyDocument>.
 *? Hint: { readonly [P in keyof T]?: T[P] }.
 */

type Draft<T> = {
  readonly [P in keyof T]?: T[P];
};

const myDraft: Draft<MyDocument> = {
  title: "Draft Title",
  // content and author are optional and readonly
};

// =========-------==========--------=========-------==========--------=========-------==========--------

/**
 *# Task 9: The Wrapper HARD
 * Concepts: Conditional Types
 * Scenario: Create a type that acts as a logic gate, returning "Large" for arrays and
 * "Small" for anything else.
 *
 *! Instructions:
 * Create a type DataType<T>.
 * If T extends an array, the type should be "Large".
 * Otherwise, it should be "Small".
 *? Hint: Use the ternary syntax: T extends any[] ? "Large" : "Small".
 */

type DataType<T> = T extends any[] ? "Large" : "Small";

type Test1 = DataType<string>; // "Small"
type Test2 = DataType<number[]>; // "Large"
type Test3 = DataType<{ name: string }>; // "Small"
type Test4 = DataType<boolean[]>; // "Large"

// =========-------==========--------=========-------==========--------=========-------==========--------

/**
 *# Task 10: Utility Type (Omit) MEDIUM
 * Concepts: Built-in Utility Types (Omit)
 * Scenario: You need to strip sensitive data (like a password) from a user object
 * before sending it to the UI.
 */

interface UserAccount {
  id: number;
  username: string;
  password: string;
}
/**
 *! Instructions:
 * Create a type PublicUser using the Omit utility.
 * Exclude the password field from UserAccount.
 *? Hint: Omit<UserAccount, "password">.
 */

type PublicUser = Omit<UserAccount, "password">;

const publicUser: PublicUser = {
  id: 1,
  username: "john_doe",
  // password is omitted
};

console.log(publicUser); // Output: { id: 1, username: 'john_doe' }

// =========-------==========--------=========-------==========--------=========-------==========--------
