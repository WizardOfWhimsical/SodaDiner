import fetchBase from "../../../src/helpers/api-fetch";
import { getElById } from "../../../src/helpers/getElement";

interface Soda {
  _id: string;
  name: string;
  brand: string;
  fizziness: number;
  rating: number;
  served: boolean;
}

interface Diner {
  name: string;
  location: string;
  _id: string;
  sodas: Soda[];
}

const cookies = document.cookie;

const dinerID = cookies
  .split("; ")
  .find((cookie) => cookie.startsWith("diner"))
  ?.split("=")[1];

const dinerApi = "/api/diner/" + dinerID;
const apiServerSoda = "/api/sodas/serving";
const apiUpdateSodas = "/api/diner/" + dinerID + "/sodas";
let sodas = [];

const { data, error } = (await fetchBase(dinerApi)) as {
  data: { diner: Diner };
  error: any;
};

if (error) {
  console.log("error\n", error);
  alert("Oops, something went wrong!");
}

if (data) {
  renderDiner(data.diner);
  ({ sodas } = data.diner);
} else {
  const section = document.querySelector("section") as HTMLElement;
  section.innerText = "Please choose a diner";
}

function renderDiner({ name, sodas }: Diner) {
  const titleEl = getElById("title");
  const nameEl = getElById("name");

  renderDinerSodas(sodas);

  titleEl.innerText = `${name}`;
  nameEl.innerText = `${name}`;
}

async function renderDinerSodas(sodas: Soda[]) {
  const sodaDiv = getElById("sodas");

  const { data, error } = await fetchBase<{ sodas: Soda[] }>(apiServerSoda);

  if (error) {
    console.log("error\n", error);
    alert("Oops, something went wrong!");
  }

  if (data) {
    if (!data.sodas) {
      return (sodaDiv.innerHTML =
        "<span>No sodas were found for this diner</span>");
    }
    const servingSodas = data.sodas;
    const dinerSodas = sodas.map((soda) => soda._id);
    let sodasToBeServed = servingSodas.filter((soda) =>
      dinerSodas.indexOf(soda._id) === -1 ? soda : "",
    );
    renderUISodas(sodasToBeServed);
  }
}

function renderUISodas(sodas: Soda[]) {
  const sodaContainer = getElById("sodaContainer");
  const sodaSelect = getElById("sodas");
  const addSodasButton = getElById("addSodas");

  if (!Array.isArray(sodas) || sodas.length === 0) {
    addSodasButton.style.display = "none";
    sodaContainer.innerHTML = "<h4>No new sodas are available to serve</h4>";
    return;
  }

  const fragment = document.createDocumentFragment();

  sodas.forEach(({ _id, name }) => {
    const option = document.createElement("option");
    option.value = _id;
    option.textContent = name;
    fragment.append(option);
  });
  sodaSelect.appendChild(fragment);
  return;
}
