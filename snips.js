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


static makeList() {
  let body = ""; // the empty string is good to make sure everything passed is string val
  Movie.all().forEach(movie => {
    body += `<li id="${movie.title}">${movie.title}</li>`;
  });
  return body;
}



const ROUTE = "https://ghibliapi.herokuapp.com";

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();
});

const fetchMovies = () => {
  fetch(`${ROUTE}/films`)
    .then(res => res.json())
    .then(json => loadFunctions(json));
};

function loadFunctions(data) {
  // make Movie objects
  data.forEach(movie => new Movie(movie));

  // attach listeners
  // renderMovies();
}
