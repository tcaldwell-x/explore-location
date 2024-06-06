import fetch from 'node-fetch';

export const getTrends = async (woeid) => {
  const url = 'https://api.twitter.com/2/trends/by/woeid';

  const response = await fetch(`${url}/${woeid}`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch trends');
  }

  const json = await response.json();
  return json.data;
};
