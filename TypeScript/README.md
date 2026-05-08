# TypeScript Learning Guide

এই repository-টা এখন beginner থেকে advanced পর্যন্ত TypeScript শেখার জন্য একটি structured handbook হিসেবে use করা যাবে।
এখানে theory, example, explanation, hidden tricks, interview Q&A, এবং solved coding problems একসাথে রাখা হয়েছে।

## 1. TypeScript কী?

TypeScript হলো JavaScript-এর typed superset।
মানে, JavaScript যা পারে TypeScript-ও তা পারে, কিন্তু তার সাথে extra type safety দেয়।

TypeScript use করার main reason:

- compile time-এ bug ধরা যায়
- auto-completion ভালো পাওয়া যায়
- refactor করা সহজ হয়
- বড় codebase maintain করা সহজ হয়

Example:

```ts
let userName: string = "Aritra";
userName = "Sarker";
// userName = 12; // Error
```

এখানে `userName` string type. তাই number assign করলে TypeScript compile time-এ error দেখাবে।

## 2. এই repository কীভাবে use করবে

Current example files:

- `src/primitive.ts` -> primitive types
- `src/nonPrimitive.ts` -> array, tuple, object
- `src/function.ts` -> function typing
- `src/destructuring.ts` -> destructuring
- `src/SpreadAndRest.ts` -> spread and rest
- `src/typeAlias.ts` -> type alias, function type, generic alias
- `src/union.ts` -> union and intersection
- `src/questionMark.ts` -> ternary, nullish coalescing, optional chaining

Important note:

- several `src` files intentionally contain TypeScript errors for learning purpose
- if `npx tsc` fails, read the error, understand why it happened, then comment/fix that example

Recommended learning order:

1. Primitive types
2. Non-primitive types
3. Functions
4. Union, literal, optional properties
5. Type aliases and interfaces
6. Generics
7. Narrowing and guards
8. Advanced type system
9. Utility types
10. Interview practice and coding problems

## 3. Setup

Install TypeScript globally or locally:

```bash
npm install -D typescript
npx tsc --init
```

Compile project:

```bash
npx tsc
```

Current `tsconfig.json` already enables strict checking, which is good for learning real TypeScript.

Important options from this repo:

- `strict: true` -> type safety strong করে
- `noUncheckedIndexedAccess: true` -> array/object index access safer করে
- `exactOptionalPropertyTypes: true` -> optional properties more accurate করে

## 4. Beginner Section

### 4.1 Primitive Types

JavaScript primitive types:

- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `symbol`
- `bigint`

TypeScript additional useful types:

- `any`
- `unknown`
- `never`
- `void`

Example:

```ts
let fullName: string = "Aritra";
let age: number = 25;
let isAdmin: boolean = false;
```

### 4.2 Type Inference

সব সময় type লিখতে হয় না। অনেক সময় TypeScript নিজে বুঝে নেয়।

```ts
let country = "Bangladesh"; // inferred as string
let total = 100; // inferred as number
```

Rule:

- variable declare করার সময় value দিলে inference usually enough
- function parameter এবং public API-তে explicit type লেখা better

### 4.3 `any` vs `unknown`

`any` dangerous. এটি basically type checking বন্ধ করে দেয়.

```ts
let data: any = "hello";
data.toFixed(); // no compile error, but runtime bug হতে পারে
```

`unknown` safer:

```ts
let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

Use rule:

- `any` avoid করো
- external input হলে `unknown` use করো

### 4.4 `never`

যে function কখনও normally return করে না, তার return type `never` হতে পারে.

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

### 4.4.1 Nullable Type

`nullable` মানে হলো একটি value normal type-এর পাশাপাশি `null`-ও হতে পারে.

```ts
let middleName: string | null = null;

