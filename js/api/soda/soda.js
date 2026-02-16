(function () {
  // Immediately invoke function
  // Get Soda form
  const form = document.getElementById("soda-form");
  // Declare api server for soda
  const apiServerSoda = "http://localhost:3000/sodas";
  // Get the sodas for soda form
  function getSodas() {
    fetch(apiServerSoda)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("fetch success\n", data);
        renderSodas(data);
      })
      .catch((err) => console.log(err));
  }
  // Call api sodas
  getSodas();

  // Render sodas from the ajax request
  function renderSodas({ sodas }) {
    const sodaDiv = document.getElementById("sodas");

    // Check to see if there are any sodas
    if (sodas.length === 0)
      return sodaDiv.append("<h3>There are no sodas</h3>");
    // Loop through the sodas array
    sodas.map((soda) => {
      // Append new elements under sodas' container
      sodaDiv.innerHTML += `
                <div id=${soda._id}>
                    <h5>
                        <a class="soda-link" 
                            href="./soda.html">${soda.name}</a>
                    </h5>
                </div>
            `;
    });

    sodaDiv.addEventListener("click", (e) => {
      const target = e.target.closest("div[id]");
      console.log(target.id);
      document.cookie = `soda=${target.id}`;
    });
  }

  // Attach event handler to form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target;

    console.log("form??\n", target);
    const data = {
      name: target.name.value,
      brand: target.brand.value,
      fizziness: target.fizziness.value,
      taste_rating: target.taste_rating.value,
    };
    console.log("data??\n", data);

    fetch(apiServerSoda, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((msg) => {
        alert("Successfully saved!");
        window.location = "./sodas.html";
      })
      .catch((err) => {
        console.log("error\n", err);
        alert("Oops, something went wrong!");
      });
  });
})();
