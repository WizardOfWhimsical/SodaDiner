import fetchBase from "../../../src/helpers/api-fetch";

interface Soda {
  name: string;
  brand: string;
  fizziness: number;
  taste_rating: number;
}

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
  const infoContainer = document.getElementById("info") as HTMLElement;

  const nameVal = name?.textContent;
  const brandVal = brand?.textContent;
  const fizzinessVal = fizziness?.textContent;
  const ratingVal = rating?.textContent;

  const nameHTML = renderTextInput("name", nameVal);
  const brandHTML = renderTextInput("brand", brandVal);
  const fizzinessHTML = renderTextInput("fizziness", fizzinessVal);
  const ratingHTML = renderTextInput("rating", ratingVal);

  infoContainer.innerHTML = nameHTML + brandHTML + fizzinessHTML + ratingHTML;

  this.textContent = "Save";
  this.removeEventListener("click", handler);
  this.addEventListener("click", saveDetails);
});

async function saveDetails() {
  function getInputEl(str: string) {
    return document.querySelector(`input[name=${str}]`) as HTMLInputElement;
  }

  const name = getInputEl("name");
  const brand = getInputEl("brand");
  const fizziness = getInputEl("fizziness");
  const rating = getInputEl("rating");

  const builtSodaObject: Soda = {
    name: name?.value,
    brand: brand?.value,
    fizziness: parseInt(fizziness?.value),
    taste_rating: parseInt(rating?.value),
  };

  const { data, error } = await fetchBase<Soda>(sodaApi, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(builtSodaObject),
  });

  if (error) {
    console.log("error from getSoda\n", error);
    return;
  }
}
