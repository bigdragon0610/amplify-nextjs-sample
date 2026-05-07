export default async function Home() {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("API_URL is not defined");
  }
  const url = apiUrl;
  const res = await fetch(url, {
    cache: "no-store",
  });
  const text = await res.text();

  return <div>{text}</div>;
}
