// Conditional Types

type A = null;
type B = undefined;

type C = A extends number ? true : B extends undefined ? true : false;
// এখানে C এর মান হবে true, কারণ A number নয় এবং B undefined।

type RichPeoplesVehicle = {
  bike: string;
  car: string;
  ship: string;
};

// type CheckVehicle<T> = T extends "bike" | "car" | "ship" ? true : false;
type CheckVehicle<T> = T extends keyof RichPeoplesVehicle ? true : false;
// এখানে আমরা keyof ব্যবহার করেছি কারণ আমরা RichPeoplesVehicle এর keys এর মধ্যে T কে চেক করতে চাই।

type HasBike = CheckVehicle<"bike">;
// এখানে HasBike এর মান হবে true, কারণ "bike" "bike" | "car" | "ship" এর মধ্যে রয়েছে।