middleName = "Hasan";
middleName = null;
```

এখানে `middleName` কখনও string হবে, কখনও `null` হবে।
এটাই nullable pattern.

`undefined`-ও allow করতে চাইলে:

```ts
let nickName: string | null | undefined;
```

Important difference:

- `string | null` -> variable আছে, কিন্তু value `null` হতে পারে
- `string | undefined` -> value missing বা set না-ও থাকতে পারে
- `name?: string` -> property optional, object-এ property না-ও থাকতে পারে

Example:

```ts
type User = {
  firstName: string;
  middleName: string | null;
  nickName?: string;
};
```

Safe use:

```ts
function printMiddleName(name: string | null): string {
  return name ?? "No middle name";
}
```

Rule:

- database/API response-এ `null` common হলে `type | null` use করো
- optional property আর nullable property এক জিনিস না

### 4.5 Arrays

```ts
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["A", "B", "C"];
```

Mixed type array:

```ts
const values: (string | number)[] = ["Aritra", 25];
```

### 4.6 Tuple

Tuple means fixed length + fixed position type.

```ts
let userInfo: [string, number] = ["Aritra", 25];
```

Meaning:

- first element must be string
- second element must be number

### 4.7 Object Types

```ts
const user: { name: string; age: number } = {
  name: "Aritra",
  age: 25,
};
```

Optional property:

```ts
const student: { name: string; middleName?: string } = {
  name: "Rahim",
};
```

Readonly property:

```ts
const profile: { readonly id: number; name: string } = {
  id: 1,
  name: "Nadim",
};
```

## 5. Functions

### 5.1 Function Parameters and Return Type

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Arrow function:

```ts
const multiply = (a: number, b: number): number => a * b;
```

### 5.2 Optional and Default Parameters

```ts
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : name;
}

function power(base: number, exponent: number = 2): number {
  return base ** exponent;
}
```

### 5.3 Rest Parameters

```ts
function totalPrice(...prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0);
}
```

### 5.4 Function Type Alias

```ts
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
```

## 6. Type Alias and Interface

### 6.1 Type Alias

```ts
type User = {
  id: number;
  name: string;
  email: string;
};
```

### 6.2 Interface

```ts
interface Product {
  id: number;
  title: string;
  price: number;
}
```

### 6.3 Type vs Interface

Use `interface` when:

- object shape define করছো
- class implement করাবে
- extensible contract দরকার

Use `type` when:

- union লাগবে
- intersection লাগবে
- tuple/function type define করবে
- utility composition বেশি করবে

Example:

```ts
type Status = "success" | "error" | "loading";
```

`interface` দিয়ে এটা cleanly করা যায় না।

## 7. Union, Literal, Intersection

### 7.1 Union Type

```ts
let id: string | number;
id = "abc";
id = 123;
```

### 7.2 Literal Type

```ts
type Role = "admin" | "user" | "guest";
```

এখানে যেকোনো string না, only specific values allowed.

### 7.3 Intersection Type

```ts
type BaseUser = { id: number; name: string };
type AdminPermission = { canDelete: boolean };

type Admin = BaseUser & AdminPermission;
```

## 8. Type Narrowing

Union type use করলে narrowing খুব important.

### 8.1 `typeof`

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

### 8.2 `in`

```ts
type Dog = { bark: () => void };
type Cat = { meow: () => void };

function makeSound(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

### 8.3 `instanceof`

```ts
function logDate(value: Date | string) {
  if (value instanceof Date) {
    console.log(value.toISOString());
  } else {
    console.log(value.toUpperCase());
  }
}
```

### 8.4 Custom Type Guard

```ts
type Teacher = { subject: string };
type Doctor = { hospital: string };

function isTeacher(person: Teacher | Doctor): person is Teacher {
  return "subject" in person;
}
```

এখানে `person is Teacher` TypeScript-কে বলে দেয় if block-এর ভিতরে type কী হবে।

## 9. Generics

Generics allow reusable typed logic.

### 9.1 Basic Generic

```ts
function identity<T>(value: T): T {
  return value;
}

const a = identity<string>("hello");
const b = identity<number>(123);
```

### 9.2 Generic with Array

```ts
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}
```

### 9.3 Multiple Generics

```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
```

### 9.4 Generic Constraints

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}
```

এখানে `T`-এর কাছে `length` property থাকা বাধ্যতামূলক।

## 10. `keyof`, `typeof`, Indexed Access

### 10.1 `keyof`

```ts
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person; // "name" | "age"
```

### 10.2 `typeof`

```ts
const settings = {
  theme: "dark",
  fontSize: 16,
};

