import fetch from 'node-fetch';

export const getSpaces = async (queries) => {
  const url = `https://api.twitter.com/2/spaces/search`;
  const results = [];

  for (const query of queries) {
    const params = new URLSearchParams({
      'query': query,
      'expansions': 'creator_id',
      'space.fields': ['title', 'participant_count', 'creator_id'].join(','),
      'user.fields': ['name', 'profile_image_url', 'username'].join(','),
    });

    const response = await fetch(`${url}?${params}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch spaces');
    }

    const json = await response.json();
    if (json && json.data) {
        const userMap = new Map(json.includes.users.map(user => [user.id, user]));

        const updatedData = json.data.map(entry => ({
            ...entry,
            host: userMap.get(entry.creator_id)
        }));
        results.push(updatedData);
    }
  }

  const allSpaces = results.flat();
  
  const uniqueSpacesMap = new Map();
  allSpaces.forEach(space => {
    if (!uniqueSpacesMap.has(space.id)) {
      uniqueSpacesMap.set(space.id, space);
    }
  });
  const uniqueSpaces = Array.from(uniqueSpacesMap.values());

  uniqueSpaces.sort((a, b) => {
    if (a.state === 'live' && b.state !== 'live') return -1;
    if (a.state !== 'live' && b.state === 'live') return 1;
    if (a.participant_count > b.participant_count) return -1;
    if (a.participant_count < b.participant_count) return 1;
    return 0;
  });

  return uniqueSpaces;
};