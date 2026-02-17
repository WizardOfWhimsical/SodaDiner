(function () {
  // Immediately invoke function
  // Get browser cookies
  const cookies = document.cookie;
  // Parse cookies and get soda id
  const sodaID = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("soda"))
    .split("=")[1];

  // Url for soda's information
  const sodaApi = "http://localhost:3000/soda/" + sodaID;
  // Declare api for serve soda
  const apiServerUpdateSoda = "http://localhost:3000/soda/updateSoda/" + sodaID;

  // Update soda button
  // const $serveSoda = $("#serveSoda");
  const serveSoda = document.getElementById("serveSoda");

  // Status for soda (if being served)
  // const $served = $("#served");
  const served = document.getElementById("served");

  // Delete Soda button
  // const $deleteBtn = $("#deleteSoda");
  const deleteBtn = document.getElementById("deleteSoda");

  // Make soda ajax request
  $.ajax({
    type: "GET",
    url: sodaApi,
  })
    .done((res) => {
      if (!res.soda) {
        $("section").text("Please choose a soda");
      } else {
        // Render soda in UI
        renderSoda(res.soda);
      }
    })
    .catch((err) => $("section").text("Please choose a soda"));

  const renderSoda = ({ name, brand, fizziness, rating, served }) => {
    const $title = $("#title");
    const $name = $("#name");
    const $brand = $("#brand");
    const $fizziness = $("#fizziness");
    const $rating = $("#rating");
    // Assign these elements with the values from the soda object
    $title.text(name);
    $name.text(name);
    $brand.text(brand);
    $fizziness.text(fizziness);
    $rating.text(rating);
    $served.text(served);

    // Check value of soda and provide conditions to serve or stop serving
    if (served === false) {
      serveSoda.text("Serve soda");
    } else {
      serveSoda.text("Stop serving soda");
    }

    // Assinged served value to window object
    window.served = served;
  };

  // A function to update serving option
  function updateSoda() {
    // Get value of serving soda
    const serving = window.served;
    // Update the serving object by toggling the value between true or false
    const updateValue = serving ? false : true;

    $.ajax({
      type: "PUT",
      url: apiServerUpdateSoda,
      data: { serving: updateValue },
    })
      .done((res) => {
        console.log(res);
        const { serving } = res;
        if (serving === "true") {
          $(this).replaceWith("<b>This soda is now being served</b>");
          $served.text("true");
        } else {
          $(this).replaceWith(
            "<b> This soda is not being served any more </b>",
          );
          $served.text("false");
        }
      })
      .catch((err) => console.log(err));
  }

  // Add event listener to serve soda button
  serveSoda.on("click", updateSoda);

  function deleteSoda() {
    $.ajax({
      type: "DELETE",
      url: sodaApi,
    })
      .done((res) => {
        alert("Soda successfully deleted!");
        window.location = "./sodas.html";
      })
      .catch((err) => console.log(err));
  }

  // Add event listener to delete soda button
  $deleteBtn.on("click", deleteSoda);
})();