type Settings = typeof settings;
```

### 10.3 Indexed Access Type

```ts
type ThemeType = Settings["theme"];
```

## 11. Mapped Types

Mapped type দিয়ে existing type transform করা যায়.

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type OptionalUser = {
  [Key in keyof User]?: User[Key];
};
```

Built-in utility types-ও internally এই idea use করে।

## 12. Conditional Types

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

Useful when type logic depends on another type.

## 13. Utility Types

### 13.1 `Partial<T>`

সব property optional করে.

```ts
type User = { id: number; name: string };
type PartialUser = Partial<User>;
```

### 13.2 `Required<T>`

সব property required করে.

```ts
type UserInput = { name?: string; email?: string };
type FullUserInput = Required<UserInput>;
```

### 13.3 `Readonly<T>`

সব property readonly করে.

### 13.4 `Pick<T, K>`

Specific properties নেয়.

```ts
type UserPreview = Pick<User, "id" | "name">;
```

### 13.5 `Omit<T, K>`

Specific properties বাদ দেয়.

```ts
type UserWithoutId = Omit<User, "id">;
```

### 13.6 `Record<K, T>`

```ts
type Role = "admin" | "user";
type PermissionMap = Record<Role, string[]>;
```

### 13.7 `ReturnType<T>`

```ts
function getUser() {
  return { id: 1, name: "Aritra" };
}

type UserResult = ReturnType<typeof getUser>;
```

## 14. Classes in TypeScript

```ts
class BankAccount {
  public owner: string;
  private balance: number;
  protected branch: string;

  constructor(owner: string, balance: number, branch: string) {
    this.owner = owner;
    this.balance = balance;
    this.branch = branch;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}
```

Access modifiers:

- `public` -> everywhere access
- `private` -> only inside class
- `protected` -> class + subclass

### 14.1 Parameter Properties

```ts
class UserProfile {
  constructor(
    public name: string,
    private age: number,
  ) {}
}
```

এটা shorter syntax.

### 14.2 Abstract Class

```ts
abstract class Animal {
  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof");
  }
}
```

## 15. Interface with Class

```ts
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

## 16. Enums vs Literal Unions

Enum exists, but modern TypeScript-এ literal union অনেক সময় better.

Enum:

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

Preferred often:

```ts
type Direction2 = "up" | "down" | "left" | "right";
```

Why union often better:

- lighter
- easier to compose
- cleaner with API data
- runtime object create করে না

## 17. Modules

Export:

```ts
export const appName = "TypeScript Guide";

export function sum(a: number, b: number) {
  return a + b;
}
```

Import:

```ts
import { appName, sum } from "./utils";
```

Default export:

```ts
export default function greet() {
  return "hello";
}
```

## 18. Async TypeScript

```ts
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return { id, name: "Aritra" };
}
```

Important:

- `async` function always returns `Promise`
- resolved value-এর type annotate করা useful

## 19. Error Handling with `unknown`

```ts
try {
  throw new Error("Something went wrong");
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

`catch (error: any)` লিখলে safety কমে যায়।

## 20. Advanced Section

### 20.1 Discriminated Union

এটা interview-এ খুব common.

```ts
type SuccessResponse = {
  status: "success";
  data: string;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    return response.data;
  }

  return response.message;
}
```

`status` এখানে discriminator হিসেবে কাজ করছে.

### 20.2 Exhaustive Checking

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    default: {
      const _never: never = shape;
      return _never;
    }
  }
}
```

নতুন union member add করলে compile time-এ missing case ধরা যাবে.

### 20.3 `infer`

```ts
type PromiseValue<T> = T extends Promise<infer U> ? U : T;

