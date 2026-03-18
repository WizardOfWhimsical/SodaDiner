import fetchBase from "../../../src/helpers/api-fetch";

const form = document.getElementById("soda-form");
const apiServerSoda = "http://localhost:3000/sodas";

function getSodas() {
  fetch(apiServerSoda)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log("fetch success\n", data);
      renderSodas(data);
    })
    .catch((err) => console.log(err));
}
