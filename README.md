## Building Object Relations in JS

```javascript
// User has-many Items, Item belongs-to a User

let store = { users: [], items: [] };
// initialize store with key of items and users that each point to an empty array

let userId = 0;
let itemId = 0;

class User {
  constructor(name) {
    // increment first, then store the userId value to this.id
    this.id = ++userId;
    this.name = name;
    // insert in the user to the store
    store.users.push(this);
  }

  // method to find items of a user
  items() {
    return store.items.filter(item => {
      return item.userId === this.id;
    });
  }
}

class Item {
  constructor(price, name, user) {
    this.id = ++itemId;
    this.name = name;
    this.price = price;
    // associate user with item by id
    if (user) {
      this.userId = user.id;
    } // insert in the item to the store
    store.items.push(this);
  }

  // method to set the user for an item
  setUser(user) {
    this.userId = user.id;
  }

  // method to find user of an item -- only returns the first matching element from the array
  user() {
    return store.users.find(function(user) {
      return user.id === this.userId;
    });
  }
}

let bobby = new User("bobby");
let trousers = new Item("trousers", 24, bobby);

store;
// {users: [{id: 1, name: 'Bobby'}], items: [{id: 1, name: 'trousers', price: 24, userId: 1}]}

bobby = store.users[0];
// User {id: 1, name: "bobby"}
bobby.items();
// Item {id: 1, name: 24, price: "trousers", userId: 1}

let user = new User("Freddie");
let item = new Item("socks", 3, user);
item.user();
// {id: 3, name: 'Freddie'}
```

## Closures and Callbacks
  - Callback methods are a specific application of an inner function being called. Therefore, `this` is also global inside of callbacks passed to our array iterator methods.

## Lexical Scope (.bind, .call, .apply)
  - Set `this` value on methods
  - Borrow methods

## Arrow Functions

```javascript
// using our old standard function

let arrowFunction = function() {
  return "arrow Functions are great!"
}

// updating to use an arrow function
let arrowFunction = () => {
  return 'Arrow functions are great!'
};
```

- Arrow functions are called just like regular functions.
- Arrow functions without { } have implicit returns
- All arrow functions are anonymous, but we can set a pointer to an arrow function or pass an arrow function through as an argument to another function
```javascript
let square = (n) => n * n
square(3) // 9
// Anonymous function with implicit return because no {}, assigned to a pointer 'let'

```
- Lexical scope: Within a closure, the inner function retains the scope of the method it was declared in if you use an arrow function. Here, the arrow function has an implicit .bind():
```javascript
let person = {
  firstName: 'bob',
  greet: function(){
    return () => {
      return `Hi, I'm ${this.firstName}`
    }
  }
}
person.greet()()
// "Hi, I'm bob"
```

## Truthiness
- In JavaScript, the following values are falsy: `false`, `null`, `undefined`, `0`, `NaN`, an empty string (, '', "")
- Every other value is truthy.

## Object Manipulation
- Non-Destructive
  - Spread operator for an object:
    ```javascript
    const allCities = ['Los Angeles', ...coolCities];
    allCities;
    // => ["Los Angeles", "New York", "San Francisco"]
    const newAllCities = [...allCities];
    // => ["Los Angeles", "New York", "San Francisco"]
    allCities === newAllCities;
    // => false, newAllCities is a copy

    ```
  - Update an existing key-value pair with `Object.assign()`:
    ```javascript
    const newPerson = Object.assign({}, person, { name: 'Ariel' });
    // returns a new Person object with all other key-value pairs copied but just the name changed.
    ```
  - `.slice()`
    - 0 arguments: `.slice()` will return a copy of the original array
    - 2 arguments: `.slice(indexWhereToBeginSlice, indexBeforeWhichItShouldStop)`
    - `.slice(1)` will remove the first element
    - `.slice(-1)` will remove the last element
    - `.slice()` always returns what you've selected
- Destructive
  - `.push()` Add to end of array. Returns array length.
  - `.unshift()` Add to beginning of array. Returns array length.
  - `.pop()` Remove from end of array, returns the element that was removed.
  - `.shift()` Remove from beginning of the array, returns the element that was removed.
  - Update an existing key-value pair by setting that key to a new value. Returns new value.
  - `delete [objName.key]` will delete the key-value pair from that object. Returns `true`.
