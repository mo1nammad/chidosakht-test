import { JWTPayload, jwtVerify, SignJWT } from "jose";

const secret = process.env.JWT_SECRET_KEY!;
const key = new TextEncoder().encode(secret);

export async function encryptSession(
  payload: unknown,
  expire: number | string | Date = "7d"
) {
  return await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expire)
    .sign(key);
}

export async function decryptSession<T>(input: string): Promise<T> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload as T;
}

export async function updateSession(
  input: string,
  expires: number | string | Date
) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(key);
}

export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString(); // 6 رقمی string
