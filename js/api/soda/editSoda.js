(function () {
  // Immediately invoke function
  // Get browser cookies
  const cookies = document.cookie;
  // Parse cookies and get diner's id
  const sodaID = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("soda"))
    .split("=")[1];

  const sodaApi = "http://localhost:3000/soda/" + sodaID;

  const $editBtn = $("#editSoda");
  // Assign a click event for edit button
  $editBtn.on("click", function () {
    // Convert 'this' button to 'Save'
    $(this).text("Save");
    // Declare all elements of sodas info
    const $name = $("#name");
    const $brand = $("#brand");
    const $fizziness = $("#fizziness");
    const $rating = $("#rating");
    // Get the existing value of the elements
    const nameVal = $name.text();
    const brandVal = $brand.text();
    const fizzinessVal = $fizziness.text();
    const ratingVal = $rating.text();
    // Assign those previous values to these input for editing
    $name.html(`
            <input name="name" class="edit-input" type='text' value='${nameVal}' />`);
    $brand.html(`
            <input name="brand" class="edit-input" type='text' value='${brandVal}' />`);
    $fizziness.html(`
            <input name="fizziness" class="edit-input" type='number' value='${fizzinessVal}' />`);
    $rating.html(`
            <input name="rating" class="edit-input" type='number' value='${ratingVal}' />`);

    //Unbind this button from the previous click fuction
    $(this).unbind();
    // Assign this button to save details function for ajax request
    $(this).on("click", saveDetails);
  });

  function saveDetails() {
    // Get input elements for editing/saving new values
    const $name = $('input[name="name"]').val();
    const $brand = $('input[name="brand"]').val();
    const $fizziness = $('input[name="fizziness"]').val();
    const $rating = $('input[name="rating"]').val();
    // Create a new soda object
    const sodaObj = {
      name: $name,
      brand: $brand,
      fizziness: $fizziness,
      taste_rating: $rating,
    };
    // Send a PUT request to update the document in mongo
    $.ajax({
      type: "PUT",
      url: sodaApi,
      data: sodaObj,
    })
      .done((res) => {
        // Once updated successfully, render an alert
        alert("Updated soda!");
        location.reload();
      })
      .catch((err) => {
        alert("Oops, something went wrong!");
        console.log(err);
      });
  }
})();
