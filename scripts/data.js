export async function fetchData() {
  const res = await fetch("data.json");
  if (!res.ok) throw new Error("error don sele");
  const data = await res.json();

  return data;
}
