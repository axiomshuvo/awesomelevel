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
    generic.ts            ← Phase 2.5
    constraint.ts         ← Phase 2.5
    typeAssertion.ts      ← Phase 3
    nullableUdefinedNever.ts  ← Phase 3
    destructuring.ts      ← Phase 3
    SpreadAndRest.ts      ← Phase 3
    test.ts               ← Phase 4
```

---

## 🧭 Learning Phases at a Glance

| Phase            | Level              | Goal                                                  | Topics                                                                                                                                                                                                                           |
| ---------------- | ------------------ | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Phase 1** 🌱   | Beginner           | Primitive & non-primitive types, functions, operators | Primitives, Non-Primitives (+ Literal Types, `readonly`, Labeled Tuples), Functions (+ Optional/Default Params, Overloads), `?` Operators                                                                                        |
| **Phase 2** 🌿   | Lower-Intermediate | Type modeling, reusability, contracts                 | Type Alias (+ Recursive Types), Interface (+ Array Interface), Union & Intersection (+ Discriminated Unions)                                                                                                                     |
| **Phase 2.5** 💡 | Intermediate       | Advanced modeling + decision guides                   | Alias vs Interface, Type Guards, Enums, `keyof`/`typeof`, Generics (+ Generic Constraints, Generic Classes), Utility Types, Conditional Types + `infer`, Mapped Types, Template Literal Types, `satisfies`, Indexed Access Types |
| **Phase 3** 🌳   | Intermediate       | Classes, async patterns, safety & real-world use      | Classes, Async/Await & Promise Typing, Type Assertion, Nullable/Unknown/Never, Destructuring, Spread & Rest                                                                                                                      |
| **Phase 4** 🎯   | All levels         | Revise + experiment                                   | Practice challenges                                                                                                                                                                                                              |

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
- Literal type (e.g. `"OpenAI"`) — restrict a property to one exact value
- `readonly` modifier — prevent mutation after object creation

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

// ✅ Literal type — value locked to one exact string
const userAI: { organization: "OpenAI"; role: string } = {
  organization: "OpenAI",
  role: "AI Researcher",
};
// userAI.organization = "Google"; // ❌ Error: only "OpenAI" is assignable

// ✅ readonly modifier — property cannot be reassigned after creation
const userRO: { readonly organization: string; role: string } = {
  organization: "Google",
  role: "Software Engineer",
};
// userRO.organization = "OpenAI"; // ❌ Error: Cannot assign to 'organization' (readonly)
```

### Explanation | ব্যাখ্যা

**English:**

- A typed array like `string[]` only accepts elements of that type.
- A tuple has a fixed number of elements with a specific type at each position.
- Object shapes enforce which properties must exist and their types.
- The `?` suffix makes a property optional.
- A **literal type** pins a property to one exact value (e.g. `organization: "OpenAI"`). Assigning any other string is a compiler error.
- `readonly` prevents reassignment after the object is created — great for config objects or immutable data.

**বাংলা:**

- `string[]` এর মতো typed array-এ শুধুমাত্র সেই type-এর element রাখা যাবে।
- Tuple-এ fixed সংখ্যক element থাকে, প্রতিটি position-এর type নির্দিষ্ট।
- Object shape enforce করে কোন property থাকতে হবে এবং কী type হবে।
- `?` দিলে property টি optional হয়ে যায়।
- **Literal type** একটি property-কে নির্দিষ্ট একটি value-এ আটকে দেয় (যেমন `organization: "OpenAI"`)। অন্য কোনো value দিলে compiler error হবে।
- `readonly` object তৈরির পরে property পরিবর্তন করতে দেয় না — config বা immutable data-র জন্য দারুণ।

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

### 🏷️ Labeled & Optional Tuple Elements

TypeScript 4.0+ lets you **name** each tuple position (labels are for documentation — they don't change behaviour) and mark trailing elements as **optional**.

TypeScript 4.0+ থেকে tuple-এর প্রতিটি position-এ **নাম** দেওয়া যায় (label শুধু documentation — behaviour পরিবর্তন হয় না) এবং trailing element-কে **optional** করা যায়।

```ts
// Labeled tuple — names improve VS Code tooltips
type Point = [x: number, y: number];
type RGB = [red: number, green: number, blue: number];

const origin: Point = [0, 0];
const white: RGB = [255, 255, 255];

// Optional elements — must appear AFTER all required ones
type Name = [first: string, last: string, middle?: string];

const fullName: Name = ["John", "Doe", "Paul"]; // ✅ three elements
const shortName: Name = ["John", "Doe"]; // ✅ middle omitted

// Rest elements — variable-length tail
type StringsThenNumbers = [label: string, ...values: number[]];

const row: StringsThenNumbers = ["score", 10, 20, 30]; // ✅
```

> **Tip:** Labels are just hints for callers — `type Point = [x: number, y: number]` and `type Point = [number, number]` are structurally identical.
>
> **টিপ:** Label শুধু caller-কে সাহায্য করে — `[x: number, y: number]` এবং `[number, number]` structurally same।

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

### 🎛️ Optional & Default Parameters

Optional parameters use `?` — the caller may omit them.
Default parameters supply a fallback value when the argument is absent or `undefined`.

Optional parameter `?` ব্যবহার করলে caller সেটা না দিলেও চলে।
Default parameter-এ fallback value থাকে — argument না দিলে বা `undefined` দিলে সেটা ব্যবহৃত হয়।

```ts
// Optional parameter — greeting? is string | undefined inside the function
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Alice", "Hi")); // "Hi, Alice!"

// Default parameter — implicit type is inferred from the default value
function repeat(text: string, times: number = 3): string {
  return text.repeat(times);
}

console.log(repeat("ha")); // "hahaha"   (times defaults to 3)
console.log(repeat("ha", 2)); // "haha"

// Default + explicit type annotation
function createId(prefix: string = "user", id: number): string {
  return `${prefix}_${id}`;
}

console.log(createId(undefined, 42)); // "user_42" — undefined triggers default
console.log(createId("admin", 1)); // "admin_1"
```

**English:**

- `?` makes a parameter `T | undefined` inside the function — you must guard before using it.
- Default values provide a built-in fallback and also make the parameter optional at the call site.
- `undefined` at the call site always triggers the default; `null` does **not**.
- Default parameters must come **after** required parameters (or be the last ones).

**বাংলা:**

- `?` parameter-কে `T | undefined` করে — ব্যবহারের আগে guard করতে হবে।
- Default value built-in fallback দেয় এবং call site-এ parameter-কে optional-ও করে।
- Call site-এ `undefined` দিলে default trigger হয়; কিন্তু `null` দিলে হয় না।
- Default parameter required parameter-এর পরে আসতে হবে।

### 🔀 Function Overloads

Function overloads let you declare **multiple typed call signatures** for a single function. TypeScript uses the overload signatures for type checking; the single implementation signature does the actual work.

Function overload দিয়ে একটি function-এর জন্য **একাধিক typed call signature** declare করা যায়। TypeScript type checking-এ overload signature ব্যবহার করে; actual কাজ করে implementation signature।

```ts
// Overload signatures (what callers see)
function format(value: string): string;
function format(value: number, decimals: number): string;

// Implementation signature (not visible to callers directly)
function format(value: string | number, decimals?: number): string {
  if (typeof value === "string") return value.trim();
  return value.toFixed(decimals ?? 2);
}

console.log(format("  hello  ")); // "hello"
console.log(format(3.14159, 2)); // "3.14"
// format(true);                   // ❌ Error: no overload matches boolean

// Practical example — overloads for a DOM query helper
function query(selector: string): Element | null;
function query(selector: string, all: true): NodeList;
function query(selector: string, all?: boolean): Element | null | NodeList {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}
```

**English:**

- Write overload signatures first (2+), then one implementation that handles all cases.
- Callers only see the overload signatures — the implementation signature is hidden.
- Overloads are better than a large union return type when different inputs produce distinctly different outputs.

**বাংলা:**

- প্রথমে overload signature (২টা বা বেশি) লিখুন, তারপর একটি implementation যা সব case handle করে।
- Caller শুধু overload signature দেখে — implementation signature hidden থাকে।
- যখন ভিন্ন input থেকে distinctly ভিন্ন output আসে, তখন বড় union return type-এর চেয়ে overload ভালো।

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

### 🆚 `?.` vs `??` vs `||` vs `!` — Quick Decision

All four look "null-related" but serve very different purposes:

| Operator | Name               | Triggers on                                         | Safe?      | Use when...                                          |
| -------- | ------------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------- |
| `?.`     | Optional chaining  | missing property/call                               | ✅ yes     | Accessing nested props that might not exist          |
| `??`     | Nullish coalescing | `null` or `undefined` only                          | ✅ yes     | Fallback when value is explicitly absent             |
| `\|\|`   | Logical OR         | any falsy (`0`, `""`, `false`, `null`, `undefined`) | ⚠️ careful | Fallback when ANY falsy value should use the default |
| `!`      | Non-null assertion | nothing (compile-time only)                         | ❌ risky   | Telling TS "definitely not null" — you take the risk |

```ts
const user = {
  score: 0,
  address: undefined as { city: string } | undefined,
};

// ?. — safe access, returns undefined instead of crashing
const city = user.address?.city; // undefined ✅

// ?? — fallback only for null/undefined, 0 is NOT affected
const score1 = user.score ?? 100; // 0   ✅ (0 is not null/undefined)
const score2 = user.score || 100; // 100 ❌ BUG: 0 is falsy, fallback triggers!

// Combining ?. and ??
const label = user.address?.city ?? "Unknown City"; // "Unknown City" ✅

// ! — non-null assertion, you promise TS it's not null
const btn = document.getElementById("btn")!; // ❌ risky: crashes if element is absent
```

**`?.` ব্যবহার করুন যখন:** nested property access-এ crash ছাড়া `undefined` চান।
**`??` ব্যবহার করুন যখন:** `null`/`undefined`-এর জন্য fallback দরকার কিন্তু `0` বা `""` valid value।
**`||` ব্যবহার করুন যখন:** যেকোনো falsy value (খালি string, 0, false)-এর জন্য fallback দরকার।
**`!` ব্যবহার করুন যখন:** আপনি ১০০% নিশ্চিত value টা `null`/`undefined` না।

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

### 🔁 Recursive Types

A type alias can reference itself — ideal for tree-like or nested data structures.

একটি type alias নিজেকেই reference করতে পারে — tree বা nested structure-এর জন্য কাজে আসে।

```ts
// (from src/typeAlias.ts)
type TreeNode = {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
};

const rootNode: TreeNode = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 },
  },
  right: { value: 3 },
};
```

> **Note:** `interface` also supports self-reference, but `type` is the more common choice for recursive aliases.

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

// Array interface — index signature describes array-like structures
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Hello", "World"];
console.log(myArray[0]); // "Hello"
console.log(myArray[1]); // "World"
```

### Explanation | ব্যাখ্যা

**English:**

- Interfaces are best for **object shapes** — they cannot describe primitive types directly.
- `extends` lets one interface inherit all properties of another, then add more.
- A function interface describes a callable — useful for defining callback contracts.
- You can mix `interface` and `type` with `&` (intersection) to combine both.
- An **array interface** uses an index signature (`[index: number]: T`) to describe array-like structures.

**বাংলা:**

- Interface সবচেয়ে ভালো **object shape** describe করার জন্য — primitive type-এর জন্য সরাসরি ব্যবহার করা যায় না।
- `extends` দিয়ে একটি interface অন্যটির সব property inherit করে নতুন property যোগ করতে পারে।
- Function interface একটি callable describe করে — callback contract define করার জন্য কাজে আসে।
- `interface` এবং `type` কে `&` দিয়ে combine করা যায়।
- **Array interface** index signature (`[index: number]: T`) ব্যবহার করে array-like structure type করে।

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

### 🎯 Discriminated Unions

A discriminated union is a union of object types that all share one **literal property** (the "discriminant"). TypeScript narrows the union automatically when you check that property.

Discriminated union হলো এমন object type-এর union যেগুলোর একটি **shared literal property** (discriminant) আছে। সেই property check করলে TypeScript স্বয়ংক্রিয়ভাবে union narrow করে।

```ts
// Each variant has a unique 'kind' discriminant
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Triangle = { kind: "triangle"; base: number; height: number };

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // TS knows: Circle
    case "square":
      return shape.side ** 2; // TS knows: Square
    case "triangle":
      return 0.5 * shape.base * shape.height; // TS knows: Triangle
    default:
      const _exhaustive: never = shape; // ✅ compile error if a new variant is added
      return _exhaustive;
  }
}

