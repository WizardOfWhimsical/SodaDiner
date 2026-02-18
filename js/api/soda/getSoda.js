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

  // Make soda ajax request

  fetch(sodaApi)
    .then((res) => {
      if (!res.ok) {
        section.textContent = "Please choose a soda";
      }
      return res.json();
    })
    .then((data) => {
      console.log("fetch success\n", data);
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

  // A function to update serving option
  function updateSoda() {
    const serving = window.served;
    // switch values right here
    const updateValue = serving ? false : true;

    $.ajax({
      type: "PUT",
      url: apiServerUpdateSoda,
      data: { serving: updateValue },
    })
      .done((res) => {
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
    $.ajax({
      type: "DELETE",
      url: sodaApi,
    })
      .done((res) => {
        alert("Soda successfully deleted!");
        window.location = "./sodas.html";
      })
      .catch((err) => console.log("errorCatch in DELETE\n", err));
  }
})();
