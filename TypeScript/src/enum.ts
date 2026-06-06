//ENUM  - কি ?
// set of fixed values এর collection, যা একটি নাম দ্বারা পরিচিত হয়।
// এটি একটি data type যা একটি variable কে একটি নির্দিষ্ট set of values এর মধ্যে সীমাবদ্ধ করে।
// ENUM ব্যবহার করে আমরা code কে আরও readable এবং maintainable করতে পারি,
//  কারণ এটি আমাদের code এ fixed values এর জন্য একটি নাম দেয়।

// TypeScript এ আমরা enum তৈরি করতে পারি, যা একটি named constant এর collection।
// enum এর প্রতিটি member একটি unique value ধারণ করে, যা default ভাবে 0 থেকে শুরু হয় এবং প্রতি member এর জন্য 1 করে বৃদ্ধি পায়।

type userRole = "admin" | "editor" | "viewer";
// এই ক্ষেত্রে, userRole একটি union type, যা "admin", "editor" এবং "viewer" এর মধ্যে একটি value হতে পারে।

enum UserRoles {
  admin = "admin",
  editor = "editor",
  viewer = "viewer",
}
// এই ক্ষেত্রে, UserRole একটি enum, যা admin, editor এবং viewer এর জন্য named constants তৈরি করে।
//  প্রতিটি member এর value তার নামের string representation।

const canEdit = (role: UserRoles) => {
  if (role === UserRoles.admin || role === UserRoles.editor) {
    return true;
  }
  return false;
};
// এই ক্ষেত্রে, canEdit ফাংশনটি একটি UserRoles type এর parameter গ্রহণ করে
// এবং true return করে যদি role admin বা editor হয়, অন্যথায় false return করে।

const isEditPermissionable = canEdit(UserRoles.viewer);
console.log(isEditPermissionable);
// এই ক্ষেত্রে, isEditPermissionable তে false থাকবে, কারণ viewer role edit permission রাখে না।

//
