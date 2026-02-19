(function () {
  const cookies = document.cookie;

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
    const name = document.querySelector('input[name="name"]')?.value;
    const location = document.querySelector('input[name="location"]')?.value;
    const sodas = document.getElementById("sodas")?.children;
    const sodaIDs = [];

    for (let soda of sodas) {
      sodaIDs.push(soda.id);
    }

    const dinerObj = {
      name,
      location,
      sodas: sodaIDs,
    };

    fetch(dinerApi, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dinerObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("put in save\n", response);
        }
      })
      .then(() => {
        alert("Updated diner!");
        window.location.reload();
      })
      .catch((err) => {
        console.log("saving error", err);
        alert("Oops, something went wrong!");
      });
  }
})();
