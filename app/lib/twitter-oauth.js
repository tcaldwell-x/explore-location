// lib/twitter-oauth.js
import fetch from 'node-fetch';

export const authorizeURI = (state, scope = 'tweet.read users.read') => {
  const url = new URL('https://twitter.com/i/oauth2/authorize');
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID);
  url.searchParams.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URI);
  url.searchParams.append('scope', scope);
  url.searchParams.append('state', state);
  url.searchParams.append('code_challenge', 'challenge');
  url.searchParams.append('code_challenge_method', 'plain');
  return url;
};

export const exchangeToken = async (code, callback = process.env.NEXT_PUBLIC_REDIRECT_URI) => {
  const url = 'https://api.twitter.com/2/oauth2/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID);
  params.append('redirect_uri', callback);
  params.append('code_verifier', 'challenge');
  params.append('code', code);
  
  const response = await fetch(url, { method: 'POST', body: params });
  const json = await response.json();
  return json;
};


export const refreshToken = async (token, callback = process.env.NEXT_PUBLIC_REDIRECT_URI) => {
  const url = 'https://api.twitter.com/2/oauth2/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID);
  params.append('redirect_uri', callback);
  params.append('refresh_token', token);
  
  const response = await fetch(url, { method: 'POST', body: params });
  const json = await response.json();
  return json;
};

export const revokeToken = async (token) => {
  const url = 'https://api.twitter.com/2/oauth2/revoke';
  const params = new URLSearchParams();
  params.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID);
  params.append('token', token);
  params.append('token_type_hint', 'access_token');
  
  const response = await fetch(url, { method: 'POST', body: params });
  const json = await response.json();
  console.log(json);
  return json;
};
