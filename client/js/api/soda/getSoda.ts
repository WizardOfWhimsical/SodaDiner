import { getElById } from "../../../src/helpers/getElement";

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
const section = document.getElementsByName("section");
