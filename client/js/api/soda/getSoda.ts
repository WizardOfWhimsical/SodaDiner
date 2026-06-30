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
const serveSoda = getElById("serveSoda");
const deleteBtn = getElById("deleteSoda");
const served = getElById("served");
const section = document.querySelector("section") as HTMLElement;

section.textContent = "Please choose a soda";

const { data, error } = await fetchBase(sodaApi);
if (error) {
  console.log(error.message, { error });
  alert(`Opps, something went wrong\ncheck the logs`);
}
if (data) {
  //its an array of sodas?
  renderSoda(data.soda);
}

function renderSoda({ name, brand, fizziness, rating, served }: Soda) {
  const showTitle = getElById("title");
  const showName = getElById("name");
  const showBrand = getElById("brand");
  const showFizz = getElById("fizziness");
  const showRating = getElById("rating");

  showTitle.textContent = name;
  showName.textContent = name;
  showBrand.textContent = brand;
  showFizz.textContent = `${fizziness}`;
  showRating.textContent = `${rating}`;
  served.textContent = `${served}`;
}