console.log(getArea({ kind: "circle", radius: 5 })); // 78.53...
console.log(getArea({ kind: "square", side: 4 })); // 16
console.log(getArea({ kind: "triangle", base: 6, height: 3 })); // 9

// Real-world: API result union
type Success = { status: "ok"; data: string[] };
type Failure = { status: "error"; message: string };
type ApiResult = Success | Failure;

function handle(res: ApiResult): string {
  if (res.status === "ok") return res.data.join(", "); // TS knows: Success
  return `Error: ${res.message}`; // TS knows: Failure
}
```

**English:**

- The discriminant must be a **literal type** (`"circle"`, `200`, `true`) — not a broad type like `string`.
- Use `switch` on the discriminant for exhaustive checking — the `never` default catches unhandled variants at compile time.
- This pattern replaces fragile `instanceof` checks and `as` casts with safe, self-documenting code.

**বাংলা:**

- Discriminant অবশ্যই **literal type** হতে হবে (`"circle"`, `200`, `true`) — `string`-এর মতো broad type হলে কাজ করবে না।
- `switch`-এ `never` default ব্যবহার করুন — নতুন variant যোগ হলে compile time-এ error ধরা পড়বে।
- এই pattern `instanceof` check এবং `as` cast-এর চেয়ে safe এবং self-documenting।

---

# 💡 Phase 2.5 — Advanced Modeling

---

## 8️⃣ 🆚 Type Alias vs Interface

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** Both `type` and `interface` can describe the shape of an object — but they're not identical. Choosing the wrong one is one of the most common TypeScript style mistakes. Here's a clear decision guide.

**বাংলা:** `type` এবং `interface` দুটোই object-এর shape describe করতে পারে — কিন্তু এরা একরকম না। ভুলটা বেছে নেওয়া TypeScript-এর সবচেয়ে common style mistake-এর একটি। এখানে একটি পরিষ্কার decision guide আছে।

### Feature Comparison Table | পার্থক্যের তালিকা

| Feature                           | `interface`                       | `type`                                      |
| --------------------------------- | --------------------------------- | ------------------------------------------- |
| Object shapes                     | ✅                                | ✅                                          |
| Primitive / union / tuple aliases | ❌                                | ✅                                          |
| `extends` (inheritance)           | ✅ `interface B extends A`        | ✅ `type B = A & { ... }`                   |
| Declaration merging               | ✅ (two `interface Foo {}` merge) | ❌ (duplicate = error)                      |
| Computed property names           | ❌                                | ✅                                          |
| Implements in classes             | ✅                                | ✅                                          |
| Recommended for...                | Object contracts, OOP, libraries  | Unions, intersections, computed, primitives |

### Side-by-Side Code Example

```ts
// ── Same object shape ─────────────────────────────

// Using interface
interface UserI {
  id: number;
  name: string;
  email?: string;
}

// Using type alias — looks almost identical
type UserT = {
  id: number;
  name: string;
  email?: string;
};

// ── Extending ─────────────────────────────────────

// interface: clean extends keyword
interface AdminI extends UserI {
  role: "admin";
}

// type: intersection with &
type AdminT = UserT & { role: "admin" };

// ── Declaration merging (interface only!) ──────────
interface Window {
  myPlugin: () => void; // adds to existing Window type!
}
// type Window = { myPlugin: () => void }; // ❌ Error: duplicate identifier

// ── Union / Primitive (type only!) ────────────────
type Status = "active" | "inactive" | "banned"; // ✅
// interface Status = "active" | ...            // ❌ Not possible

type ID = string | number; // ✅ only type can do this

// ── Generics work with both ────────────────────────
interface ApiResponse<T> {
  data: T;
  status: number;
}

type ApiResult<T> = {
  data: T;
  ok: boolean;
};
```

### When to Use Which | কোনটা কখন ব্যবহার করবেন

**Use `interface` when:**

- Describing the shape of an **object or class**
- You need **declaration merging** (e.g. augmenting global types)
- Writing a **public API / library** (interfaces are more extendable)
- You want `extends` for clean inheritance

**`interface` ব্যবহার করুন যখন:**

- Object বা class-এর shape describe করছেন
- Declaration merging দরকার (যেমন global type augment)
- Public API / library লিখছেন
- `extends` দিয়ে পরিষ্কার inheritance চান

---

**Use `type` when:**

- Defining **unions** (`"admin" | "user"`)
- Defining **intersections** as a one-liner
- Aliasing **primitives** (`type ID = string | number`)
- Using **computed / conditional / mapped** types
- Creating **tuple** type aliases

**`type` ব্যবহার করুন যখন:**

- Union define করছেন
- Intersection one-liner হিসেবে করছেন
- Primitive alias করছেন (`type ID = string | number`)
- Computed / conditional / mapped type ব্যবহার করছেন
- Tuple type alias বানাচ্ছেন

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using type for everything including extendable objects
type Animal = { name: string };
type Dog = Animal & { breed: string }; // works but loses declaration merging

// ✅ Better for OOP-style extension:
interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

// ❌ Wrong: trying to create a union with interface
interface Status = "active" | "inactive"; // Syntax error!

// ✅ Correct: use type for unions
type Status = "active" | "inactive";

// ❌ Wrong: accidentally merging a type (silently ignored)
type Config = { debug: boolean };
type Config = { verbose: boolean }; // ❌ Error: duplicate identifier

// ✅ interface merges intentionally:
interface Config { debug: boolean; }
interface Config { verbose: boolean; } // ✅ Config now has both!
```

### ⚡ Quick Quiz

Decide: `type` or `interface` for each?

```ts
// 1. A shape for a database row with id, name, createdAt
// Answer: interface (object shape, likely extended)
interface Row {
  id: number;
  name: string;
  createdAt: Date;
}

// 2. A variable that can be a string or number
// Answer: type (union)
type ID = string | number;

// 3. An HTTP method literal
// Answer: type (union of literals)
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// 4. A shape you'll augment in multiple files
// Answer: interface (declaration merging)
interface AppConfig {
  theme: string;
}
```

### 🆚 `interface extends` vs `type &` — Extending / Composing Types

Both extend a shape — but they behave differently when properties conflict:

|                            | `interface extends`                         | `type &` (intersection)                     |
| -------------------------- | ------------------------------------------- | ------------------------------------------- |
| Conflicting property types | ❌ Error at definition — caught immediately | ⚠️ Silently becomes `never` — hard to debug |
| Multiple inheritance       | `interface C extends A, B { }`              | `type C = A & B & { }`                      |
| Works with non-objects     | ❌ Interface only                           | ✅ Can intersect any types                  |
| Readability                | ✅ Clear OOP inheritance intent             | ✅ Concise, great for one-liners            |

```ts
// interface extends — clean, conflicts caught at compile time
interface Shape {
  color: string;
}
interface Named {
  name: string;
}
interface ColoredShape extends Shape, Named {
  size: number;
} // ✅

// type & — property conflict silently becomes `never`
type A = { id: string };
type B = { id: number };
type C = A & B;
// C.id is: string & number = never  ← silent problem, no TS error at definition!

// interface extends catches conflicts immediately:
interface X {
  id: string;
}
// interface Y extends X { id: number; } // ❌ Error: not assignable to type 'string'
```

**`interface extends` ব্যবহার করুন যখন:** OOP-style inheritance চান, property conflict ধরতে চান, বা multiple base type আছে।
**`type &` ব্যবহার করুন যখন:** quick one-liner composition দরকার, বা type alias-এর সাথে compose করছেন।

---

## 9️⃣ Type Guards 🔍

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** A type guard is any expression that narrows a type at runtime. Instead of asserting `as string`, you _prove_ to TypeScript what type you're dealing with — making your code safer and crash-free.

**বাংলা:** Type guard হলো এমন expression যা runtime-এ type narrow করে। `as string` দিয়ে assert করার বদলে TypeScript-কে _প্রমাণ_ করে দেন — এতে code আরও safe হয় এবং crash হয় না।

### Types of Guards | Guard-এর ধরন

| Guard        | Syntax                          | Use case                 |
| ------------ | ------------------------------- | ------------------------ |
| `typeof`     | `typeof x === "string"`         | Primitives               |
| `instanceof` | `x instanceof Date`             | Class instances          |
| Custom `is`  | `function isUser(x): x is User` | Object shapes            |
| `in`         | `"name" in x`                   | Check property existence |

### Code Example

