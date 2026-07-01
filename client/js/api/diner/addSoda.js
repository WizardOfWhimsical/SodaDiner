(function () {
  const cookies = document.cookie;

  const dinerID = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("diner"))
    .split("=")[1];

  const dinerApi = "/api/diner/" + dinerID;
  const apiServerSoda = "/api/sodas/serving";
  const apiUpdateSodas = "/api/diner/" + dinerID + "/sodas";
  let sodas = null;

  fetch(dinerApi, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed retrieving diners\n", response);
      }

      return response.json();
    })
    .then((data) => {
      if (!data.diner) {
        const section = document.querySelector("section");
        section.innerText = "Please choose a diner";
      }
      renderDiner(data.diner);
      ({ sodas } = data.diner);
    })
    .catch((err) => {
      console.log("error\n", err);
      alert("Oops, something went wrong!");
    });

  const renderDiner = ({ name, location, sodas }) => {
    const titleEl = document.getElementById("title");
    const nameEl = document.getElementById("name");

    renderDinerSodas(sodas);

    titleEl.innerText = `${name}`;
    nameEl.innerText = `${name}`;
  };

  const renderDinerSodas = (sodas) => {
    const sodaDiv = document.getElementById("sodas");
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
        if (!data.sodas) {
          sodaDiv.innerHTML = "<span>No sodas were found for this diner</span>";
        }
        const servingSodas = data.sodas;
        const dinerSodas = sodas.map((soda) => soda._id);
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

    if (!Array.isArray(sodas) || sodas.length === 0) {
      addSodasButton.style.display = "none";
      sodaContainer.innerHTML = "<h4>No new sodas are available to serve</h4>";
      return;
    }

    // addSodasButton.style.display = "";
    // sodaContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();

    sodas.forEach(({ _id, name }) => {
      const option = document.createElement("option");
      option.value = `${_id}`;
      option.textContent = `${name}`;
      fragment.append(option);
    });
    return sodaSelect.appendChild(fragment);
  }

  const addSodasButton = document.getElementById("addSodas");

  function getSelectedSodaIds() {
    const sodaSelect = document.querySelector("select[name='sodas']");
    return Array.from(sodaSelect?.selectedOptions, (option) => option.value);
  }

  function addSodas() {
    const sodas = getSelectedSodaIds();

    if (sodas.length === 0) {
      alert("Please choose soda(s)");
      return;
    }

    fetch(apiUpdateSodas, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sodas }),
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
