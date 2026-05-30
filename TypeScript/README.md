# 🚀 TypeScript Learning Journey: Beginner → Advanced

> **Love TypeScript? You're in the right place!** 💙
>
> TypeScript ভালোবাসেন? তাহলে আপনি সঠিক জায়গায় এসেছেন!

This is a bilingual (English 🇬🇧 + Bengali 🇧🇩) step-by-step guide to learn TypeScript from absolute beginner to confident intermediate. Every topic follows the same pattern: **Concept → Code Example → Explanation → Common Mistakes → Quick Quiz**.

এটি একটি bilingual (English + Bengali) step-by-step guide যা TypeScript শেখার জন্য তৈরি। প্রতিটি topic-এ একই flow: **ধারণা → Code Example → ব্যাখ্যা → Common Mistakes → Quick Quiz**।

---

## ⚙️ Install & Setup

```bash
cd TypeScript
npm install -D typescript
npx tsc --init    # already done — tsconfig.json is ready
npx tsc           # compile all .ts files
```

### 🔒 Why Strict Mode? (কেন Strict Mode জরুরি?)

This project uses a **battle-hardened** `tsconfig.json`. Here's what's enabled and why:

এই project-এ একটি শক্তিশালী `tsconfig.json` ব্যবহার করা হয়েছে। এগুলো কেন চালু আছে:

| Config                               | What it does                                        | কী করে                                 |
| ------------------------------------ | --------------------------------------------------- | -------------------------------------- |
| `"strict": true`                     | Enables all strict checks                           | সমস্ত unsafe assumption বন্ধ করে       |
| `"noUncheckedIndexedAccess": true`   | Array/object index access returns `T \| undefined`  | Index access আরও safe হয়              |
| `"exactOptionalPropertyTypes": true` | Optional `?` can't be explicitly set to `undefined` | Optional property সঠিকভাবে enforce হয় |

The compiler will **catch your mistakes before runtime** — treat every error as a free lesson! 🎓

Compiler আপনার ভুল runtime-এর আগেই ধরবে — প্রতিটি error কে বিনামূল্যে শিক্ষা মনে করুন!

---

## 📁 Folder Structure

```text
TypeScript/
  README.md         ← you are here!
  tsconfig.json     ← strict config
  src/
    primitive.ts          ← Phase 1
    nonPrimitive.ts       ← Phase 1
    function.ts           ← Phase 1
    questionMark.ts       ← Phase 1
    typeAlias.ts          ← Phase 2
    interface.ts          ← Phase 2
    union.ts              ← Phase 2
    typeAssertion.ts      ← Phase 3
    nullableUdefinedNever.ts  ← Phase 3
    destructuring.ts      ← Phase 3
    SpreadAndRest.ts      ← Phase 3
    test.ts               ← Phase 4
```

---

## 🧭 Learning Phases at a Glance

| Phase       | Level                 | Goal                                                  | Files                                                                                  |
| ----------- | --------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Phase 1** | Beginner 🌱           | Primitive & non-primitive types, functions, operators | `primitive.ts`, `nonPrimitive.ts`, `function.ts`, `questionMark.ts`                    |
| **Phase 2** | Lower-Intermediate 🌿 | Type modeling, reusability, contracts                 | `typeAlias.ts`, `interface.ts`, `union.ts`                                             |
| **Phase 3** | Intermediate 🌳       | Safety patterns, pitfalls, real-world techniques      | `typeAssertion.ts`, `nullableUdefinedNever.ts`, `destructuring.ts`, `SpreadAndRest.ts` |
| **Phase 4** | Practice 🎯           | Revise + experiment                                   | `test.ts`                                                                              |

---

# 📚 Topics (Deep Dive)

---

## 1️⃣ Primitive Types 🧱

> **File:** `src/primitive.ts` | **Level:** Beginner 🌱

### Concept | ধারণা

**English:** TypeScript's primitive types let you declare the exact kind of simple value a variable can hold. The compiler immediately flags any attempt to use the wrong type.

**বাংলা:** Primitive type দিয়ে একটি variable কী ধরনের simple value ধরতে পারবে তা নির্ধারণ করা হয়। ভুল type ব্যবহার করলে compiler সাথে সাথে error দেখাবে।

### Types Covered

| Type        | Example                               | Use                         |
| ----------- | ------------------------------------- | --------------------------- |
| `string`    | `"hello"`                             | Text                        |
| `number`    | `25`, `3.14`                          | Numbers                     |
| `boolean`   | `true`, `false`                       | Flags                       |
| `null`      | `null`                                | Intentionally empty         |
| `undefined` | `undefined`                           | Not yet assigned            |
| `bigint`    | `9007199254740993n`                   | Very large integers         |
| `symbol`    | `Symbol("key")`                       | Unique identifiers          |
| `any`       | anything                              | ⚠️ Type-safety off          |
| `unknown`   | anything (but must narrow before use) | Safe alternative to `any`   |
| `never`     | (unreachable)                         | Functions that never return |

### Code Example (from `primitive.ts`)

