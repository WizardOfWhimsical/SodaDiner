import fetchBase from "../../../src/helpers/api-fetch";

const cookies = document.cookie;
const sodaId = cookies
  .split("; ")
  .find((cookie) => cookie.startsWith("soda"))
  ?.split("=")[1];

const sodaApi = "/api/soda" + sodaId;

const editBtn = document.getElementById("editSoda");