```ts
// typeof guard — narrows primitives
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // TS knows: value is string here
  }
  if (typeof value === "number") {
    return value.toFixed(2); // TS knows: value is number here
  }
  return String(value); // TS knows: value is boolean here
}

// instanceof guard — narrows class instances
function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString(); // TS knows: value is Date here
  }
  return value; // TS knows: value is string here
}

// Custom type guard with 'is' keyword
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function isCat(animal: Cat | Dog): animal is Cat {
  return "meow" in animal;
}

function makeSound(animal: Cat | Dog): void {
  if (isCat(animal)) {
    animal.meow(); // TS knows: animal is Cat
  } else {
    animal.bark(); // TS knows: animal is Dog
  }
}

// 'in' guard — check if a property exists
type Admin = { role: "admin"; permissions: string[] };
type Guest = { role: "guest" };

function describe(user: Admin | Guest): string {
  if ("permissions" in user) {
    return `Admin with ${user.permissions.length} permissions`;
  }
  return "Guest user";
}
```

### Explanation | ব্যাখ্যা

**English:**

- After a `typeof` / `instanceof` / `in` check, TypeScript **automatically narrows** the type inside the `if` block — you don't need `as`.
- Custom `is` guards let you teach TypeScript about your own types.
- Prefer guards over assertions (`as`) — guards are runtime-safe, assertions are not.

**বাংলা:**

- `typeof` / `instanceof` / `in` check-এর পরে `if` block-এর ভেতরে TypeScript **স্বয়ংক্রিয়ভাবে** type narrow করে — `as` লাগে না।
- Custom `is` guard দিয়ে TypeScript-কে আপনার নিজের type সম্পর্কে শেখাতে পারেন।
- Assertion (`as`) এর চেয়ে guard prefer করুন — guard runtime-safe, assertion নয়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using 'as' instead of narrowing
function getLength(val: string | number) {
  return (val as string).length; // runtime crash if val is actually a number!
}

// ✅ Correct: use typeof guard
function getLength2(val: string | number): number {
  if (typeof val === "string") return val.length;
  return val.toString().length;
}

// ❌ Wrong: forgetting that 'typeof null === "object"'
function isObject(x: unknown): boolean {
  return typeof x === "object"; // null also returns "object"!
}

// ✅ Correct: check for null too
function isObject2(x: unknown): x is object {
  return typeof x === "object" && x !== null;
}
```

### ⚡ Quick Quiz

Write a custom type guard `isString` that returns `true` if the value is a string.

```ts
// Your answer:
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Usage:
const input: unknown = "hello";
if (isString(input)) {
  console.log(input.toUpperCase()); // TS knows it's a string — safe!
}
```

---

## 1️⃣0️⃣ Enums 🔢

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** An `enum` lets you define a set of named constants. Instead of passing magic strings or numbers around, you reference a readable name. TypeScript supports numeric enums, string enums, and `const enum` for zero-cost abstractions.

**বাংলা:** `enum` দিয়ে named constant-এর একটি set define করা যায়। Magic string বা number pass করার বদলে একটি readable name reference করেন। TypeScript-এ numeric enum, string enum এবং zero-cost `const enum` আছে।

### Code Example

```ts
// Numeric enum — values are 0, 1, 2, 3 by default
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

function move(dir: Direction): string {
  if (dir === Direction.Up) return "Moving up!";
  if (dir === Direction.Down) return "Moving down!";
  return "Moving sideways!";
}

console.log(move(Direction.Up)); // "Moving up!"
console.log(Direction.Up); // 0  ← the actual value
console.log(Direction[0]); // "Up"  ← reverse mapping

// String enum — explicit values, no reverse mapping
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Banned = "BANNED",
}

function getLabel(status: Status): string {
  return `User is: ${status}`; // e.g. "User is: ACTIVE"
}

console.log(getLabel(Status.Active)); // "User is: ACTIVE"

// const enum — fully inlined at compile time (no JS object emitted)
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}

const code: HttpStatus = HttpStatus.OK; // compiles to: const code = 200;
```

### Explanation | ব্যাখ্যা

**English:**

- **Numeric enums** auto-increment from 0. You can access them forward (`Direction.Up → 0`) AND backward (`Direction[0] → "Up"`).
- **String enums** are more readable in logs and serialized data. No reverse mapping.
- **`const enum`** is inlined at compile time — no JS object is generated, so there's zero runtime overhead.
- Many modern TS projects prefer a **union of string literals** over enums (e.g. `type Status = "ACTIVE" | "INACTIVE"`) — they're simpler and don't require an import.

**বাংলা:**

- **Numeric enum** 0 থেকে auto-increment হয়। Forward (`Direction.Up → 0`) এবং backward (`Direction[0] → "Up"`) দুভাবে access করা যায়।
- **String enum** log এবং serialized data-তে বেশি readable। Reverse mapping নেই।
- **`const enum`** compile time-এ inline হয় — কোনো JS object তৈরি হয় না, তাই runtime overhead শূন্য।
- অনেক modern TS project enum-এর বদলে **string literal union** prefer করে (`type Status = "ACTIVE" | "INACTIVE"`) — এগুলো simpler এবং import লাগে না।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: numeric enum value leaks — 9 is not a valid Direction
function move(dir: Direction) { ... }
move(9); // TypeScript allows this! 9 is assignable to numeric enum

// ✅ Better: use string enum or union for strict values
type Dir = "Up" | "Down" | "Left" | "Right";
function move2(dir: Dir) { ... }
move2("diagonal"); // ❌ Error — only the four valid strings allowed

// ❌ Wrong: using const enum across module boundaries (can cause issues)
// const enum MyEnum { A = 1 }  ← avoid in .d.ts files and across packages
```

### ⚡ Quick Quiz

Create a string enum `Color` with values `Red = "RED"`, `Green = "GREEN"`, `Blue = "BLUE"`. Write a function that returns the hex code for each.

```ts
// Your answer:
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

function toHex(color: Color): string {
  const map: Record<Color, string> = {
    [Color.Red]: "#FF0000",
    [Color.Green]: "#00FF00",
    [Color.Blue]: "#0000FF",
  };
  return map[color];
}

console.log(toHex(Color.Red)); // "#FF0000"
```

### 🆚 `enum` vs `const enum` vs String Literal Union — Which to Choose?

|                           | `enum`                    | `const enum`            | String Literal Union         |
| ------------------------- | ------------------------- | ----------------------- | ---------------------------- |
| Generates JS object       | ✅ Yes                    | ❌ Fully inlined        | ❌ Type-only, erased         |
| Runtime overhead          | Small                     | None                    | None                         |
| Reverse mapping           | ✅ Numeric only           | ❌                      | ❌                           |
| Plain string assignable   | ❌ Must use `Enum.Value`  | ❌                      | ✅ `"active"` works directly |
| Safe across packages      | ✅                        | ⚠️ Avoid in `.d.ts`     | ✅                           |
| **Best for new projects** | ⚠️ Legacy / numeric flags | ⚠️ Performance-critical | ✅ **Default choice**        |

```ts
// enum — generates a real JS object, must use Enum.Value
enum Role {
  Admin = "ADMIN",
  User = "USER",
}
const r: Role = Role.Admin; // ✅
// const r2: Role = "ADMIN"; // ❌ Not assignable to type 'Role'

// const enum — fully inlined, zero JS output
const enum Dir {
  Up = "UP",
  Down = "DOWN",
}
const d = Dir.Up; // compiles to: const d = "UP"

// String literal union — simplest, most flexible, no import needed
type Status = "active" | "inactive" | "banned";
const s: Status = "active"; // ✅ plain string works
// const s2: Status = "deleted"; // ❌ still type-safe
```

**`enum` ব্যবহার করুন যখন:** legacy codebase, numeric bit flags, বা runtime-এ enum object দরকার।
**`const enum` ব্যবহার করুন যখন:** same package-এর ভেতরে performance-critical constants।
**String literal union ব্যবহার করুন যখন:** নতুন TypeScript project-এ — সবচেয়ে simple, import লাগে না।

---

## 1️⃣1️⃣ `keyof` & `typeof` Operators 🗝️

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** `keyof` and `typeof` are TypeScript's type-level introspection operators. They let you derive types from existing structures rather than writing them by hand — a key skill for writing DRY, maintainable code.

**বাংলা:** `keyof` এবং `typeof` হলো TypeScript-এর type-level introspection operator। এগুলো দিয়ে existing structure থেকে type derive করা যায় — হাতে type লিখতে হয় না। এটি DRY, maintainable code লেখার একটি গুরুত্বপূর্ণ skill।

### Code Example

```ts
// keyof — extract all keys of a type as a union
type User = {
  id: number;
  name: string;
  email: string;
};

type UserKeys = keyof User; // "id" | "name" | "email"

// Practical use: type-safe property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

const name = getProperty(user, "name"); // ✅ type: string
const id = getProperty(user, "id"); // ✅ type: number
// getProperty(user, "age");             // ❌ Error: "age" not in User

// typeof — capture the type of a value at type-level
const config = {
  theme: "dark",
  language: "en",
  version: 3,
} as const;

type Config = typeof config;
// { readonly theme: "dark"; readonly language: "en"; readonly version: 3 }

type ConfigKey = keyof typeof config; // "theme" | "language" | "version"

// Combining keyof + typeof — bridge runtime values to compile-time types
const ROUTES = {
  home: "/",
  about: "/about",
  contact: "/contact",
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES]; // "/" | "/about" | "/contact"

function navigate(route: Route): void {
  console.log(`Navigating to ${route}`);
}

navigate("/about"); // ✅
navigate("/unknown"); // ❌ Error: not a valid route
```

### Explanation | ব্যাখ্যা

**English:**

- `keyof T` gives you a union of all property names of type `T` — great for type-safe property access functions.
- `typeof value` gives you the TypeScript type of any value — great for deriving types from constants.
- Combining `typeof ROUTES[keyof typeof ROUTES]` is a powerful pattern for extracting all _values_ of an object as a union type.
- `as const` makes all properties `readonly` and narrows string literals — essential for `typeof` to be useful.

**বাংলা:**

- `keyof T` type `T`-এর সব property name-এর union দেয় — type-safe property access function-এর জন্য দারুণ।
- `typeof value` যেকোনো value-এর TypeScript type দেয় — constant থেকে type derive করার জন্য দারুণ।
- `typeof ROUTES[keyof typeof ROUTES]` হলো object-এর সব _value_-এর union বের করার powerful pattern।
- `as const` সব property `readonly` করে এবং string literal narrow করে — `typeof`-কে useful করার জন্য এটা essential।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: confusing typeof at runtime vs type-level
const x = 42;
console.log(typeof x); // "number" ← runtime JS (string result)
type T = typeof x; // number   ← type-level TS (the type itself)

// ❌ Wrong: keyof on a value instead of a type
const user = { name: "Alice" };
type K = keyof user; // ❌ Error: 'user' refers to a value, not a type
type K2 = keyof typeof user; // ✅ Correct

