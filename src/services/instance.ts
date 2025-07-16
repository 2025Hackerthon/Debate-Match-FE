import axios from "axios";
import { Cookies } from "react-cookie";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const cookies = new Cookies();

const saveToken = (token: string) => cookies.set("access_token", token);
const removeToken = () => cookies.remove("access_token", { path: "/" });
const getToken = (): string | undefined => cookies.get("access_token");

interface CacheEntry {
  data: unknown;
  timestamp: number;
  expiry: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 60 * 1000;

const generateCacheKey = (
  url: string,
  method: string,
  params?: unknown,
  data?: unknown
): string => {
  const baseKey = `${method.toUpperCase()}_${url}`;
  const paramsString = params ? JSON.stringify(params) : "";
  const dataString = data ? JSON.stringify(data) : "";
  return `${baseKey}_${paramsString}_${dataString}`;
};

// const getCachedData = <T>(key: string): T | null => {
//   const entry = cache.get(key);
//   if (!entry) return null;

//   if (Date.now() > entry.expiry) {
//     cache.delete(key);
//     return null;
//   }

//   return entry.data as T;
// };

const setCachedData = (key: string, data: unknown): void => {
  const entry: CacheEntry = {
    data,
    timestamp: Date.now(),
    expiry: Date.now() + CACHE_DURATION
  };
  cache.set(key, entry);
};

const shouldCache = (url: string): boolean => {
  const parsedUrl = new URL(url, BASE_URL);

  return parsedUrl.searchParams.get("cache") === "true";
};

const instance = axios.create({ baseURL: BASE_URL });

instance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    // if (config.method === "get" && shouldCache(config.url ?? "")) {
    //   const cacheKey = generateCacheKey(
    //     config.url ?? "",
    //     config.method || "get",
    //     config.params,
    //     config.data
    //   );
    //   const cachedData = getCachedData(cacheKey);

    //   if (cachedData) {
    //     return Promise.reject({
    //       isCache: true,
    //       data: cachedData,
    //       status: 200,
    //       statusText: "OK",
    //       headers: "",
    //       config
    //     });
    //   }
    // }

    return config;
  },
  err => err
);

instance.interceptors.response.use(
  res => {
    if (res.config.method === "get" && shouldCache(res.config.url || "")) {
      const cacheKey = generateCacheKey(
        res.config.url || "",
        res.config.method || "get",
        res.config.params,
        res.config.data
      );
      setCachedData(cacheKey, res.data);
    }

    return res;
  },
  async err => {
    // if (err.isCache) {
    //   return Promise.resolve({
    //     data: err.data,
    //     status: err.status,
    //     statusText: err.statusText,
    //     headers: err.headers,
    //     config: err.config
    //   });
    // }

    if (err.response?.status === 401) {
      location.href = "/";
    } else {
      return Promise.reject(err);
    }
  }
);

export const clearCache = (): void => {
  cache.clear();
};

export const clearExpiredCache = (): void => {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now > entry.expiry) {
      cache.delete(key);
    }
  }
};

export const getCacheStats = () => {
  const now = Date.now();
  const total = cache.size;
  const expired = Array.from(cache.values()).filter(
    entry => now > entry.expiry
  ).length;
  const valid = total - expired;

  return {
    total,
    valid,
    expired
  };
};

export { saveToken, removeToken };

export default instance;
