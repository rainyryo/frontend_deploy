export default async function fetchCustomers() {
// ココから環境変数の辺りをログに出す
 console.log(">>> NEXT_PUBLIC_API_ENDPOINT (server) =", process.env.NEXT_PUBLIC_API_ENDPOINT);

const fullUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/allcustomers`;
console.log(">>> fetch URL =", fullUrl);
//ここまで

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/allcustomers`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }
  return res.json();
}
