import fetch from 'node-fetch';

export const getWoeid = async (lat, long) => {
  const url = 'https://api.twitter.com/1.1/trends/closest.json';
  const params = new URLSearchParams({ lat, long });

  const response = await fetch(`${url}?${params.toString()}`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error: ${JSON.stringify(response.json())}`);
  }

  const json = await response.json();
  return json;
};
