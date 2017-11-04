### This in JS
Unlike Ruby's self, "this" is more tied to invocation context. Some of the different contexts are:

 - 1: As a function (baseless function)
 ```javascript
 function thisLogger() {
   console.log(this); // this will be Window
 };
 ```
 - 2: As a method (a method is a function that is a property of an object aka attached to an object)
 ```javascript
 const object = {
   nameLogger: function() {
     console.log(this.firstName) // this is the nameLogger object
   }
 }
 ```
 - 3: Via a method of the function object (.call, .apply)
  ```javascript
  function addition(a,b) {
    console.log("this is:", this);
     return {a+b};
  }
  addition.call(whatThisIs, arg)  // .call is an IFFE
  addition.apply(whatThisIs, [arg1,arg2...]) //.apply is an IFFE
  addition.bind(whatThisIs, arg) //.bind is a function, not invoked

  ```

  ```javascript
  const listEmployees = function() {
    // here, .this is what we want
    console.log('here, OUTSIDE of the callback, this is', self)
    var self = this;
  this.employees.forEach(function(employee) {
    // inside, the callback function has lost the context
    // when a function is called from within another function,
    // the "this" value goes to global
    console.log('here, INSIDE of the callback, this is', self)
    console.log(`Employee: ${employee.name} works at ${this.name}`);
  });
};

// OR

const listEmployees = function() {
  this.employees.forEach(function(employee) {
    console.log(`Employee: ${employee.name} works at ${this.name}`);
  }).bind(this); // using .bind
};

// OR with an arrow function. Arrow fn's have an implicit .bind. Arrow functions are generally good for callbacks for this reason

const listEmployees = function() {
  this.employees.forEach(employee => {
    console.log(`Employee: ${employee.name} works at ${this.name}`);
  });
};


const tgif = {
  name: "T.G.I. Friday's",
  employees: [{ name: 'Johann' }, { name: 'Rachel' }, { name: 'Max' }],
  listEmployees: listEmployees
};

const chipotle = {
  name: 'Chipotle',
  employees: [{ name: 'Alex' }, { name: 'Esmery' }, { name: 'Meryl' }],
  listEmployees: listEmployees
};

tgif.listEmployees()
  ```

 - 4: As a constructor
    - Objects:
      - take up memory
      - have data
      - have behavior

      - When you invoke a new object with a constructor, it sets the new object to .this
      - javascript has prototypical inheritance, not class-ical inheritance
      - eg you can add a method to Dog prototype with `Dog.prototype.rollOver =`. An instance of the dog doesn't necessarily have to have this method, but its prototype will if you define it that way.

 ```javascript
 class Dog {
   constructor(name, color) {
     this.name = name;
     this.color = color
   }

   //define prototype methods, eg.
   bark () {
     conosle.log(`woof! Im ${this.name}`)
   }

   //define class methods, eg. the below to be called on Dog.thisIsAClassMethod()
   static thisIsAClassMethod () {
     conosle.log(`I'm called on the class`)
   }
 }
 ```
