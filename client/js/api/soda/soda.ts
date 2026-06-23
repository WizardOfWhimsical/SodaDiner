import fetchBase from "../../../src/helpers/api-fetch";

const form = document.getElementById("soda-form") as HTMLElement;
const apiServerSoda = "http://localhost:3000/sodas";
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

async function getSodas() {
  const { data, error } = await fetchBase<Soda[]>(apiServerSoda);
  if (error) {
    console.log("error from getSoda\n", error);
    return;
  }

  console.log("fetch success\n", data);
  // renderSodas(data);
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
    const target = e.target as HTMLElement;
    const targetEl = target?.closest("div[id]");
    console.log(targetEl?.id);
    document.cookie = `soda=${targetEl?.id}`;
  });
}
