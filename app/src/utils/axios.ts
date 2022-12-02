import Axios, { AxiosRequestConfig } from "axios";

export const axios = Axios.create({
  timeout: 60000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export const get = async <Res = unknown>(
  path: string,
  config?: AxiosRequestConfig
): Promise<Res | null> => {
  try {
    const { data } = await axios.get(path, config);
    return data as Res;
  } catch (error) {
    console.error(`GET ${path}`);
    console.error(error);
    return null;
  }
};

export const post = async <Res = unknown, Req = any>(
  path: string,
  data: Req,
  config?: AxiosRequestConfig
): Promise<Res | null> => {
  try {
    const { data: received } = await axios.post(path, data, config);
    return received as Res;
  } catch (error) {
    console.error(`POST ${path}`);
    console.error(error);
    return null;
  }
};

export const patch = async <Res = unknown, Req = any>(
  path: string,
  data: Req,
  config?: AxiosRequestConfig
): Promise<Res | null> => {
  try {
    const { data: received } = await axios.patch(path, data, config);
    return received as Res;
  } catch (error) {
    console.error(`PATCH ${path}`);
    console.error(error);
    return null;
  }
};
