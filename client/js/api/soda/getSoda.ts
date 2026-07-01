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
const apiServerUpdateSoda = "/api/soda/updateSoda/" + sodaId;
const serveSodaEl = getElById("serveSoda");
const deleteBtn = getElById("deleteSoda");
const servedEl = getElById("served");
const sectionEl = document.querySelector("section") as HTMLElement;

let sodaServed: boolean;

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

async function updateSoda() {
  //got to find out the shape of this return
  const serving = sodaServed;
  const updateValue = serving ? false : true;
  const { data, error } = await fetchBase(apiServerUpdateSoda, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serving: updateValue }),
  });
  if (error) {
    console.log(error.message, { error });
    alert(`Opps, something went wrong\ncheck the logs`);
    return;
  }
  if (data) {
    const { serving } = data as { serving: boolean };
    sodaServed = updateValue;
    if (updateValue) {
      servedEl.textContent = `${serving}`;
      serveSodaEl.textContent = "Stop serving soda";
    } else {
      servedEl.textContent = `${serving}`;
      serveSodaEl.textContent = "Serve soda";
    }
  }
  return;
}

deleteBtn.addEventListener("click", deleteSoda);

async function deleteSoda() {
  const { data, error } = await fetchBase(sodaApi, { method: "DELETE" });
  if (error) {
    console.log("Delete Soda\n", { error });
    return;
  }
  if (data) {
    alert("Soda successfully deleted!");
    window.location.href = "./sodas.html";
  }
}