```ts
let userName: string = "Aritra Sarker";
userName = 12; // ❌ Error: number is not assignable to string

let age: number = 25;
age.toUpperCase(); // ❌ Error: toUpperCase doesn't exist on number
age = "twenty five"; // ❌ Error: string is not assignable to number

let isStudent: boolean = true;
isStudent = "yes"; // ❌ Error: string is not assignable to boolean

let isAdmin = true; // ✅ TypeScript infers type as boolean (no annotation needed)

let x; // ⚠️ Type is 'any' — avoid this pattern!
x = "five";
x = 5; // No error because x is any

const y = null; // TypeScript infers type as null
let z: never; // z can never have a value — used in exhaustive checks
let a: unknown; // Safe: must narrow before use
```

### Explanation | ব্যাখ্যা

**English:**

- TypeScript infers the type when you initialize a variable (like `isAdmin = true`), so you don't always need to write the annotation.
- `any` disables type checking — avoid it in real projects.
- `unknown` is the safe version of `any`: you must check the type before using it.
- `never` is for things that can never happen — like a function that always throws.

**বাংলা:**

- Variable initialize করার সময় TypeScript নিজেই type বুঝে নেয় (যেমন `isAdmin = true` → `boolean`)।
- `any` ব্যবহার করলে type checking বন্ধ হয়ে যায় — real project-এ এড়িয়ে চলুন।
- `unknown` হলো `any`-এর safe version: ব্যবহারের আগে type check করতে হয়।
- `never` এমন কিছুর জন্য যা কখনো ঘটবে না — যেমন সবসময় error throw করে এমন function।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: calling a string method on a number
let age: number = 25;
age.toUpperCase(); // Property 'toUpperCase' does not exist on type 'number'

// ❌ Wrong: using any when unknown is better
let input: any = getUserInput(); // loses all type safety

// ✅ Correct: use unknown and narrow
let input: unknown = getUserInput();
if (typeof input === "string") {
  console.log(input.toUpperCase()); // safe!
}
```

### ⚡ Quick Quiz

Declare `productName` as a `string` and `stock` as a `number`. Then try assigning the wrong type and see the error!

```ts
// Your answer here:
const productName: string = "TypeScript Handbook";
let stock: number = 42;

// Now try this — what error do you get?
// stock = "out of stock";
```

---

## 2️⃣ Non-Primitive Types 📦

> **File:** `src/nonPrimitive.ts` | **Level:** Beginner 🌱

### Concept | ধারণা

**English:** Arrays, tuples, and objects are TypeScript's structured data containers. TypeScript enforces the shape — wrong type, wrong order, or missing property = compiler error.

**বাংলা:** Array, tuple এবং object হলো TypeScript-এর structured data container। ভুল type, ভুল order বা missing property থাকলে compiler error দেবে।

### Types Covered

- `string[]` / `number[]` — typed arrays
- `[T1, T2]` — tuples (fixed length + type order)
- `{ key: type }` — inline object types
- Optional property `?`

### Code Example (from `nonPrimitive.ts`)

```ts
// ✅ Array — only strings allowed
let bazarList: string[] = ["rice", "dal", "oil", "salt", "sugar"];
bazarList.push(true); // ❌ Error: boolean is not assignable to string

// ✅ Mixed array — TypeScript infers (string | number | boolean)[]
let mixedArr = ["hello", 42, true];
mixedArr.push(12); // ✅ OK — number is in the union

// ✅ Tuple — fixed length and type order
let coordinates: [number, number] = [20, 20, 50]; // ❌ Error: too many elements
let nameAndAge: [string, number] = ["Alice", 30];
nameAndAge[0] = 42; // ❌ Error: number not assignable to string at index 0

// ✅ Object with required properties
const person: { name: string; age: number; address: string } = {
  name: "Alice",
  age: 30,
  address: "dhaka",
};

// ❌ Missing required property
const person2: { name: string; age: number; address: string } = {
  name: "Bob",
  age: 25,
  // address is missing — TypeScript error!
};

// ✅ Optional property with ?
const person3: { name: string; age: number; address?: string } = {
  name: "aritra",
  age: 20,
  // address is optional — no error
};
person3.age = 21; // ✅ Reassignment is fine
```

### Explanation | ব্যাখ্যা

**English:**

- A typed array like `string[]` only accepts elements of that type.
- A tuple has a fixed number of elements with a specific type at each position.
- Object shapes enforce which properties must exist and their types.
- The `?` suffix makes a property optional.

**বাংলা:**

- `string[]` এর মতো typed array-এ শুধুমাত্র সেই type-এর element রাখা যাবে।
- Tuple-এ fixed সংখ্যক element থাকে, প্রতিটি position-এর type নির্দিষ্ট।
- Object shape enforce করে কোন property থাকতে হবে এবং কী type হবে।
- `?` দিলে property টি optional হয়ে যায়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: pushing wrong type into typed array
let prices: number[] = [10, 20, 30];
prices.push("free"); // Error!

// ❌ Wrong: wrong tuple length
let point: [number, number] = [1, 2, 3]; // Error: 3 elements, expected 2

// ❌ Wrong: wrong type at tuple position
let entry: [string, number] = [42, "hello"]; // Both positions are reversed!
```

