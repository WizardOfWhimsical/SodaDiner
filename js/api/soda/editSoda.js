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

  const editBtn = document.getElementById("editSoda");

  const name = document.getElementById("name");
  const brand = document.getElementById("brand");
  const fizziness = document.getElementById("fizziness");
  const rating = document.getElementById("rating");

  editBtn.addEventListener("click", function () {
    // Get the existing value of the elements
    const nameVal = name.textContent;
    const brandVal = brand.textContent;
    const fizzinessVal = fizziness.textContent;
    const ratingVal = rating.textContent;

    name.innerHTML = `
            <input name="name" class="edit-input" type='text' value='${nameVal}' />`;
    brand.innerHTML = `
            <input name="brand" class="edit-input" type='text' value='${brandVal}' />`;
    fizziness.innerHTML = `
            <input name="fizziness" class="edit-input" type='number' value='${fizzinessVal}' />`;
    rating.innerHTML = `
            <input name="rating" class="edit-input" type='number' value='${ratingVal}' />`;

    this.textContent = "Save";
    this.removeEventListener("click", arguments.callee);
    this.addEventListener("click", saveDetails);
  });

  function saveDetails() {
    const name = document.querySelector('input[name="name"]').value;
    const brand = document.querySelector('input[name="brand"]').value;
    const fizziness = document.querySelector('input[name="fizziness"]').value;
    const rating = document.querySelector('input[name="rating"]').value;

    const sodaObj = {
      name,
      brand,
      fizziness,
      taste_rating: rating,
    };

    fetch(sodaApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sodaObj),
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error("response with editing soda failed\n", res);
        }
        alert("Updated soda!");
        location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Oops, something went wrong!");
      });
  }
})();
