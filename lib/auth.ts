import { jwtVerify } from "jose";

export async function isAuth(token: string) {
  const secretkey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  if (token === "") return Promise.resolve(false);
  try {
    await jwtVerify(token, secretkey);
    return true;
  } catch {
    return false;
  }
}
