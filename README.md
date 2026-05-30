# AwesomeLevel TypeScript Handbook 🇧🇩✨

এই রিপোজিটরি TypeScript শেখা (beginner → advanced) এবং production-grade টাইপিং চিন্তা করার জন্য একটি পরিষ্কার গাইড। এখানে আপনি theory, example, এবং বাস্তব কাজের টাইপিং প্র্যাকটিস একসাথে পাবেন।

## কী আছে এখানে

- TypeScript শেখার জন্য step-by-step গাইড
- Strict type safety mindset (compile-time এ ভুল ধরা)
- বাস্তব project-style patterns এবং best practices
- শেখার জন্য কিছু intentional errors (বোঝার জন্য purposely রাখা)

## ফোল্ডার স্ট্রাকচার

```
TypeScript/
  README.md
  tsconfig.json
  src/
```

বিস্তারিত শেখার path এবং file-by-file explanation আছে `TypeScript/README.md` ফাইলের ভিতরে।

## কিভাবে শুরু করবেন

```bash
cd TypeScript
npm install -D typescript
npx tsc
```

এখানে strict mode চালু আছে, তাই ভুল হলে compiler সঙ্গে সঙ্গেই জানিয়ে দেবে। এইটা শেখার জন্য ভাল, কারণ আপনি error দেখেই বুঝতে পারবেন কোথায় টাইপে সমস্যা হচ্ছে।

## Strict Mode কেন জরুরি

`TypeScript/tsconfig.json` এ strict configuration চালু আছে:

- `strict: true` → unsafe assumptions কমায়
- `noUncheckedIndexedAccess: true` → array/object index access আরও safe হয়
- `exactOptionalPropertyTypes: true` → optional property গুলো সঠিকভাবে ধরা পড়ে

**কেন?** এগুলো production code এ runtime bug কমায়, কারণ TypeScript আপনাকে আগেই সন্দেহজনক জায়গায় থামিয়ে দেয়।

---

# Production TypeScript Rules (Guidelines) ✅

নিচের নিয়মগুলো production-quality TypeScript লিখতে সাহায্য করবে। প্রতিটা রুলের সাথে **কেন** দেওয়া আছে।

## Type Safety Rules

- সব function parameter এবং return value-তে explicit type লিখুন। **কেন?** API boundary পরিষ্কার হয় এবং future refactor নিরাপদ থাকে।
- `any` এড়িয়ে `unknown` ব্যবহার করুন এবং type guard দিন। **কেন?** `unknown` unsafe access বন্ধ করে, ভুল টাইপ ধরতে দেয়।
- `Readonly<T>` এবং `readonly` ব্যবহার করুন। **কেন?** accidental mutation কমে এবং state predictable থাকে।
- Object shape এর জন্য `interface`, union/intersection এর জন্য `type` ব্যবহার করুন। **কেন?** intent পরিষ্কার থাকে এবং declaration merging সুবিধা থাকে।

## Code Patterns

- Generic types ব্যবহার করুন (`<T>`). **কেন?** একই utility বহু টাইপে safe ভাবে reuse হয়।
- Discriminated union ব্যবহার করুন complex state management-এ। **কেন?** exhaustive checking হয় এবং ভুল branch কমে।
- Utility types (`Pick`, `Omit`, `Partial`, `Record`, `ReturnType`) ব্যবহার করুন। **কেন?** manual duplication কমে, future changes সহজ হয়।
- `satisfies` operator ব্যবহার করুন। **কেন?** type validate হয় কিন্তু literal widening হয় না।
- `as const` ব্যবহার করুন literal types স্থির রাখতে। **কেন?** string/number literal হারিয়ে যায় না।

## Async Patterns

- সব async function এ `Promise<T>` return type দিন। **কেন?** caller ঠিক output shape বুঝতে পারে।
- `try/catch` এ error কে `unknown` ধরে narrow করুন। **কেন?** runtime এ যে কোন error আসতে পারে।
- Parallel কাজ হলে `Promise.all` prefer করুন। **কেন?** performance বাড়ে এবং typed tuple/pattern সহজ হয়।
- Custom Error class বানান typed properties সহ। **কেন?** error handling predictable হয়।

