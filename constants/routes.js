export const routes = {
    // Common routes
    authorize: '/api/authorize/twitter',
    woeid: '/api/woeid',
    trends: (woeid) => `/api/trends/${woeid}`,
    posts: '/api/posts',
    spaces: '/api/spaces',
};