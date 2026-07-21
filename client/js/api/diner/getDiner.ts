import fetchBase from "../../../src/helpers/api-fetch";
import {
  getElById,
  getButtonElById,
  getInputElByName,
} from "../../../src/helpers/getElement";

interface Diner {
  name: string;
  location: string;
  sodas: string | string[];
}

const cookies = document.cookie;
const dinerId = cookies
  .split("; ")
  .find((cookie) => cookie.startsWith("diner"))
  ?.split("=")[1];

const dinerApi = "/api/diner/" + dinerId;

const deleteButton = getButtonElById("deleteDiner");

const { data, error } = await fetchBase<{ diner: Diner }>(dinerApi);

const sectionEl = document.querySelector("section") as HTMLElement;
sectionEl.textContent = "Please choose a diner";

if (error) {
  console.log("diners get:\n", error);
  alert("Something went wrong, check the logs");
}

if (data) {
  if (data.diner) {
    renderDiner(data.diner);
  }
}
