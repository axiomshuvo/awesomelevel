//JS - TS

// String, number, boolean, null, undefined, symbol, bigint

// TS: never, unknown, void, any

let userName: string = "Aritra Sarker";
userName = 12; // এরর কারণ userName এর টাইপ string সেট করা হয়েছে, তাই number টাইপের মান দেওয়া যাবে না।

let age: number = 25;
age.toupperCase(); // এরর কারণ age এর টাইপ number সেট করা হয়েছে, তাই string টাইপের মেথড ব্যবহার করা যাবে না।

age = "twenty five"; // এরর কারণ age এর টাইপ number সেট করা হয়েছে, তাই string টাইপের মান দেওয়া যাবে না।

let isStudent: boolean = true;
isStudent = "yes"; // এরর কারণ isStudent এর টাইপ boolean সেট করা হয়েছে, তাই string টাইপের মান দেওয়া যাবে না।

let isAdmin = true; // emplicitly type inference এর কারণে isAdmin এর টাইপ boolean সেট করেছে

let x; // x এর টাইপ any সেট করা হয়েছে, তাই কোন টাইপের মান দেওয়া যাবে।

x = "five";
x = 5; // x এর টাইপ any সেট করা হয়েছে, তাই string এবং number উভয় টাইপের মান দেওয়া যাবে।

const y = null; // y এর টাইপ null সেট করা হয়েছে, তাই অন্য কোন টাইপের মান দেওয়া যাবে না।

let z: never; // z এর টাইপ never সেট করা হয়েছে, তাই কোন মান দেওয়া যাবে না।

let a: unknown; // a এর টাইপ unknown সেট করা হয়েছে, তাই কোন মান দেওয়া যাবে না।
