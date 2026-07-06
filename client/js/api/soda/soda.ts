import fetchBase from "../../../src/helpers/api-fetch";

const form = document.getElementById("soda-form") as HTMLFormElement;
const apiServerSoda = "/api/sodas";
/**
 * i know the shap of data coming into here and want to declaire it but it is more difficult that i thought to put it together
 *
 */

interface Soda {
  name: string;
  _id: string;
  fizziness: number;
  rating: number;
  served: boolean;
}

interface NewSoda {
  name: string;
  brand: string;
  fizziness: number;
  taste_rating: number;
}

async function getSodas() {
  const { data, error } = await fetchBase<Soda[]>(apiServerSoda);
  if (error) {
    console.log("error from getSoda\n", error);
    return;
  }

  console.log("fetch success\n", data);
  renderSodas(data);
}

getSodas();

function renderSodas(sodas: Array<Soda>): void {
  const sodaDiv = document.getElementById("sodas") as HTMLElement;

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
    const target = e.target as HTMLElement;
    const targetEl = target?.closest("div[id]");
    document.cookie = `soda=${targetEl?.id}`;
  });
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement & {
    name: HTMLInputElement;
    brand: HTMLInputElement;
    fizziness: HTMLInputElement;
    taste_rating: HTMLInputElement;
  };

  const newData: NewSoda = {
    name: target.name.value,
    brand: target.brand.value,
    fizziness: parseInt(target.fizziness.value),
    taste_rating: parseInt(target.taste_rating.value),
  };

  const { data, error } = await fetchBase(apiServerSoda, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });

  if (error) {
    console.log(error.message, { error });
    alert(`Opps, something went wrong\ncheck the logs`);
  }

  if (data) {
    alert("Soda Successfully saved!");
    window.location.href = "./sodas.html";
  }
});
