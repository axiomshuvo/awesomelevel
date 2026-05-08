// object destructuring

const user = {
  id: 123,
  name: {
    firstName: "John",
    lastName: "Doe",
  },
  age: 30,
  gender: "male",
  favColor: "blue",
  email: "john.doe@example.com",
};

const lastName = user.name.lastName; // normal old way

// now new way using destructuring

const {
  age: userAge, // aliasing age to userAge
  name: { firstName: myFirstName }, // destructuring nested object and aliasing
} = user;

// const { favColor: myFavColor } = user; // named as myFavColor
const { favColor } = user; // named as alias same as property name

console.log(
  `lastName2: ${myFirstName}, Age: ${userAge}, favColor: ${favColor}`,
);

//array destructuring

const friends = ["Alice", "Bob", "Charlie", "David"];

const firstFriend = friends[0]; // old way

// new way using destructuring
const [, secondBestFriend] = friends; // destructuring array
console.log(
  ` Second Best Friend: ${secondBestFriend}`,
  // Note: The first element is skipped by using a comma before secondBestFriend
  //
);
