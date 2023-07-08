export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

const IS_SERVER = typeof window === "undefined";

export default function getURL(path: string) {
  const baseURL = IS_SERVER ? process.env.ARC_BASE_URL : window.location.origin;

  return new URL(path, baseURL).toString();
}
