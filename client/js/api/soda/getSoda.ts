import { getElById } from "../../../src/helpers/getElement";
import fetchBase from "../../../src/helpers/api-fetch";

interface Soda {
  /**
   * then name of the soda
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

const { data, error } = await fetchBase<Soda>(sodaApi);
if (error) {
  console.log(error.message, { error });
  alert(`Opps, something went wrong\ncheck the logs`);
}
if (data) {
  renderSoda(data.soda);
}
