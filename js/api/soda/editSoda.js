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

  // const $editBtn = $("#editSoda");
  const editBtn = document.getElementById("editSoda");

  const name = document.getElementById("name");
  const brand = document.getElementById("brand");
  const fizziness = document.getElementById("fizziness");
  const rating = document.getElementById("rating");

  // Assign a click event for edit button
  editBtn.addEventListener("click", function () {
    // Get the existing value of the elements
    const nameVal = name.textContent;
    const brandVal = brand.textContent;
    const fizzinessVal = fizziness.textContent;
    const ratingVal = rating.textContent;
    // Assign those previous values to these input for editing
    name.innerHTML = `
            <input name="name" class="edit-input" type='text' value='${nameVal}' />`;
    brand.innerHTML = `
            <input name="brand" class="edit-input" type='text' value='${brandVal}' />`;
    fizziness.innerHTML = `
            <input name="fizziness" class="edit-input" type='number' value='${fizzinessVal}' />`;
    rating.innerHTML = `
            <input name="rating" class="edit-input" type='number' value='${ratingVal}' />`;

    // Convert 'this' button to 'Save'
    this.textContent = "Save";
    //Unbind this button from the previous click fuction
    this.removeEventListener("click", arguments.callee);
    // Assign this button to save details function for ajax request
    this.addEventListener("click", saveDetails);
  });

  function saveDetails() {
    // Get input elements for editing/saving new values
    const nameVal = name.textContent;
    const brandVal = brand.textContent;
    const fizzinessVal = fizziness.textContent;
    const ratingVal = rating.textContent;
    // Create a new soda object
    const sodaObj = {
      name: nameVal,
      brand: brandVal,
      fizziness: fizzinessVal,
      taste_rating: ratingVal,
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
