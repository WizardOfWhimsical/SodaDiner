export default async function fetchBase<T>(
  pathName: string,
  options?: RequestInit,
) {
  try {
    const response = await fetch(pathName, options);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(`Base-Fetch Error ${response.status}\n`, { cause: err });
    }
    const data: T = await response.json();
    return { data, error: null };
  } catch (error) {
    console.log("Base Catch Error");
    return { data: null, error };
  }
}
