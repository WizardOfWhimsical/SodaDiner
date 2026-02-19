(function () {
  // Immediately invoke function
  // Get browser cookies
  const cookies = document.cookie;
  // Parse cookies and get soda id
  const sodaID = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("soda"))
    .split("=")[1];

  const sodaApi = "http://localhost:3000/soda/" + sodaID;

  const apiServerUpdateSoda = "http://localhost:3000/soda/updateSoda/" + sodaID;

  const serveSoda = document.getElementById("serveSoda");

  const serve = document.getElementById("served");

  const deleteBtn = document.getElementById("deleteSoda");
  const section = document.getElementsByName("section");

  fetch(sodaApi)
    .then((res) => {
      if (!res.ok) {
        section.textContent = "Please choose a soda";
      }
      return res.json();
    })
    .then((data) => {
      renderSoda(data.soda);
    })
    .catch((err) => {
      section.textContent = "Please choose a soda";
      console.log("errorCatch for GET\n", err);
    });

  function renderSoda({ name, brand, fizziness, rating, served }) {
    const showTitle = document.getElementById("title");
    const showName = document.getElementById("name");
    const showBrand = document.getElementById("brand");
    const showFizz = document.getElementById("fizziness");
    const showRating = document.getElementById("rating");

    showTitle.textContent = name;
    showName.textContent = name;
    showBrand.textContent = brand;
    showFizz.textContent = fizziness;
    showRating.textContent = rating;
    serve.textContent = served;

    !served
      ? (serveSoda.textContent = "Serve soda")
      : (serveSoda.textContent = "Stop serving soda");

    serveSoda.addEventListener("click", updateSoda);
  }

  function updateSoda() {
    const serving = window.served;
    const updateValue = serving ? false : true;

    fetch(apiServerUpdateSoda, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serving: updateValue }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("updating isServing failed\n", res);
        }

        return res.json();
      })
      .then((res) => {
        const { serving } = res;
        window.served = updateValue;
        if (updateValue) {
          serve.textContent = `${serving}`;
          serveSoda.textContent = "Stop serving soda";
        } else {
          serve.textContent = `${serving}`;
          serveSoda.textContent = "Serve soda";
        }
      })
      .catch((err) => console.log("errorCatch in PUT\n", err));
  }

  // Add event listener to delete soda button
  deleteBtn.addEventListener("click", deleteSoda);

  function deleteSoda() {
    fetch(sodaApi, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("deleting soda failed\n", res);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        alert("Soda successfully deleted!");
        window.location = "./sodas.html";
      })
      .catch((err) => console.log("errorCatch in DELETE\n", err));
  }
})();
