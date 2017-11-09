# Functions

## Closures and Callbacks
  - Callback methods are a specific application of an inner function being called. Therefore, `this` is also global inside of callbacks passed to our array iterator methods.
  - Closures for privitization of variables
    - Closures cannot access the outer function’s `this` variable by using the `this` keyword because the `this` variable is accessible only by the function itself, not by inner functions.

## Lexical Scope (.bind, .call, .apply)
- Set `this` value on methods
  - When a function executes, it gets the `this` property, a variable with the value of the object that invokes the function where this is used. `this` is not assigned a value until an object invokes the function where `this` is defined.
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

## Simple Iterators

```javascript
someArray.map( e => e * 2 ) // returns new array
someArray.forEach( e => console.log(e)); // returns undefined
someArray.filter( e => e.length > 0) // returns selected elements
numberArray.sort(compareNumbers) // takes compareNumbers as a callback and sorts from lowest to highest
let compareNumbers = (a, b) => a - b;
```


# OO Javascript

## Object Relations

```javascript
// Driver and Passenger many-to-many joined on Trip
let store = { drivers: [], passengers: [], trips: [] };

// wrap the class in an IFFY to privatize the id counter
const Driver = (() => {
  let id = 1;

  return class Driver {
    constructor(name) {
      this.name = name;
      this.id = id;
      id++;
      store.drivers.push(this);
    }

    static all() {
      return store.drivers;
    }

    // filter to return join table results
    trips() {
      return store.trips.filter(trip => trip.driverId === this.id);
    }

    // use those results to map through to the has-many relationship
    passengers() {
      return this.trips().map(trip => trip.passenger());
    }
  };
})();

const Passenger = (() => {
  let id = 1;

  return class Passenger {
    constructor(name) {
      this.name = name;
      this.id = id;
      id++;
      store.passengers.push(this);
    }

    static all() {
      return store.passengers;
    }

    // filter to return join table results
    trips() {
      return store.trips.filter(trip => trip.passengerId === this.id);
    }

    // use those results to map through to the has-many relationship
    drivers() {
      return this.trips().map(trip => trip.driver());
    }
  };
})();

const Trip = (() => {
  let id = 1;

  return class Trip {
    constructor(driver, passenger) {
      this.driverId = driver.id;
      this.passengerId = passenger.id;
      this.id = id;
      id++;
      store.trips.push(this);
    }

    static all() {
      return store.trips;
    }

    driver() {
      return store.drivers.find(driver => driver.id === this.driverId);
    }

    passenger() {
      return store.passengers.find(
        passenger => passenger.id === this.passengerId
      );
    }
  };
})();
```

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
    - `.slice()` Return a copy of the original array
    - `.slice(indexWhereToBeginSlice, indexBeforeWhichItShouldStop)` Return a specific section
    - `.slice(1)` Remove the first element
    - `.slice(-1)` Remove the last element
    - `.slice()` always returns what you've selected
- Destructive
  - `.push()` Add to end of array. Returns array length.
  - `.unshift()` Add to beginning of array. Returns array length.
  - `.pop()` Remove from end of array, returns the element that was removed.
  - `.shift()` Remove from beginning of the array, returns the element that was removed.
  - Update an existing key-value pair by setting that key to a new value. Returns new value.
  - `delete [objName.key]` Delete the key-value pair from that object. Returns `true`.

# Interacting With DOM

## Accessing Remote APIs
```HTML
<div>
  Issue Title: <input type="text" id="title"><br>
  Issue Text: <input type="text" id="body"><br>
  <a href="#" id="search" onclick="createIssue()">Create Issue</a>
</div>
<div id="issues"></div>
```

```javascript
// POST request to submit form input
function createIssue() {
  const repo = "ayreal/javascript-fetch-lab";
  const issue = {};
  issue.title = document.getElementById("title").value;
  issue.body = document.getElementById("body").value;
  fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    body: JSON.stringify(issue),
    headers: {
      Authorization: `token ${token}`
      // 'Content-Type': 'application/json'
    }
  }).then(res => getIssues());
}

// GET request to fetch input from an API
function getIssues() {
  fetch(`https://api.github.com/repos/`, {
    headers: {
      Authorization: `token ${token}`
    }
  })
  // returns a promise object, aka something you can call .then on to trigger a callback
    .then(res => res.json()) // parse the response
    .then(json => showIssues(json)); // pass parsed data to another function
}

function getIssues() {
  fetch(`url`)
  // returns a promise object, aka something you can call .then on to trigger a callback
    .then(res => res.json()) // parse the response
    .then(json => showIssues(json)); // pass parsed data to another function
}

// Format parsed data and display in the DOM
function showIssues(issues) {
  console.log(issues); // log the results to see them
  issuesList = document.getElementById("issues");
  // use forEach to create new elements and append them to an existing element
  issues.forEach(issue => {
    let newElement = document.createElement("li");
    newElement.innerHTML = `${issue.title}: ${issue.body}`;
    issuesList.appendChild(newElement);
  });
}
```

```javascript
const alexsFetch = url => {
  return fetch(url).then(res => res.json());
};
```
```javascript
fetch(url).then(res=> res.json()).then(json => someFunc(json))
// or
fetch(url).then(res=>res.json()).then(res=> x = res)
```

## Element Selectors
`querySelector`
  - eg `querySelector("#toc ul").getElementsByTagName("li")` This is a node list, change to Array.
  - `querySelector("li:last-child")`
`querySelectorAll`
`getElement(s)ByTagName`
`getElement(s)ByClassName`
`~.style` Gives access to a lot of style attributes, such as color, display (none/block) etc.

## Document Ready
```javascript
document.addEventListener("DOMContentLoaded", () => {
  // function calls here
});
  // functions defined here
```
```javascript
$(document).ready(function() {
  // call functions here
  submitForm();
});
  function submitForm(){ ... }
// define functions here
```
... same as above
```javascript
$(function() {
  // call functions here
  submitForm();
});
  function submitForm(){ ... }
// define functions here
```
