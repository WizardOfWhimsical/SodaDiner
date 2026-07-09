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

interface GetDiner {
  name: string;
  location: string;
  _id: string;
  sodas: string | string[];
}

interface NewDiner {
  name: string;
  location: string;
  sodas: string | string[];
}
const dinerForm = document.getElementById("diner-form") as HTMLFormElement;
const sodaContainer = getElById("soda-container");

const apiServerDiners = "/api/diners";
const apiServerDiner = "/api/diner";
const apiServerSoda = "/api/sodas/serving";

async function getSodas() {
  const { data, error } = await fetchBase<{ sodas: Soda[] }>(apiServerSoda);

  if (error) {
    alert("Something went wrong, go check the logs");
    console.log("error from ServerSoda\n", error);
  }

  if (data) {
    renderOptionElements(data);
  }
}
//see about setting a check to call based on html file loaded
getSodas();

function renderOptionElements({ sodas }: { sodas: Soda[] }) {
  if (sodas.length === 0) {
    if (sodaContainer) {
      sodaContainer.innerHTML = "<h4>No sodas server here</h4>";
    }
    return;
  }

  if (!sodaContainer) return;

  const fragment = document.createDocumentFragment();

  sodas.map((soda) => {
    const option = document.createElement("option");
    option.value = soda._id;
    option.textContent = soda.name;
    fragment.append(option);
  });
  sodaContainer.appendChild(fragment);
}

async function getDiners() {
  const { data, error } = await fetchBase<{ diners: GetDiner[] }>(
    apiServerDiners,
  );

  if (error) {
    alert("Something in went\nwrong, check logs");
    console.log("fetching diners failed\n", error);
  }

  if (data) {
    renderDiners(data);
  }
}

function renderDiners({ diners }: { diners: GetDiner[] }) {
  const dinerDiv = getElById("diners");
  if (diners.length === 0) {
    if (dinerDiv) {
      dinerDiv.innerHTML = "<h4>There are no diners</h4>";
    }
    return;
  }
  if (!dinerDiv) return;

  const fragment = document.createDocumentFragment();
  diners.map((diner) => {
    const divContentContainer = document.createElement("div");
    const anchor = document.createElement("a");
    const holdingHeader = document.createElement("h5");
    divContentContainer.id = diner._id as string;
    anchor.classList = "diner-link";
    anchor.href = "./diner.html";
    anchor.textContent = diner.name;
    holdingHeader.append(anchor);
    divContentContainer.append(holdingHeader);
    fragment.appendChild(divContentContainer);
  });

  dinerDiv.appendChild(fragment);

  dinerDiv.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const targetEl = target?.closest("div[id]");
    document.cookie = `diner=${targetEl?.id}`;
  });
}
getDiners();

function getSelectedSodaIds() {
  const sodaSelect = document.querySelector<HTMLSelectElement>(
    "select[name='sodas']",
  )!;
  return Array.from(sodaSelect?.selectedOptions, (option) => option.value);
}

dinerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const target = e.target as HTMLFormElement & {
    name: HTMLInputElement;
    location: HTMLInputElement;
  };
  //this is a repeat, locate and make imports
  const sodas = getSelectedSodaIds();

  const newDiner: NewDiner = {
    name: target.name.value,
    location: target.location.value,
    sodas: sodas,
  };
  const { data, error } = await fetchBase<{ diner: GetDiner }>(apiServerDiner, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDiner),
  });

  if (error) {
    alert("something went wrong,c heck the logs");
    console.log("error in creating diner\n", error);
  }

  if (data) {
    alert("Diner Successfully saved!");
    window.location.href = "./diners.html";
  }
});
