import fetchBase from "../../../src/helpers/api-fetch";
import {
  getElById,
  getButtonElById,
  getInputElByName,
} from "../../../src/helpers/getElement";

const cookies = document.cookie;
const dinerId = cookies
  .split("; ")
  .find((cookie) => cookie.startsWith("diner"))
  ?.split("=")[1];
