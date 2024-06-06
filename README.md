# Sample Application: Explore by Location

An example application that allows users to explore content on X by a selected location. Powered by the [X API](https://developer.x.com/en/docs/twitter-api).

## Features

- **Location Selection**: Users choose a desired location where they wish to find relevant content, including posts, people to follow, and live spaces.
- **Trending Topics**: After selecting a location, users will see a list of trending topics specific to that region.
- **Post Exploration**: Users can select a trend to view related posts, including the most relevant and popular accounts to follow based on these posts.
- **Live Spaces**: The app will also curate a list of live discussions and spaces related to the selected trend, allowing users to listen in and participate.

By unlocking geographically-specific content, this app will enhance users' ability to learn about global trends and engage in meaningful conversations worldwide.

## Setup

Create a copy of the `.env.local.sample` file named, `.env.local`. Update the file to include the credentials for your develeloper project.

Note: You can find your app credentials by visiting the [X Developer Platform Dashboard](https://developer.twitter.com/en/portal/dashboard). 

```
NEXT_PUBLIC_CONSUMER_KEY = ''
NEXT_PUBLIC_CONSUMER_SECRET = ''

NEXT_PUBLIC_CLIENT_ID = ''
NEXT_PUBLIC_CLIENT_SECRET = ''

NEXT_PUBLIC_ACCESS_TOKEN = ''
NEXT_PUBLIC_TOKEN_SECRET = ''
NEXT_PUBLIC_BEARER_TOKEN = ''
```

## Usage

To run the project locally, run the following command(s):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to visit the application.

## Documentation

To learn more about the X API, visit the [X API Documentation](https://developer.x.com/en/docs/twitter-api).

## License

See [LICENSE](./LICENSE).
