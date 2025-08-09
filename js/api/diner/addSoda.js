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
  const dinerApi = "http://localhost:3000/diner/" + dinerID;
  // Api for getting sodas availabe to serve
  const apiServerSoda = "http://localhost:3000/sodas/serving";
  // Api for updating sodas for diner
  const apiUpdateSodas = "http://localhost:3000/diner/" + dinerID + "/sodas";
  // Make diner ajax request
  $.ajax({
    type: "GET",
    url: dinerApi,
  })
    .done((res) => {
      if (!res.diner) {
        $("section").text("Please choose a diner");
      } else {
        // Render soda in UI
        renderDiner(res.diner);
        // Set diner's sodas in global objet
        window.sodas = res.diner.sodas;
      }
    })
    .catch((err) => $("section").text("Please choose a diner"));
  // Render the information for Diner
  const renderDiner = ({ name, location, sodas }) => {
    const $title = $("#title");
    const $name = $("#name");
    const $location = $("#location");
    renderDinerSodas(sodas);
    // Assign these elements with the values from the soda object
    $title.text(name);
    $name.text(name);
    $location.text(location);
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
