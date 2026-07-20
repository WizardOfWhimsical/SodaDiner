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
});

function editingInput(nameValue: string, inputValue: string) {
  const inputEl = document.createElement("input");
  inputEl.name = `${nameValue}`;
  inputEl.className = "edit-input";
  inputEl.type = "text";
  inputEl.value = `${inputValue}`;
  return inputEl;
}
