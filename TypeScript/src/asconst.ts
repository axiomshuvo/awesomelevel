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
 *
 *
 */

const canEdit = (role: keyof typeof UserRole) => {
  if (role === UserRole.Admin || role === UserRole.Editor) {
    return true;
  }
  return false;
};

console.log(canEdit(UserRole.Admin)); // true
