const API_BASE = 'https://site.api.espn.com/apis/site/v2/sports/golf';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number>;
}

export async function apiRequest<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute for live scores

export async function cachedApiRequest<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const cacheKey = `${endpoint}${JSON.stringify(options.params || {})}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  const data = await apiRequest<T>(endpoint, options);
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}

export function clearCache(): void {
  cache.clear();
}
