import fetchBase from "../../../src/helpers/api-fetch";
import { getElById } from "../../../src/helpers/getElement";

interface Soda {
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

const cookies = document.cookie;

const dinerID = cookies
  .split("; ")
  .find((cookie) => cookie.startsWith("diner"))
  ?.split("=")[1];

const dinerApi = "/api/diner/" + dinerID;
const apiServerSoda = "/api/sodas/serving";
const apiUpdateSodas = "/api/diner/" + dinerID + "/sodas";
let sodas = null;

const { data, error } = (await fetchBase(dinerApi)) as {
  data: { diner: Diner };
  error: any;
};

if (error) {
  console.log("error\n", error);
  alert("Oops, something went wrong!");
}

if (data) {
  renderDiner(data.diner);

  ({ sodas } = data.diner);
} else {
  const section = document.querySelector("section") as HTMLElement;
  section.innerText = "Please choose a diner";
}
