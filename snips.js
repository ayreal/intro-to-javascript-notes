// Regular "comment" appending child

const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", function(e) {
  e.preventDefault(); // must invoke!
  let text = commentForm.querySelector("input").value;
  let comments = document.querySelector(".comments");
  let newComment = document.createElement("p");
  newComment.innerText = text;
  let commentField = newComment.innerText;
  comments.appendChild(newComment);
});

// Using settimeout
window.setTimeout(
  something => {
    console.log(something);
  },
  3000,
  "hello world"
);

// Adding ot dropdown
const option = new Option();
option.value = `${someOption}`;
option.text = `${someOption}`;
parentList.options.add(option);

someEvent.which; // returns the type of event that prompted
