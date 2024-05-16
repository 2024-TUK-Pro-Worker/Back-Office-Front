import ky from "ky-universal";
import axios from "axios";

export const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) => {
  return ky(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${input}`, init);
}

export const fetchApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  credentials: "include"
});

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
})