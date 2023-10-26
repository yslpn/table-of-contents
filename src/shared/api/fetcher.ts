export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`An error occurred while fetching the data at ${url}`);
  }

  return response.json() as Promise<T>;
}
