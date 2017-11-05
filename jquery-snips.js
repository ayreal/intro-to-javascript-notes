// Regular "comment" appending child

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

// Using settimeout

//

someEvent.which; // returns the type of event that prompted
