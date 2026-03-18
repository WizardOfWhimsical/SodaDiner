import fetchBase from "../../../src/helpers/api-fetch";

const form = document.getElementById("soda-form") as HTMLElement;
const apiServerSoda: string = "http://localhost:3000/sodas";
/**
 * i know the shap of data coming into here and want to declaire it but it is more difficult that i thought to put it together
 *
 */

type Soda = {
  name: string;
  _id: string;
  fizziness: number;
  rating: number;
  served: boolean;
};

async function getSodas() {
  const { data, error } = await fetchBase<Soda[]>(apiServerSoda);
  if (error) console.log("error from getSoda\n", error);

  console.log("fetch success\n", data);
  // renderSodas(data);
}

getSodas();

function renderSodas(sodas: Soda[]): void {
  const sodaDiv = document.getElementById("sodas") as HTMLElement;

  if (sodas.length === 0) {
    return sodaDiv.append("<h3>There are no sodas</h3>");
  }

  let content: string = "";
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
    const target = (e.target as HTMLElement).closest("div[id]");
    console.log(target.id);
    document.cookie = `soda=${target.id}`;
  });
}
