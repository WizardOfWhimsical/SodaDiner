import fetchBase from "../../../src/helpers/api-fetch";

const cookies = document.cookie;
const sodaId = cookies
  .split("; ")
  .find((cookie) => cookie.startsWith("soda"))
  ?.split("=")[1];

const sodaApi = "/api/soda" + sodaId;

const editBtn = document.getElementById("editSoda");

editBtn?.addEventListener("click", function handler(): void {
  const name = document.getElementById("name");
  const brand = document.getElementById("brand");
  const fizziness = document.getElementById("fizziness");
  const rating = document.getElementById("rating");
  const infoContainer = document.getElementById("info");

  const nameVal = name?.textContent;
  const brandVal = brand?.textContent;
  const fizzinessVal = fizziness?.textContent;
  const ratingVal = rating?.textContent;
});
