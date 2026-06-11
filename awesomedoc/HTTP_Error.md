# HTTP Error Handling Guide for JavaScript & React Developers

A comprehensive guide to understanding common HTTP status codes and implementing proper, production-grade error handling in JavaScript, TypeScript, and React applications.

**Philosophy:** Just like TypeScript catches errors before runtime, proper error handling prevents frustration at runtime. Learn to handle errors like a pro! 🚀

---

## Table of Contents

1. **Foundational Concepts**
   - [About This Guide](#about-this-guide)
   - [When You'll See These Errors](#when-youll-see-these-errors)
   - [Error Categories](#error-categories)

2. **Common Error Patterns** (Production-Grade)
   - [Custom Error Classes](#custom-error-classes)
   - [API Response Wrapper Types](#api-response-wrapper-types)
   - [Discriminated Unions for Error States](#discriminated-unions-for-error-states)
   - [Form Validation with Errors](#form-validation-with-errors)

3. **Error Handling Strategies**
   - [Error Logging Strategy](#error-logging-strategy)
   - [Testing Error Scenarios](#testing-error-scenarios)
   - [User-Facing Error Messages](#user-facing-error-messages-internationalization)
   - [Global Error Handler](#global-error-handler-axios)

4. **HTTP Status Codes (4xx & 5xx)**
   - [400 Bad Request](#1-400-bad-request)
   - [401 Unauthorized](#2-401-unauthorized)
   - [403 Forbidden](#3-403-forbidden)
   - [404 Not Found](#4-404-not-found)
   - [405 Method Not Allowed](#5-405-method-not-allowed)
   - [409 Conflict](#6-409-conflict)
   - [422 Unprocessable Entity](#7-422-unprocessable-entity)
   - [429 Too Many Requests](#8-429-too-many-requests)
   - [500 Internal Server Error](#9-500-internal-server-error)
   - [502 Bad Gateway](#10-502-bad-gateway)
   - [503 Service Unavailable](#11-503-service-unavailable)
   - [504 Gateway Timeout](#12-504-gateway-timeout)

5. **Reference & Appendix**
   - [Network Errors](#handling-network-errors)
   - [Quick Reference Table](#quick-reference-table)
   - [Decision Tree](#decision-tree-which-approach-to-use)
   - [Common Pitfalls & Fixes](#appendix-common-pitfalls--how-to-fix-them)
   - [Full Working Example](#full-working-example-crud-with-error-handling)

---

## About This Guide

This guide is structured for **all skill levels**:

- **Beginner**: Start with error code sections (1-12) and Quick Reference Table
- **Intermediate**: Learn common error patterns and form validation strategies
- **Advanced**: Explore discriminated unions, testing strategies, and custom error classes with TypeScript

**Code Examples Follow Project Standards:**

- ✅ TypeScript examples use strict mode (no `any`, type guards with `unknown`)
- ✅ All examples are production-ready and copy-paste friendly
- ✅ Both Fetch API and Axios patterns shown for flexibility
- ✅ React examples use modern hooks (React 16.8+)

---

## When You'll See These Errors

```
User fills form
    ↓
Submit to API
    ↓
[Error Response from Server]
    ↓
YOUR CODE HANDLES IT
    ↓
User sees friendly message (not raw JSON)
```

The errors in this guide occur at step 3 → step 4. Your job is to make step 5 smooth for users.

---

## Error Categories

| Category              | Status Codes                           | Cause                   | Example                                 |
| --------------------- | -------------------------------------- | ----------------------- | --------------------------------------- |
| **4xx Client Errors** | 400, 401, 403, 404, 405, 409, 422, 429 | Client sent bad request | Missing email field, expired token      |
| **5xx Server Errors** | 500, 502, 503, 504                     | Server failed           | Database crash, upstream timeout        |
| **Network Errors**    | (no HTTP response)                     | Connection issue        | Internet down, DNS failed, CORS blocked |

---

# Common Error Patterns (Production-Grade)

## Custom Error Classes

Create a reusable, typed error class for all API errors:

```typescript
// types/ApiError.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: Record<string, unknown>,
    public timestamp: string = new Date().toISOString(),
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }

  isRetryable(): boolean {
    return [408, 429, 500, 502, 503, 504].includes(this.status);
  }
}

// Usage
const error = new ApiError(400, "Email is required", { field: "email" });
if (error.isClientError()) {
  console.log("User should check their input");
}
if (error.isRetryable()) {
  console.log("Safe to retry this request");
}
```

---

## API Response Wrapper Types

Create a generic wrapper to standardize API responses:

```typescript
// types/ApiResponse.ts

/**
 * Standard API response shape
 * - T: type of successful data
 * - E: type of error details (default: Record<string, unknown>)
 */
export type ApiResponse<T, E = Record<string, unknown>> =
  | { status: "success"; data: T; timestamp: string }
  | {
      status: "error";
      error: { code: number; message: string; details?: E };
      timestamp: string;
    };

// Type guards
export function isSuccess<T, E>(
  response: ApiResponse<T, E>,
): response is { status: "success"; data: T; timestamp: string } {
  return response.status === "success";
}

export function isError<T, E>(
  response: ApiResponse<T, E>,
): response is {
  status: "error";
  error: { code: number; message: string; details?: E };
  timestamp: string;
} {
  return response.status === "error";
}

// Usage
interface UserData {
  id: number;
  email: string;
  name: string;
}

interface FieldError {
  field: string;
  reason: string;
}

const response: ApiResponse<UserData, FieldError[]> = await fetch(
  "/api/users",
).then((r) => r.json());

if (isSuccess(response)) {
  console.log("User created:", response.data.email);
} else {
  console.log("Errors:", response.error.details);
}
```

---

## Discriminated Unions for Error States

Use TypeScript's discriminated unions to handle different error scenarios safely:

```typescript
// types/Result.ts

/**
 * Result type: Success<T> | Failure
 * Forces you to handle both cases
 */
export type Result<T> =
  | { kind: "success"; value: T }
  | { kind: "failure"; error: ApiError }
  | { kind: "loading" };

// Discriminator: kind field ensures type narrowing
export function isSuccess<T>(result: Result<T>): result is { kind: "success"; value: T } {
  return result.kind === "success";
}

export function isFailure<T>(result: Result<T>): result is { kind: "failure"; error: ApiError } {
  return result.kind === "failure";
}

// Usage with React
interface FetchUserResult extends Result<UserData> {}

async function fetchUser(id: number): Promise<FetchUserResult> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return {
        kind: "failure",
        error: new ApiError(response.status, "Failed to fetch user"),
      };
    }
    const data = await response.json();
    return { kind: "success", value: data };
  } catch {
    return {
      kind: "failure",
      error: new ApiError(0, "Network error"),
    };
  }
}

// In React component
function UserProfile({ userId }: { userId: number }) {
  const [result, setResult] = React.useState<FetchUserResult>({ kind: "loading" });

  React.useEffect(() => {
    fetchUser(userId).then(setResult);
  }, [userId]);

  if (result.kind === "loading") return <Spinner />;
  if (isFailure(result)) return <ErrorBanner message={result.error.message} />;
  return <UserCard user={result.value} />;
}
```

---

## Form Validation with Errors

Map HTTP 400/422 errors to individual form fields:

```typescript
// types/FormState.ts
interface FormErrors {
  [fieldName: string]: string | undefined;
}

interface FormState<T> {
  values: T;
  errors: FormErrors;
  touched: Set<string>;
  isSubmitting: boolean;
}

// Map API error response to form errors
function mapApiErrorToFormErrors(
  apiError: ApiError,
): FormErrors {
  if (apiError.status === 422 && apiError.details) {
    // Assuming server returns: { email: "already taken", password: "too short" }
    return apiError.details as FormErrors;
  }
  return { _global: apiError.message };
}

// React Hook for form handling
function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  onSubmit: (values: T) => Promise<void>,
) {
  const [state, setState] = React.useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: new Set(),
    isSubmitting: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(state.values);
      setState(prev => ({ ...prev, errors: {} }));
    } catch (error) {
      if (error instanceof ApiError) {
        const formErrors = mapApiErrorToFormErrors(error);
        setState(prev => ({ ...prev, errors: formErrors }));
      }
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return { ...state, handleSubmit };
}

// Usage
function SignupForm() {
  const form = useForm(
    { email: "", password: "" },
    async (values) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new ApiError(response.status, "Signup failed");
      }
    },
  );

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        value={form.values.email}
        onChange={e => /* update values */}
      />
      {form.errors.email && <span className="error">{form.errors.email}</span>}

      {form.errors._global && <div className="error-banner">{form.errors._global}</div>}

      <button disabled={form.isSubmitting}>Sign Up</button>
    </form>
  );
}
```

---

## Error Logging Strategy

Log errors for monitoring without exposing sensitive data:

```typescript
// services/errorLogger.ts

export interface ErrorLog {
  timestamp: string;
  status: number;
  endpoint: string;
  message: string;
  userAgent: string;
  userId?: string;
  requestId?: string;
  // DO NOT include: passwords, tokens, raw stack traces, PII
}

export async function logError(
  error: ApiError,
  context: Partial<ErrorLog>,
): Promise<void> {
  const errorLog: ErrorLog = {
    timestamp: new Date().toISOString(),
    status: error.status,
    endpoint: context.endpoint || "unknown",
    message: error.message,
    userAgent: navigator.userAgent,
    userId: context.userId,
    requestId: context.requestId,
  };

  // Option 1: Send to your backend logging service
  try {
    await fetch("/api/logs/errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(errorLog),
    });
  } catch (e) {
    console.error("Failed to log error:", e);
  }

  // Option 2: Send to Sentry or similar (if configured)
  if (window.Sentry) {
    window.Sentry.captureException(error, {
      tags: { status: error.status },
      extra: context,
    });
  }

  // Option 3: Log locally for dev environment
  if (process.env.NODE_ENV === "development") {
    console.group(`[ERROR ${error.status}] ${error.message}`);
    console.error("Details:", errorLog);
    console.groupEnd();
  }
}

// Usage
try {
  const response = await fetch("/api/users/123");
  if (!response.ok) {
    throw new ApiError(response.status, "Failed to fetch user");
  }
} catch (error) {
  if (error instanceof ApiError) {
    await logError(error, {
      endpoint: "GET /api/users/123",
      userId: getCurrentUserId(),
      requestId: getRequestId(),
    });
  }
}
```

---

## Testing Error Scenarios

Test error handling with Jest and TypeScript:

```typescript
// __tests__/api.test.ts

describe("API Error Handling", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("400 Bad Request", () => {
    it("should handle missing email field", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          json: () => Promise.resolve({ message: "Email is required" }),
        }),
      ) as jest.Mock;

      try {
        const response = await fetch("/api/users", { method: "POST" });
        if (!response.ok) {
          throw new ApiError(response.status, await response.json().then(r => r.message));
        }
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(400);
        expect((error as ApiError).message).toBe("Email is required");
      }
    });
  });

  describe("401 Unauthorized", () => {
    it("should redirect to login on expired token", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 401,
        }),
      ) as jest.Mock;

      delete (window as any).location;
      window.location = { href: "" } as any;

      const response = await fetch("/api/profile");
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      expect(localStorage.getItem("token")).toBeNull();
      expect(window.location.href).toBe("/login");
    });
  });

  describe("500 Internal Server Error", () => {
    it("should retry on server error", async () => {
      let callCount = 0;
      global.fetch = jest.fn(() => {
        callCount++;
        if (callCount < 2) {
          return Promise.resolve({
            ok: false,
            status: 500,
          });
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: "success" }),
        });
      }) as jest.Mock;

      async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
        try {
          const response = await fetch(url);
          if (!response.ok && response.status >= 500 && retries > 0) {
            await new Promise(r => setTimeout(r, 100));
            return fetchWithRetry(url, retries - 1);
          }
          return response;
        } catch (error) {
          if (retries > 0) {
            await new Promise(r => setTimeout(r, 100));
            return fetchWithRetry(url, retries - 1);
          }
          throw error;
        }
      }

      const response = await fetchWithRetry("/api/data");
      expect(response.ok).toBe(true);
      expect(callCount).toBe(2);
    });
  });
});

// React Component Testing
describe("Error UI Components", () => {
  it("should display form field errors on 422", async () => {
    const { render, screen } = await import("@testing-library/react");
    const { userEvent } = await import("@testing-library/user-event");

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 422,
        json: () =>
          Promise.resolve({
            email: "already taken",
            password: "too short",
          }),
      }),
    ) as jest.Mock;

    function TestForm() {
      const form = useForm({ email: "", password: "" }, async () => {
        const res = await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify(form.values),
        });
        if (!res.ok) throw new ApiError(res.status, "Signup failed", await res.json());
      });
      return (
        <form onSubmit={form.handleSubmit}>
          <input
            value={form.values.email}
            onChange={e => /* update */}
          />
          {form.errors.email && <div>{form.errors.email}</div>}
          <button type="submit">Sign Up</button>
        </form>
      );
    }

    render(<TestForm />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("already taken")).toBeInTheDocument();
  });
});
```

---

## User-Facing Error Messages (Internationalization)

Create a message map for user-friendly error communication with bilingual support:

```typescript
// i18n/errorMessages.ts

interface ErrorMessageMap {
  [key: number]: {
    en: string;
    bn: string;
  };
}

export const ERROR_MESSAGES: ErrorMessageMap = {
  400: {
    en: "Please check your input and try again.",
    bn: "আপনার ইনপুট চেক করুন এবং আবার চেষ্টা করুন।",
  },
  401: {
    en: "Your session has expired. Please log in again.",
    bn: "আপনার সেশন শেষ হয়েছে। আবার লগইন করুন।",
  },
  403: {
    en: "You don't have permission to access this resource.",
    bn: "আপনার এই সম্পদ অ্যাক্সেস করার অনুমতি নেই।",
  },
  404: {
    en: "The resource you're looking for doesn't exist.",
    bn: "আপনি যে সম্পদ খুঁজছেন তা বিদ্যমান নেই।",
  },
  405: {
    en: "This action is not supported. Please check the API documentation.",
    bn: "এই ক্রিয়া সমর্থিত নয়। API ডকুমেন্টেশন চেক করুন।",
  },
  409: {
    en: "This resource already exists. Please use a different value.",
    bn: "এই সম্পদ ইতিমধ্যে বিদ্যমান। অন্য একটি মান ব্যবহার করুন।",
  },
  422: {
    en: "Some of your input is invalid. Please correct the highlighted fields.",
    bn: "আপনার কিছু ইনপুট অবৈধ। হাইলাইট করা ক্ষেত্রগুলি সংশোধন করুন।",
  },
  429: {
    en: "You're doing that too often. Please wait a moment and try again.",
    bn: "আপনি এটি খুব বেশি করছেন। একটু অপেক্ষা করুন এবং আবার চেষ্টা করুন।",
  },
  500: {
    en: "Our server encountered an error. Please try again later.",
    bn: "আমাদের সার্ভার একটি ত্রুটির সম্মুখীন হয়েছে। পরে আবার চেষ্টা করুন।",
  },
  502: {
    en: "Service temporarily unavailable. Please try again in a moment.",
    bn: "সেবা অস্থায়ীভাবে অনুপলব্ধ। এক মুহূর্তে আবার চেষ্টা করুন।",
  },
  503: {
    en: "Our server is under maintenance. Please check back soon.",
    bn: "আমাদের সার্ভার রক্ষণাবেক্ষণাধীন। শীঘ্রই ফিরে আসুন।",
  },
  504: {
    en: "The request took too long. Please try again.",
    bn: "অনুরোধে খুব বেশি সময় লেগেছে। আবার চেষ্টা করুন।",
  },
  0: {
    en: "A network error occurred. Please check your connection.",
    bn: "একটি নেটওয়ার্ক ত্রুটি হয়েছে। আপনার সংযোগ চেক করুন।",
  },
};

// Get user-friendly message
export function getUserMessage(
  statusCode: number,
  language: "en" | "bn" = "en",
  customMessage?: string,
): string {
  if (customMessage) return customMessage;
  return ERROR_MESSAGES[statusCode]?.[language] || ERROR_MESSAGES[0][language];
}

// Usage
function ErrorBanner({ status, language }: { status: number; language: "en" | "bn" }) {
  const message = getUserMessage(status, language);
  return <div className="alert alert-error">{message}</div>;
}
```

---

# 1. 400 Bad Request

## Meaning

The server cannot process the request because the client sent invalid data. The request is **malformed or doesn't meet validation rules**.

### Why This Matters

400 errors happen frequently during development and user input. Handling them gracefully prevents user frustration and helps with debugging.

### When You'll See This

- ❌ User forgets to fill email field → "Email is required"
- ❌ User enters "abc" in age field (expects number) → "Age must be a number"
- ❌ JSON parsing fails because quotes are mismatched
- ❌ Required fields missing from POST/PUT request

### Common Causes

- Missing required fields (email, name, etc.)
- Invalid JSON body (syntax error)
- Incorrect parameter types (string instead of number)
- Failed validation (password too short, email format invalid)
- Malformed request headers

### Backend Response Examples

**Single field error:**

```json
{
  "status": 400,
  "message": "Email is required",
  "field": "email"
}
```

**Multiple field errors:**

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Email format is invalid",
    "password": "Password must be at least 8 characters",
    "age": "Age must be between 18 and 100"
  }
}
```

**Malformed body:**

```json
{
  "status": 400,
  "message": "Invalid JSON in request body"
}
```

## JavaScript (Fetch)

```javascript
try {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "", password: "short" }),
  });

  if (response.status === 400) {
    const error = await response.json();
    console.log("Validation error:", error.message);

    // Show field-specific errors if available
    if (error.errors) {
      Object.entries(error.errors).forEach(([field, message]) => {
        console.log(`${field}: ${message}`);
      });
    }
  }
} catch (err) {
  console.error("Network error:", err);
}
```

## TypeScript (Type-Safe)

```typescript
// Define the expected error structure
interface FieldError {
  [fieldName: string]: string;
}

interface ValidationError {
  status: 400;
  message: string;
  errors?: FieldError;
  field?: string;
}

// Type-safe error handler
async function createUserSafe(data: unknown): Promise<void> {
  // First, validate input locally
  if (typeof data !== "object" || !data) {
    throw new Error("Invalid input data");
  }

  const userData = data as Record<string, unknown>;

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (response.status === 400) {
      const error: unknown = await response.json();

      // Type guard: ensure error has the shape we expect
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as Record<string, unknown>).message === "string"
      ) {
        const validationError = error as ValidationError;
        throw new ApiError(
          400,
          validationError.message,
          validationError.errors || { field: validationError.field },
        );
      }
    }

    if (!response.ok) {
      throw new ApiError(response.status, "Request failed");
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, "Network error");
  }
}
```

## React Example (with Form Errors)

```jsx
function SignupForm() {
  const [formErrors, setFormErrors] = React.useState({});
  const [globalError, setGlobalError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setGlobalError("");
    setFormErrors({});

    try {
      const formData = new FormData(e.target);
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 400) {
        const error = await response.json();
        // Map field errors
        if (error.errors) {
          setFormErrors(error.errors);
        } else if (error.field) {
          setFormErrors({ [error.field]: error.message });
        } else {
          setGlobalError(error.message);
        }
        return;
      }

      if (!response.ok) {
        setGlobalError("Signup failed");
        return;
      }

      // Success - redirect or show success message
      window.location.href = "/dashboard";
    } catch (error) {
      setGlobalError("Network error - please check your connection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {globalError && <div className="alert alert-error">{globalError}</div>}

      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          type="email"
          className={formErrors.email ? "input-error" : ""}
        />
        {formErrors.email && (
          <span className="error-text">{formErrors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          name="password"
          type="password"
          className={formErrors.password ? "input-error" : ""}
        />
        {formErrors.password && (
          <span className="error-text">{formErrors.password}</span>
        )}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
```

## How to Debug 400 Errors

1. **Check the request body**

   ```javascript
   // Log what you're sending
   const data = { email: "user@example.com", password: "test123" };
   console.log("Sending:", JSON.stringify(data));
   ```

2. **Verify JSON validity**

   ```javascript
   // Make sure JSON is valid
   try {
     JSON.stringify(data);
     console.log("JSON is valid");
   } catch (e) {
     console.log("Invalid JSON:", e.message);
   }
   ```

3. **Check server requirements**
   - Read API documentation for required fields
   - Verify all types match (age should be number, not string "25")
   - Check field name spelling exactly

4. **Use Network tab**
   - Open DevTools → Network tab
   - Look at the failed request
   - Check "Payload" or "Request" to see what was actually sent
   - Compare with API docs

5. **Example debugging workflow**

   ```javascript
   async function debugRequest() {
     const payload = { email: "test@test.com", password: "123" };
     console.log("1. Payload:", payload);
     console.log("2. JSON string:", JSON.stringify(payload));

     const response = await fetch("/api/users", {
       method: "POST",
       body: JSON.stringify(payload),
       headers: { "Content-Type": "application/json" },
     });

     console.log("3. Response status:", response.status);
     const errorData = await response.json();
     console.log("4. Server error response:", errorData);
   }
   ```

## Best Practice

- ✅ **Validate locally first** — check required fields before sending
- ✅ **Show field-specific errors** — highlight which field failed, not just generic "error"
- ✅ **Preserve user input** — don't clear the form on error
- ✅ **Parse all field errors** — show all problems at once, not one at a time
- ✅ **Log the actual response** — helps with debugging
- ✅ **Don't expose server internals** — show friendly messages, not raw JSON
- ✅ **Use TypeScript for type safety** — catch validation issues before runtime

---

# 2. 401 Unauthorized

# 2. 401 Unauthorized

## Meaning

Authentication is required to access this resource, or the provided credentials (token, API key, etc.) are invalid or expired. The request **lacks valid authentication**.

### Why This Matters

401 errors mean the user's session has ended. Handling this gracefully by redirecting to login is critical for security and UX.

### When You'll See This

- ❌ User's JWT token expired after 1 hour
- ❌ User closed the app and reopened it (session lost)
- ❌ Request sent without Authorization header
- ❌ API key is invalid or revoked

### Common Causes

- Missing JWT or API key
- Expired token (time-based expiration)
- Invalid or malformed token
- User not logged in
- Token revoked by server

### Backend Response

```json
{
  "status": 401,
  "message": "Unauthorized - token expired",
  "code": "TOKEN_EXPIRED"
}
```

## JavaScript (Fetch)

```javascript
async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    // Token invalid or expired
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login?reason=session-expired";
  }

  return response;
}

// Usage
const data = await fetchWithAuth("/api/profile");
```

## TypeScript (with Token Refresh)

```typescript
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

class AuthManager {
  private tokens: AuthTokens | null = null;

  loadTokens(): void {
    const stored = localStorage.getItem("authTokens");
    if (stored) {
      this.tokens = JSON.parse(stored);
    }
  }

  isTokenExpired(): boolean {
    if (!this.tokens) return true;
    return Date.now() >= this.tokens.expiresAt;
  }

  async refreshToken(): Promise<boolean> {
    if (!this.tokens?.refreshToken) return false;

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: this.tokens.refreshToken }),
      });

      if (response.status === 401) {
        // Refresh token also expired - must log in again
        this.clearTokens();
        return false;
      }

      if (!response.ok) throw new Error("Refresh failed");

      const newTokens = await response.json();
      this.tokens = newTokens;
      localStorage.setItem("authTokens", JSON.stringify(newTokens));
      return true;
    } catch (error) {
      this.clearTokens();
      return false;
    }
  }

  private clearTokens(): void {
    this.tokens = null;
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
  }

  getAuthHeader(): { Authorization: string } | null {
    if (!this.tokens) return null;
    return { Authorization: `Bearer ${this.tokens.accessToken}` };
  }

  async fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
    // Check if token expired and refresh if needed
    if (this.isTokenExpired()) {
      const refreshed = await this.refreshToken();
      if (!refreshed) {
        throw new ApiError(401, "Session expired - please log in again");
      }
    }

    const authHeader = this.getAuthHeader();
    if (!authHeader) {
      throw new ApiError(401, "Not authenticated");
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...authHeader,
      },
    });

    if (response.status === 401) {
      this.clearTokens();
      throw new ApiError(401, "Unauthorized");
    }

    if (!response.ok) {
      throw new ApiError(response.status, "Request failed");
    }

    return response.json();
  }
}

// Usage
const auth = new AuthManager();
auth.loadTokens();

try {
  const profile = await auth.fetchWithAuth<UserProfile>("/api/profile");
} catch (error) {
  if (error instanceof ApiError && error.status === 401) {
    window.location.href = "/login";
  }
}
```

## React Example (with Auto-Redirect)

```jsx
function ProtectedRoute({ children }) {
  const [isAuthed, setIsAuthed] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthed(!!token);
  }, []);

  if (isAuthed === null) return <Spinner />;
  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function useApiCall() {
  const navigate = useNavigate();

  return React.useCallback(async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        navigate("/login", { state: { from: location.pathname } });
        return null;
      }

      return response;
    } catch (error) {
      console.error("Network error:", error);
      throw error;
    }
  }, [navigate]);
}

// Usage in component
function Dashboard() {
  const api = useApiCall();

  const loadData = async () => {
    const response = await api("/api/dashboard");
    if (response) {
      const data = await response.json();
      setDashboardData(data);
    }
  };

  return <div>{/* dashboard content */}</div>;
}
```

## Axios Interceptor (Global)

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  },
);

export default api;
```

## How to Debug 401 Errors

1. **Check if token exists**

   ```javascript
   const token = localStorage.getItem("token");
   console.log("Token exists:", !!token);
   console.log("Token value:", token ? token.substring(0, 20) + "..." : "none");
   ```

2. **Verify token format**

   ```javascript
   // JWT tokens should have 3 parts: header.payload.signature
   const parts = token?.split(".");
   console.log("Token parts:", parts?.length); // Should be 3
   ```

3. **Check Authorization header**
   - Open DevTools → Network tab
   - Find the failed request
   - Look at "Request Headers"
   - Should see: `Authorization: Bearer eyJhbGc...`

4. **Verify token expiration**

   ```javascript
   // Decode JWT (install jwt-decode library)
   import { jwtDecode } from "jwt-decode";

   const decoded = jwtDecode(token);
   console.log("Expires at:", new Date(decoded.exp * 1000));
   console.log("Expired?", Date.now() > decoded.exp * 1000);
   ```

5. **Check server-side logs** — Ask backend team if token was revoked

## Best Practice

- ✅ **Store token securely** — use HttpOnly cookies if possible (not localStorage for sensitive apps)
- ✅ **Add token to every request** — use interceptor or wrapper function
- ✅ **Implement token refresh** — refresh before expiration or catch 401 and retry
- ✅ **Redirect to login on 401** — don't just show error, redirect immediately
- ✅ **Clear auth state on logout** — remove token and user data
- ✅ **Handle token expiration gracefully** — user shouldn't see raw errors
- ✅ **Log in consistently** — set token in one place for all requests

---

# 3. 403 Forbidden

# 3. 403 Forbidden

## Meaning

The user is **authenticated** (they logged in) but **does not have permission** to access this resource. This is different from 401 — they have a valid token, but the token doesn't grant access to this specific resource.

### Why This Matters

403 errors indicate a permission/authorization problem. Users need to know they lack access, not that they're not logged in.

### When You'll See This

- ❌ User is a regular member trying to access admin panel
- ❌ User tries to edit another user's profile
- ❌ User's subscription expired (premium-only feature)
- ❌ User is banned from this resource

### Common Causes

- Wrong role (regular user vs admin)
- Missing permissions for this action
- Admin-only route
- User doesn't own the resource
- Subscription/plan restrictions

### Backend Response

```json
{
  "status": 403,
  "message": "You don't have permission to perform this action",
  "code": "FORBIDDEN",
  "requiredRole": "admin"
}
```

## JavaScript (Fetch)

```javascript
async function fetchUserData(userId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 403) {
    console.log("Permission denied");
    // Show a permission error, not a login prompt
    return null;
  }

  return response.json();
}
```

## TypeScript (Role-Based Access)

```typescript
interface User {
  id: string;
  role: "admin" | "moderator" | "user";
  permissions: string[];
}

interface AuthContext {
  user: User | null;
  hasPermission(action: string): boolean;
}

// Create context
const authContext = React.createContext<AuthContext | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  const hasPermission = (action: string): boolean => {
    if (!user) return false;
    if (user.role === "admin") return true; // Admins can do everything
    return user.permissions.includes(action);
  };

  return (
    <authContext.Provider value={{ user, hasPermission }}>
      {children}
    </authContext.Provider>
  );
}

// Use in components
function EditUserButton({ userId }: { userId: string }) {
  const auth = React.useContext(authContext);

  if (!auth || !auth.hasPermission("edit_users")) {
    return <button disabled>Edit (No Permission)</button>;
  }

  return (
    <button
      onClick={() => {
        fetch(`/api/users/${userId}`, { method: "PUT" });
      }}
    >
      Edit User
    </button>
  );
}

// Handle 403 in fetch
async function apiCall<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 403) {
    throw new ApiError(403, "You don't have permission to perform this action");
  }

  if (!response.ok) {
    throw new ApiError(response.status, "Request failed");
  }

  return response.json();
}
```

## React Example

```jsx
function AdminPanel() {
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => {
        if (res.status === 403) {
          setError("You must be an admin to access this page.");
          // Optionally redirect after a delay
          setTimeout(() => navigate("/dashboard"), 3000);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setData(data);
      })
      .catch((err) => setError("Failed to load admin data"));
  }, []);

  if (error) {
    return (
      <div className="alert alert-warning">
        <strong>Access Denied:</strong> {error}
      </div>
    );
  }

  return <div>{data && <AdminStats data={data} />}</div>;
}
```

## How to Debug 403 Errors

1. **Check your user role**

   ```javascript
   const user = JSON.parse(localStorage.getItem("user") || "{}");
   console.log("Your role:", user.role);
   console.log("Your permissions:", user.permissions);
   ```

2. **Check what resource you're accessing**

   ```javascript
   // Look at Network tab → failed request → URL
   // Example: GET /api/admin/reports → requires "admin" role
   ```

3. **Compare with API documentation**
   - What role is required for this endpoint?
   - Do you have that role?

4. **Check server-side permissions**
   - Ask backend team what permissions are needed
   - Verify your user has those permissions assigned

5. **Example debugging**

   ```javascript
   async function checkPermissions() {
     const token = localStorage.getItem("token");
     const user = JSON.parse(localStorage.getItem("user"));

     console.log("Attempting: DELETE /api/users/123");
     console.log("Your role:", user?.role);
     console.log("Required role: admin or moderator");

     const response = await fetch("/api/users/123", { method: "DELETE" });
     console.log("Response status:", response.status);
   }
   ```

## Best Practice

- ✅ **Hide unauthorized UI** — don't show buttons/links user can't use
- ✅ **Check permissions early** — validate before making requests
- ✅ **Show clear message** — tell user why they can't access (not just "error")
- ✅ **Don't expose permission rules** — don't tell user "you need admin role" if that's sensitive
- ✅ **Gracefully degrade** — show alternate content instead of error
- ✅ **Log 403 errors** — helps identify authorization bugs
- ✅ **Use context/store** — keep user role/permissions in one place

---

# 4. 404 Not Found

## Meaning

The requested resource does not exist on the server. The URL/endpoint is correct format, but the specific resource isn't there (or has been deleted).

### Why This Matters

404 errors can happen legitimately (user deleted an item, wrong URL) or indicate a bug. Handling gracefully improves UX.

### When You'll See This

- ✅ User visits `/api/users/999` but user 999 doesn't exist
- ✅ User bookmarked `/products/old-item` but item was deleted
- ✅ User types wrong URL manually
- ✅ Resource was moved to different URL

### Common Causes

- Wrong URL
- Deleted resource
- Incorrect API endpoint
- User ID doesn't exist in database
- Resource moved to different location

### Backend Response

```json
{
  "status": 404,
  "message": "User not found",
  "code": "NOT_FOUND"
}
```

## JavaScript (Fetch)

```javascript
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);

  if (response.status === 404) {
    console.log("User does not exist");
    return null;
  }

  return response.json();
}
```

## TypeScript

```typescript
async function getResource<T>(
  resourceType: string,
  id: string,
): Promise<T | null> {
  const response = await fetch(`/api/${resourceType}/${id}`);

  if (response.status === 404) {
    console.warn(`${resourceType} with id ${id} not found`);
    return null;
  }

  if (!response.ok) {
    throw new ApiError(response.status, `Failed to fetch ${resourceType}`);
  }

  return response.json();
}

// Usage
const user = await getResource<User>("users", "123");
if (!user) {
  console.log("User not found - handle gracefully");
}
```

## React Example (Not Found Page)

```jsx
import { useParams, useNavigate } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Spinner />;

  if (notFound) {
    return (
      <div className="not-found-container">
        <h1>User Not Found</h1>
        <p>The user you're looking for doesn't exist or has been deleted.</p>
        <button onClick={() => navigate("/users")}>Browse All Users</button>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Catch-all route for 404 pages
function App() {
  return (
    <Routes>
      <Route path="/users/:userId" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
```

## How to Debug 404 Errors

1. **Verify the URL is correct**

   ```javascript
   console.log("Request URL:", `/api/users/${userId}`);
   // Check: spelling, case sensitivity, parameters
   ```

2. **Check if resource was deleted**

   ```javascript
   // If API returns 404 after showing data before, resource was deleted
   // This is expected behavior, handle gracefully
   ```

3. **Check API documentation**
   - Verify endpoint path is correct
   - Check if endpoint requires path parameters
   - Verify base URL is correct

4. **Test with curl or Postman**

   ```bash
   curl -i https://api.example.com/api/users/123
   # Check the status code and response
   ```

5. **Example debugging workflow**

   ```javascript
   async function debugNotFound(userId) {
     const url = `/api/users/${userId}`;
     console.log(`1. Fetching: ${url}`);

     const response = await fetch(url);
     console.log(`2. Status: ${response.status}`);

     const data = await response.json();
     console.log(`3. Response:`, data);

     if (response.status === 404) {
       console.log(`4. User ${userId} not found`);
     }
   }
   ```

## Best Practice

- ✅ **Show custom 404 page** — not just a blank page or error
- ✅ **Provide navigation** — links to go home, search, browse, etc.
- ✅ **Handle deleted resources** — if user tries to access deleted item
- ✅ **Use meaningful messages** — "User not found" not just "Error"
- ✅ **Check for typos** — in URLs when debugging
- ✅ **Differentiate 404s** — page not found vs resource not found
- ✅ **Test edge cases** — deleted items, wrong IDs, etc.

---

# 5. 405 Method Not Allowed

## Meaning

The HTTP method used is not supported for this endpoint. You're using the right URL but the wrong HTTP method.

### Why This Matters

405 errors usually indicate a bug in your code or API misuse. Often caught during development with proper testing.

### When You'll See This

- ❌ You do `POST /api/users` but endpoint only accepts `GET`
- ❌ You do `DELETE /api/users` but endpoint is read-only
- ❌ You do `PUT /api/users/123` but endpoint only accepts `PATCH`

### Common Causes

- Using wrong HTTP method (GET instead of POST)
- API endpoint doesn't support that method
- Typo in URL path (using POST but endpoint is under different path)

### Backend Response

```json
{
  "status": 405,
  "message": "GET method is not allowed",
  "allowed": ["POST", "OPTIONS"]
}
```

## JavaScript

```javascript
// ❌ WRONG - endpoint only accepts GET
const response = await fetch("/api/users", { method: "POST" });
if (response.status === 405) {
  console.log("Method not allowed - use GET instead");
}

// ✅ CORRECT
const response = await fetch("/api/users", { method: "GET" });
```

## TypeScript

```typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Endpoint {
  path: string;
  methods: HttpMethod[];
}

// Define what methods each endpoint supports
const endpoints: Record<string, Endpoint> = {
  users: { path: "/api/users", methods: ["GET", "POST"] },
  user: { path: "/api/users/:id", methods: ["GET", "PUT", "DELETE"] },
};

// Type-safe API call
async function apiCall<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
): Promise<T> {
  // Validate method is supported for this path
  const endpoint = Object.values(endpoints).find((e) => e.path === path);
  if (endpoint && !endpoint.methods.includes(method)) {
    throw new Error(
      `${method} not allowed for ${path}. Allowed: ${endpoint.methods.join(", ")}`,
    );
  }

  const response = await fetch(path, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 405) {
    const error = await response.json();
    throw new Error(
      `Method not allowed. Allowed methods: ${error.allowed?.join(", ")}`,
    );
  }

  if (!response.ok) {
    throw new ApiError(response.status, "Request failed");
  }

  return response.json();
}

// Usage
try {
  await apiCall("POST", "/api/users", { name: "John" });
} catch (error) {
  console.error(error);
}
```

## How to Debug 405 Errors

1. **Check API documentation** — what HTTP methods does this endpoint support?
2. **Check your code** — are you using the right method?
   ```javascript
   // Check: fetch("/api/x", { method: "POST" })
   //                                      ^^^^^^ is this right?
   ```
3. **Look at Network tab** — see what method was actually sent
4. **Common mistakes**

   ```javascript
   // ❌ Wrong
   fetch("/api/users", { method: "POST" }); // if endpoint is GET only

   // ❌ Wrong
   fetch("/api/users", { method: "PUT" }); // if endpoint doesn't support PUT

   // ✅ Right - check docs first
   ```

## Best Practice

- ✅ **Read API documentation first** — know which methods each endpoint supports
- ✅ **Use TypeScript** — enforce correct methods at compile time
- ✅ **Test all endpoints** — verify you're using the right HTTP method
- ✅ **Don't retry on 405** — it's not a temporary error, fix your code
- ✅ **Common pattern**: GET (read), POST (create), PUT (update), DELETE (remove)
- ✅ **Check response headers** — might include `Allow` header listing supported methods

---

# 6. 409 Conflict

## Meaning

The request conflicts with existing data. Usually happens when trying to create a duplicate resource or update causes a conflict.

### Why This Matters

409 errors are common during user registration/onboarding. Handle gracefully so users know why their request failed.

### When You'll See This

- ❌ User signs up with an email that already exists
- ❌ User tries to change username to one already taken
- ❌ Resource already exists under that name/ID
- ❌ Version conflict when updating (old data + new data clash)

### Common Causes

- Email already exists
- Username already taken
- Trying to create duplicate resource
- Concurrent updates to same resource

### Backend Response

```json
{
  "status": 409,
  "message": "Email already exists",
  "conflict": {
    "field": "email",
    "existingValue": "user@example.com"
  }
}
```

## JavaScript

```javascript
async function signup(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 409) {
    const error = await response.json();
    console.log(`${error.message} - try a different email`);
    return { success: false, error: error.message };
  }

  return { success: true };
}
```

## TypeScript

```typescript
interface ConflictError {
  status: 409;
  message: string;
  conflictingField: string;
  suggestedAction?: string;
}

async function createUserWithConflictHandling(userData: {
  email: string;
  username: string;
}): Promise<{ success: boolean; error?: ConflictError }> {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 409) {
      const error: ConflictError = await response.json();
      return { success: false, error };
    }

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

// Usage
const result = await createUserWithConflictHandling({
  email: "taken@example.com",
  username: "john",
});

if (!result.success && result.error?.conflictingField === "email") {
  console.log("Email is already registered");
}
```

## React Example

```jsx
function SignupForm() {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 409) {
      setEmailError(
        "This email is already registered. Try logging in instead.",
      );
      return;
    }

    // Success
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {emailError && (
        <div className="error">
          {emailError} <a href="/login">Go to Login</a>
        </div>
      )}
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

## How to Debug 409 Errors

1. **Check if resource already exists**

   ```javascript
   // If signup fails with 409, email is already registered
   // This is expected - show user friendly message
   ```

2. **Verify you're using unique values**

   ```javascript
   // Check email, username, etc. for duplicates
   console.log("Trying email:", "user@example.com");
   // If this email is already in database, you'll get 409
   ```

3. **Look at error details**
   - Server response should say which field conflicted
   - Example: `email already exists` vs `username already taken`

## Best Practice

- ✅ **Check existence before submitting** — validate uniqueness on client first
- ✅ **Show specific message** — tell user which field caused conflict
- ✅ **Suggest alternatives** — "try adding a number" or "login instead"
- ✅ **Link related actions** — if email taken, link to "login" or "forgot password"
- ✅ **Don't retry 409** — it's not temporary, the conflict is real
- ✅ **Log 409 errors** — helps identify duplicate handling issues
- ✅ **Handle race conditions** — if two users sign up simultaneously with same email

---

# 7. 422 Unprocessable Entity

# 7. 422 Unprocessable Entity

## Meaning

The request format is correct (valid JSON, proper structure), but the **values** fail validation. Similar to 400, but more specific: the structure is fine, but the data doesn't meet business rules.

### Why This Matters

422 errors often carry detailed field-specific error messages. Proper handling shows users exactly what to fix.

### When You'll See This

- ❌ Password too short (requires min 8 characters)
- ❌ Age outside valid range (must be 18-100)
- ❌ Email format invalid (not matching pattern)
- ❌ Custom business rule violated

### Common Causes

- Field validation failed (length, format, range)
- Custom business rule violation
- Value doesn't meet minimum/maximum requirements
- Date/time validation failed
- Conditional validation failed

### Backend Response

```json
{
  "status": 422,
  "message": "Validation failed",
  "errors": {
    "password": "Password must be at least 8 characters",
    "email": "Email must be valid",
    "age": "Age must be between 18 and 100",
    "terms": "You must agree to terms"
  }
}
```

## JavaScript

```javascript
async function submitForm(formData) {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 422) {
    const result = await response.json();
    // result.errors contains field-specific errors
    return { success: false, errors: result.errors };
  }

  return { success: true };
}
```

## TypeScript (Field-Level Errors)

```typescript
interface ValidationErrors {
  [fieldName: string]: string;
}

interface ValidationResponse {
  status: 422;
  message: string;
  errors: ValidationErrors;
}

async function validateAndSubmit<T extends Record<string, unknown>>(
  endpoint: string,
  data: T,
): Promise<
  { success: true } | { success: false; fieldErrors: ValidationErrors }
> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 422) {
      const result: ValidationResponse = await response.json();
      return { success: false, fieldErrors: result.errors };
    }

    if (!response.ok) {
      throw new ApiError(response.status, "Request failed");
    }

    return { success: true };
  } catch (error) {
    throw new ApiError(0, "Network error");
  }
}

// Usage
type RegistrationData = {
  email: string;
  password: string;
  age: number;
  agreeToTerms: boolean;
};

const result = await validateAndSubmit<RegistrationData>("/api/register", {
  email: "user@example.com",
  password: "short", // Will fail - too short
  age: 25,
  agreeToTerms: true,
});

if (!result.success) {
  console.log("Errors:", result.fieldErrors.password);
  // Output: "Password must be at least 8 characters"
}
```

## React Example (with Field-Level Error Display)

```jsx
function RegistrationForm() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    age: "",
    agreeToTerms: false,
  });

  const [fieldErrors, setFieldErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 422) {
      const result = await response.json();
      setFieldErrors(result.errors);
      setIsSubmitting(false);
      return;
    }

    if (!response.ok) {
      setFieldErrors({ _global: "Registration failed" });
      setIsSubmitting(false);
      return;
    }

    // Success - redirect
    window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit}>
      {fieldErrors._global && (
        <div className="alert alert-error">{fieldErrors._global}</div>
      )}

      {/* Email field */}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={fieldErrors.email ? "input-error" : ""}
        />
        {fieldErrors.email && (
          <span className="field-error">{fieldErrors.email}</span>
        )}
      </div>

      {/* Password field */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className={fieldErrors.password ? "input-error" : ""}
        />
        {fieldErrors.password && (
          <span className="field-error">{fieldErrors.password}</span>
        )}
        <small>Minimum 8 characters required</small>
      </div>

      {/* Age field */}
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className={fieldErrors.age ? "input-error" : ""}
        />
        {fieldErrors.age && (
          <span className="field-error">{fieldErrors.age}</span>
        )}
      </div>

      {/* Checkbox field */}
      <div className="form-group checkbox">
        <input
          id="terms"
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={(e) =>
            setFormData({ ...formData, agreeToTerms: e.target.checked })
          }
        />
        <label htmlFor="terms">I agree to the terms and conditions</label>
        {fieldErrors.agreeToTerms && (
          <span className="field-error">{fieldErrors.agreeToTerms}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
```

## How to Debug 422 Errors

1. **Read the error message carefully**

   ```javascript
   const response = await fetch("/api/register");
   const data = await response.json();
   console.log("Field errors:", data.errors);
   // Should tell you exactly which fields failed and why
   ```

2. **Check validation requirements**
   - Look at API documentation for field requirements
   - Password: min length, special chars?
   - Email: must be valid format
   - Age: valid range?

3. **Validate client-side first**

   ```javascript
   function validateForm(data) {
     const errors = {};

     if (!data.password || data.password.length < 8) {
       errors.password = "Password must be at least 8 characters";
     }

     if (!Number.isInteger(data.age) || data.age < 18) {
       errors.age = "Age must be at least 18";
     }

     return errors;
   }
   ```

4. **Test each field individually**
   - Submit form with only one field at a time
   - See which specific validations fail

## Best Practice

- ✅ **Show field-specific errors** — not just "validation failed"
- ✅ **Validate client-side first** — show errors before sending request
- ✅ **Keep user input** — don't clear form on validation error
- ✅ **Highlight error fields** — red border or error icon
- ✅ **Don't retry 422** — it's validation, not a server issue
- ✅ **Provide hints** — "password must be 8+ characters"
- ✅ **Group related errors** — show all problems at once
- ✅ **Use TypeScript** — ensure form data matches validation rules

---

# 8. 429 Too Many Requests

## Meaning

You've exceeded the rate limit. The server is rejecting requests because you're sending too many too quickly. **Retry after waiting.**

### Why This Matters

Rate limiting protects servers from abuse. Proper handling with exponential backoff prevents lockouts.

### When You'll See This

- ❌ User clicks submit button rapidly (5+ times in 1 second)
- ❌ API loop sends 1000 requests per second
- ❌ Form submission retries too aggressively
- ❌ Automated system exceeds allowed requests per minute

### Common Causes

- Too many API calls in short time
- Spam/abuse requests
- Client not respecting rate limits
- No backoff strategy on retries

### Backend Response

```json
{
  "status": 429,
  "message": "Too many requests",
  "retryAfter": 60
}
```

## JavaScript (with Retry)

```javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url);

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      const delay = parseInt(retryAfter || "5") * 1000; // Convert to milliseconds
      console.log(`Rate limited. Retrying after ${delay}ms`);

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response;
  }

  throw new Error("Max retries exceeded");
}
```

## TypeScript (with Exponential Backoff)

```typescript
interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
};

async function fetchWithExponentialBackoff<T>(
  url: string,
  options: RequestInit = {},
  config: RetryConfig = DEFAULT_RETRY_CONFIG,
): Promise<T> {
  let lastError: Error | null = null;
  let delayMs = config.initialDelayMs;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429) {
        if (attempt === config.maxRetries) {
          throw new ApiError(429, "Rate limited - max retries exceeded");
        }

        // Use Retry-After header if available
        const retryAfter = response.headers.get("Retry-After");
        if (retryAfter) {
          delayMs = parseInt(retryAfter) * 1000;
        }

        console.log(
          `Attempt ${attempt + 1}/${config.maxRetries + 1}: Rate limited. Waiting ${delayMs}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));

        // Exponential backoff for next retry
        delayMs = Math.min(
          delayMs * config.backoffMultiplier,
          config.maxDelayMs,
        );
        continue;
      }

      if (!response.ok) {
        throw new ApiError(response.status, "Request failed");
      }

      return response.json();
    } catch (error) {
      lastError = error instanceof ApiError ? error : new Error(String(error));

      if (attempt === config.maxRetries) {
        throw lastError;
      }
    }
  }

  throw lastError || new Error("Unknown error");
}

// Usage
try {
  const data = await fetchWithExponentialBackoff("/api/data");
} catch (error) {
  if (error instanceof ApiError && error.status === 429) {
    console.log("Still rate limited after retries");
  }
}
```

## React Example (with Button Throttling)

```jsx
function DataDownloadButton() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [cooldownSeconds, setCooldownSeconds] = React.useState(0);
  const [error, setError] = React.useState("");

  const handleClick = async () => {
    if (cooldownSeconds > 0) return; // Button already disabled

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/data/export", {
        method: "POST",
      });

      if (response.status === 429) {
        // Extract retry-after time
        const retryAfter = parseInt(
          response.headers.get("Retry-After") || "60",
        );
        setCooldownSeconds(retryAfter);
        setError(`Too many requests. Please wait ${retryAfter} seconds.`);

        // Countdown timer
        const interval = setInterval(() => {
          setCooldownSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return;
      }

      const data = await response.json();
      // Download file...
    } catch (err) {
      setError("Download failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading || cooldownSeconds > 0}>
        {cooldownSeconds > 0
          ? `Wait ${cooldownSeconds}s`
          : isLoading
            ? "Downloading..."
            : "Download Data"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

## How to Debug 429 Errors

1. **Check request frequency**

   ```javascript
   // Log each request
   let requestCount = 0;
   setInterval(() => {
     console.log(`Requests in last second: ${requestCount}`);
     requestCount = 0;
   }, 1000);
   ```

2. **Look for loops causing rapid requests**

   ```javascript
   // ❌ Bad - sends 100 requests immediately
   for (let i = 0; i < 100; i++) {
     await fetch("/api/data/" + i);
   }

   // ✅ Good - throttles requests
   for (let i = 0; i < 100; i++) {
     await fetch("/api/data/" + i);
     await delay(100); // Wait 100ms between requests
   }
   ```

3. **Check if user is clicking button repeatedly**

   ```javascript
   // Disable button until request completes
   <button disabled={isLoading}>Send</button>
   ```

4. **Review API rate limit documentation**
   - What's the limit? (e.g., 100 requests/minute)
   - How long is the cooldown?

## Best Practice

- ✅ **Implement exponential backoff** — 1s, 2s, 4s, 8s, etc.
- ✅ **Respect Retry-After header** — server tells you when to retry
- ✅ **Disable buttons during requests** — prevent accidental rapid clicks
- ✅ **Show cooldown timer** — tell user how long to wait
- ✅ **Don't retry forever** — give up after max attempts
- ✅ **Batch requests** — combine multiple into one if possible
- ✅ **Throttle requests** — add delay between rapid calls
- ✅ **Log rate limits** — helps identify patterns

---

# 9. 500 Internal Server Error

# 9. 500 Internal Server Error

## Meaning

Unexpected failure on the server. Something went wrong, and the server doesn't know what to do. **Not your fault** — don't expose the error to users, it's a backend issue.

### Why This Matters

500 errors are the most opaque. Users need reassurance that it's not their problem, and logs need detailed info for debugging.

### When You'll See This

- ❌ Database connection failed
- ❌ Code threw an unhandled exception
- ❌ Server ran out of memory
- ❌ Unhandled async error in request handler
- ❌ External API call failed (payment processor, email service, etc.)

### Common Causes

- Code exception/bug on server
- Database connection lost
- Null pointer exception
- Server crash
- Uncaught promise rejection
- Resource exhaustion (memory, disk)

### Backend Response

```json
{
  "status": 500,
  "message": "Internal server error"
}
```

## JavaScript

```javascript
async function fetchData() {
  try {
    const response = await fetch("/api/data");

    if (response.status === 500) {
      // Server error - not user's fault
      console.log("Server error - please try again later");
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
}
```

## TypeScript (with Logging)

```typescript
async function apiCallWithErrorLog<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T | null> {
  try {
    const response = await fetch(endpoint, options);

    if (response.status === 500) {
      // Log the error for backend team
      const timestamp = new Date().toISOString();
      const errorLog = {
        timestamp,
        endpoint,
        status: 500,
        method: options.method || "GET",
      };

      // Send to error tracking service
      await logErrorToService(errorLog);

      throw new ApiError(500, "Server error - our team has been notified");
    }

    if (!response.ok) {
      throw new ApiError(response.status, "Request failed");
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(0, "Network error");
  }
}

async function logErrorToService(errorLog: unknown): Promise<void> {
  try {
    await fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(errorLog),
    });
  } catch (e) {
    // Silently fail - don't break the app if logging fails
    console.error("Failed to log error:", e);
  }
}
```

## React Example (with Retry and Support Link)

```jsx
function DataLoader() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [isRetrying, setIsRetrying] = React.useState(false);

  const loadData = async () => {
    try {
      setError("");
      const response = await fetch("/api/data");

      if (response.status === 500) {
        setError(
          "Our server encountered an error. Our team has been notified. Please try again in a moment.",
        );
        return;
      }

      if (!response.ok) {
        setError("Failed to load data");
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Network error - please check your connection");
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    await loadData();
    setIsRetrying(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return (
      <div className="alert alert-error">
        <h3>Something Went Wrong</h3>
        <p>{error}</p>
        <button onClick={handleRetry} disabled={isRetrying}>
          {isRetrying ? "Retrying..." : "Try Again"}
        </button>
        <p className="small-text">
          Still having issues?{" "}
          <a href="mailto:support@example.com">Contact Support</a>
        </p>
      </div>
    );
  }

  return <div>{data && <Content data={data} />}</div>;
}
```

## How to Debug 500 Errors

**⚠️ These are server problems, but here's what you can do:**

1. **Check server logs** — Ask backend team to look at server logs
2. **Try again later** — May be temporary (deployment, restart)
3. **Report to backend team** — Include:
   - Exact timestamp of error
   - What you were doing when it happened
   - Any error message shown to you

4. **Look for patterns**

   ```javascript
   // Does it happen consistently with one endpoint?
   // Or is it random?
   // This helps backend team debug
   ```

5. **Check system status**
   - Is the server running?
   - Any recent deployments?
   - Any known issues?

## Best Practice

- ✅ **Never expose internal errors to users** — show generic message
- ✅ **Log detailed errors server-side** — stack traces, context, etc.
- ✅ **Send error tracking to service** — Sentry, Datadog, etc.
- ✅ **Allow retry** — may be temporary
- ✅ **Show support contact** — users need to reach out if persistent
- ✅ **Don't retry infinitely** — cap at 3-5 attempts
- ✅ **Monitor 500 errors** — alert team if they spike
- ✅ **Track patterns** — which endpoints? which times?

---

# 10. 502 Bad Gateway

## Meaning

The gateway (reverse proxy/load balancer) received an invalid response from the backend server. The backend is not responding correctly or is offline.

### Why This Matters

502 errors usually mean backend infrastructure issue. Can be temporary (deployment, restart) or persistent (infrastructure problem).

### When You'll See This

- ❌ Backend server is restarting
- ❌ Load balancer can't reach any healthy backend
- ❌ Reverse proxy misconfiguration
- ❌ Backend API taking too long to respond

### Common Causes

- Backend server offline or restarting
- Reverse proxy / load balancer misconfigured
- Backend server crashed
- Network partition

### Backend Response

```json
{
  "status": 502,
  "message": "Bad Gateway"
}
```

## JavaScript

```javascript
async function fetchWithGatewayFallback(url, retries = 3) {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);

      if (response.status === 502) {
        // Temporary - retry after delay
        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000 * (i + 1)));
          continue;
        }
      }

      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Request failed after retries");
}
```

## TypeScript

```typescript
async function fetchWithBackendHealthCheck(
  url: string,
  maxRetries: number = 3,
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      if (response.status === 502) {
        if (attempt === maxRetries) {
          throw new ApiError(502, "Backend service unavailable");
        }

        // Exponential backoff
        const delayMs = Math.pow(2, attempt) * 1000;
        console.log(`502 error - retrying in ${delayMs}ms`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      return response;
    } catch (error) {
      if (attempt === maxRetries) throw error;
    }
  }

  throw new Error("Failed to get response");
}
```

## How to Debug 502 Errors

1. **Check if backend is running**
   - Ask ops/devops team
   - Check status page
   - Look for recent deployments

2. **Is it persistent or intermittent?**
   - Persistent: backend issue
   - Intermittent: deployment/restart in progress

3. **Check CDN/firewall logs** — if you have access

4. **Ask backend team to check**
   - Server running?
   - Any recent changes?
   - Load balancer status?

## Best Practice

- ✅ **Retry with backoff** — likely temporary
- ✅ **Monitor for spikes** — if many 502s, notify ops
- ✅ **Check status page** — communicate with users
- ✅ **Use fallback data** — show cached data if available
- ✅ **Alert ops team** — when 502s spike
- ✅ **Don't retry immediately** — wait before retrying
- ✅ **Track duration** — how long is backend down?

---

# 11. 503 Service Unavailable

## Meaning

The server is temporarily unavailable. Usually means **maintenance or overload**. **Retry after waiting** — it's temporary.

### Why This Matters

503 errors are expected during maintenance or high traffic. Users need to know service will return.

### When You'll See This

- ✅ Server under maintenance (planned downtime)
- ✅ Server overloaded (too much traffic)
- ✅ Graceful shutdown in progress
- ✅ Dependencies (database, cache) temporarily unavailable

### Common Causes

- Planned maintenance
- High traffic/load
- Deployment in progress
- Database maintenance
- Third-party service dependency down

### Backend Response

```json
{
  "status": 503,
  "message": "Service unavailable",
  "retryAfter": 300,
  "reason": "Scheduled maintenance"
}
```

## JavaScript (with Auto-Retry)

```javascript
async function fetchWithMaintenanceHandling(url) {
  const response = await fetch(url);

  if (response.status === 503) {
    const retryAfter = response.headers.get("Retry-After");
    const delaySeconds = parseInt(retryAfter || "60");

    console.log(
      `Service unavailable. Will retry in ${delaySeconds} seconds...`,
    );

    // Wait and retry
    await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000));
    return fetch(url); // Retry
  }

  return response;
}
```

## TypeScript (with User Notification)

```typescript
interface MaintenanceInfo {
  isUnderMaintenance: boolean;
  estimatedDuration?: number;
  message?: string;
}

async function checkServiceStatus(): Promise<MaintenanceInfo> {
  try {
    const response = await fetch("/api/health");

    if (response.status === 503) {
      const data = await response.json();
      return {
        isUnderMaintenance: true,
        estimatedDuration: data.retryAfter,
        message: data.reason,
      };
    }

    return { isUnderMaintenance: false };
  } catch {
    return { isUnderMaintenance: true }; // Assume down on network error
  }
}
```

## React Example (with Maintenance Banner)

```jsx
function MaintenanceBanner() {
  const [maintenance, setMaintenance] = React.useState(null);

  React.useEffect(() => {
    const checkStatus = async () => {
      const response = await fetch("/api/data");

      if (response.status === 503) {
        const retryAfter = parseInt(
          response.headers.get("Retry-After") || "300",
        );
        setMaintenance({
          active: true,
          duration: retryAfter,
        });

        // Auto-dismiss after maintenance window
        setTimeout(
          () => {
            window.location.reload();
          },
          retryAfter * 1000 + 5000,
        );
      }
    };

    checkStatus();
  }, []);

  if (!maintenance?.active) return null;

  return (
    <div className="alert alert-info">
      <h3>🔧 Scheduled Maintenance</h3>
      <p>
        We're performing scheduled maintenance. Service will be back in{" "}
        {Math.ceil(maintenance.duration / 60)} minutes.
      </p>
      <p>Thank you for your patience!</p>
    </div>
  );
}

function App() {
  const [isDown, setIsDown] = React.useState(false);

  React.useEffect(() => {
    const check = async () => {
      const response = await fetch("/api/status");
      if (response.status === 503) {
        setIsDown(true);
      }
    };

    check();
    const interval = setInterval(check, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  if (isDown) {
    return (
      <div className="maintenance-page">
        <h1>🛠️ Under Maintenance</h1>
        <p>We'll be back soon!</p>
        <p>Check our status page for updates.</p>
      </div>
    );
  }

  return <MainContent />;
}
```

## How to Debug 503 Errors

1. **Check status page** — Is maintenance announced?
2. **Check social media/email** — Any notifications from service?
3. **Try in browser** — Does main website load?
4. **Check logs** — When did 503 start?
5. **Ask ops team** — Is this planned maintenance?

## Best Practice

- ✅ **Implement exponential backoff** — don't hammer server
- ✅ **Respect Retry-After header** — server tells you when to retry
- ✅ **Show maintenance banner** — users appreciate transparency
- ✅ **Cache previous data** — show stale data if available
- ✅ **Auto-retry silently** — if it's known maintenance window
- ✅ **Redirect to status page** — where users can track status
- ✅ **Use exponential backoff** — don't flood server with retries
- ✅ **Post incident updates** — communicate with users

---

# 12. 504 Gateway Timeout

## Meaning

The gateway waited too long for a response from the backend. The request took **too long to process**, so the gateway gave up and returned an error.

### Why This Matters

504 errors indicate slow backend. May be temporary (long-running query) or persistent (need optimization).

### When You'll See This

- ❌ Database query taking 30+ seconds
- ❌ External API call is very slow
- ❌ File processing/upload on backend
- ❌ Third-party service responding slowly

### Common Causes

- Slow database query
- Slow external API call
- Large file processing
- Backend resource exhaustion
- Network latency

### Backend Response

```json
{
  "status": 504,
  "message": "Gateway timeout"
}
```

## JavaScript (with Timeout Logic)

```javascript
async function fetchWithTimeout(url, timeoutMs = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (response.status === 504) {
      console.log("Request timed out on server");
      return null;
    }

    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request aborted (client timeout)");
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

## TypeScript (with Retry Logic)

```typescript
async function fetchWithTimeoutRetry<T>(
  url: string,
  maxRetries: number = 2,
  timeoutMs: number = 30000,
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 504) {
        if (attempt < maxRetries) {
          // Exponential backoff before retry
          await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
          continue;
        }
        throw new ApiError(504, "Request timed out repeatedly");
      }

      if (!response.ok) {
        throw new ApiError(response.status, "Request failed");
      }

      return response.json();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
    }
  }

  throw new Error("Failed to get response");
}
```

## React Example (with Loading Indicator)

```jsx
function LongRunningTask() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

      const response = await fetch("/api/long-task", {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ /* data */ }),
      });

      clearTimeout(timeoutId);

      if (response.status === 504) {
        setError(
          "The request took too long. The server may be processing it in the background.",
        );
        return;
      }

      if (!response.ok) {
        setError("Request failed");
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      if ((err as any).name === "AbortError") {
        setError("Request timed out");
      } else {
        setError("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing... (this may take a while)" : "Start Task"}
      </button>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="success">
          <p>Task completed!</p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

## How to Debug 504 Errors

1. **Check server logs** — Is the backend slow?
2. **Look for slow queries** — Database query performance?
3. **Check external API calls** — Is a third-party service slow?
4. **Monitor performance** — Is server under load?
5. **Ask backend team to optimize** — Caching? Query optimization?

6. **Performance debugging**
   ```javascript
   const start = Date.now();
   const response = await fetch("/api/data");
   const duration = Date.now() - start;
   console.log(`Request took ${duration}ms`);
   ```

## Best Practice

- ✅ **Increase timeout for long operations** — don't assume 30s is enough
- ✅ **Show loading indicator** — user knows it's processing
- ✅ **Allow retries** — may succeed on second attempt
- ✅ **Implement polling** — check if async task completed
- ✅ **Use async/background jobs** — don't block request
- ✅ **Optimize backend** — reduce processing time
- ✅ **Add progress indicator** — for long-running tasks
- ✅ **Cache results** — if applicable, avoid repeated slow queries

---

# Handling Network Errors

Sometimes there is **no HTTP response at all**. The request never reaches the server.

### Common Network Error Causes

- 🌐 Internet disconnected
- 📡 DNS resolution failed
- 🚫 CORS blocked (browser security)
- 🔗 Connection refused (server not listening)
- ⏱️ Request timeout
- 📋 Malformed request

### Detecting Network Errors

Network errors occur in the `catch` block of fetch, not in HTTP status codes:

```javascript
try {
  const response = await fetch("/api/data");
  // At this point, we have HTTP response (even if it's 500)
} catch (error) {
  // This catches NETWORK ERRORS only:
  // - No internet
  // - DNS failed
  // - CORS blocked
  // - Connection refused
  // - etc.
}
```

## JavaScript

```javascript
async function fetchWithNetworkHandling(url) {
  try {
    const response = await fetch(url);
    return response;
  } catch (error) {
    // Network error - not an HTTP error
    const isNetworkError = !(error instanceof Response);

    if (navigator.onLine === false) {
      console.log("No internet connection");
    } else if (error.name === "AbortError") {
      console.log("Request was aborted/timed out");
    } else {
      console.log("Network error:", error.message);
    }

    throw error;
  }
}
```

## TypeScript

```typescript
class NetworkError extends Error {
  constructor(
    public message: string,
    public originalError: Error,
  ) {
    super(message);
    this.name = "NetworkError";
  }

  isOffline(): boolean {
    return !navigator.onLine;
  }

  isTimeout(): boolean {
    return this.originalError.name === "AbortError";
  }

  isCorsError(): boolean {
    return this.message.includes("CORS");
  }
}

async function robustFetch<T>(
  url: string,
  timeoutMs: number = 30000,
): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(response.status, "HTTP error");
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;

    // Convert network error to our custom type
    const networkError = new NetworkError(
      "Network request failed",
      error instanceof Error ? error : new Error(String(error)),
    );

    if (networkError.isOffline()) {
      throw new Error("You are offline. Check your internet connection.");
    }

    if (networkError.isTimeout()) {
      throw new Error("Request timed out. Please try again.");
    }

    throw networkError;
  }
}
```

## React Example

```jsx
function DataComponent() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [isRetrying, setIsRetrying] = React.useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setError("");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch("/api/data", {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          setError(`HTTP Error: ${response.status}`);
          return;
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if ((err as any).name === "AbortError") {
          setError("Request timed out");
        } else if (!navigator.onLine) {
          setError("No internet connection");
        } else {
          setError("Failed to load data");
        }
      }
    };

    loadData();

    // Monitor online/offline status
    const handleOnline = () => {
      console.log("Back online - retrying...");
      setError("");
      loadData();
    };

    const handleOffline = () => {
      setError("You are offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (error) {
    return (
      <div className="alert alert-error">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return <div>{data && <Content data={data} />}</div>;
}
```

## How to Debug Network Errors

1. **Check internet connection**

   ```javascript
   console.log("Online?", navigator.onLine);
   ```

2. **Check browser DevTools**
   - Network tab → look for red "failed" requests
   - Check error message (CORS? timeout? refused?)

3. **Test with curl**

   ```bash
   curl -v https://api.example.com/api/data
   # See detailed connection info
   ```

4. **Check CORS headers** (if frontend)
   - API server must include `Access-Control-Allow-Origin: *`
   - Or include your domain

5. **Example debugging workflow**
   ```javascript
   async function debug() {
     console.log("1. Online?", navigator.onLine);
     console.log("2. Attempting fetch...");
     try {
       const response = await fetch("/api/data");
       console.log("3. Got response:", response.status);
     } catch (error) {
       console.log("3. Error:", error.message);
       console.log("4. Error name:", (error as any).name);
     }
   }
   ```

---

# Global Error Handler (Axios)

```typescript
import axios, { AxiosInstance, AxiosError } from "axios";

// Create typed Axios instance
const api: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// Request interceptor - add auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 400:
        console.error("Bad Request:", error.response?.data);
        break;

      case 401:
        // Clear auth and redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;

      case 403:
        console.error("Forbidden - insufficient permissions");
        break;

      case 404:
        console.error("Resource not found");
        break;

      case 422:
        console.error("Validation failed:", error.response?.data);
        break;

      case 429:
        const retryAfter = error.response?.headers["retry-after"] || "60";
        console.warn(`Rate limited. Retry after ${retryAfter}s`);
        break;

      case 500:
      case 502:
      case 503:
      case 504:
        console.error("Server error:", status);
        break;

      default:
        if (!error.response) {
          console.error("Network error:", error.message);
        }
    }

    // Re-throw to let caller handle
    return Promise.reject(error);
  },
);

export default api;
```

---

# Quick Reference Table

| Status | Name                 | Meaning                | User Action         | Dev Action                        |
| ------ | -------------------- | ---------------------- | ------------------- | --------------------------------- |
| 200    | OK                   | Success                | Process result      | Done ✅                           |
| 201    | Created              | Resource created       | Show success        | Redirect to new resource          |
| 204    | No Content           | Success, no data       | Continue silently   | Handle empty response             |
| 400    | Bad Request          | Invalid client data    | Fix input           | Validate client-side first        |
| 401    | Unauthorized         | Login required         | Redirect to login   | Check/refresh token               |
| 403    | Forbidden            | No permission          | Show access denied  | Check user role/permissions       |
| 404    | Not Found            | Resource missing       | Navigate away       | Verify URL/endpoint exists        |
| 405    | Method Not Allowed   | Wrong HTTP method      | —                   | Check API docs for methods        |
| 409    | Conflict             | Duplicate/conflict     | Use different value | Check for existing resource       |
| 422    | Unprocessable Entity | Validation failed      | Fix field errors    | Show field-specific errors        |
| 429    | Too Many Requests    | Rate limited           | Wait and retry      | Implement backoff                 |
| 500    | Server Error         | Server crash/exception | Try later           | Check server logs                 |
| 502    | Bad Gateway          | Backend unavailable    | Try again           | Check backend health              |
| 503    | Service Unavailable  | Maintenance/overload   | Wait                | Check maintenance window          |
| 504    | Gateway Timeout      | Request too slow       | Try again           | Optimize backend/increase timeout |
| —      | Network Error        | No connection          | Check internet      | Handle offline scenario           |

---

# Decision Tree: Which Approach to Use?

```
┌─ What error handling do you need?
│
├─ 1. Handle errors in COMPONENTS (React)?
│  └─ Use try/catch in useEffect
│     └─ setState(error) to show message
│
├─ 2. Handle errors GLOBALLY (all requests)?
│  └─ Use Axios/Fetch interceptor
│     └─ Handle 401 (redirect), 500 (log), etc.
│
├─ 3. Retry on failure?
│  ├─ 4xx errors: DON'T retry (user/app error)
│  └─ 5xx errors: DO retry with exponential backoff
│
├─ 4. Long-running request (>10s)?
│  └─ Increase timeout
│     └─ Show loading indicator
│        └─ Allow cancel
│
└─ 5. Rate limited (429)?
   └─ Wait Retry-After seconds
      └─ Show countdown timer
         └─ Don't retry immediately
```

---

# Appendix: Common Pitfalls & How to Fix Them

## Pitfall 1: Ignoring Network Errors

❌ **Bad:**

```javascript
const response = await fetch("/api/data");
const data = response.json(); // ← No error handling
```

✅ **Good:**

```javascript
try {
  const response = await fetch("/api/data");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.json();
} catch (error) {
  console.error("Failed to fetch:", error);
  // Show user-friendly message
}
```

---

## Pitfall 2: Retrying All Errors

❌ **Bad:**

```javascript
// This retries even on 400 (client error)!
for (let i = 0; i < 3; i++) {
  const response = await fetch("/api/data");
  if (response.ok) return response.json();
}
```

✅ **Good:**

```javascript
// Only retry on 5xx/network errors
if (response.status >= 500 || !response) {
  // Retry with backoff
}
```

---

## Pitfall 3: Exposing Server Errors to Users

❌ **Bad:**

```javascript
// Never do this!
const error = await response.json();
setError(error.stack); // Shows internal error! 🔴
```

✅ **Good:**

```javascript
// Show generic message to user
if (response.status === 500) {
  setError("Our server encountered an error. Please try again later.");
  // Log detailed error server-side
}
```

---

## Pitfall 4: Using `any` for Errors

❌ **Bad:**

```typescript
catch (error: any) {
  console.log(error.status);  // What if error is a string?
}
```

✅ **Good:**

```typescript
catch (error: unknown) {
  if (error instanceof ApiError) {
    console.log(error.status);
  }
}
```

---

## Pitfall 5: Not Handling Offline

❌ **Bad:**

```javascript
const data = await fetch("/api/data").then((r) => r.json());
// Crashes if user is offline
```

✅ **Good:**

```javascript
try {
  const data = await fetch("/api/data").then((r) => r.json());
} catch (error) {
  if (!navigator.onLine) {
    showError("You are offline");
  } else {
    showError("Network error");
  }
}
```

---

## Pitfall 6: Infinite Retry Loop

❌ **Bad:**

```javascript
while (true) {
  const response = await fetch("/api/data");
  if (response.ok) break;
  // Infinite loop if server is down!
}
```

✅ **Good:**

```javascript
let retries = 0;
while (retries < 3) {
  const response = await fetch("/api/data");
  if (response.ok) break;
  retries++;
}
```

---

## Pitfall 7: Not Clearing Auth on 401

❌ **Bad:**

```javascript
if (response.status === 401) {
  setError("Unauthorized");
  // Token still in localStorage!
}
```

✅ **Good:**

```javascript
if (response.status === 401) {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
```

---

## Pitfall 8: Showing Raw JSON Errors

❌ **Bad:**

```javascript
const error = await response.json();
setError(JSON.stringify(error)); // Raw JSON to user 😞
```

✅ **Good:**

```javascript
const error = await response.json();
setError(error.message || "Something went wrong");
```

---

# Full Working Example: CRUD with Error Handling

See a complete, production-ready example with Create, Read, Update, Delete operations and comprehensive error handling:

```typescript
// services/userService.ts

interface User {
  id: number;
  email: string;
  name: string;
}

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

class UserService {
  private baseURL = "/api/users";

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const url = `${this.baseURL}${path}`;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      // Handle auth errors
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new ApiError(401, "Session expired");
      }

      // Handle errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, errorData.message || "Request failed", errorData);
      }

      // Parse response
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(0, "Network error");
    }
  }

  // CREATE
  async createUser(data: CreateUserRequest): Promise<User> {
    try {
      return await this.request<User>("POST", "", data);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          throw new Error("Email already exists");
        }
        if (error.status === 422) {
          throw new Error(`Validation failed: ${error.details?.message || ""}`);
        }
      }
      throw error;
    }
  }

  // READ
  async getUser(id: number): Promise<User | null> {
    try {
      return await this.request<User>("GET", `/${id}`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null; // User not found
      }
      throw error;
    }
  }

  async listUsers(): Promise<User[]> {
    return await this.request<User[]>("GET", "");
  }

  // UPDATE
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    try {
      return await this.request<User>("PUT", `/${id}`, data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        throw new Error("User not found");
      }
      throw error;
    }
  }

  // DELETE
  async deleteUser(id: number): Promise<void> {
    try {
      await this.request<void>("DELETE", `/${id}`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        throw new Error("User not found");
      }
      throw error;
    }
  }
}

export const userService = new UserService();

// React Component using service
function UserManager() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.listUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await userService.deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {error && <div className="alert alert-error">{error}</div>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Summary Checklist

✅ **Error Handling Checklist:**

- [ ] Handle 4xx errors differently from 5xx errors
- [ ] Retry only on 5xx and network errors
- [ ] Clear auth tokens on 401
- [ ] Show user-friendly messages (not raw errors)
- [ ] Log errors for monitoring
- [ ] Implement exponential backoff for retries
- [ ] Handle offline scenarios
- [ ] Test error scenarios with unit tests
- [ ] Use TypeScript with proper typing
- [ ] Never expose server internals to users

---

**Learn More:** For TypeScript strict mode patterns, see `/TypeScript/src/` in this project.

---

**Credit:** [Pradipta Sarker](https://github.com/axiomshuvo)