### ⚡ Quick Quiz

Create a tuple `[string, number, boolean]` representing a user's name, age, and active status.

```ts
// Your answer here:
const userEntry: [string, number, boolean] = ["Alice", 28, true];
```

---

## 3️⃣ Functions 🔧

> **File:** `src/function.ts` | **Level:** Beginner 🌱

### Concept | ধারণা

**English:** In TypeScript, you can (and should) annotate both the parameter types and the return type of every function. This turns functions into explicit contracts — callers know exactly what to pass and what to expect back.

**বাংলা:** TypeScript-এ function-এর parameter এবং return type annotate করা উচিত। এতে function একটি explicit contract হয়ে যায় — caller জানে কী দিতে হবে এবং কী পাবে।

### Types Covered

- Typed parameters
- Explicit return type
- Arrow functions
- Object methods
- Callback functions

### Code Example (from `function.ts`)

```ts
// Normal function with typed parameters and return type
function add(number: number, number2: number): number {
  return number + number2;
}
console.log(add(2, 3)); // 5

// Arrow function — same type safety, compact syntax
const add2 = (number: number, number2: number): number => number + number2;
console.log(add2(5, 7)); // 12

// Object method (using 'this')
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
console.log(miskinUser.addBalance(1000)); // 1000

// Callback function — map with typed callback
const arr: number[] = [1, 2, 3, 4, 5];
const sqrArr = arr.map((elem: number): number => elem * elem);
console.log(sqrArr); // [1, 4, 9, 16, 25]
```

### Explanation | ব্যাখ্যা

**English:**

- Explicit return types prevent accidental `undefined` returns.
- Arrow functions work the same way — the type annotations just look slightly different.
- Object methods can use `this` to access the object's own properties.
- Callbacks passed to array methods like `.map()` also accept type annotations.

**বাংলা:**

- Return type annotate করলে accidental `undefined` return এড়ানো যায়।
- Arrow function-এও একই type safety — শুধু syntax আলাদা।
- Object method-এ `this` দিয়ে object-এর নিজের property access করা যায়।
- `.map()` এর মতো array method-এর callback-এও type annotation দেওয়া যায়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: no return type — TypeScript infers 'any' for complex cases
function process(data: unknown) {
  // forgot to return something — silently returns undefined
}

// ❌ Wrong: wrong parameter order
function greet(age: number, name: string): string {
  return `Hello ${name}, you are ${age}`;
}
greet("Alice", 30); // Error: types are swapped!
```

### ⚡ Quick Quiz

Write a typed arrow function `multiply` that takes two numbers and returns their product.

```ts
// Your answer here:
const multiply = (a: number, b: number): number => a * b;
console.log(multiply(4, 5)); // 20
```

---

## 4️⃣ Question Mark Operators ❓

> **File:** `src/questionMark.ts` | **Level:** Beginner 🌱

### Concept | ধারণা

**English:** TypeScript ships with three powerful `?`-based operators that make conditional logic and null-safe access concise and expressive.

**বাংলা:** TypeScript-এ তিনটি শক্তিশালী `?` operator আছে যা conditional logic এবং null-safe access কে সংক্ষিপ্ত ও expressive করে তোলে।

### Operators Covered

| Operator           | Syntax              | Purpose                              |
| ------------------ | ------------------- | ------------------------------------ |
| Ternary            | `condition ? a : b` | Inline if-else                       |
| Nullish Coalescing | `a ?? b`            | Fallback only for `null`/`undefined` |
| Optional Chaining  | `obj?.prop`         | Safe nested access                   |

### Code Example (from `questionMark.ts`)

```ts
// Ternary operator — inline if-else
const isEligibleToMarriage = (age: number) =>
  age >= 21
    ? "You are eligible to marriage."
    : "You are not eligible to marriage.";

isEligibleToMarriage(25); // "You are eligible to marriage."
isEligibleToMarriage(18); // "You are not eligible to marriage."

// Nullish coalescing operator (??)
// Returns right side ONLY if left side is null or undefined
const userTheme = "dark";
const defaultTheme = "light";
const currentTheme = userTheme ?? defaultTheme; // "dark" (userTheme is not null/undefined)

// Optional chaining operator (?.)
// Returns undefined instead of throwing when a nested property doesn't exist
const user: {
  name: string;
  age: number;
  address?: {
    city: string;
    country: string;
  };
} = {
  name: "Alice",
  age: 30,
  // address is not provided
};

