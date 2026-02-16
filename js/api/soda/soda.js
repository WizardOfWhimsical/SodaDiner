(function () {
  // Immediately invoke function
  // Get Soda form
  const form = document.getElementById("soda-form");
  const $form = $("#soda-form");
  // Declare api server for soda
  const apiServerSoda = "http://localhost:3000/sodas";
  // Get the sodas for soda form
  function getSodas() {
    fetch(apiServerSoda)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        renderSodas(data);
      });
    // Get sodas
    $.ajax({
      type: "GET",
      url: apiServerSoda,
    }).done((res) => {
      console.log(res);
      // Render option elements for soda
      renderSodas(res);
    });
  }
  // Call api sodas
  getSodas();
  // Render sodas from the ajax request
  function renderSodas({ sodas }) {
    const $sodaDiv = $("#sodas");
    // Check to see if there are any sodas
    if (sodas.length === 0)
      return $sodaDiv.append("<h3>There are no sodas</h3>");
    // Loop through the sodas array
    sodas.map((soda, idx) => {
      // Append new elements under sodas' container
      $sodaDiv.append(`
                <div id=${soda._id}>
                    <h5>
                        <a class="soda-link" 
                            href="./soda.html">${soda.name}</a>
                    </h5>
                </div>
            `);
    });
    // Get each soda from the soda's container
    const children = $sodaDiv.children();
    // Loop thru the elements inside sodaDiv
    for (let child of children) {
      // Assign a function for each one to create unique
      // cookie for particular soda
      child.onclick = function () {
        // Create a document cookie for soda's id
        document.cookie = `soda=${this.id}`;
      };
    }
  }
  // Attach event handler to form
  $form.submit((e) => {
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