// ❌ Wrong: not using 'as const' — loses literal types
const COLORS = { red: "RED", blue: "BLUE" };
type Color = (typeof COLORS)[keyof typeof COLORS]; // string (too wide!)

// ✅ Correct: use 'as const'
const COLORS2 = { red: "RED", blue: "BLUE" } as const;
type Color2 = (typeof COLORS2)[keyof typeof COLORS2]; // "RED" | "BLUE" ✅
```

### ⚡ Quick Quiz

Given the object `const sizes = { sm: 8, md: 16, lg: 24 } as const`, write a type `SizeKey` for the keys and `SizeValue` for the values.

```ts
// Your answer:
const sizes = { sm: 8, md: 16, lg: 24 } as const;

type SizeKey = keyof typeof sizes; // "sm" | "md" | "lg"
type SizeValue = (typeof sizes)[keyof typeof sizes]; // 8 | 16 | 24
```

---

## 1️⃣2️⃣ Generics 🧬

> **File:** `src/generic.ts` | **Level:** Intermediate 💡

### Concept | ধারণা

**English:** Generics let you write **one piece of code that works with any type** while still being fully type-safe. Think of `<T>` as a placeholder — the caller decides what `T` actually is. Without generics, you'd either repeat the same code for every type, or lose type safety with `any`.

**বাংলা:** Generics দিয়ে **একটি code বিভিন্ন type-এ কাজ করে** — কিন্তু type safety বজায় থাকে। `<T>` কে placeholder হিসেবে ভাবুন — caller ঠিক করে `T` কী হবে। Generics ছাড়া প্রতিটি type-এর জন্য আলাদা code লিখতে হতো, অথবা `any` দিয়ে type safety হারাতে হতো।

### Code Example (from `src/generic.ts`)

```ts
// Generic function — works with any type T
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("hello")); // "hello" — T = string
console.log(identity<number>(42)); // 42      — T = number
console.log(identity(true)); // true    — T inferred as boolean

// Generic function with multiple type params
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair("age", 30); // [string, number]

// Generic interface — reusable API response shape
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

// Generic with constraint — T must have a 'length' property
function logLength<T extends { length: number }>(value: T): T {
  console.log(`Length: ${value.length}`);
  return value;
}

logLength("hello"); // ✅ string has .length
logLength([1, 2, 3]); // ✅ array has .length
// logLength(42);          // ❌ Error: number has no .length

// Generic type alias
type Maybe<T> = T | null | undefined;

const username: Maybe<string> = null; // ✅
const userId: Maybe<number> = 42; // ✅

// Generic with default type
interface Wrapper<T = string> {
  value: T;
}

const w1: Wrapper = { value: "hello" }; // T defaults to string
const w2: Wrapper<number> = { value: 99 }; // T = number

// Generic class — same concept applied to classes
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const stringBox = new Box<string>("Hello, World!");
const numberBox = new Box<number>(42);

console.log(stringBox.getValue()); // "Hello, World!" — T = string
console.log(numberBox.getValue()); // 42              — T = number
```

### Explanation | ব্যাখ্যা

**English:**

- `<T>` is a **type parameter** — like a function parameter but for types.
- TypeScript can often **infer** `T` from the argument — you don't always need to write `<string>` explicitly.
- `T extends SomeType` **constrains** what `T` can be — great for ensuring the value has certain properties.
- Generics are the right tool when you find yourself copy-pasting the same function with different types.
- **Generic classes** work the same way — `T` is resolved when the class is instantiated with `new Box<string>(...)`.

**বাংলা:**

- `<T>` হলো **type parameter** — function parameter-এর মতো, কিন্তু type-এর জন্য।
- TypeScript প্রায়ই argument থেকে `T` **infer** করে নিতে পারে — সবসময় `<string>` লিখতে হয় না।
- `T extends SomeType` দিয়ে `T` কী হতে পারে তা **constrain** করা যায় — value-এ নির্দিষ্ট property আছে কিনা নিশ্চিত করার জন্য দারুণ।
- যখন একই function বিভিন্ন type-এর জন্য copy-paste করছেন, generic ব্যবহার করার সময় এসেছে।
- **Generic class**-এও একই ধারণা কাজ করে — `new Box<string>(...)` call করার সময় `T` resolve হয়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using 'any' instead of generics — loses type safety
function wrap(value: any): any {
  return { value };
}

const result = wrap(42);
result.value.toFixed(2); // No error at compile time, but risky

// ✅ Correct: use generic
function wrap2<T>(value: T): { value: T } {
  return { value };
}

const result2 = wrap2(42);
result2.value.toFixed(2); // ✅ TypeScript knows value is number

// ❌ Wrong: over-constraining generics unnecessarily
function first<T extends string[]>(arr: T): string {
  return arr[0]; // Why constrain to string[]? Makes it less reusable
}

// ✅ Better:
function first2<T>(arr: T[]): T {
  return arr[0]; // Works for any array type
}
```

### ⚡ Quick Quiz

Write a generic function `getFirst` that accepts an array of any type and returns the first element.

```ts
// Your answer:
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(getFirst([10, 20, 30])); // 10 — T inferred as number
console.log(getFirst(["a", "b", "c"])); // "a" — T inferred as string
console.log(getFirst([])); // undefined
```

### 🔒 Generic Constraints (`T extends`)

A **constraint** limits what types `T` can be. Without one, TypeScript treats `T` as completely unknown. With `T extends SomeType`, you can safely access properties that `SomeType` guarantees.

**Constraint** দিয়ে `T` কী হতে পারে তা সীমিত করা হয়। Constraint না থাকলে TypeScript `T`-কে সম্পূর্ণ unknown মনে করে। `T extends SomeType` দিলে `SomeType`-এর property safely access করা যায়।

```ts
// ❌ Without constraint — TypeScript can't trust T has any properties
function getLength<T>(value: T): number {
  return value.length; // ❌ Error: Property 'length' does not exist on type 'T'
}

// ✅ With constraint — T must have a 'length' property
function getLength2<T extends { length: number }>(value: T): number {
  return value.length; // ✅ safe
}

getLength2("hello"); // 5   — string satisfies { length: number }
getLength2([1, 2, 3]); // 3   — array satisfies { length: number }
// getLength2(42);         // ❌ Error: number has no 'length'

// Constraint with keyof — type-safe property lookup
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice", email: "alice@example.com" };
const name = getProperty(user, "name"); // ✅ type: string
const id = getProperty(user, "id"); // ✅ type: number
// getProperty(user, "age");               // ❌ Error: "age" not in typeof user

// Multiple constraints with &
interface HasId {
  id: number;
}
interface HasName {
  name: string;
}

function display<T extends HasId & HasName>(item: T): string {
  return `[${item.id}] ${item.name}`;
}

display({ id: 1, name: "Widget", price: 9.99 }); // ✅ extra props are fine
// display({ id: 1 });                            // ❌ Error: missing 'name'

// Constraint to a specific set of types
function double<T extends number | string>(value: T): T {
  if (typeof value === "number") return (value * 2) as T;
  return (value + value) as T;
}

console.log(double(5)); // 10
console.log(double("ha")); // "haha"
// double(true);               // ❌ Error: boolean not in number | string
```

**⚠️ Common Mistakes**

```ts
// ❌ Wrong: forgetting the constraint, then using a property
function first<T>(arr: T[]): string {
  return arr[0].toUpperCase(); // ❌ T could be number, boolean, etc.
}

// ✅ Correct: constrain T to string
function first2<T extends string>(arr: T[]): string {
  return arr[0].toUpperCase(); // ✅ T is guaranteed to be a string
}
```

**⚡ Quick Quiz**

Write a generic function `merge<T, U>` that merges two objects. Constrain both type params to `object`.

```ts
// Answer:
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const result = merge({ name: "Alice" }, { age: 30 });
// result: { name: string; age: number }
```

---

## 1️⃣3️⃣ Utility Types 🛠️

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** TypeScript ships with a set of built-in **utility types** — generic helpers that transform existing types into new ones. They save you from manually rewriting shapes and are used constantly in real-world projects.

**বাংলা:** TypeScript-এ built-in **utility type**-এর একটি set আছে — generic helper যা existing type থেকে নতুন type তৈরি করে। এগুলো manually shape rewrite করা থেকে বাঁচায় এবং real-world project-এ সবসময় ব্যবহৃত হয়।

### Most Important Utility Types | সবচেয়ে গুরুত্বপূর্ণ

| Utility          | What it does                      | উদাহরণ                 |
| ---------------- | --------------------------------- | ---------------------- |
| `Partial<T>`     | All properties become optional    | Form drafts            |
| `Required<T>`    | All properties become required    | Validated records      |
| `Readonly<T>`    | All properties become readonly    | Immutable config       |
| `Pick<T, K>`     | Keep only selected keys           | Public-safe subset     |
| `Omit<T, K>`     | Remove selected keys              | Strip sensitive fields |
| `Record<K, V>`   | Map keys to values                | Lookup tables          |
| `Exclude<T, U>`  | Remove from a union               | Filter union members   |
| `NonNullable<T>` | Remove null/undefined             | Guaranteed values      |
| `ReturnType<F>`  | Extract return type of a function | Infer from function    |

### Code Example

```ts
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
};

// Partial — all fields become optional (great for update payloads)
type UserUpdate = Partial<User>;
const update: UserUpdate = { name: "Bob" }; // ✅ Only name provided

// Required — all fields become required (reverse of Partial)
type FullUser = Required<User>;
// age is now required, not optional

// Readonly — prevent mutation
type ImmutableUser = Readonly<User>;
const frozen: ImmutableUser = {
  id: 1,
  name: "Alice",
  email: "a@b.com",
  password: "x",
};
// frozen.name = "Bob"; // ❌ Error: cannot assign to readonly property

// Pick — keep only certain fields (e.g. public profile)
type PublicUser = Pick<User, "id" | "name">;
const profile: PublicUser = { id: 1, name: "Alice" };

// Omit — remove certain fields (e.g. strip password)
type SafeUser = Omit<User, "password">;
const safeUser: SafeUser = { id: 1, name: "Alice", email: "a@b.com" };

// Record — create a key-value map
type RolePermissions = Record<"admin" | "editor" | "viewer", string[]>;
const perms: RolePermissions = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

// Exclude — remove specific members from a union
type AllRoles = "admin" | "editor" | "viewer" | "banned";
type ActiveRoles = Exclude<AllRoles, "banned">; // "admin" | "editor" | "viewer"

// NonNullable — remove null and undefined from a type
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

// ReturnType — infer the return type of a function
function createUser(name: string, age: number) {
  return { id: Math.random(), name, age, createdAt: new Date() };
}

type CreatedUser = ReturnType<typeof createUser>;
// { id: number; name: string; age: number; createdAt: Date }
```

