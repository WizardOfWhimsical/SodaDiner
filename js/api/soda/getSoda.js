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
  $.ajax({
    type: "GET",
    url: sodaApi,
  })
    .done((res) => {
      if (!res.soda) {
        section.textContent = "Please choose a soda";
      } else {
        // Render soda in UI
        renderSoda(res.soda);
      }
    })
    .catch((err) => {
      section.textContent = "Please choose a soda";
      console.log("errorCatch for GET\n", err);
    });

  function renderSoda({ name, brand, fizziness, rating, served }) {
    const log = { name, brand, fizziness, rating, served };
    console.log("inside render\n", log);

    // const $title = $("#title");
    // const $name = $("#name");
    // const $brand = $("#brand");
    // const $fizziness = $("#fizziness");
    // const $rating = $("#rating");
    const showTitle = document.getElementById("title");
    const showName = document.getElementById("name");
    const showBrand = document.getElementById("brand");
    const showFizz = document.getElementById("fizziness");
    const showRating = document.getElementById("rating");
    // Assign these elements with the values from the soda object
    showTitle.textContent = name;
    showName.textContent = name;
    showBrand.textContent = brand;
    showFizz.textContent = fizziness;
    showRating.textContent = rating;
    serve.textContent = `${served}`;

    !served
      ? (serveSoda.textContent = "Serve soda")
      : (serveSoda.textContent = "Stop serving soda");

    window.served = served;
  }

  // A function to update serving option
  function updateSoda() {
    // Get value of serving soda
    const serving = window.served;
    // Update the serving object by toggling the value between true or false
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

  // Add event listener to serve soda button
  serveSoda.addEventListener("click", updateSoda);
  //
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

  // Add event listener to delete soda button
  deleteBtn.addEventListener("click", deleteSoda);
})();
