(function () {
  // Immediately invoke function
  // Get browser cookies
  const cookies = document.cookie;
  // Parse cookies and get diner's id
  const dinerID = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("diner"))
    .split("=")[1];
  // Url for diner's information
  const dinerApi = "http://localhost:3000/diner/" + dinerID;

  // Delete Soda button
  // const $deleteBtn = $("#deleteDiner");

  const deleteBtn = document.getElementById("deleteDiner");
  // Make diner ajax request

  fetch(dinerApi)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (!data.diner) {
        document.querySelector("section").textContent = "Please choose a diner";
      } else {
        renderDiner(data.diner);
      }
    })
    .catch((err) => {
      document.querySelector("section").textContent = `${err.message}`;
      console.log("diners get:\n", err);
    });

  // $.ajax({
  //   type: "GET",
  //   url: dinerApi,
  // })
  //   .done((res) => {
  //     console.log(res);
  //     if (!res.diner) {
  //       $("section").text("Please choose a diner");
  //     } else {
  //       // Render soda in UI
  //       renderDiner(res.diner);
  //     }
  //   })
  //   .catch((err) => $("section").text("Please choose a diner"));
  // Render the information for Diner
  const renderDiner = ({ name, location, sodas }) => {
    const $title = $("#title");
    const $name = $("#name");
    const $location = $("#location");
    // Assign these elements with the values from the soda object
    $title.text(name);
    $name.text(name);
    $location.text(location);
    renderDinerSodas(sodas);
  };

  function renderDinerSodas(sodas) {
    const $sodaDiv = $("#sodas");
    // If no sodas are being served, notify the user
    if (sodas.length === 0) return $sodaDiv.text("No sodas are being served");
    // Otherwise, render the sodas as an option
    sodas.map((soda) => {
      $sodaDiv.append(`
                <li id="${soda._id}">${soda.name}</li>
            `);
    });
  }

  // Delete soda
  function deleteSoda() {
    $.ajax({
      type: "DELETE",
      url: dinerApi,
    })
      .done((res) => {
        alert("Diner successfully deleted!");
        window.location = "./diners.html";
      })
      .catch((err) => alert("Oops, something went wrong!"));
  }

  // Add event listener to delete soda button
  deleteBtn.addEventListener("click", deleteSoda);
})();
