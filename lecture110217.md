## The DOM and JQuery
- Domain Object Model: HTML you can play with and programatically interact with
- Tree structure

- InnerText v InnerHTML: InnterText is always displayed as a plain string. InnerHTML knows to parse the string as actual HTML.


- Telling the part of the document that was the target
document.addEventListener("click", function(e) {console.log(event.target)})
$(p).on('click', function(e) { $(this) })

- Event Delegation for Dynamic Pages
  - Have the parent container delegate listening down to children

When `this` is a form, you can do:
this.querySelector("input")

Clearing out input from form input element
const value = input.value
input.value = ""


HTML5 data attributes
 - For attaching OO data to objects in JS. Define custom properties on HTML elements dom nodes


 books.filter(function(book){
 return books.toLowerCase().includes("cool")
 })


Object destructuring (ES6)
When doing assignments like
var title = book.title
var id = book.id

You can instead do
const {id, title} = book
You can only use when name of variable is the same name of the object

 // Comments

const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let text = commentForm.querySelector("input").value;
  let comments = document.querySelector(".comments");
  let newComment = document.createElement("p");
  newComment.innerText = text;
  let commentField = newComment.innerText;
  comments.appendChild(newComment);
});

- Debugger doesn't have access to variables within a closure. You can console.log that variable it's exposed.
the closure doesn't know its context unless you *explicitly* tell it but passing in the variables you need 