## Project Conventions (Production Recommendation)

এই repo শেখার জন্য, তাই সব convention বাস্তবে follow করা হয় নাই। কিন্তু production project এ নিচেরগুলো strongly recommend করা হয়:

- এক ফাইলে এক interface/class রাখুন
- `types/` ফোল্ডারে reusable types রাখুন
- Barrel exports (`index.ts`) ব্যবহার করুন
- Path alias (`@/`) সেটআপ করুন tsconfig-এ

**কেন?** বড় codebase maintainable থাকে এবং imports পরিষ্কার হয়।

---

# Examples (Type-Safe + Explained) 🧠

## 1) API Response + Custom Error + Typed Promise

```ts
/** Public API response wrapper */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

/** Custom error with typed metadata */
export class HttpError extends Error {
  public readonly status: number;

  public constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

/** Fetch JSON with strong types */
export async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const res: Response = await fetch(url);

  if (!res.ok) {
    throw new HttpError(`HTTP ${res.status}`, res.status);
  }

  return (await res.json()) as ApiResponse<T>;
}
```

**কেন এই টাইপিং?**

- `ApiResponse<T>` generic হওয়ায় data যে কোন shape নিতে পারে, কিন্তু response wrapper consistent থাকে।
- `HttpError` এ `status` typed রাখা হচ্ছে যাতে caller সহজে error categorize করতে পারে।
- `Promise<ApiResponse<T>>` explicit দেওয়ায় call site এ auto-complete এবং safe destructuring পাওয়া যায়।

## 2) `unknown` + Type Guard

```ts
export function parseJson(input: string): unknown {
  return JSON.parse(input);
}

export function isUser(value: unknown): value is { id: string; name: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}
```

**কেন?** `unknown` ব্যবহার করলে ভুল data shape সরাসরি ব্যবহার করা যায় না। guard দিয়ে validate করে তারপর ব্যবহার করা যায়, ফলে runtime crash কমে।

## 3) Discriminated Union for State

```ts
export type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

export function getSummary(state: LoadState): string {
  switch (state.status) {
    case "idle":
      return "Ready";
    case "loading":
      return "Loading...";
    case "success":
      return `Items: ${state.data.length}`;
    case "error":
      return state.message;
  }
}
```

**কেন?** `status` ফিল্ড একাই state narrow করে দেয়, ফলে ভুল branch এ property access হয় না।

## 4) `readonly` + `Readonly<T>`

```ts
export interface User {
  readonly id: string;
  name: string;
}

export function freezeUser(user: User): Readonly<User> {
  return Object.freeze(user);
}
```

**কেন?** mutation কমায় এবং shared state predictable থাকে।

## 5) Utility Types + `satisfies`

```ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
}

export type UserPreview = Pick<UserProfile, "id" | "name">;

export const roles = ["admin", "member"] as const;

export const roleLabels = {
  admin: "Administrator",
  member: "Member",
} satisfies Record<(typeof roles)[number], string>;
```

**কেন?** `Pick` reuse বাড়ায় এবং duplication কমায়। `satisfies` validation করে কিন্তু literal types widen করে না। `as const` literal list কে strict রাখে।

## 6) Type-safe Event Handler

```ts
export function handleClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  const label = target?.getAttribute("aria-label") ?? "unknown";
  console.log(label);
}
```

**কেন?** DOM event এ null possibility থাকে, তাই optional chaining এবং nullish coalescing ব্যবহার করে safe fallback দেওয়া হয়েছে।

---

# শেখার পথ 🔥

Step-by-step learning guide এবং file-by-file examples দেখতে `TypeScript/README.md` ফলো করুন।

**নোট:** কিছু `src` ফাইলে intentional errors আছে, শেখার জন্য। `npx tsc` error দেখালে, সেটা পড়ুন এবং কেন error হয়েছে তা বোঝার চেষ্টা করুন।

---

# Credits ❤️

Maintained by [Pradipta Sarker](https://github.com/axiomshuvo)
