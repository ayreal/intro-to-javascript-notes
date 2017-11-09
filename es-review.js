const attachListeners = () => {
  document.getElementById("someId").addEventListener("submit", e => {
    console.log(e.target);
  });
};

document.addEventListener("DOMContentLoaded", function() {
  attachListeners();
});

// creating an object with deconstructor
// e.target to log the target of an event!
