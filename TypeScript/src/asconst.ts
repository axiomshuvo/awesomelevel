// as const
// এই ফাইলটি TypeScript এর "as const" কিওয়ার্ডের ব্যবহার দেখায়, যা একটি অবজেক্ট বা অ্যারে কে immutable (পরিবর্তনশীল নয়) করে তোলে।
//  এটি TypeScript কে বলে যে এই অবজেক্ট বা অ্যারে এর মান পরিবর্তন করা যাবে না এবং এর টাইপ নির্দিষ্ট হবে।

const UserRole = {
  Admin: "admin",
  Editor: "editor",
  Viewer: "viewer",
} as const;

/**
 *
 *  এই উদাহরণে, UserRole অবজেক্টটি "as const" ব্যবহার করে ডিফাইন করা হয়েছে, যার ফলে এর মানগুলি immutable হয়ে যায়।
 *  Js e Covert হয় এইভাবে
 *  {
 *  readonly Admin: "admin",
 *  readonly Editor: "editor",
 *  readonly Viewer: "viewer"
 * }
 * এখানে , UserRole এর মানগুলি পরিবর্তন করা যাবে না এবং TypeScript এই অবজেক্টের মানগুলিকে নির্দিষ্ট টাইপ হিসেবে বিবেচনা করবে।
 *
 * typeof operator ব্যবহার করে আমরা UserRole এর টাইপ পেতে পারি, যা একটি union type হবে "admin" | "editor" | "viewer"।
 *
 * const user ={
 * id:2012,
 * name:"John Doe",}
 *
 * typeof user;
 *  js e Covert হয় এইভাবে
 * {
 *  id: number,
 *  name: string
 * }
 *
 * typeof UserRole;
 * js e Covert হয় এইভাবে
 * {
 * Admin: "admin",
 * Editor: "editor",
 * Viewer: "viewer"
 * }
 * - typeof UserRole ব্যবহার করলে TypeScript এই object-এর type বের করে এবং as const থাকার কারণে এটি literal type হিসেবে preserve হয়,
 * অর্থাৎ UserRole এর keys গুলো এখন "admin", "editor", এবং "viewer" হিসেবে নির্দিষ্ট type হিসেবে বিবেচিত হবে, পরিবর্তে string type হিসেবে নয়।
 *
 *
 *
 * keyof operator ব্যবহার করে আমরা UserRole এর keys পেতে পারি,
 *
 * keyof typeof UserRole;
 *
 * js e Covert হয় এইভাবে
 * "Admin" | "Editor" | "Viewer"
 *
 * - keyof typeof UserRole ব্যবহার করলে TypeScript UserRole এর keys গুলো বের করে
 * এবং এটি একটি union type হিসেবে প্রদান করে, যা "Admin", "Editor", এবং "Viewer" হবে।
 *
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 *  user['id] >>> 2012 - এই object string notation দিয়ে user অবজেক্টের id property এর value বের করে
 *  user.id >>> 2012 - এই dot notation দিয়ে user অবজেক্টের id property এর value বের করে
 * - এই দুইটি notation এর মধ্যে পার্থক্য হলো, string notation এ আমরা property name কে string হিসেবে উল্লেখ করি
 * এবং এটি dynamic হতে পারে, অর্থাৎ আমরা variable ব্যবহার করে property name নির্ধারণ করতে পারি।
 *
 * অন্যদিকে, dot notation এ আমরা সরাসরি property name উল্লেখ করি এবং এটি static হয়,
 *  অর্থাৎ property name কে variable দিয়ে নির্ধারণ করা যায় না।
 *
 *
 *
 */

const canEdit = (role: (typeof UserRole)[keyof typeof UserRole]) => {
  if (role === UserRole.Admin || role === UserRole.Editor) {
    return true;
  }
  return false;
};

console.log(canEdit(UserRole.Admin)); // Output: true
console.log(canEdit(UserRole.Viewer)); // Output: false
