export default async function fetchBase(pathName, options) {
  try {
    const response = await fetch(pathName, options);
    if (!response.ok) {
      const err = response.json();
      throw new Error("Base-Fetch Error\n", err);
    }
    const data = response.json();
    return { data, error: null };
  } catch (error) {
    console.log("Base Catch Error");
    return { data: null, error };
  }
}
