import { JWTPayload, jwtVerify, SignJWT } from "jose";

const secret = process.env.JWT_SECRET_KEY!;
const key = new TextEncoder().encode(secret);

export async function encryptSession<T>(
  payload: T,
  expire: number | string | Date = "7d"
) {
  return await new SignJWT(payload as JWTPayload & T)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expire)
    .sign(key);
}

export async function decryptSession<T>(input: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as T;
  } catch (error) {
    console.log(error, "session decryption");
    return null;
  }
}

export async function updateSession(
  input: string,
  expires: number | string | Date
) {
  const payload = await decryptSession<JWTPayload>(input);
  return await encryptSession(payload, expires);
}
export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString(); // 6 رقمی string