### Explanation | ব্যাখ্যা

**English:**

- Utility types are all built on **generics and mapped types** internally.
- `Partial` and `Omit` are especially common — use `Partial` for PATCH request bodies, `Omit` to strip sensitive fields before sending data to clients.
- `ReturnType<typeof fn>` is gold when you want to type something based on what a function returns without duplicating the type definition.

**বাংলা:**

- Utility type-গুলো ভেতরে ভেতরে **generics এবং mapped type** দিয়ে তৈরি।
- `Partial` এবং `Omit` সবচেয়ে বেশি ব্যবহৃত — PATCH request body-র জন্য `Partial`, client-এ data পাঠানোর আগে sensitive field বাদ দিতে `Omit`।
- `ReturnType<typeof fn>` অত্যন্ত useful — function কী return করে তার উপর ভিত্তি করে type করতে চাইলে type definition duplicate করতে হয় না।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: manually rewriting Partial — duplicates work
type UserUpdate = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}; // If User changes, you have to update this too!

// ✅ Correct: derive it
type UserUpdate = Partial<User>; // stays in sync automatically

// ❌ Wrong: using Pick with a key that doesn't exist
type Bad = Pick<User, "nickname">; // ❌ Error: "nickname" is not in User

// ❌ Wrong: Omit vs Pick confusion
// Omit<User, "password"> = User WITHOUT password
// Pick<User, "password"> = ONLY password
```

### ⚡ Quick Quiz

Given `type Product = { id: number; title: string; price: number; secret: string }`, create:

1. A type with only `id` and `title`
2. A type without `secret`
3. A type where all fields are optional

```ts
// Answers:
type ProductPreview = Pick<Product, "id" | "title">;
type SafeProduct = Omit<Product, "secret">;
type DraftProduct = Partial<Product>;
```

### 🆚 `Pick<T>` vs `Omit<T>` — Two Sides of the Same Coin

Both create a subset of a type, but from opposite directions:

|                              | `Pick<T, K>`                      | `Omit<T, K>`                                       |
| ---------------------------- | --------------------------------- | -------------------------------------------------- |
| Strategy                     | Keep only the keys you list       | Remove only the keys you list                      |
| Best when                    | Subset is small (2-3 fields)      | You want almost everything; remove just 1-2 fields |
| New field added to base type | ❌ Must manually add to Pick      | ✅ Automatically included                          |
| Risk                         | Forgetting to include a new field | Accidentally exposing a sensitive new field        |

```ts
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
};

// Pick — explicitly choose what survives
type PublicProfile = Pick<User, "id" | "name">;
// { id: number; name: string }
// ⚠️ If 'avatar' is added to User, PublicProfile does NOT auto-include it

// Omit — explicitly choose what is removed
type SafeUser = Omit<User, "password">;
// { id: number; name: string; email: string; avatar: string }
// ✅ If 'role' is added to User, SafeUser automatically includes it
```

**`Pick` ব্যবহার করুন যখন:** exact ছোট subset চান — যেমন API response-এ শুধু id ও name।
**`Omit` ব্যবহার করুন যখন:** শুধু sensitive field (যেমন password) বাদ দিতে চান — বাকিটা auto-include।

---

### 🆚 `Partial<T>` vs Manual Optional Props

```ts
type User = { id: number; name: string; email: string };

// ❌ Manual — duplicates every field; breaks when User gets new properties
type UserUpdate = {
  id?: number;
  name?: string;
  email?: string;
  // ⚠️ If 'phone' is added to User, you must remember to add it here too
};

// ✅ Partial — always derived, always in sync
type UserUpdate2 = Partial<User>; // { id?: number; name?: string; email?: string }

// Mixed required + optional? Combine Pick + Partial instead of writing it manually:
type PatchPayload = Partial<Pick<User, "name" | "email">>; // only these two patchable
```

**`Partial` ব্যবহার করুন যখন:** PATCH request payload বা form draft type বানাচ্ছেন।
**Manual optional ব্যবহার করুন যখন:** কিছু field required, কিছু optional — তখন `Pick` + `Partial` combine করুন।

---

## 1️⃣4️⃣ Conditional Types 🔀

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** A conditional type is TypeScript's ternary operator for types: `T extends U ? X : Y`. It reads: "If `T` is assignable to `U`, the type is `X`; otherwise it's `Y`." This is the engine behind many built-in utility types.

**বাংলা:** Conditional type হলো TypeScript-এর type-level ternary: `T extends U ? X : Y`। অর্থাৎ "`T` যদি `U`-তে assignable হয়, type হবে `X`; নাহলে `Y`।" অনেক built-in utility type-এর ভেতরে এটাই কাজ করে।

### Code Example

```ts
// Basic conditional type
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"
type C = IsString<"hello">; // "yes" — literal string extends string

// Practical: filter only non-nullable values
type NonNullable2<T> = T extends null | undefined ? never : T;

type D = NonNullable2<string | null | undefined>; // string

// Distributive conditional types — applied to each union member
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type E = Flatten<string[]>; // string
type F = Flatten<number[]>; // number
type G = Flatten<string>; // string (not an array, returned as-is)

// Conditional type with extends on objects
type HasId<T> = T extends { id: number } ? "has id" : "no id";

type H = HasId<{ id: number; name: string }>; // "has id"
type I = HasId<{ name: string }>; // "no id"

// Used for extracting return types (how ReturnType<> works internally)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(name: string): string {
  return `Hello, ${name}`;
}

type GreetReturn = MyReturnType<typeof greet>; // string
```

### Explanation | ব্যাখ্যা

**English:**

- `T extends U ? X : Y` is evaluated at the **type level** — no runtime code is generated.
- When `T` is a **union**, the condition is distributed over each member separately (distributive behaviour).
- `infer` lets you capture and name a type **within** a conditional type — more on this below.
- Conditional types power `NonNullable`, `ReturnType`, `Parameters`, `Awaited`, and many more built-in utilities.

**বাংলা:**

- `T extends U ? X : Y` **type level**-এ evaluate হয় — runtime-এ কোনো code তৈরি হয় না।
- `T` যখন **union**, তখন condition প্রতিটি member-এ আলাদাভাবে distribute হয়।
- `infer` conditional type-এর **ভেতরে** একটি type capture ও নাম দিতে দেয়।
- `NonNullable`, `ReturnType`, `Parameters`, `Awaited` — এই built-in utility-গুলো conditional type দিয়ে তৈরি।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using conditional type where a simple generic constraint works
type StringOnly<T extends string> = T; // simpler!
// Don't write: type StringOnly<T> = T extends string ? T : never;

// ❌ Wrong: forgetting union distribution
type IsArray<T> = T extends any[] ? true : false;
type X = IsArray<string | number[]>; // boolean (true | false), not just true!
// Each union member is checked separately: string → false, number[] → true

// ✅ Wrap in a tuple to disable distribution
type IsArrayExact<T> = [T] extends [any[]] ? true : false;
type Y = IsArrayExact<string | number[]>; // false (the whole union is checked)
```

### ⚡ Quick Quiz

Write a conditional type `Unpromise<T>` that extracts the resolved type from a `Promise`.

```ts
// Answer:
type Unpromise<T> = T extends Promise<infer R> ? R : T;

type A = Unpromise<Promise<string>>; // string
type B = Unpromise<Promise<number>>; // number
type C = Unpromise<string>; // string (not a Promise, returned as-is)
```

### 🔍 The `infer` Keyword

`infer` is only valid **inside** a conditional type. It creates a new type variable that TypeScript fills in based on the structure of the matched type.

`infer` শুধুমাত্র conditional type-এর **ভেতরে** valid। এটি একটি নতুন type variable তৈরি করে যা TypeScript matched type-এর structure থেকে পূরণ করে।

```ts
// Extract the element type of an array
type ElementType<T> = T extends (infer E)[] ? E : never;

type N = ElementType<number[]>; // number
type S = ElementType<string[]>; // string
type X = ElementType<string>; // never (not an array)

// Extract the first parameter type of a function
type FirstParam<T> = T extends (first: infer P, ...rest: any[]) => any
  ? P
  : never;

type F = FirstParam<(name: string, age: number) => void>; // string
type G = FirstParam<() => void>; // never

// Rebuild built-in ReturnType
type ReturnType2<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

function add(a: number, b: number): number {
  return a + b;
}
type AddReturn = ReturnType2<typeof add>; // number

// Rebuild built-in Parameters
type Parameters2<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type AddParams = Parameters2<typeof add>; // [a: number, b: number]
```

**English:** Think of `infer R` as "let TypeScript figure out what `R` is and bind it as a usable name." It's the mechanism behind `ReturnType`, `Parameters`, `InstanceType`, and `Awaited`.

**বাংলা:** `infer R` মানে "TypeScript নিজে বের করুক `R` কী, এবং সেটা একটি usable নাম হিসেবে bind হোক।" এটাই `ReturnType`, `Parameters`, `InstanceType`, এবং `Awaited`-এর mechanism।

---

## 1️⃣5️⃣ Mapped Types 🗺️

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** A mapped type iterates over the keys of an existing type and transforms each property. It's how TypeScript builds `Partial<T>`, `Readonly<T>`, `Required<T>`, and `Record<K, V>` internally — and you can write your own.

**বাংলা:** Mapped type একটি existing type-এর সব key-এ iterate করে প্রতিটি property transform করে। TypeScript ভেতরে `Partial<T>`, `Readonly<T>`, `Required<T>`, `Record<K, V>` এভাবেই তৈরি করে — এবং আপনিও নিজের মতো লিখতে পারেন।

### Code Example

```ts
// Basic mapped type — iterate over keys of T and transform each property
type Stringify<T> = {
  [K in keyof T]: string; // every property becomes string
};

type User = { id: number; name: string; active: boolean };
type StringifiedUser = Stringify<User>;
// { id: string; name: string; active: string }

// Adding modifiers — readonly and optional
type Immutable<T> = {
  readonly [K in keyof T]: T[K]; // same as Readonly<T>
};

type Optional<T> = {
  [K in keyof T]?: T[K]; // same as Partial<T>
};

// Removing modifiers — the '-' prefix removes readonly or optional
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // removes readonly
};

type Required2<T> = {
  [K in keyof T]-?: T[K]; // removes optional (same as Required<T>)
};

// Remapping keys — use 'as' to rename keys
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type PersonGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }

// Filtering keys — use 'never' to exclude certain properties
type StringProps<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type OnlyStrings = StringProps<{ id: number; name: string; email: string }>;
// { name: string; email: string }
```

### Explanation | ব্যাখ্যা

**English:**

