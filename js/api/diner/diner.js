(function () {
  // Immediately invoke function
  // Get dinerform.html
  const dinerForm = document.getElementById("diner-form");

  // Diner container??not used
  const dinersContainer = document.getElementById("diners-container");

  const sodasContainer = document.getElementById("sodas-container");

  //requesting all diners
  const apiServerDiners = "http://localhost:3000/diners";
  //creating new diner
  const apiServerDiner = "http://localhost:3000/diner";
  //requesting sodas
  const apiServerSoda = "http://localhost:3000/sodas/serving";

  // Get the sodas for soda form
  // if invoked immediatly why not just run the code?
  function getSodas() {
    // Get sodas
    fetch(apiServerSoda)
      .then((res) => {
        if (!res.ok) {
          throw new Error("getSodas\n", res);
        }
        return res.json();
      })
      .then((data) => {
        renderOptionElements(data);
      })
      .catch((err) => console.log(err, "Something went wrong fetching sodas"));
  }

  // Call api sodas
  // this is erroring becuase we are not needing it till page change
  getSodas();

  // Function render soda elements
  function renderOptionElements({ sodas }) {
    // console.log("sodas rendered options menu", sodas);
    if (sodas.length === 0) {
      return (sodasContainer.innerHTML = `<h4> There are no sodas being served at the moment </h4>`);
    }
    // Loop thru the data
    let contents = "";
    sodas.map((soda) => {
      contents += `<option value=${soda._id}> ${soda.name} </option>`;
    });
    sodasContainer.innerHTML = contents;
  }

  // Request all diners from server
  function getDiners() {
    fetch(apiServerDiners)
      .then((res) => {
        if (!res.ok) {
          throw new Error("getDiners\n", res);
        }
        return res.json();
      })
      .then((data) => {
        renderDiners(data);
      })
      .catch((err) => console.log(err, "Something went wrong fetching diners"));
  }

  // Render diners on page
  function renderDiners({ diners }) {
    // const $dinerDiv = $("#diners");
    const dinerDiv = document.getElementById("diners");
    // Check to see if there are any sodas
    // cant i shortCircut these?
    if (diners.length === 0) {
      return (dinerDiv.innerHTML = "<h3>There are no diners</h3>");
    }

    // Loop through the sodas array
    let contents = "";
    diners.map((diner) => {
      // Append new elements under sodas' container
      contents += ` <div id=${diner._id}>
                     <h5>
                         <a class="diner-link"
                             href="./diner.html">${diner.name}</a>
                     </h5>
                 </div> `;
    });
    dinerDiv.innerHTML = contents;

    dinerDiv.addEventListener("click", (e) => {
      const target = e.target.closest("div[id]");
      console.log(target.id);
      document.cookie = `diner=${target.id}`;
    });
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
