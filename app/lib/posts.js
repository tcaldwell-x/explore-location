import fetch from 'node-fetch';

export async function getPosts(query, maxPages) {
    const baseUrl = 'https://api.twitter.com/2/tweets/search/recent';

    const params = new URLSearchParams({
        'tweet.fields': ['entities','public_metrics'],
        'expansions': ['author_id'],
        'query': query,
        'max_results': '100',
        'sort_order': 'relevancy'
    });

    const queryUrl = `${baseUrl}?${params}`
    let url = queryUrl;

    let allData = [];
    let page = 1;
    while (url && page <= maxPages) {
        const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
              'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        allData = allData.concat(data.data);
        url = data.meta.next_token ? `${queryUrl}&pagination_token=${data.meta.next_token}` : null;
        page++;
    }
    return allData;
}