type A = PromiseValue<Promise<string>>; // string
type B = PromiseValue<number>; // number
```

### 20.4 Generic Default Type

```ts
type ApiResult<T = string> = {
  data: T;
  success: boolean;
};
```

### 20.5 `as const`

```ts
const roles = ["admin", "user", "guest"] as const;
type Role = (typeof roles)[number];
```

এটা hidden trick category-র একটি very useful pattern.

## 21. Hidden Tricks and Best Practices

### Trick 1: `as const` দিয়ে literal preserve করো

```ts
const config = {
  mode: "dark",
  layout: "grid",
} as const;
```

Without `as const`, properties সাধারণ string হয়ে যেতে পারে.

### Trick 2: Runtime data থেকে union type বানাও

```ts
const statuses = ["pending", "done", "failed"] as const;
type Status = (typeof statuses)[number];
```

### Trick 3: Safer object keys access

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### Trick 4: `satisfies` operator use করো

```ts
type Route = {
  path: string;
  secure: boolean;
};

const dashboardRoute = {
  path: "/dashboard",
  secure: true,
} satisfies Route;
```

Benefit:

- type check হয়
- but actual narrow literal info preserve থাকে

### Trick 5: `unknown` + guard is better than `any`

### Trick 6: Union over enum when possible

### Trick 7: Narrow early, not late

Bad:

```ts
function format(value: string | number | null) {
  return value.toString();
}
```

Good:

```ts
function format(value: string | number | null) {
  if (value === null) return "";
  if (typeof value === "string") return value.trim();
  return value.toFixed(2);
}
```

### Trick 8: Prefer `type` composition for API response modeling

```ts
type ApiMeta = { success: boolean; timestamp: string };
type UserData = { id: number; name: string };

