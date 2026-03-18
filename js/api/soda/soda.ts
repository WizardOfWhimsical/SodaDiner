import fetchBase from "../../../src/helpers/api-fetch";

const form = document.getElementById("soda-form");
const apiServerSoda = "http://localhost:3000/sodas";

async function getSodas() {
  const { data, error } = await fetchBase(apiServerSoda);
  if (error) console.log("error from getSoda\n", error);

  console.log("fetch success\n", data);
  // renderSodas(data)
}
