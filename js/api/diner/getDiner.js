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

  // Render the information for Diner
  function renderDiner({ name, location, sodas }) {
    const titleEl = document.getElementById("title");
    const nameEl = document.getElementById("name");
    const locationEl = document.getElementById("location");

    titleEl.textContent = name;
    nameEl.textContent = name;
    locationEl.textContent = location;

    renderDinerSodas(sodas);
  }

  function renderDinerSodas(sodas) {
    // const $sodaDiv = $("#sodas");
    const sodaDiv = document.getElementById("sodas");
    // If no sodas are being served, notify the user
    if (sodas.length === 0) {
      return (sodaDiv.textContent = "No sodas are being served");
    }
    // Otherwise, render the sodas as an option
    let content = "";
    sodas.map((soda) => {
      content += `<li id="${soda._id}">${soda.name}</li>`;
    });
    sodaDiv.innerHTML = content;
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