- `[K in keyof T]` iterates over every key of `T` — the foundation of all mapped types.
- `T[K]` is the **indexed access type** — look up the type of property `K` in `T`.
- `+` adds a modifier (default), `-` removes it. So `-readonly` makes a type mutable.
- `as NewKey` (TypeScript 4.1+) lets you **remap** keys — great for generating getter/setter names.
- Returning `never` from the `as` clause **filters out** that key entirely.

**বাংলা:**

- `[K in keyof T]` `T`-এর প্রতিটি key-এ iterate করে — সব mapped type-এর ভিত্তি।
- `T[K]` হলো **indexed access type** — `T`-এর `K` property-র type lookup করে।
- `+` modifier যোগ করে (default), `-` সরায়। তাই `-readonly` type-কে mutable করে।
- `as NewKey` (TypeScript 4.1+) দিয়ে key **remap** করা যায় — getter/setter নাম তৈরিতে দারুণ।
- `as` clause থেকে `never` return করলে সেই key সম্পূর্ণ **বাদ** পড়ে যায়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: forgetting T[K] and using a fixed type — all props become that type
type Bad<T> = { [K in keyof T]: string }; // loses original types!

// ✅ Correct: preserve original types
type Good<T> = { [K in keyof T]: T[K] }; // same as T (identity mapped type)

// ❌ Wrong: using mapped type where a utility type already exists
type MyPartial<T> = { [K in keyof T]?: T[K] };
// Just use: Partial<T>

// ❌ Wrong: trying to map over a union of strings without wrapping
type Flags = { [K in "a" | "b" | "c"]: boolean };
// This is actually ✅ CORRECT — mapping over a string union is valid!
// { a: boolean; b: boolean; c: boolean }
```

### ⚡ Quick Quiz

Create a mapped type `Nullable<T>` that makes every property of `T` accept `null`.

```ts
// Answer:
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<{ id: number; name: string }>;
// { id: number | null; name: string | null }
```

---

## 1️⃣6️⃣ Template Literal Types 📝

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** Template literal types (TypeScript 4.1+) let you build new string types by combining existing ones — the same `` `${...}` `` syntax you use at runtime, but at the type level.

**বাংলা:** Template literal type (TypeScript 4.1+) দিয়ে existing type combine করে নতুন string type তৈরি করা যায় — runtime-এ `` `${...}` `` যেভাবে ব্যবহার করেন সেই syntax, কিন্তু type level-এ।

### Code Example

```ts
// Basic template literal type
type Greeting = `Hello, ${string}!`;
const g1: Greeting = "Hello, Alice!"; // ✅
// const g2: Greeting = "Hi, Alice!"; // ❌ must start with "Hello, "

// Combining literal unions — cartesian product!
type Direction = "top" | "bottom" | "left" | "right";
type CSSProperty = `margin-${Direction}` | `padding-${Direction}`;
// "margin-top" | "margin-bottom" | "margin-left" | "margin-right"
// | "padding-top" | "padding-bottom" | "padding-left" | "padding-right"

const css: CSSProperty = "margin-top"; // ✅
// const bad: CSSProperty = "border-top"; // ❌

// Event name builder — type-safe DOM events
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"
type HoverEvent = EventName<"hover">; // "onHover"

// Getter/Setter name generation (combined with mapped types)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }

// TypeScript's built-in string manipulation types
type A = Uppercase<"hello">; // "HELLO"
type B = Lowercase<"WORLD">; // "world"
type C = Capitalize<"typescript">; // "Typescript"
type D = Uncapitalize<"TypeScript">; // "typeScript"

// Practical: type-safe route builder
type Route = "/users" | "/posts" | "/comments";
type ApiRoute = `/api${Route}`;
// "/api/users" | "/api/posts" | "/api/comments"

function fetchApi(route: ApiRoute): Promise<unknown> {
  return fetch(route).then((r) => r.json());
}

fetchApi("/api/users"); // ✅
// fetchApi("/users");    // ❌ Error: must be prefixed with "/api"
```

### Explanation | ব্যাখ্যা

**English:**

- Template literal types distribute over unions — `"a" | "b"` combined with `"x" | "y"` produces all four combinations.
- `Capitalize`, `Uncapitalize`, `Uppercase`, `Lowercase` are built-in string manipulation types.
- Most powerful when combined with mapped types and `infer` to build type-safe string APIs.
- At runtime these are just strings — the template literal syntax is **erased** by the compiler.

**বাংলা:**

- Template literal type union-এ distribute করে — `"a" | "b"` এবং `"x" | "y"` মিলিয়ে চারটি combination তৈরি হয়।
- `Capitalize`, `Uncapitalize`, `Uppercase`, `Lowercase` — built-in string manipulation type।
- Mapped type এবং `infer`-এর সাথে মিলিয়ে type-safe string API তৈরিতে সবচেয়ে শক্তিশালী।
- Runtime-এ এগুলো শুধু string — template literal syntax compiler দ্বারা **erased** হয়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using string in template literal loses literal types
type EventMap = { [K in `on${string}`]: () => void };
// Too broad — "onAnything" would match

// ✅ Correct: constrain to a specific union
type Events = "click" | "hover" | "focus";
type EventMap2 = { [K in `on${Capitalize<Events>}`]: () => void };
// { onClick: () => void; onHover: () => void; onFocus: () => void }
```

### ⚡ Quick Quiz

Create a type `CSSValue` that accepts any string like `"100px"`, `"2rem"`, `"50%"` by combining a number string with a unit.

```ts
// Answer:
type Unit = "px" | "rem" | "em" | "%";
type CSSValue = `${number}${Unit}`;

const a: CSSValue = "100px"; // ✅
const b: CSSValue = "2rem"; // ✅
// const c: CSSValue = "auto"; // ❌ — must end with a unit
```

---

## 1️⃣7️⃣ `satisfies` Operator ✔️

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** The `satisfies` operator (TypeScript 4.9+) validates that a value matches a type **without widening its inferred type**. It's like a type check you can attach to an expression while keeping all the literal type information.

**বাংলা:** `satisfies` operator (TypeScript 4.9+) একটি value-কে type-এর বিপরীতে validate করে — কিন্তু inferred type কে **wide করে না**। এটি একটি expression-এ type check লাগানোর উপায় যেখানে literal type information হারায় না।

### Code Example

```ts
type Palette = Record<string, [number, number, number] | string>;

// Without satisfies — type widened, literal access lost
const colors1: Palette = {
  red: [255, 0, 0],
  green: "#00ff00",
};
// colors1.red is `[number, number, number] | string` — TS doesn't know it's the tuple form

// With satisfies — shape validated, literal types PRESERVED
const colors2 = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Palette;

colors2.red[0]; // ✅ TypeScript knows it's a tuple — access index 0
colors2.green.toUpperCase(); // ✅ TypeScript knows it's a string

// Practical: config objects with strict shape validation
type Config = {
  port: number;
  host: string;
  debug: boolean;
};

const config = {
  port: 3000,
  host: "localhost",
  debug: false,
  extra: "oops", // ❌ Error: 'extra' is not in Config — caught!
} satisfies Config;

config.port; // type: 3000 (literal!) — not widened to `number`

// Catch typos in keys at definition time
type Routes = Record<"home" | "about" | "contact", string>;

const routes = {
  home: "/",
  about: "/about",
  contakt: "/contact", // ❌ Error: 'contakt' is not in Routes — typo caught!
} satisfies Routes;
```

### Explanation | ব্যাখ্যา

**English:**

- `value satisfies Type` — TypeScript checks the shape but **infers the narrowest possible type** for the variable.
- With `: Type` annotation, TypeScript **widens** the type to `Type` — literal types are lost.
- Use `satisfies` when you need both: shape validation AND narrow literal inference (e.g. config objects, style maps, route tables).

**বাংলা:**

- `value satisfies Type` — TypeScript shape check করে কিন্তু variable-এর জন্য **সবচেয়ে narrow type infer** করে।
- `: Type` annotation দিলে TypeScript type-কে `Type`-এ **wide** করে — literal type হারিয়ে যায়।
- `satisfies` ব্যবহার করুন যখন দুটোই দরকার: shape validation এবং narrow literal inference (যেমন config object, style map, route table)।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using 'as' instead of satisfies — no shape validation
const cfg = { port: 3000, typo: true } as Config; // no error for 'typo'!

// ❌ Wrong: using annotation instead of satisfies — loses literals
const cfg2: Config = { port: 3000, host: "localhost", debug: false };
cfg2.port; // type: number — literal 3000 is gone

// ✅ Correct: satisfies validates + preserves
const cfg3 = { port: 3000, host: "localhost", debug: false } satisfies Config;
cfg3.port; // type: 3000 ✅
```

### ⚡ Quick Quiz

You have a `type Theme = { bg: string; fg: string }`. Use `satisfies` so that the inferred type of `bg` is the literal `"#fff"`, not just `string`.

```ts
// Answer:
type Theme = { bg: string; fg: string };

const theme = {
  bg: "#fff",
  fg: "#000",
} satisfies Theme;

theme.bg; // type: "#fff" — literal preserved ✅
```

---

## 1️⃣8️⃣ Indexed Access Types 🔑

> **Level:** Intermediate 💡

### Concept | ধারণা

**English:** Indexed access types let you look up the type of a specific property using `T[K]` syntax — just like accessing an object property at runtime, but at the type level.

**বাংলা:** Indexed access type দিয়ে `T[K]` syntax ব্যবহার করে একটি নির্দিষ্ট property-র type lookup করা যায় — runtime-এ object property access করার মতো, কিন্তু type level-এ।

### Code Example

```ts
// Basic indexed access — look up a property's type
type User = { id: number; name: string; email: string; active: boolean };

type IdType = User["id"]; // number
type NameType = User["name"]; // string
type ActiveType = User["active"]; // boolean

// Union of keys — get a union of property types
type StringFields = User["name" | "email"]; // string | string → string

// keyof T — get ALL property types as a union
type AllFieldTypes = User[keyof User]; // number | string | boolean

// Array element type — index with 'number'
type Fruits = ("apple" | "banana" | "orange")[];
type Fruit = Fruits[number]; // "apple" | "banana" | "orange"

// Nested indexed access
type Config = {
  server: {
    host: string;
    port: number;
  };
  db: {
    url: string;
  };
};

type ServerHost = Config["server"]["host"]; // string
type DbUrl = Config["db"]["url"]; // string

// Practical: ensuring a function accepts valid event names
const events = {
  click: (e: MouseEvent) => {},
  keyup: (e: KeyboardEvent) => {},
  resize: (e: UIEvent) => {},
} as const;

type EventKey = keyof typeof events; // "click" | "keyup" | "resize"
type EventHandlers = (typeof events)[EventKey]; // union of all handler fn types

