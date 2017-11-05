#### Simple XHR

Generate a link to make the GET request to the API, and a div to store the results:
``` HTML
<a href="#" onclick="getRepositories()">Get Repositories</a>
<div id="repositories"></div>
````

```javascript
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories); // passing a callback to generate the response text
  req.open("GET", "https://api.github.com/users/ayreal/repos"); // open the request
  req.send(); // send the request
}

function showRepositories(event, data) {
  // console.log(this.responseText);
  var repos = JSON.parse(this.responseText); // parse `this`, the response, as JSON
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        r.name + // "r" -- using a data attribute to hold the repo name.
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
      //         onclick is explicitly passing `this`, the repo, to the
      // getCommits function. We need to do this to make sure that the current
      // element, that is, the link being clicked, is available to our
      // getCommits function so that we can get at that data attribute later.
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}
```
