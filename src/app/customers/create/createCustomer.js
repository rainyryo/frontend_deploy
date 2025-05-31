"use server";
import { revalidatePath } from "next/cache";

const createCustomer = async (formData) => {
  const creating_customer_name = formData.get("customer_name");
  const creating_customer_id = formData.get("customer_id");
  const creating_age = formData.get("age");
  const creating_gender = formData.get("gender");

  const body_msg = JSON.stringify({
    customer_name: creating_customer_name,
    customer_id: creating_customer_id,
    age: creating_age,
    gender: creating_gender,
  });

  console.log(">>> createCustomer: NEXT_PUBLIC_API_ENDPOINT =", process.env.NEXT_PUBLIC_API_ENDPOINT);

// ↓ これで fullUrl がどうなっているかログにも出す
  const fullUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers`;
  console.log(">>> createCustomer: fetch URL =", fullUrl);

//  const res = await fetch(fullUrl, {
//    method: "POST",
//    headers: { "Content-Type": "application/json" },
//    body: body_msg,
//  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body_msg,
  });


  
  if (!res.ok) {
    //ステータスコードとレスポンス本文をログに出力
    let errorText;
    try {
      errorText = await res.text();
    } catch (e) {
      errorText = `<failed to read error text: ${e}>`;
    }
    console.error(
      `>>> createCustomer: error status = ${res.status}, response = ${errorText}`
    );
    throw new Error("Failed to create customer");
  }
  //-ここまで-

  revalidatePath(`/customers`);
};

export default createCustomer;
