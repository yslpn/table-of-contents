export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`An error occurred while fetching the data at ${url}`);
  }

  return response.json() as Promise<T>;
};

export const handlePromiseWithSuspense = <T>(
  promise: Promise<T>,
): (() => T) => {
  let status = 'pending';
  let response: T;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err: T) => {
      status = 'error';
      response = err;
    },
  );
  return () => {
    switch (status) {
      case 'pending':
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw suspender;
      case 'error':
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw response;
      default:
        return response;
    }
  };
};