// Used in generics — T[K] with constraint K extends keyof T
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const ids = pluck(users, "id"); // number[]  ✅
const names = pluck(users, "name"); // string[]  ✅
// pluck(users, "age");              // ❌ Error: "age" not in typeof users[0]
```

### Explanation | ব্যাখ্যা

**English:**

- `T["key"]` is the indexed access type — it gives you the type of that property in `T`.
- `T[keyof T]` gives a union of **all** property value types in `T`.
- `T[number]` on an array type gives the **element type** of the array.
- Chaining works: `Config["server"]["host"]` drills into nested objects.
- Combined with generics (`T[K]` where `K extends keyof T`), this enables fully type-safe property access.

**বাংলা:**

- `T["key"]` হলো indexed access type — `T`-এর সেই property-র type দেয়।
- `T[keyof T]` `T`-এর সব property value type-এর **union** দেয়।
- Array type-এ `T[number]` ব্যবহার করলে array-এর **element type** পাওয়া যায়।
- Chain করা যায়: `Config["server"]["host"]` nested object-এ drill করে।
- Generic-এর সাথে (`T[K]` যেখানে `K extends keyof T`) মিলিয়ে সম্পূর্ণ type-safe property access সম্ভব।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: using T[string] — too broad
type AnyProp<T> = T[string]; // Error unless T has an index signature

// ✅ Correct: use T[keyof T] for all value types
type AllValues<T> = T[keyof T];

// ❌ Wrong: indexed access on a non-existent key
type Bad = User["nickname"]; // ❌ Error: 'nickname' not in User

// ✅ Correct: only valid keys work
type Good = User["name"]; // string ✅
```

### ⚡ Quick Quiz

Given `type Order = { id: number; items: string[]; total: number }`, what is the type of `Order["items"][number]`?

```ts
// Answer:
type Order = { id: number; items: string[]; total: number };
type ItemType = Order["items"][number]; // string
// Order["items"] is string[], and string[][number] gives the element type: string
```

---

# 🌳 Phase 3 — Safety & Patterns

---

## 1️⃣9️⃣ Classes 🏛️

> **Level:** Intermediate 🌳

### Concept | ধারণা

**English:** TypeScript adds type annotations to JavaScript classes — making constructors, methods, and properties fully type-safe. Access modifiers (`public`, `private`, `protected`), `readonly`, `static`, and `abstract` give you fine-grained control over how class members can be used.

**বাংলা:** TypeScript JavaScript class-এ type annotation যোগ করে — constructor, method এবং property সম্পূর্ণ type-safe করে তোলে। Access modifier (`public`, `private`, `protected`), `readonly`, `static`, এবং `abstract` দিয়ে class member কীভাবে ব্যবহার হবে তা নিয়ন্ত্রণ করা যায়।

### Code Example

```ts
// Basic class with typed properties and constructor shorthand
class Animal {
  readonly name: string; // immutable after construction
  private speed: number; // only accessible within this class
  protected alive: boolean; // accessible in this class + subclasses

  constructor(name: string, speed: number) {
    this.name = name;
    this.speed = speed;
    this.alive = true;
  }

  move(): string {
    return `${this.name} moves at ${this.speed} km/h`;
  }
}

// Constructor shorthand — declare + assign in one shot
class Point {
  constructor(
    public x: number, // public + assign
    public y: number, // public + assign
  ) {}

  distanceTo(other: Point): number {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }
}

const p1 = new Point(0, 0);
const p2 = new Point(3, 4);
console.log(p1.distanceTo(p2)); // 5

// Inheritance + protected access
class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name, 40); // call parent constructor
    this.breed = breed;
    this.alive = true; // ✅ protected — accessible in subclass
    // this.speed = 50;    // ❌ private — NOT accessible in subclass
  }

  bark(): string {
    return this.alive ? `${this.name} barks!` : "...";
  }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.bark()); // "Rex barks!"
// dog.alive             // ❌ Error: 'alive' is protected

// Static members — belong to the class, not instances
class MathUtils {
  static readonly PI = 3.14159;

  static circleArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }
}

console.log(MathUtils.circleArea(5)); // 78.53975
// new MathUtils().PI                 // ❌ PI is static, not on instances

// Abstract class — cannot be instantiated directly
abstract class Shape {
  abstract area(): number; // subclasses MUST implement this
  abstract perimeter(): number;

  describe(): string {
    return `Area: ${this.area().toFixed(2)}, Perimeter: ${this.perimeter().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    private w: number,
    private h: number,
  ) {
    super();
  }
  area() {
    return this.w * this.h;
  }
  perimeter() {
    return 2 * (this.w + this.h);
  }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach((s) => console.log(s.describe()));

// implements — class must satisfy an interface's shape
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

class Config implements Serializable {
  private data: Record<string, unknown> = {};

  serialize(): string {
    return JSON.stringify(this.data);
  }

  deserialize(data: string): void {
    this.data = JSON.parse(data) as Record<string, unknown>;
  }
}
```

### Explanation | ব্যাখ্যা

**English:**

- `public` (default): accessible anywhere. `private`: only inside the class. `protected`: inside the class and subclasses.
- Constructor shorthand (`public x: number` in params) declares AND assigns in one step.
- `readonly` prevents reassignment after construction — great for IDs, names, etc.
- `static` members belong to the class itself, not to instances.
- `abstract` classes define a contract — they can't be instantiated, but provide shared logic for subclasses.
- `implements` enforces that a class satisfies an interface's shape.

**বাংলা:**

- `public` (default): যেকোনো জায়গা থেকে accessible। `private`: শুধু class-এর ভেতরে। `protected`: class ও subclass-এর ভেতরে।
- Constructor shorthand (`public x: number` parameter-এ) একসাথে declare ও assign করে।
- `readonly` construction-এর পরে reassign করতে দেয় না — ID, name-এর জন্য দারুণ।
- `static` member class-এর নিজের — instance-এর নয়।
- `abstract` class একটি contract define করে — instantiate করা যায় না, কিন্তু subclass-এর জন্য shared logic থাকে।
- `implements` নিশ্চিত করে যে class একটি interface-এর shape পূরণ করে।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: accessing private member from subclass
class Parent {
  private secret = 42;
}
class Child extends Parent {
  getSecret() {
    return this.secret; // ❌ Error: 'secret' is private
  }
}

// ✅ Correct: use protected if subclasses need access
class Parent2 {
  protected secret = 42;
}
class Child2 extends Parent2 {
  getSecret() {
    return this.secret;
  } // ✅
}

// ❌ Wrong: forgetting to call super() before using 'this' in subclass
class Animal2 {
  constructor(public name: string) {}
}
class Dog2 extends Animal2 {
  constructor(
    name: string,
    public breed: string,
  ) {
    // this.breed = breed; // ❌ Error: must call super() first
    super(name);
    // this.breed = breed; // ✅ now it's fine (but shorthand is cleaner)
  }
}

// ❌ Wrong: instantiating an abstract class
abstract class Base {
  abstract run(): void;
}
// const b = new Base(); // ❌ Error: cannot create instance of abstract class
```

### ⚡ Quick Quiz

Create a `BankAccount` class with `private balance`, a `deposit(amount: number)` method, and a `getBalance()` getter. Make `owner` readonly.

```ts
// Answer:
class BankAccount {
  private balance: number = 0;

  constructor(readonly owner: string) {}

  deposit(amount: number): void {
    if (amount > 0) this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }
}

const acc = new BankAccount("Alice");
acc.deposit(100);
console.log(acc.getBalance()); // 100
console.log(acc.owner); // "Alice" (readonly)
// acc.balance                 // ❌ private
```

---

## 2️⃣0️⃣ Async/Await & Promise Typing ⚡

> **Level:** Intermediate 🌳

### Concept | ধারণা

**English:** TypeScript fully types asynchronous code. An `async` function always returns `Promise<T>`, where `T` is the type of the awaited value. You can type `Promise.all`, catch errors properly with `unknown`, and express complex async flows with full type safety.

**বাংলা:** TypeScript asynchronous code সম্পূর্ণরূপে type করে। `async` function সবসময় `Promise<T>` return করে, যেখানে `T` হলো awaited value-এর type। `Promise.all` type করা, `unknown` দিয়ে error properly catch করা, এবং complex async flow সম্পূর্ণ type safety সহ লেখা সম্ভব।

### Code Example

```ts
// async function return type — always Promise<T>
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json() as Promise<{ id: number; name: string }>;
}

// Explicitly typed — makes the return contract clear
async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Awaited<T> — extracts the resolved type from a Promise
type UserData = Awaited<ReturnType<typeof fetchUser>>;
// { id: number; name: string }

// Error handling — catch block receives 'unknown', not 'Error'
async function safeFetch(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // ✅ safe to access .message
    }
    return null;
  }
}

// Promise.all — tuple type for heterogeneous promises
async function loadAll() {
  const [user, posts] = await Promise.all([
    fetchUser(1), // Promise<{id,name}>
    fetch("/api/posts").then((r) => r.json() as Promise<string[]>), // Promise<string[]>
  ]);
  // user: { id: number; name: string }
  // posts: string[]
}

// Generic async utility
async function retry<T>(fn: () => Promise<T>, attempts: number): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

// Using it:
const user = await retry(() => fetchUser(1), 3);
// user: { id: number; name: string }

// Promise.allSettled — all results, including failures
async function fetchAll(ids: number[]) {
  const results = await Promise.allSettled(ids.map(fetchUser));
  // results: PromiseSettledResult<{ id: number; name: string }>[]

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(result.value.name); // ✅ narrowed to fulfilled
    } else {
      console.error(result.reason); // ✅ narrowed to rejected
    }
  });
}
```

### Explanation | ব্যাখ্যা

**English:**

- Every `async` function returns `Promise<T>` — TypeScript infers `T` from the returned value.
- `Awaited<T>` unwraps nested promises: `Awaited<Promise<Promise<string>>>` → `string`.
- Catch blocks receive `unknown` (not `Error`) — always narrow with `instanceof Error` before accessing properties.
- `Promise.all([p1, p2])` infers a **tuple** type matching the input array.
- `ReturnType<typeof fn>` + `Awaited<>` is the standard way to extract the resolved type of an async function.

**বাংলা:**

- প্রতিটি `async` function `Promise<T>` return করে — TypeScript returned value থেকে `T` infer করে।
- `Awaited<T>` nested promise unwrap করে: `Awaited<Promise<Promise<string>>>` → `string`।
- Catch block `unknown` receive করে (`Error` নয়) — property access করার আগে সবসময় `instanceof Error` দিয়ে narrow করুন।
- `Promise.all([p1, p2])` input array-এর সাথে মিলিয়ে একটি **tuple** type infer করে।
- `ReturnType<typeof fn>` + `Awaited<>` হলো async function-এর resolved type বের করার standard উপায়।

