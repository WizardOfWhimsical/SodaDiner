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
      return response.json();
    })
    .then((data) => {
      console.log("diner resp in add soda\n", data);
      renderDiner(data.diner);
      window.sodas = data.diner.sodas;
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
    const $sodas = document.getElementById("sodas");
    fetch(apiServerSoda, {
      method: "GET",
      headers: { sodas: sodas },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("failed retrieving sodas\n", resp);
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        const servingSodas = data.sodas;
        const dinerSodas = window.sodas.map((soda) => soda._id);
        let sodasToBeServed = servingSodas.filter((soda) =>
          dinerSodas.indexOf(soda._id) === -1 ? soda : "",
        );
        renderUISodas(sodasToBeServed);
      });
  };

  function renderUISodas(sodas) {
    const sodaContainer = document.getElementById("sodaContainer");
    const sodaSelect = document.getElementById("sodas");
    const addSodasButton = document.getElementById("addSodas");

    sodaSelect.innerHTML = "";

    if (!Array.isArray(sodas) || sodas.length === 0) {
      addSodasButton.style.display = "none";
      sodaContainer.innerHTML = "<h4>No new sodas are available to serve</h4>";
      return;
    }

    addSodasButton.style.display = "";
    sodaContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    sodas.forEach(({ _id, name }) => {
      const option = document.createElement("option");
      option.value = _id;
      option.textContent = name;
      fragment.append(option);
    });
    sodaSelect.appendChild(fragment);
  }

  const addSodasButton = document.getElementById("addSodas");

  function getSelectedSodaIds() {
    const sodaSelect = document.querySelector("select[name='sodas']");
    return Array.from(sodaSelect.selectedOptions, (option) => option.value);
  }

  function addSodas() {
    const sodas = getSelectedSodaIds();

    if (sodas.length === 0) {
      alert("Please choose soda(s)");
      return;
    }

    const body = new URLSearchParams();
    sodas.forEach((id) => body.append("sodas", id));

    fetch(apiUpdateSodas, {
      method: "PUT",
      body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed updating diner");
        }
        return response.json();
      })
      .then(() => {
        alert("Saved sodas to diner");
        window.location = "./diner.html";
      })
      .catch((err) => {
        console.error(err);
        alert("Oops, something went wrong updating diner!");
      });
  }

  addSodasButton.addEventListener("click", addSodas);
})();
