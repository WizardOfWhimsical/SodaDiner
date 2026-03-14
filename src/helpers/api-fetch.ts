export default async function fetchBase<T>(
  pathName: string,
  options?: RequestInit,
) {
  try {
    const response = await fetch(pathName, options);
    if (!response.ok) {
      const err = await response.json();
      throw new Error("Base-Fetch Error\n", err);
    }
    const data: T = await response.json();
    return { data, error: null };
  } catch (error) {
    console.log("Base Catch Error");
    return { data: null, error };
  }
}

interface Todo {
  id: string;
  title: string;
}

const user = await fetchBase<{ id: string }>("user");

const todoList = await fetchBase<Todo[]>("todo");
todoList.data?.map((todo) => {
  console.log(todo.title);
});