type UserResponse = ApiMeta & { data: UserData };
```

### Trick 9: Use branded types for stronger IDs

```ts
type UserId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}
```

এটা advanced pattern. সব project-এ লাগবে না, কিন্তু large apps-এ useful.

### Trick 10: Avoid unnecessary assertions

Bad:

```ts
const userName = value as string;
```

Better:

```ts
if (typeof value === "string") {
  const userName = value;
}
```

## 22. Common Mistakes

1. `any` বেশি use করা
2. `as` দিয়ে force cast করা
3. union narrow না করে property access করা
4. optional chaining আর nullish coalescing-এর difference না বোঝা
5. interface vs type difference না বুঝে random use করা
6. `strict` mode ignore করা
7. return type না ভেবে async function লেখা

## 23. `?`, `??`, `?.` Quick Revision

### Optional Property `?`

```ts
type User = {
  name: string;
  middleName?: string;
};
```

### Nullish Coalescing `??`

```ts
const theme = userTheme ?? "light";
```

Use only when left side is `null` or `undefined`.

### Optional Chaining `?.`

```ts
const city = user.address?.city;
```

## 24. Interview Questions and Answers

### Q1. TypeScript আর JavaScript-এর মধ্যে difference কী?

Answer:
TypeScript is JavaScript + static typing + tooling support. TypeScript compile হয়ে JavaScript হয়। Browser JavaScript চালায়, TypeScript directly না।

### Q2. Type inference কী?

Answer:
When TypeScript automatically infers a variable's type from assigned value. Example: `let age = 20` -> `age` inferred as `number`.

### Q3. `any` আর `unknown` difference কী?

Answer:
`any` disables type checking. `unknown` keeps safety and forces narrowing before use.

### Q4. Union type কী?

Answer:
একটি variable multiple possible types নিতে পারলে union use হয়. Example: `string | number`.

### Q5. Intersection type কী?

Answer:
দুই বা তার বেশি type combine করে একটি stronger type বানায়. Example: `User & AdminPermission`.

### Q6. Interface আর type alias-এর difference কী?

Answer:
দুটাই shape define করতে পারে. কিন্তু `type` union/intersection/tuple/function alias-এর জন্য বেশি flexible. `interface` object contract এবং class implementation-এ খুব common.

### Q7. Generics কেন দরকার?

Answer:
Reusable typed code লিখতে. Without generics, same function multiple types-এর জন্য আলাদা লিখতে হতে পারে বা `any` use করতে হয়.

### Q8. `keyof` কী করে?

Answer:
একটি object type-এর keys union আকারে দেয়.

### Q9. `never` কখন use হয়?

Answer:
যখন code path impossible বা function never returns. Exhaustive switch checking-এ useful.

### Q10. `void` আর `never` difference কী?

Answer:
`void` means function may finish without returning meaningful value. `never` means function never finishes normally.

### Q11. Type assertion কী?

Answer:
Developer manually compiler-কে বলে দেয় expected type কী. Example: `value as string`. এটি careful use করতে হয় কারণ এটি runtime validation না।

### Q12. `as const` কেন useful?

Answer:
It preserves literal types and makes values readonly. Great for config, constants, and runtime-to-type patterns.

### Q13. Discriminated union কী?

Answer:
একটি shared literal property use করে union members safely narrow করা. Example: `{ status: "success" } | { status: "error" }`.

### Q14. `Partial`, `Pick`, `Omit` কোথায় use হয়?

Answer:
Object shapes transform করতে. API input/output shaping, forms, patch updates, DTO creation-এ common.

### Q15. `satisfies` operator-এর benefit কী?

Answer:
Value required shape satisfy করছে কিনা check করে, but original literal detail preserve রাখে. Type assertion-এর তুলনায় safer.

## 25. Interview Coding Questions with Solutions

### Problem 1: String or Number Formatter

Question:
একটি function লিখো যা `string | number` input নেবে। যদি string হয় uppercase return করবে, যদি number হয় 2 decimal format return করবে.

Solution:

```ts
function formatInput(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}
```

Explanation:

- `typeof` দিয়ে narrowing করেছি
- string branch-এ string methods safe
- number branch-এ number methods safe

### Problem 2: Generic First Element

Question:
একটি reusable function লিখো যা যেকোনো typed array-এর first element return করবে.

Solution:

```ts
function firstElement<T>(items: T[]): T | undefined {
  return items[0];
}
```

Explanation:

- generic `T` array element type carry করে
- return `undefined` possible because array empty হতে পারে

### Problem 3: Safe Property Access

Question:
একটি function লিখো যা object এবং key নেবে, এবং সেই key-এর value type-safely return করবে.

Solution:

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Explanation:

- `K extends keyof T` ensures valid key only
- return type `T[K]` means exact property type ফেরত আসে

### Problem 4: API Response Modeling

Question:
success এবং error response-এর জন্য type-safe union model করো.

Solution:

```ts
type Success<T> = {
  ok: true;
  data: T;
};

type Failure = {
  ok: false;
  error: string;
};

type Result<T> = Success<T> | Failure;

function handleResult<T>(result: Result<T>): string {
  if (result.ok) {
    return JSON.stringify(result.data);
  }

  return result.error;
}
```

Explanation:

- `ok` হচ্ছে discriminator
- `if (result.ok)` branch-এ TypeScript automatically success type বুঝে ফেলে

### Problem 5: Optional User Address

Question:
একটি function লিখো যা user-এর city return করবে. Address না থাকলে `"Unknown city"` return করবে.

Solution:

```ts
type User = {
  name: string;
  address?: {
    city?: string;
  };
};

