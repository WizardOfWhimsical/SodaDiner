(function () {
  const dinerForm = document.getElementById("diner-form");
  // Diner container??not used
  // const dinersContainer = document.getElementById("diners-container");
  const sodasContainer = document.getElementById("sodas-container");

  const apiServerDiners = "http://localhost:3000/diners";
  const apiServerDiner = "http://localhost:3000/diner";
  const apiServerSoda = "http://localhost:3000/sodas/serving";

  // if invoked immediatly why not just run the code?
  function getSodas() {
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

  // this is erroring becuase we are not needing it till page change
  getSodas();

  function renderOptionElements({ sodas }) {
    if (sodas.length === 0) {
      return (sodasContainer.innerHTML = `<h4> There are no sodas being served at the moment </h4>`);
    }

    // its only taking the last soda, i think this needs to be an array to hold multiple values
    let contents = "";
    sodas.map((soda) => {
      contents += `<option value=${soda._id}> ${soda.name} </option>`;
    });
    if (sodasContainer) sodasContainer.innerHTML = contents;
  }

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
    const dinerDiv = document.getElementById("diners");
    // cant i shortCircut these?
    if (diners.length === 0) {
      return (dinerDiv.innerHTML = "<h3>There are no diners</h3>");
    }

    let contents = "";
    diners.map((diner) => {
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

  getDiners();

  dinerForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const sodas = document.querySelector("select[name='sodas']").value;

    const data = {
      name: e.target.name.value,
      location: e.target.location.value,
      sodas,
    };

    fetch(apiServerDiner, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed retrieving diners\n", response);
        }
        alert("Diner Successfully saved!");
        window.location = "./diners.html";
      })
      .catch((err) => {
        console.log("error\n", err);
        alert("Oops, something went wrong!");
      });
  });
})();
