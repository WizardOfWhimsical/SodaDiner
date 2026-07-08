import fetchBase from "../../../src/helpers/api-fetch";
import { getElById } from "../../../src/helpers/getElement";

interface Soda {
  _id: string;
  name: string;
  brand: string;
  fizziness: number;
  rating: number;
  served: boolean;
}

interface Diner {
  name: string;
  location: string;
  _id: string;
  sodas: Soda[];
}

const dinerForm = document.getElementById("diner-form") as HTMLFormElement;
const sodaContainer = getElById("soda-container");

const apiServerDiners = "/api/diners";
const apiServerDiner = "/api/diner";
const apiServerSoda = "/api/sodas/serving";

async function getSodas() {
  const { data, error } = await fetchBase<{ sodas: Soda[] }>(apiServerSoda);

  if (error) {
    alert("Something went wrong, go check the logs");
    console.log("error from ServerSoda\n", error);
  }

  if (data) {
    renderOptionElements(data);
  }
}
