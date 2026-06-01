// Constrain মানে কোনো জিনিসকে সীমাবদ্ধ করা। Stric Rules Setup করা।
// TypeScript এ আমরা generic type এর সাথে constraint ব্যবহার করতে পারি,
//  যাতে আমরা নির্দিষ্ট ধরনের data type কে সীমাবদ্ধ করতে পারি।

const addStudent = <T>(student: T): T => {
  return student;
};

const std1 = {
  name: "John Doe",
  id: 12345,
  grade: "A",
};

const std2 = {
  name: "Jane Doe",
  id: 67890,
  grade: "B",
  hasScholarship: true,
};

const res1 = addStudent(std1);
const res2 = addStudent(std2);
// এই ক্ষেত্রে, addStudent ফাংশনটি কোনো ধরনের data type গ্রহণ করতে পারে,

const std3 = {
  grade: "C",
};

const res3 = addStudent(std3); // এই ক্ষেত্রে, std3 তে name এবং id নেই, তাই এটি একটি সমস্যা হতে পারে।
// এই সমস্যা থেকে বাঁচতে আমরা constraint ব্যবহার করতে পারি।

interface Student {
  name: string;
  id: number;
  grade: string;
}

const addConstrainedStudent = <T extends Student>(student: T): T => {
  return student;
};

const res4 = addConstrainedStudent(std1); // এই ক্ষেত্রে, std1 তে name, id এবং grade আছে, তাই এটি কাজ করবে।
const res5 = addConstrainedStudent(std2); // এই ক্ষেত্রে, std2 তে name, id এবং grade আছে, তাই এটি কাজ করবে।
const res6 = addConstrainedStudent(std3); // এই ক্ষেত্রে, std3 তে name এবং id নেই, তাই এটি একটি error হবে।
// এইভাবে, আমরা constraint ব্যবহার করে generic type কে নির্দিষ্ট ধরনের data type এর সাথে সীমাবদ্ধ করতে পারি,
// যা আমাদের কোডকে আরও নিরাপদ এবং নির্ভরযোগ্য করে তোলে।