const userCity = user.address?.city; // undefined (no crash!)
```

### Explanation | ব্যাখ্যা

**English:**

- `??` is NOT the same as `||`. The `||` operator triggers on any falsy value (`0`, `""`, `false`), but `??` only triggers on `null` and `undefined`. This is important when `0` or `""` are valid values!
- `?.` short-circuits and returns `undefined` when the chain breaks — no error thrown.
- Combining them: `user.address?.city ?? "Unknown"` gives a safe default.

**বাংলা:**

- `??` এবং `||` এক নয়। `||` যেকোনো falsy value (`0`, `""`, `false`)-এ trigger করে, কিন্তু `??` শুধুমাত্র `null` এবং `undefined`-এ করে। `0` বা `""` valid value হলে `??` ব্যবহার করুন।
- `?.` chain ভাঙলে `undefined` return করে — কোনো error হয় না।
- একসাথে: `user.address?.city ?? "Unknown"` safe default দেয়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using || when you want ??
const score = 0;
const display = score || "No score"; // "No score" — BUG! 0 is a valid score

// ✅ Correct: use ?? for null/undefined only
const display2 = score ?? "No score"; // 0 — correct!

// ❌ Wrong: directly accessing optional nested property
const city = user.address.city; // TypeError if address is undefined!

// ✅ Correct: use optional chaining
const city2 = user.address?.city; // undefined — safe
```

### ⚡ Quick Quiz

You have `const discount: number | null = 0`. What does `discount ?? 10` return? What does `discount || 10` return? Why are they different?

```ts
// Answer:
const discount: number | null = 0;
console.log(discount ?? 10); // 0  — because 0 is not null/undefined
console.log(discount || 10); // 10 — because 0 is falsy!
// Use ?? when 0 is a valid value!
```

---

# 🌿 Phase 2 — Modeling & Composition

---

## 5️⃣ Type Alias 🧩

> **File:** `src/typeAlias.ts` | **Level:** Lower-Intermediate 🌿

### Concept | ধারণা

