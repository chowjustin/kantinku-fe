import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = (): string => cookies.get("kantinku_token");

export const setToken = (token: string) => {
  cookies.set("kantinku_token", token, { path: "/" });
};

export const removeToken = () =>
  cookies.remove("kantinku_token", { path: "/" });
