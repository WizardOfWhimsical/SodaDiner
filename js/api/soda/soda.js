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
      target = e.target.closest("div[id]");
      console.log(target.id);
      document.cookie = `soda=${target.id}`;
    });
  }

  // Attach event handler to form
  form.addEventListener("click", (e) => {
    // form.submit((e) => {
    e.preventDefault();
    // Data object for server parsing
    const data = {
      // Get name of soda and assign it to object
      name: e.target.name.value,
      // Get brand of soda and assign it to object
      brand: e.target.brand.value,
      // Get fizziness of soda and assign it to object
      fizziness: e.target.fizziness.value,
      // Get rating of soda and assign it to object
      taste_rating: e.target.taste_rating.value,
    };
    // Make an ajax post request to server and send
    // the data from the form object
    $.ajax({
      type: "POST",
      url: apiServerSoda,
      data: data,
    })
      .done((msg) => {
        alert("Successfully saved!");
        window.location = "./sodas.html";
      })
      .catch((err) =>
        alert(
          "Oops, something went wrong! Make sure to fill out all fields in the form.",
        ),
      );
  });
})();
