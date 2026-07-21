import fetchBase from "../../../src/helpers/api-fetch";
import {
  getElById,
  getButtonElById,
  getInputElByName,
} from "../../../src/helpers/getElement";

/**
 * Diner returned has "id" attached
 */
interface NewDiner {
  name: string;
  location: string;
  sodas: string | string[];
}

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

  const nameValue = name.textContent;
  const locationValue = location.textContent;

  const nameInput = editingInput("name", nameValue);
  const locationInput = editingInput("location", locationValue);

  name.append(nameInput);
  location.append(locationInput);

  for (let child of sodaCont.childNodes) {
    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-danger deleteSodaBtn";
    removeBtn.textContent = "Remove";
    removeBtn.type = "button";
    removeBtn.addEventListener("click", () => {
      child.remove();
    });
    child.appendChild(removeBtn);
  }

  this.textContent = "Save";
  this.removeEventListener("click", switchMaterial);
  this.addEventListener("click", saveDetails);
});

async function saveDetails() {
  const name = getInputElByName("name");
  const nameValue = name.value;

  const location = getInputElByName("location");
  const locationValue = location.value;

  const sodas = getElById("sodas");
  const sodasChildren = sodas.children;

  const sodasIds: string[] = [];
  for (let soda of sodasChildren) {
    sodasIds.push(soda.id);
  }

  const dinerObject: NewDiner = {
    name: nameValue,
    location: locationValue,
    sodas: sodasIds,
  };

  const { data, error } = await fetchBase<NewDiner>(dinerApi, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dinerObject),
  });

  if (error) {
    console.log("Updating diner failed", error);
    alert("update failed check logs");
  }

  if (data) {
    alert("Updated diner!");
    window.location.reload();
  }
}

function editingInput(nameValue: string, inputValue: string) {
  const inputEl = document.createElement("input");
  inputEl.name = `${nameValue}`;
  inputEl.className = "edit-input";
  inputEl.type = "text";
  inputEl.value = `${inputValue}`;
  return inputEl;
}
