import { jwtVerify } from "jose";

export function isAuth(token: string) {
  const secretkey = new TextEncoder().encode(process.env.SECRET_KEY);

  return jwtVerify(token, secretkey);
}
