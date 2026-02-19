(function () {
  const form = document.getElementById("soda-form");
  const apiServerSoda = "http://localhost:3000/sodas";
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

  getSodas();

  function renderSodas({ sodas }) {
    const sodaDiv = document.getElementById("sodas");

    if (sodas.length === 0) {
      return sodaDiv.append("<h3>There are no sodas</h3>");
    }
    let content = "";
    sodas.map((soda) => {
      content += `
                <div id=${soda._id}>
                    <h5>
                        <a class="soda-link" 
                            href="./soda.html">${soda.name}</a>
                    </h5>
                </div>
            `;
    });
    sodaDiv.innerHTML = content;
    sodaDiv.addEventListener("click", (e) => {
      const target = e.target.closest("div[id]");
      console.log(target.id);
      document.cookie = `soda=${target.id}`;
    });
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target;

    const data = {
      name: target.name.value,
      brand: target.brand.value,
      fizziness: target.fizziness.value,
      taste_rating: target.taste_rating.value,
    };

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