**English:** A type alias lets you give a custom name to any type — from simple primitives to complex nested objects. It makes your code DRY (Don't Repeat Yourself) and self-documenting.

**বাংলা:** Type alias দিয়ে যেকোনো type-কে একটি custom name দেওয়া যায় — simple primitive থেকে শুরু করে complex nested object পর্যন্ত। এতে code DRY (পুনরাবৃত্তি মুক্ত) এবং self-documenting হয়।

### Code Example (from `typeAlias.ts`)

```ts
// Without type alias — verbose, hard to reuse
const user: {
  name: string;
  age: number;
  email: string;
  gender?: string;
} = {
  name: "Aritra Sarker",
  age: 25,
  email: "aritra.sarker@example.com",
  gender: "male",
};

// With type alias — clean and reusable!
type person = {
  name: string;
  age: number;
  email: string;
  gender?: "male" | "female"; // union type inside alias
  address: {
    division: string;
    city: string;
  };
};

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
```

### Explanation | ব্যাখ্যা

**English:**

- `type` aliases can hold any shape: objects, unions, intersections, primitives, or even functions.
- They're reusable — define once, use everywhere.
- You can nest types (like `address` inside `person`) and use union types inside them (like `"male" | "female"`).
- Without aliases, you'd repeat the full object shape everywhere — a maintenance nightmare.

**বাংলা:**

- `type` alias যেকোনো shape রাখতে পারে: object, union, intersection, primitive, এমনকি function।
- এগুলো reusable — একবার define করো, যেখানে খুশি ব্যবহার করো।
- Type-এর ভেতরে nested type এবং union type ব্যবহার করা যায়।
- Alias ছাড়া প্রতিটি জায়গায় পুরো object shape repeat করতে হতো — যা maintain করা কঠিন।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: assigning a value not in the union
type person = {
  gender?: "male" | "female";
};
const p: person = { gender: "other" }; // Error: "other" not in union

// ❌ Wrong: using type alias where interface would be better
// Use 'interface' for object shapes (especially when extending is needed)
// Use 'type' for unions, intersections, and primitives

// ✅ Correct: type for union
type Status = "active" | "inactive" | "banned";
```

### ⚡ Quick Quiz

Create a `Product` type alias with `id: number`, `title: string`, optional `discount: number`, and `category: "electronics" | "clothing" | "food"`.

```ts
// Your answer here:
type Product = {
  id: number;
  title: string;
  discount?: number;
  category: "electronics" | "clothing" | "food";
};
```

---

## 6️⃣ Interface 🧾

> **File:** `src/interface.ts` | **Level:** Lower-Intermediate 🌿

### Concept | ধারণা

**English:** An `interface` defines the shape (contract) of an object. It's perfect for describing what properties and methods an object must have. Interfaces can extend each other, making them composable.

**বাংলা:** `interface` একটি object-এর shape (contract) define করে। কোন property এবং method থাকতে হবে তা বলে দেয়। Interface একে অপরকে extend করতে পারে, যা তাদের composable করে তোলে।

### Code Example (from `interface.ts`)

```ts
// Basic interface for an object shape
interface Person {
  name: string;
  age: number;
}

const person1: Person = {
  name: "John",
  age: 30,
};

// Extending interfaces — Employee inherits all of Person's properties
interface Employee extends Person {
  employeeId: number;
}

const employee1: Employee = {
  name: "Alice",
  age: 28,
  employeeId: 12345,
};

// Function interface — describes a callable signature
interface Add {
  (a: number, b: number): number;
}

const addFn: Add = (a, b) => a + b;

// Combining interface with a type alias (intersection)
type Role = "admin" | "user" | "guest";

type PersonWithRole = Person & {
  role: Role;
};

const person2: PersonWithRole = {
  name: "Jane",
  age: 25,
  role: "admin",
};
```

### Explanation | ব্যাখ্যা

**English:**

- Interfaces are best for **object shapes** — they cannot describe primitive types directly.
- `extends` lets one interface inherit all properties of another, then add more.
- A function interface describes a callable — useful for defining callback contracts.
- You can mix `interface` and `type` with `&` (intersection) to combine both.

**বাংলা:**

- Interface সবচেয়ে ভালো **object shape** describe করার জন্য — primitive type-এর জন্য সরাসরি ব্যবহার করা যায় না।
- `extends` দিয়ে একটি interface অন্যটির সব property inherit করে নতুন property যোগ করতে পারে।
- Function interface একটি callable describe করে — callback contract define করার জন্য কাজে আসে।
- `interface` এবং `type` কে `&` দিয়ে combine করা যায়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: trying to use interface for a primitive type
interface Name extends string {} // Interface can't extend a primitive directly

// ❌ Wrong: intersection with a non-object type
type PersonWithRole = Person & Role; // Error! Role is a string union, not an object
// ✅ Correct:
type PersonWithRole = Person & { role: Role }; // wrap it in an object
```

### ⚡ Quick Quiz

Create an `Animal` interface with `name: string` and `sound: string`. Then extend it with a `Pet` interface that adds `owner: string`.

```ts
// Your answer here:
interface Animal {
  name: string;
  sound: string;
}

interface Pet extends Animal {
  owner: string;
}

const myPet: Pet = { name: "Buddy", sound: "Woof", owner: "Alice" };
```

---

## 7️⃣ Union & Intersection Types 🔀

> **File:** `src/union.ts` | **Level:** Lower-Intermediate 🌿

### Concept | ধারণা

**English:**

- **Union (`|`)** means "this OR that" — a variable can be one of several types.
- **Intersection (`&`)** means "this AND that" — a type must satisfy ALL combined types at once.

**বাংলা:**

- **Union (`|`)** মানে "এটা অথবা ওটা" — একটি variable কয়েকটি type-এর যেকোনো একটি হতে পারে।
- **Intersection (`&`)** মানে "এটা এবং ওটা" — একটি type-কে সমস্ত combined type-এর সব property পূরণ করতে হবে।

### Code Example (from `union.ts`)

```ts
// Union type — role can be one of three specific strings
type UserRole = "admin" | "editor" | "viewer";

const getDashboard = (role: UserRole) => {
  if (role === "admin") {
    return "Admin Dashboard";
  } else if (role === "editor") {
    return "Editor Dashboard";
  } else if (role === "viewer") {
    return "Viewer Dashboard";
  } else {
    return "Invalid role";
  }
};

console.log(getDashboard("admin")); // "Admin Dashboard"
getDashboard("guest"); // ❌ Error: "guest" not in UserRole

// Intersection type — EmployeeManager must have ALL properties from both
type Employee = {
  id: number;
  name: string;
  phoneNo: string;
};

type Manager = {
  name: string;
  role: "manager";
};

type EmployeeManager = Employee & Manager;

const employee1: EmployeeManager = {
  id: 1,
  name: "Aritra Sarker",
  phoneNo: "123-456-7890",
  role: "manager",
};
```

### Explanation | ব্যাখ্যা

**English:**

- Union types are great for representing a finite set of options (like roles, statuses, or event names).
- TypeScript's control flow narrows the type inside `if` branches — in the `"admin"` branch, TypeScript knows `role === "admin"`.
- Intersection types combine multiple shapes. The resulting type requires ALL properties from every intersected type.

**বাংলা:**

- Union type সীমিত option (যেমন role, status, event name) represent করার জন্য দারুণ।
- TypeScript `if` branch-এর ভেতরে type narrow করে — `"admin"` branch-এ TypeScript জানে `role === "admin"`।
- Intersection type একাধিক shape combine করে। ফলাফলে সব intersected type-এর সব property থাকতে হয়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: confusing | (OR) with & (AND)
type A = { x: number };
type B = { y: string };

// A | B — needs EITHER x or y (but not necessarily both)
// A & B — needs BOTH x AND y

const val: A | B = { x: 1 }; // ✅ OK
const val2: A & B = { x: 1 }; // ❌ Error: missing y
const val3: A & B = { x: 1, y: "hello" }; // ✅ OK
```

### ⚡ Quick Quiz

Create a union type `Shape` that can be either `"circle"` or `"square"` or `"triangle"`. Write a function that returns the number of sides.

```ts
// Your answer here:
type Shape = "circle" | "square" | "triangle";

function getSides(shape: Shape): number {
  if (shape === "circle") return 0;
  if (shape === "square") return 4;
  return 3;
}
```

---

# 🌳 Phase 3 — Safety & Patterns

---

## 8️⃣ Type Assertion 🧭

> **File:** `src/typeAssertion.ts` | **Level:** Intermediate 🌳

### Concept | ধারণা

**English:** Type assertion tells the TypeScript compiler "trust me, I know what type this is." It doesn't change the runtime value — it's purely a compile-time hint. Use it carefully; incorrect assertions can cause runtime crashes.

**বাংলা:** Type assertion TypeScript compiler-কে বলে "আমি জানি এটা কোন type।" এটা runtime value পরিবর্তন করে না — এটা শুধু compile-time hint। সতর্কতার সাথে ব্যবহার করুন; ভুল assertion runtime crash ঘটাতে পারে।

### Code Example (from `typeAssertion.ts`)

```ts
// Using 'as' to assert type
let anything: any;
anything = 42;
(anything as number).toFixed(2); // Tell TS: "treat this as a number"

// Practical example: narrowing a union return type
const kgtoGm = (input: number | string): number | string | undefined => {
  if (typeof input === "number") {
    return input * 1000;
  } else if (typeof input === "string") {
    const [value] = input.split(" ");
    return ` Converting string to number: ${Number(value) * 1000}`;
  }
};

// We know these specific calls return specific types
const result1 = kgtoGm(2) as number; // 2000
const result2 = kgtoGm("2.5 kg") as string; // " Converting string to number: 2500"

console.log(result1);
console.log(result2);
```

### Explanation | ব্যাখ্যা

**English:**

- `as Type` is the modern assertion syntax. The older `<Type>` syntax also exists but conflicts with JSX.
- `typeof` narrows types at runtime — it's how TypeScript can determine which branch of a union you're in.
- Use assertions sparingly. Prefer proper typing, narrowing, or generics when possible.

**বাংলা:**

- `as Type` হলো modern assertion syntax। পুরনো `<Type>` syntax-ও আছে কিন্তু JSX-এ conflict করে।
- `typeof` runtime-এ type narrow করে — এভাবে TypeScript জানতে পারে union-এর কোন branch-এ আছেন।
- Assertion কম ব্যবহার করুন। সম্ভব হলে proper typing, narrowing বা generics ব্যবহার করুন।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using 'as' to bypass type safety
const value = "hello" as unknown as number; // double assertion — smell!
value.toFixed(2); // compiles but crashes at runtime!

// ❌ Wrong: asserting without checking
function process(input: unknown) {
  return (input as string).toUpperCase(); // crashes if input is actually a number!
}

// ✅ Correct: narrow first, then use
function process2(input: unknown) {
  if (typeof input === "string") {
    return input.toUpperCase(); // safe!
  }
  return "";
}
```

### ⚡ Quick Quiz

You have a variable `const raw: unknown = "TypeScript"`. How do you safely get its length?

```ts
// Your answer here:
const raw: unknown = "TypeScript";

// Option A — type guard (preferred)
if (typeof raw === "string") {
  console.log(raw.length); // 10
}

// Option B — assertion (use only when you're sure)
console.log((raw as string).length); // 10
```

---

## 9️⃣ Nullable / undefined / unknown / never 🧯

> **File:** `src/nullableUdefinedNever.ts` | **Level:** Intermediate 🌳

### Concept | ধারণা

**English:** Real-world data is messy — values can be `null`, `undefined`, or of an unknown shape. TypeScript gives you the tools to handle these safely so you don't get runtime crashes.

**বাংলা:** Real-world data এলোমেলো হয় — value `null`, `undefined`, বা unknown shape-এর হতে পারে। TypeScript এগুলো safely handle করার tool দেয় যাতে runtime crash না হয়।

### Code Example (from `nullableUdefinedNever.ts`)

```ts
// Nullable type — input can be string, null, undefined, or empty string
const getUser = (input: string | null) => {
  if (input) {
    console.log(`User input: ${input}`);
  } else {
    console.log("No user input provided.");
  }
};

getUser("Hello, TypeScript!"); // User input: Hello, TypeScript!
getUser(""); // No user input provided.
getUser(null); // No user input provided.

// unknown type — must narrow before use
let userInput: unknown;
userInput = "Hello, TypeScript!";
userInput = 42;
userInput = { name: "Alice", age: 30 };

// Type guard before using unknown value
const discountedPrice = (price: unknown) => {
  if (typeof price === "number") {
    return price * 0.9;
  } else if (typeof price === "string") {
    const [numericPart] = price.split(" ");
    return Number(numericPart) * 0.9;
  } else {
    throw new Error("Invalid price format");
  }
};

console.log(discountedPrice(100)); // 90
console.log(discountedPrice("100 USD")); // 90
// discountedPrice(true);               // Throws error!

// never type — a function that never returns normally
const throwError = (msg: string): never => {
  throw new Error(msg);
};
```

### Explanation | ব্যাখ্যা

**English:**

- `null` and `undefined` are distinct types in TypeScript. With `strict: true`, you can't accidentally use `null` where a value is expected.
- `unknown` forces you to check the type before using it — the safe way to accept arbitrary input.
- `never` is for functions that always throw or loop forever. It's also used for exhaustive checks in discriminated unions.

**বাংলা:**

- `null` এবং `undefined` TypeScript-এ আলাদা type। `strict: true` থাকলে ভুলে `null` দিয়ে দিতে পারবেন না।
- `unknown` ব্যবহারের আগে type check করতে বাধ্য করে — arbitrary input নেওয়ার safe উপায়।
- `never` এমন function-এর জন্য যা সবসময় throw করে বা infinite loop-এ থাকে। Discriminated union-এ exhaustive check-এও ব্যবহার হয়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using value without null check
function getLength(s: string | null): number {
  return s.length; // Error: Object is possibly 'null'
}

// ✅ Correct: null guard first
function getLength2(s: string | null): number {
  if (!s) return 0;
  return s.length;
}

// ❌ Wrong: using unknown without narrowing
function print(val: unknown) {
  console.log(val.toString()); // Error: Object is of type 'unknown'
}
```

### ⚡ Quick Quiz

Write a function `safeParse` that accepts `unknown` and returns the number if it's a number type, otherwise returns `0`.

```ts
// Your answer here:
function safeParse(input: unknown): number {
  return typeof input === "number" ? input : 0;
}

console.log(safeParse(42)); // 42
console.log(safeParse("hello")); // 0
console.log(safeParse(null)); // 0
```

---

## 1️⃣0️⃣ Destructuring 🎯

> **File:** `src/destructuring.ts` | **Level:** Intermediate 🌳

### Concept | ধারণা

**English:** Destructuring lets you unpack values from objects and arrays directly into variables. TypeScript ensures the types of destructured values match the source object/array.

**বাংলা:** Destructuring দিয়ে object এবং array থেকে সরাসরি variable-এ value বের করা যায়। TypeScript নিশ্চিত করে যে destructure করা value-এর type source object/array-এর সাথে মিলছে।

### Code Example (from `destructuring.ts`)

```ts
const user = {
  id: 123,
  name: {
    firstName: "John",
    lastName: "Doe",
  },
  age: 30,
  gender: "male",
  favColor: "blue",
  email: "john.doe@example.com",
};

// Old way
const lastName = user.name.lastName;

// New way — object destructuring with aliasing
const {
  age: userAge, // rename 'age' to 'userAge'
  name: { firstName: myFirstName }, // nested destructure + rename
} = user;

const { favColor } = user; // same name as property

console.log(`Name: ${myFirstName}, Age: ${userAge}, Color: ${favColor}`);

// Array destructuring
const friends = ["Alice", "Bob", "Charlie", "David"];

// Old way
const firstFriend = friends[0];

// New way — skip elements with commas
const [, secondBestFriend] = friends; // skip first element
console.log(`Second Best Friend: ${secondBestFriend}`); // "Bob"
```

### Explanation | ব্যাখ্যা

**English:**

- Use `: newName` after a property to rename it during destructuring.
- Nest `{}` inside destructuring to drill into nested objects.
- Use a leading comma `,` in array destructuring to skip elements.
- TypeScript knows the type of each destructured variable from the source.

**বাংলা:**

- Property-এর পরে `: newName` দিয়ে destructure করার সময় rename করা যায়।
- Nested destructuring-এ `{}` কে ভেতরে রাখা হয়।
- Array destructuring-এ শুরুতে `,` দিয়ে element skip করা যায়।
- TypeScript প্রতিটি destructure করা variable-এর type source থেকে জানে।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: trying to destructure a property that doesn't exist
const { nickname } = user; // Error: Property 'nickname' does not exist

// ❌ Wrong: forgetting to alias when a name conflicts
const age = 40; // already declared
const { age } = user; // Error: Cannot redeclare block-scoped variable 'age'

// ✅ Correct: use aliasing
const { age: userAge2 } = user; // renamed to userAge2
```

### ⚡ Quick Quiz

Given `const order = { id: 1, item: "book", quantity: 3 }`, destructure `item` and `quantity`, but rename `quantity` to `count`.

```ts
// Your answer here:
const order = { id: 1, item: "book", quantity: 3 };
const { item, quantity: count } = order;
console.log(item, count); // "book" 3
```

---

## 1️⃣1️⃣ Spread & Rest 🪄

> **File:** `src/SpreadAndRest.ts` | **Level:** Intermediate 🌳

### Concept | ধারণা

**English:**

- **Spread (`...`)** expands an array or object into individual elements/properties.
- **Rest (`...`)** collects multiple arguments into a single array parameter.

**বাংলা:**

- **Spread (`...`)** একটি array বা object-কে individual element/property-তে expand করে।
- **Rest (`...`)** একাধিক argument-কে একটি array parameter-এ collect করে।

### Code Example (from `SpreadAndRest.ts`)

```ts
// Spread in arrays
const vegetables = ["carrot", "broccoli", "spinach"];
const fruits = ["apple", "banana", "orange"];

vegetables.push(fruits); // ❌ Error! This pushes the array as a single element
vegetables.push(...fruits); // ✅ Spread — pushes each element individually
console.log(vegetables);
// ['carrot', 'broccoli', 'spinach', 'apple', 'banana', 'orange']

// Spread in objects — merge two objects
const person1 = { name: "Alice", age: 30 };
const person2 = { name: "Bob", city: "New York" };

const combinedPerson = { ...person1, ...person2 };
console.log(combinedPerson);
// { name: 'Bob', age: 30, city: 'New York' }
// Note: person2's 'name' overwrites person1's 'name'!

// Rest parameters — accept any number of arguments
const sendInvite = (friend1: string, friend2: string) => {
  console.log(`Inviting ${friend1} and ${friend2} to the party!`);
};

const foodDetailList = (...food: string[]) => {
  food.forEach((item: string) => {
    console.log(`eating ${item}`);
  });
};

foodDetailList("pizza", "burger", "pasta");
// eating pizza
// eating burger
// eating pasta
```

### Explanation | ব্যাখ্যা

**English:**

- Spread creates a **shallow copy** — nested objects are still shared by reference.
- When spreading two objects with the same key, the last one wins.
- Rest parameters (`...args: T[]`) must come last in the parameter list.
- TypeScript types rest parameters as an array of the specified type.

**বাংলা:**

- Spread **shallow copy** তৈরি করে — nested object reference হিসেবে shared থাকে।
- একই key সহ দুটো object spread করলে শেষেরটা জেতে।
- Rest parameter (`...args: T[]`) parameter list-এ সবশেষে থাকতে হবে।
- TypeScript rest parameter-কে specified type-এর array হিসেবে type করে।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: pushing an entire array as one element
const list: string[] = ["a", "b"];
const newItems = ["c", "d"];
list.push(newItems); // Type error — tries to push string[] into string

// ✅ Correct: spread to push individual items
list.push(...newItems); // pushes "c" and "d" separately

// ❌ Wrong: rest parameter not at the end
function bad(a: string, ...rest: number[], b: string) {} // Syntax error!

// ✅ Correct: rest must be last
function good(a: string, b: string, ...rest: number[]) {}
```

### ⚡ Quick Quiz

Write a typed function `mergeArrays` that takes two `number[]` arrays and returns them merged into one.

```ts
// Your answer here:
function mergeArrays(a: number[], b: number[]): number[] {
  return [...a, ...b];
}

console.log(mergeArrays([1, 2], [3, 4])); // [1, 2, 3, 4]
```

---

# 🎯 Phase 4 — Practice

---

## 1️⃣2️⃣ Test & Practice ✅

> **File:** `src/test.ts` | **Level:** All Levels 🎓

### Concept | ধারণা

**English:** The `test.ts` file is your blank canvas. It currently holds a simple sanity check — but the real learning happens when YOU experiment here. Try the quiz answers from each section, combine concepts, and break things on purpose!

**বাংলা:** `test.ts` file হলো আপনার blank canvas। এখানে একটি simple sanity check আছে — কিন্তু আসল শেখা হয় যখন আপনি নিজে experiment করেন। প্রতিটি section-এর quiz answer try করুন, concepts combine করুন এবং ইচ্ছাকৃতভাবে ভুল করুন!

### Current Content (from `test.ts`)

```ts
const hello: string = "Hello, TypeScript!";
console.log(hello);
```

### 🏋️ Practice Challenges

Try these in `test.ts` to solidify everything you've learned:

| #   | Challenge                                                                | Concepts Used           |
| --- | ------------------------------------------------------------------------ | ----------------------- |
| 1   | Create a `Product` type with `id`, `title`, `price`, optional `discount` | Type alias, optional    |
| 2   | Write a function that accepts `unknown` price and returns 10% off        | unknown, type guard     |
| 3   | Model a `Payment` union as either `CashPayment` or `CardPayment`         | Discriminated union     |
| 4   | Write a `mergeUsers` function using spread                               | Spread, generics        |
| 5   | Destructure a nested order object with renaming                          | Destructuring, aliasing |
| 6   | Write a rest-param function that sums all numbers                        | Rest, typed params      |
| 7   | Create an `Employee` interface extending a `Person` interface            | Interface, extends      |

### 💡 Pro Tips

- Run `npx tsc --watch` to get instant feedback as you type.
- Red squiggles in VS Code are your best friends — hover to read the full TypeScript error.
- TypeScript errors often tell you exactly what to fix. Read them carefully!

TypeScript errors দেখলে ভয় পাবেন না — এগুলো আপনার বন্ধু! Hover করলে full error message পাবেন।

---

## ✨ Credits

Made with ❤️ by [Pradipta Sarker](https://github.com/axiomshuvo)

> _"TypeScript-এর সাথে বন্ধুত্ব করুন — compiler আপনার পাশে আছে!"_
> _"Make friends with TypeScript — the compiler's got your back!"_
