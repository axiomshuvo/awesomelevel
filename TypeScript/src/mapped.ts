// mapped types

// map

const arrayOfNumber: number[] = [1, 2, 3];

const arrayOfString: string[] = ["1", "2", "3"];

const arrayOfStringsUsingMap: string[] = arrayOfNumber.map((num) =>
  num.toString(),
);
// এখানে আমরা arrayOfNumber এর প্রতিটি element কে string এ convert করে arrayOfStringsUsingMap এ store করেছি।

type AreaOfNum = {
  height: number;
  width: number;
};

// type AreaOfString = {
//   height: string;
//   width: string;
// };

type height = AreaOfNum["height"];
// এখানে height এর type হবে number, কারণ AreaOfNum এর height property এর type number।

type AreaOfString = {
  [key in keyof AreaOfNum]: string;
};

// এখানে আমরা AreaOfNum এর keys (height এবং width) কে loop করে
// তাদের type কে string এ convert করেছি এবং AreaOfString type তৈরি করেছি।
// এখন AreaOfString এর height এবং width property এর type string হবে।

type Area<T> = {
  [key in keyof T]: string;
};

// এখানে আমরা একটি generic type Area তৈরি করেছি যা T type এর keys কে loop করে
// তাদের type কে string এ convert করে একটি new type তৈরি করে।
// এখন আমরা এই Area type কে যেকোনো type এর জন্য ব্যবহার করতে পারি।

const area1: Area<{ height: string; width: number }> = {
  height: "100",
  width: 200, // এখানে width এর type number, কিন্তু Area type এর জন্য এটি string হওয়া উচিত। তাই এখানে error হবে।
};

// এখানে আমরা Area type কে একটি object type এর জন্য ব্যবহার করেছি এবং height এবং width property এর type
// string হওয়া উচিত ছিল, কিন্তু width এর type number দেওয়া হয়েছে, তাই এখানে error হবে।

type NewArea<T> = {
  [key in keyof T]: T[key];
};

const area2: NewArea<{ height: string; width: number }> = {
  height: "100",
  width: 200, // এখানে width এর type number, এবং NewArea type এর জন্য এটি ঠিক আছে, তাই এখানে error হবে না।
};

// এখানে আমরা NewArea type কে একটি object type এর জন্য ব্যবহার করেছি এবং height এবং width property এর type
// string এবং number দেওয়া হয়েছে, যা NewArea type এর জন্য ঠিক আছে, তাই এখানে error হবে না।
