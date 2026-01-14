var form = document.querySelector("form");

async function handleSubmit(event) {
  event.preventDefault(); // Prevents the default Formspree redirect
  var status = document.getElementById("my-form-status"); // Optional: if you have a status div
  var data = new FormData(event.target);
  
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      // THIS IS THE REDIRECT
      window.location.href = "thanks.html";
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form.");
        }
      })
    }
  }).catch(error => {
    alert("Oops! There was a problem connecting to the server.");
  });
}

form.addEventListener("submit", handleSubmit);