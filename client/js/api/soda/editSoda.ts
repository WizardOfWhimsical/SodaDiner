import fetchBase from "../../../src/helpers/api-fetch";
import { getElById, getInputElByName } from "../../../src/helpers/getElement";

interface Soda {
  /**
   * then name of the soda
   */
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
  const name = getElById("name");
  const brand = getElById("brand");
  const fizziness = getElById("fizziness");
  const rating = getElById("rating");
  const infoContainer = getElById("info");

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
  const name = getInputElByName("name");
  const brand = getInputElByName("brand");
  const fizziness = getInputElByName("fizziness");
  const rating = getInputElByName("rating");

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
    alert(`Opps, something went wrong\ncheck the logs`);
    return;
  }
  if (data) {
    alert(`Update Successful\n${data.name}`);
    location.reload();
    return;
  }
}
/**
 * Returns HTML string representing and edit field for a soda
 */
function renderTextInput(item: string, value: string): string {
  const id = `${item}-input`;
  return `
    <div>
      <label for="${id}">${item}: </label>
      <input id="${id}" name="${item}" class="edit-input" type="text" value="${value}" />
    </div>
    `;
}