function getCity(user: User): string {
  return user.address?.city ?? "Unknown city";
}
```

Explanation:

- `?.` nested property safe access করে
- `??` null/undefined হলে default দেয়

### Problem 6: Create Readonly Config

Question:
একটি config object define করো যাতে values accidentally change না হয়.

Solution:

```ts
const appConfig = {
  apiBaseUrl: "https://api.example.com",
  appName: "TypeSafeApp",
} as const;
```

Explanation:

- `as const` makes properties readonly
- values literal type হয়ে যায়

### Problem 7: Pick User Preview

Question:
একটি full `User` type থেকে small preview type বানাও যেখানে only `id`, `name` থাকবে.

Solution:

```ts
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type UserPreview = Pick<User, "id" | "name">;
```

Explanation:

- `Pick` existing type থেকে selected properties নেয়

### Problem 8: Remove Property with `Omit`

Question:
একটি `User` type থেকে `password` property বাদ দিয়ে public type বানাও.

Solution:

```ts
type PublicUser = Omit<User, "password">;
```

Explanation:

- `Omit` specific key remove করে
- public API response shape-এ খুব common

### Problem 9: Function Return Type Extract

Question:
একটি function-এর return type automatically extract করো.

Solution:

```ts
function buildSession() {
  return {
    token: "abc123",
    expiresAt: new Date(),
  };
}

type Session = ReturnType<typeof buildSession>;
```

Explanation:

- `typeof buildSession` function type দেয়
- `ReturnType` সেই function-এর return type বের করে

### Problem 10: Exhaustive Switch

Question:
একটি shape union handle করো এবং future member add হলে compile time-এ catch করতে হবে.

Solution:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default: {
      const impossible: never = shape;
      return impossible;
    }
  }
}
```

Explanation:

- `never` exhaustive check future-safe করে
- new union member add করলে compile error আসবে যদি switch update না করা হয়

## 26. Short Practice Tasks for You

নিজে solve করার চেষ্টা করো:

1. একটি `UserRole` literal union বানাও এবং role অনুযায়ী message return করো
2. একটি generic `wrapInArray<T>` function লিখো
3. `Partial<User>` use করে update payload type বানাও
4. `Record<string, number>` use করে product stock map বানাও
5. `unknown` input নিয়ে safe parsing function লিখো
6. discriminated union use করে payment status model করো
7. class + interface use করে shape system বানাও

## 27. Real Learning Strategy

Best approach:

1. First understand types, not syntax only
2. Every concept-এর পরে 2-3টি example নিজে লিখো
3. Compile error দেখলে ভয় পেয়ো না, সেটা learning tool
4. `any` use না করে first think: union, generic, unknown, interface, type guard
5. `strict` mode বন্ধ কোরো না
6. Real small project বানাও: todo app, user management, API response modeler

## 28. Beginner to Advanced Roadmap

### Phase 1: Basics

- primitive types
- arrays, tuples, objects
- functions
- optional and readonly properties

### Phase 2: Practical TypeScript

- type alias
- interface
- union and intersection
- narrowing
- generics

### Phase 3: Intermediate

- utility types
- classes
- modules
- async typing
- `keyof`, `typeof`, indexed access

### Phase 4: Advanced

- mapped types
- conditional types
- discriminated union
- `infer`
- exhaustive checking
- branded types
- `satisfies`

## 29. Golden Rules

1. Prefer inference when obvious
2. Prefer explicit types for APIs and function contracts
3. Avoid `any`
4. Use `unknown` for untrusted input
5. Model data with unions and discriminators
6. Reuse with generics
7. Transform shapes with utility types
8. Let compiler help you, don't fight it

## 30. Final Summary

TypeScript শেখার core objective হলো syntax মুখস্থ করা না।
Main goal হলো data shape, function contract, edge case, and impossible state clearly express করতে পারা.

যদি তুমি নিচের জিনিসগুলো confidently পারো, তাহলে তোমার TypeScript foundation strong:

- variable, object, function type define করা
- union narrow করা
- generic reusable function লেখা
- `Pick`, `Omit`, `Partial`, `Record` use করা
- discriminated union model করা
- `any` avoid করা
- strict errors বুঝে fix করা

এই guide-এর সাথে `src` folder-এর examples practice করলে beginner থেকে advanced পর্যন্ত solid base তৈরি হবে.
