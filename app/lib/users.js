import fetch from 'node-fetch';

export const getUsers = async (ids) => {
    const url = 'https://api.twitter.com/2/users';
  
    const params = new URLSearchParams({
        'ids': ids.join(','),
        'user.fields': ['profile_image_url','verified','verified_type'],
    });

    const response = await fetch(`${url}?${params}`, {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.log(response.statusText);
        throw new Error('Failed to fetch users');
    }

    const json = await response.json();
    return json.data;
};