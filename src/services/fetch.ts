type FetchOptions = {
  method?: string;
  headers?: any;
  body?: any;
  timeout?: number;
};

type ApiErrorResponse = {
  error: string;
};

const DEFAULT_TIMEOUT = 8000;

export const fetchFn = async (url: string, options?: FetchOptions) => {
  const controller = new AbortController();
  const timeout = options?.timeout ?? DEFAULT_TIMEOUT;
  const abort = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(abort);

    if (!res.ok) {
      if (res.status >= 500) {
        throw new Error('Could not reach the server');
      }

      const { error }: ApiErrorResponse = await res.json().catch(() => {
        throw new Error('An unexpected error occured');
      });

      throw new Error(error);
    }

    if (res.status === 204) {
      return null;
    }

    return await res.json().catch(() => {
      throw new Error('Something went wrong');
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new DOMException('Request timed out', 'AbortError');
      } else if (error.message === 'Failed to fetch') {
        throw new Error('Could not reach the server');
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};
