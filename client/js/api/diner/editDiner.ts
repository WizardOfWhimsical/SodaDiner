import fetchBase from "../../../src/helpers/api-fetch";
import {
  getElById,
  getButtonElById,
  getInputElByName,
} from "../../../src/helpers/getElement";

const cookies = document.cookie;

const dinerID = cookies
  .split("; ")
  .find((cookie) => cookie.startsWith("diner"))
  ?.split("=")[1];

const dinerApi = "/api/diner/" + dinerID;

const editBtn = getButtonElById("editDiner");

editBtn.addEventListener("click", function switchMaterial() {
  const name = getInputElByName("name");
  const location = getInputElByName("location");
  const sodaCont = getElById("sodas");
});
