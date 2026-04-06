export async function fetchGraphQL(
  queryId: string,
  variables: Record<string, any> = {}
): Promise<any> {
  const params = new URLSearchParams({
    queryId: queryId,
    variables: JSON.stringify(variables),
  });

  const res = await fetch(`${process.env.WORDPRESS_URL}/graphql?${params.toString()}`, {
    method: "GET",
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Request failed");
  const result = await res.json();
  
  if (result.errors) throw new Error(JSON.stringify(result.errors));
  return result.data;
}
