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

  // Update soda BTN
  const serveSoda = document.getElementById("serveSoda");

  // Status for soda (if being served)
  // const $served = $("#served");
  const serve = document.getElementById("served");

  // Delete Soda button
  const $deleteBtn = $("#deleteSoda");
  // const deleteBtn = document.getElementById("deleteSoda");

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
    // console.log("inside render\n", served);
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
    serve.textContent = `${served} right here`;

    // Check value of soda and provide conditions to serve or stop serving
    // serveSoda.textContent = served ? "Stop serving soda" : "Serve soda";
    // if (served === false) {
    //   serveSoda.textContent = "Serve soda";
    // } else {
    //   serveSoda.textContent = "Stop serving soda";
    // }
    // Assinged served value to window object

    !served
      ? (serveSoda.textContent = "Serve soda")
      : (serveSoda.textContent = "Stop serving soda");

    window.served = served;
  };

  // A function to update serving option
  function updateSoda() {
    // Get value of serving soda
    const serving = window.served;
    console.log("inside before Ajax\n", serving);
    // Update the serving object by toggling the value between true or false
    const updateValue = serving ? false : true;
    console.log("update value\n", typeof updateValue);

    $.ajax({
      type: "PUT",
      url: apiServerUpdateSoda,
      data: { serving: updateValue },
    })
      .done((res) => {
        // res is string
        const { serving } = res;
        console.log("response\n", res);
        console.log("inside update\n", serving);

        window.served = updateValue;
        // goes from true to false or false to true but gets stuck in that state??
        if (updateValue) {
          console.log("if true:", updateValue);
          serve.textContent = `${serving}`;
          serveSoda.textContent = "Stop serving soda";
        } else {
          console.log("else false:", serving);
          serve.textContent = `${serving}`;
          serveSoda.textContent = "Serve soda";
        }
      })
      .catch((err) => console.log(err));
  }

  // Add event listener to serve soda button
  serveSoda.addEventListener("click", updateSoda);
  //
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
