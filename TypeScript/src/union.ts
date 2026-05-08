// Union Types TypeScript এ একটি powerful feature যা আমাদের multiple types কে একত্রে represent করতে দেয়।
// Union types ব্যবহার করে আমরা একটি variable বা function parameter এর জন্য multiple types specify করতে পারি,
// যা code flexibility এবং reusability উন্নত করে।

type UserRole = "admin" | "editor" | "viewer"; // Union type for user roles

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
// এখানে getDashboard function এর parameter role এর type UserRole, যা একটি union type।
// অর্থাৎ role এর value "admin", "editor", অথবা "viewer" হতে পারে।
// এখন আমরা getDashboard function কে বিভিন্ন user roles দিয়ে call করতে পারি।

console.log(getDashboard("admin")); // Admin Dashboard
getDashboard("guest"); // Invalid role

// intersection types এর সাথে union types ব্যবহার করা যেতে পারে, যা আরও complex type definitions তৈরি করতে সাহায্য করে।
type Employee = {
  id: number;
  name: string;
  phoneNo: string;
};

type Manager = {
  name: string;
  role: "manager";
};

type Editor = {
  name: string;
  role: "editor";
};

type EmployeeManager = Employee & Manager; // Intersection type for Employee and Manager

const employee1: EmployeeManager = {
  id: 1,
  name: "Aritra Sarker",
  phoneNo: "123-456-7890",
  role: "manager",
};
// এখানে employee1 এর type EmployeeManager, যা Employee এবং Manager types এর intersection।
// অর্থাৎ employee1 এর id, name, phoneNo, এবং role properties থাকতে হবে।

console.log(employee1); // { id: 1, name: 'Aritra Sarker', phoneNo: '123-456-7890', role: 'manager' }