### ⚠️ Common Mistakes

```ts
// ❌ Wrong: not typing catch block — error is 'any'
try {
  await fetch("/api");
} catch (e) {
  console.log(e.message); // ❌ unsafe — e is 'any' implicitly
}

// ✅ Correct: type catch as unknown, then narrow
try {
  await fetch("/api");
} catch (e: unknown) {
  if (e instanceof Error) console.log(e.message); // ✅
}

// ❌ Wrong: forgetting await — promise is not resolved
async function load() {
  const data = fetch("/api/data"); // ❌ data is Promise<Response>, not Response
  console.log(data.status); // ❌ Promise has no 'status' directly
}

// ✅ Correct: await the fetch
async function load2() {
  const data = await fetch("/api/data"); // ✅ data is Response
  console.log(data.status);
}

// ❌ Wrong: using Promise<any> — loses type safety
async function bad(): Promise<any> {
  return fetch("/api").then((r) => r.json()); // ❌ returns any
}

// ✅ Correct: use a specific return type
async function good(): Promise<{ id: number }[]> {
  return fetch("/api").then((r) => r.json() as Promise<{ id: number }[]>);
}
```

### ⚡ Quick Quiz

Write a typed `sleep` utility and a `fetchWithTimeout` that rejects after `ms` milliseconds.

```ts
// Answer:
function sleep(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms),
  );
}

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  return Promise.race([fetch(url), sleep(ms)]);
}
```

---

## 2️⃣1️⃣ Type Assertion 🧭

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

### 🆚 `as` vs Type Guard vs `satisfies` — Three Ways to Handle "I Know This Type"

|                          | `as` (assertion)              | Type Guard               | `satisfies` (TS 4.9+)             |
| ------------------------ | ----------------------------- | ------------------------ | --------------------------------- |
| Runtime check?           | ❌ No                         | ✅ Yes                   | ❌ No                             |
| Can cause runtime crash? | ✅ Yes                        | ❌ No                    | ❌ No                             |
| TS catches wrong type?   | ❌ No — you override TS       | ✅ Yes                   | ✅ Yes                            |
| Preserves literal types? | ❌ Widens to declared type    | ✅ Narrows via check     | ✅ Yes                            |
| Best for...              | DOM access, known conversions | `unknown` / union inputs | Config objects, literal inference |

```ts
// as — you override TS, no runtime safety
const input = document.getElementById("email") as HTMLInputElement;
input.value; // ✅ compiles — ❌ crashes if element doesn't exist

// Type guard — safe narrowing based on a real runtime check
function formatValue(val: string | number): string {
  if (typeof val === "string") return val.toUpperCase(); // TS narrows to string
  return val.toFixed(2); // TS narrows to number
}

// satisfies — validate shape WITHOUT widening the inferred type (TS 4.9+)
const config = {
  port: 3000,
  host: "localhost",
} satisfies { port: number; host: string };

config.port; // type: 3000 (literal!) — not widened to `number`
// config.unknown = "x"; // ❌ Error — shape is still validated

// Compare: 'as' loses the literal
const config2 = { port: 3000 } as { port: number };
config2.port; // type: number — literal 3000 is gone
```

**`as` ব্যবহার করুন যখন:** DOM elements access করছেন বা আপনি ১০০% নিশ্চিত type সম্পর্কে।
**Type guard ব্যবহার করুন যখন:** `unknown`, union type, বা external/API data handle করছেন।
**`satisfies` ব্যবহার করুন যখন:** config object-এ literal type inference রাখতে চান এবং shape-ও validate করতে চান।

---

## 2️⃣2️⃣ Nullable / undefined / unknown / never 🧯

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

### 🆚 `any` vs `unknown` — The Most Important Safety Choice in TypeScript

|                         | `any`                      | `unknown`                       |
| ----------------------- | -------------------------- | ------------------------------- |
| Assignable to anything? | ✅ Yes                     | ❌ No — must narrow first       |
| Can call methods on it? | ✅ Yes (no checks at all)  | ❌ No — must narrow first       |
| Defeats type checking?  | ✅ Yes, completely         | ❌ No — stays safe              |
| When to use?            | ⚠️ Last resort / migration | ✅ External data, API responses |

```ts
// any — TS looks away, no safety net
function processAny(val: any) {
  val.toUpperCase(); // ✅ compiles — ❌ crashes at runtime if val is a number
  val.nonExistent(); // ✅ compiles — completely unchecked
}

// unknown — TS forces you to check before use
function processUnknown(val: unknown) {
  // val.toUpperCase();           // ❌ Error: Object is of type 'unknown'
  if (typeof val === "string") {
    console.log(val.toUpperCase()); // ✅ narrowed to string — safe
  }
}
```

**`any` ব্যবহার করুন যখন:** TS migration করছেন বা third-party library-র সাথে কাজ করছেন — সর্বশেষ উপায়।
**`unknown` ব্যবহার করুন যখন:** API response, user input, বা যেকোনো external data accept করছেন।

---

### 🆚 `null` vs `undefined` — Different Absence, Different Intent

|                             | `null`                                                | `undefined`                                           |
| --------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| Meaning                     | **Intentional** absence — "set to nothing on purpose" | **Unintentional** absence — "never assigned"          |
| Default for unassigned vars | ❌ No                                                 | ✅ Yes                                                |
| JSON serializable           | ✅ `null` survives `JSON.stringify`                   | ❌ `undefined` is stripped                            |
| Optional function params    | ❌                                                    | ✅ `f(x?: string)` means `x` is `string \| undefined` |

```ts
// undefined — unassigned / optional
let name: string | undefined; // never set
console.log(name); // undefined

function greet(user?: string) {
  // user is string | undefined
  console.log(user ?? "Guest");
}

// null — explicitly set to "no value"
let selectedItem: string | null = null; // deliberately empty
selectedItem = "Apple"; // later assigned

// JSON difference
const obj = { a: null, b: undefined };
JSON.stringify(obj); // '{"a":null}' — b is stripped entirely!
```

**`null` ব্যবহার করুন যখন:** জানিয়ে দিতে চান "এই value ইচ্ছাকৃতভাবে খালি" (যেমন database-এ absent field)।
**`undefined` ব্যবহার করুন যখন:** optional property বা unset state বোঝাতে চান।

---

### 🆚 `never` vs `void` — Two Kinds of "Returns Nothing"

|                           | `void`                             | `never`                                     |
| ------------------------- | ---------------------------------- | ------------------------------------------- |
| Meaning                   | Returns, but with no useful value  | **Never returns** — throws or loops forever |
| `return` statement        | ✅ Allowed (implicit or `return;`) | ❌ Reaching a `return` is a TS error        |
| Assignable to other types | ❌                                 | ✅ `never` is a subtype of everything       |
| Common use case           | Event handlers, logging functions  | `throw` helpers, exhaustive union checks    |

```ts
// void — function finishes, but we don't use the return value
function logMessage(msg: string): void {
  console.log(msg);
}

// never — function truly never returns
function fail(msg: string): never {
  throw new Error(msg); // always throws
}

// never for exhaustive union checks — catches missing cases at compile time
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  if (shape === "circle") return Math.PI;
  if (shape === "square") return 1;
  if (shape === "triangle") return 0.5;
  const _check: never = shape; // ❌ TS error if a new Shape is added and not handled here
  return _check;
}
```

**`void` ব্যবহার করুন যখন:** function side-effect করে কিন্তু কোনো useful value return করে না।
**`never` ব্যবহার করুন যখন:** function সবসময় throw করে, বা discriminated union exhaustive check করছেন।

---

## 2️⃣3️⃣ Destructuring 🎯

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

## 2️⃣4️⃣ Spread & Rest 🪄

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

## 2️⃣5️⃣ Test & Practice ✅

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

| #   | Challenge                                                                                               | Concepts Used                 |
| --- | ------------------------------------------------------------------------------------------------------- | ----------------------------- |
| 1   | Create a `Product` type with `id`, `title`, `price`, optional `discount`                                | Type alias, optional          |
| 2   | Write a function that accepts `unknown` price and returns 10% off                                       | unknown, type guard           |
| 3   | Model a `Payment` union as either `CashPayment` or `CardPayment`                                        | Discriminated union           |
| 4   | Write a `mergeUsers` function using spread                                                              | Spread, generics              |
| 5   | Destructure a nested order object with renaming                                                         | Destructuring, aliasing       |
| 6   | Write a rest-param function that sums all numbers                                                       | Rest, typed params            |
| 7   | Create an `Employee` interface extending a `Person` interface                                           | Interface, extends            |
| 8   | Decide: `type` or `interface` for a `Vehicle` shape you'll extend                                       | Alias vs Interface            |
| 9   | Write a `safeParse<T>` generic function that returns `T \| null`                                        | Generics                      |
| 10  | Use `Partial<T>` to create an update payload for your `Product` type                                    | Utility Types                 |
| 11  | Use `Omit` to create a `PublicUser` that strips `password`                                              | Utility Types                 |
| 12  | Write a type-safe `getProperty` function using `keyof`                                                  | keyof & generics              |
| 13  | Create a string enum `Season` and a function that returns its length                                    | Enums                         |
| 14  | Write a custom type guard `isDate` that checks for `Date` instances                                     | Type Guards                   |
| 15  | Constrain a generic `clamp<T>` to only accept `number \| bigint`                                        | Generic Constraints           |
| 16  | Write a labeled tuple `type RGB = [r: number, g: number, b: number]` and destructure it                 | Labeled Tuples                |
| 17  | Create a function with overloads for `format(value: string)` and `format(value: number)`                | Function Overloads            |
| 18  | Write a `Result<T>` discriminated union with `ok` and `error` variants                                  | Discriminated Unions          |
| 19  | Build a `MyReturnType<T>` using conditional types + `infer`                                             | Conditional Types, infer      |
| 20  | Create a `DeepReadonly<T>` using recursive mapped types                                                 | Mapped Types, Recursive Types |
| 21  | Build a type `EventMap` from `"click" \| "hover" \| "focus"` → `"onClick" \| ...`                       | Template Literal Types        |
| 22  | Use `satisfies` on a config object and verify literal types are preserved                               | `satisfies` Operator          |
| 23  | Write `Lookup<T, K>` as an indexed access type and test it with a nested object                         | Indexed Access Types          |
| 24  | Build a `BankAccount` class with `private balance`, `deposit`, `withdraw`, `readonly owner`             | Classes                       |
| 25  | Write a `fetchJson<T>` async function with proper `Promise<T>` return type and `unknown` error handling | Async/Await                   |

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
