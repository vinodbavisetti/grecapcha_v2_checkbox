const form = document.getElementById("form1");
let token;

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let body = { token: token };
  fetch("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function recapchacallback() {
  grecaptcha.render("recapcha", {
    sitekey: "SITE_KEY_HERE",
    callback: gecapcharesponse,
  });
}
function gecapcharesponse(tok) {
  console.log(tok);
  token = tok;
}
