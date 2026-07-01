import { getElById } from "../../../src/helpers/getElement";
import fetchBase from "../../../src/helpers/api-fetch";

interface Soda {
  /**
   * the soda name
   */
  name: string;
  brand: string;
  fizziness: number;
  rating: number;
  served: boolean;
}

const cookies = document.cookie;

//why dont we put question marks on each check, only the last one?
const sodaId = cookies
  .split("; ")
  .find((cookie) => cookie.startsWith("soda"))
  ?.split("=");

const sodaApi = "/api/soda/" + sodaId;
const apiServerUpdateSodan = "/api/soda/updateSoda/" + sodaId;
const serveSodaEl = getElById("serveSoda");
const deleteBtn = getElById("deleteSoda");
const servedEl = getElById("served");
const sectionEl = document.querySelector("section") as HTMLElement;

sectionEl.textContent = "Please choose a soda";

const { data, error } = await fetchBase<Soda>(sodaApi);
if (error) {
  console.log(error.message, { error });
  alert(`Opps, something went wrong\ncheck the logs`);
}
if (data) {
  //its an array of sodas?
  renderSoda(data);
}

function renderSoda({ name, brand, fizziness, rating, served }: Soda) {
  const showTitleEl = getElById("title");
  const showNameEl = getElById("name");
  const showBrandEl = getElById("brand");
  const showFizzEl = getElById("fizziness");
  const showRatingEl = getElById("rating");

  showTitleEl.textContent = name;
  showNameEl.textContent = name;
  showBrandEl.textContent = brand;
  showFizzEl.textContent = `${fizziness}`;
  showRatingEl.textContent = `${rating}`;
  servedEl.textContent = `${served}`;

  !served
    ? (serveSodaEl.textContent = "Serve soda")
    : (serveSodaEl.textContent = "Stop serving");
  serveSodaEl.addEventListener("click", updateSoda);
}

function updateSoda() {
  //Ej, i searched and could not find a refrence to this window obj that is created. i assume then it will always return null.
  const serving = null;
  const updateValue = serving ? false : true;

  fetchBase(apiServerUpdateSodan, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serving: updateValue }),
  });
}
