(function () {
  // Immediately invoke function
  // Get dinerform.html
  const dinerForm = document.getElementById("diner-form");
  // Diner container??not used
  const dinersContainer = document.getElementById("diners-container");
  // Get sodas container for diners
  // const $sodasContainer = $("#sodas-container");
  const sodasContainer = document.getElementById("sodas-container");
  // Declare api server for requesting all diners
  const apiServerDiners = "http://localhost:3000/diners";
  // Declare api server for creating new diner
  const apiServerDiner = "http://localhost:3000/diner";
  // Declare api server for requesting sodas
  const apiServerSoda = "http://localhost:3000/sodas/serving";
  // Get the sodas for soda form
  function getSodas() {
    // Get sodas
    $.ajax({
      type: "GET",
      url: apiServerSoda,
    })
      .done((res) => {
        // Render option elements for soda
        renderOptionElements(res);
      })
      .catch((err) => console.log(err, "Something went wrong fetching sodas"));
  }

  // Call api sodas
  getSodas();

  // Function render soda elements
  function renderOptionElements({ sodas }) {
    if (sodas.length === 0) {
      return (sodasContainer.innerHTML = `<h4> There are no sodas being served at the moment </h4>`);
    }
    let container = "";
    // Loop thru the data
    for (let obj of sodas) {
      container += `<option value=${obj._id}> ${obj.name} </option>`;
    }
    sodasContainer.innerHTML = container;
  }

  // Request all diners from server
  function getDiners() {
    // Get sodas
    $.ajax({
      type: "GET",
      url: apiServerDiners,
    }).done((res) => {
      // Render option elements for soda
      renderDiners(res);
    });
  }

  // Render diners on page
  function renderDiners({ diners }) {
    const $dinerDiv = $("#diners");
    // Check to see if there are any sodas
    if (diners.length === 0)
      return $dinerDiv.append("<h3>There are no diners</h3>");
    // Loop through the sodas array
    diners.map((diner, idx) => {
      // Append new elements under sodas' container
      $dinerDiv.append(`
                 <div id=${diner._id}>
                     <h5>
                         <a class="diner-link"
                             href="./diner.html">${diner.name}</a>
                     </h5>
                 </div>
             `);
    });
    // Get each soda from the soda's container
    const children = $dinerDiv.children();
    // Loop thru the elements inside sodaDiv
    for (let child of children) {
      // Assign a function for each one to create unique
      // cookie for particular soda
      child.onclick = function () {
        // Create a document cookie for soda's id
        document.cookie = `diner=${this.id}`;
      };
    }
  }

  // Call diners
  getDiners();

  // Attach event handler to form
  dinerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get sodas from multiple select box
    const sodas = $("select[name='sodas']").val();
    // Data object for server parsing
    const data = {
      // Get name of diner and assign it to object
      name: e.target.name.value,
      // Get location of diner and assign it to object
      location: e.target.location.value,
      // Get sodas of diner and assign it to object
      sodas: sodas,
    };
    // Make an ajax post request to server and send
    // the data from the form object
    $.ajax({
      type: "POST",
      url: apiServerDiner,
      data: data,
    })
      .done((res) => {
        alert("Successfully saved!");
        window.location = "./diners.html";
      })
      .catch((err) =>
        alert(
          "Oops, something went wrong! Make sure to fill out all fields in the form.",
        ),
      );
  });
})();
