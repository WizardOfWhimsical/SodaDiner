(function () {
  // Immediately invoke function
  // Get browser cookies
  const cookies = document.cookie;
  // Parse cookies and get diner's id
  const dinerID = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("diner"))
    .split("=")[1];

  const dinerApi = "http://localhost:3000/diner/" + dinerID;

  const editBtn = document.getElementById("editDiner");

  editBtn.addEventListener("click", function () {
    const name = document.getElementById("name");
    const location = document.getElementById("location");
    const sodaCont = document.getElementById("sodas");

    const nameVal = name.textContent;
    const locationVal = location.textContent;

    name.innerHTML = `<input name="name" class="edit-input" type='text' value='${nameVal}' />`;
    location.innerHTML = `<input name="location" class="edit-input" type='text' value='${locationVal}' />`;

    for (let child of sodaCont.children) {
      const removeBtn = document.createElement("button");
      removeBtn.className = "btn btn-danger deleteSodaBtn";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        child.remove();
      });
      child.appendChild(removeBtn);
    }

    this.textContent = "Save";
    this.removeEventListener("click", arguments.callee);
    this.addEventListener("click", saveDetails);
  });

  function saveDetails() {
    // Get input elements for editing/saving new values
    const $name = $('input[name="name"]').val();
    const $location = $('input[name="location"]').val();
    const $sodas = $("#sodas").children();
    const sodaIDs = [];
    // Push IDs of sodas still being served
    for (let $soda of $sodas) {
      sodaIDs.push($soda.id);
    }
    // Create a new soda object
    const dinerObj = {
      name: $name,
      location: $location,
      sodas: sodaIDs,
    };
    // Send a PUT request to update the document in mongo
    $.ajax({
      type: "PUT",
      url: dinerApi,
      data: dinerObj,
    })
      .done((res) => {
        // Once updated successfully, render an alert
        alert("Updated diner!");
        location.reload();
      })
      .catch((err) => alert("Oops, something went wrong!"));
  }
})();
