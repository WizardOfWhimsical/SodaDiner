import fetchBase from "../../../src/helpers/api-fetch";
import { getElById } from "../../../src/helpers/getElement";

const dinerForm = document.getElementById("diner-form") as HTMLFormElement;
const sodaContainer = getElById("soda-container");

const apiServerDiners = "/api/diners";
const apiServerDiner = "/api/diner";
const apiServerSoda = "/api/sodas/serving";
