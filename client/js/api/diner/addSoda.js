(function () {
  // Immediately invoke function
  // Get browser cookies
  const cookies = document.cookie;
  // Parse cookies and get diner's id
  const dinerID = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("diner"))
    .split("=")[1];

  // Api for editing diner according to its ID
  const dinerApi = "/api/diner/" + dinerID;
  // Api for getting sodas availabe to serve
  const apiServerSoda = "/api/sodas/serving";
  // Api for updating sodas for diner
  const apiUpdateSodas = "/api/diner/" + dinerID + "/sodas";
  // Make diner ajax request
  fetch(dinerApi, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed retrieving diners\n", response);
      }
      if (!response.diner) {
        const section = document.querySelector("section");
        section.innerText = "Please choose a diner";
      }
      const resp = response.json();
      console.log("diner resp in add soda\n", response);
      renderDiner(response.diner);
      window.sodas = response.diner.sodas;
    })
    .catch((err) => {
      console.log("error\n", err);
      alert("Oops, something went wrong!");
    });

  // Render the information for Diner
  const renderDiner = ({ name, location, sodas }) => {
    const titleEl = document.getElementById("title");
    const nameEl = document.getElementById("name");
    const locationEl = document.getElementById("location");
    renderDinerSodas(sodas);
    // Assign these elements with the values from the soda object
    titleEl.innerText = `${name}`;
    nameEl.innerText = `${name}`;
    locationEl.innerText = `${location}`;
  };

  // Render the sodas that are being served in this diner
  const renderDinerSodas = (sodas) => {
    const $sodas = $("#sodas");
    $.ajax({
      type: "GET",
      headers: {
        sodas: sodas,
      },
      url: apiServerSoda,
    })
      .done((res) => {
        // Get all sodas available to be served
        const servingSodas = res.sodas;
        // Get existing sodas in diner
        const dinerSodas = window.sodas.map((soda) => soda._id);
        // Filter out the sodas that already exist in diner from sodas to be served
        let sodasToBeServed = servingSodas.filter((soda) =>
          dinerSodas.indexOf(soda._id) === -1 ? soda : "",
        );
        // Return the sodas to be served to render in the UI
        renderUISodas(sodasToBeServed);
      })
      .catch((err) => console.log(err));
  };

  function renderUISodas(sodas) {
    $sodaContainer = $("#sodaContainer");
    const $sodaSelect = $("#sodas");
    if (sodas.length === 0) {
      $("#addSodas").hide();
      $sodaContainer.html("<h4>No new sodas are available to serve</h4>");
    }
    sodas.map((soda) => {
      $sodaSelect.append(`

                <option value=${soda._id}> ${soda.name} </option>
            
                `);
    });
  }

  // Get addSoda button
  const $addSodas = $("#addSodas");
  function addSodas() {
    // Get the values of the sodas
    const sodas = $("select[name='sodas']").val();
    if (sodas.length === 0) return alert("Please choose soda(s)");
    // Create object for soda
    const data = { sodas: sodas };
    // Update diner for new sodas being added
    $.ajax({
      type: "PUT",
      url: apiUpdateSodas,
      data: data,
    })
      .done((res) => {
        // Successful response
        alert("Saved sodas to diner");
        // Return to diner's details page
        window.location = "./diner.html";
      })
      .catch((err) => alert("Oops, something went wrong updating diner!"));
  }

  $addSodas.on("click", addSodas);
})();
