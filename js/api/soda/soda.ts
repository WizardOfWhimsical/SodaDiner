import fetchBase from "../../../src/helpers/api-fetch";

const form = document.getElementById("soda-form") as HTMLElement;
const apiServerSoda = "http://localhost:3000/sodas";
/**
 *
 *
 */

interface Soda {
  name: string;
  _id: string;
  fizziness: number;
  rating: number;
  served: boolean;
}

async function getSodas() {
  const { data, error } = await fetchBase<Array<Soda>>(apiServerSoda);
  if (error) {
    console.log("error from getSoda\n", error);
    return;
  }

  console.log("fetch success\n", data);
  renderSodas(data);
}

getSodas();

function renderSodas(sodas: Array<Soda>): void {
  const sodaDiv = document.getElementById("sodas");

  if (!sodaDiv) return;

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
    // This is a common pattern to find the closest parent element when setting a click event based on a specific attribute (in this case, an id)
    const target = e.target as HTMLElement;
    const targetEl = target?.closest("div[id]");
    console.log(targetEl?.id);
    document.cookie = `soda=${targetEl?.id}`;
  });
}

interface NewSoda {
  name: { value: string };
  brand: { value: string };
  fizziness: { value: string };
  taste_rating: { value: string };
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement & NewSoda;

  if (!target) return;
  const formData = {
    name: target.name.value,
    brand: target.brand.value,
    fizziness: target.fizziness.value,
    taste_rating: target.taste_rating.value,
  };

  const { data, error } = await fetchBase<NewSoda>(apiServerSoda, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (error) {
    console.log("error\n", error);
    alert("Oops, something went wrong!");
  }
  if (data) {
    console.log("success\n", data);
    alert("Soda added successfully!");
    window.location.reload();
  }
});
