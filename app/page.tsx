'use client';

import { useState, useEffect } from 'react';
import { useWoeid } from '@/hooks/woeid';
import locationsGlobal from '@/constants/locations_global.json'
import locationsUs from '@/constants/locations_us.json'
import { Location } from './shared/types';
import { useTrends } from '@/hooks/trends';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { usePostData } from '@/hooks/posts'
import Divider from '@mui/material/Divider';
import { Tweet } from 'react-tweet'
import { User } from './components/User';
import { Space } from './components/Space';
import { useSpaces } from '@/hooks/spaces';
import Skeleton from '@mui/material/Skeleton';

type LocationData = {
  [key: string]: Location;
};

type PostData = {
    posts: [];
    topics: [];
    mentionedUsers: [];
    popularUsers: [];
};

const locations = { ...locationsUs, ...locationsGlobal} as LocationData;

export default function Home() {

  const [locationKey, setLocationKey] = useState<string>();
  const [location, setLocation] = useState<Location>();
  const [trend, setTrend] = useState<string>();
  const [posts, setPosts] = useState<PostData>();
  const [spaces, setSpaces] = useState<Array<any>>();
  const [topics, setTopics] = useState<string[]>([]);

  const { data: woeid, refetch: refetchWoeid } = useWoeid(location as Location);
  const { data: trends, refetch: refetchTrends } = useTrends(woeid);
  const { data: postData, isLoading: isLoadingPosts, isFetching: isFetchingPosts, refetch: refetchPosts } = usePostData(trend as string);
  const { data: spaceData, isLoading: isLoadingSpaces, isFetching: isFetchingSpaces, refetch: refetchSpaces } = useSpaces(topics);

  useEffect(() => {
    if (location) {
      refetchWoeid();
    }
  }, [location, refetchWoeid]);

  useEffect(() => {
    if (woeid) {
      refetchTrends();
    }
  }, [woeid, refetchTrends]);

  useEffect(() => {
    if (trend) {
      refetchPosts();
    }
  }, [trend, refetchPosts]);

  useEffect(() => {
    setPosts(postData)
    if (postData && postData.topics && postData.topics.length > 0) {
        setTopics(postData.topics.slice(0, 10))
    }
  }, [postData]);

  useEffect(() => {
    if (topics) {
      refetchSpaces();
    }
  }, [topics, refetchSpaces]);

  useEffect(() => {
    setSpaces(spaceData);
  }, [spaceData]);

  const selectTrend = async (value: string) => {
    setPosts(undefined)
    setSpaces(undefined)
    setTopics([])
    setTrend(value);
  };

  const selectLocation = (event: SelectChangeEvent) => {
    setLocationKey(event.target.value)
    setLocation(locations[event.target.value]);
    setTrend(undefined)
    setPosts(undefined)
    setSpaces(undefined)
    setTopics([])
  };

  return (
      <main className="bg-slate-950 flex text-white min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full items-center font-mono text-sm lg:flex">
        <div className="flex flex-col gap-2">
          <div className="py-3 text-3xl">
            Explore around the world
          </div>
          {<p>Discover conversations based on location and trends.</p>}
        <div className="flex-row">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="grouped-select" id="demo-simple-select-helper-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            value={locationKey}
            defaultValue=""
            id="grouped-select"
            label="Grouping"
            onChange={selectLocation}
          >
            <ListSubheader>United States</ListSubheader>
            {Object.entries(locationsUs).map(([key, location]) => {
              return <MenuItem key={key} value={key}>{location.city}</MenuItem>
            })}
            <ListSubheader>Global</ListSubheader>
            {Object.entries(locationsGlobal).map(([key, location]) => {
              return <MenuItem key={key} value={key}>{location.city}</MenuItem>
            })}
          </Select>
        </FormControl>
          <div className="pb-3">
            <div className="py-3 text-xl">
              Trends
            </div>
            <Stack className="flex-wrap gap-2" direction="row">
              {trends && trends.map((trend: any) => {
                return <Chip label={trend.trend_name} onClick={() => selectTrend(trend.trend_name)} />
              })
            }
          </Stack>
          </div>
        </div>
          <Divider variant="middle" flexItem />
          {trend && <div>
            <Box className="flex flex-row">
            <div className="p-4">
              <div className="pb-4 text-xl">
                Users
              </div>
              {(isLoadingPosts || isFetchingPosts) && <Box className="flex flex-row gap-6">
                <Box className="flex flex-col gap-4">
                  {Array(6).fill(null).map((_, index) => <Skeleton key={index} variant="rounded" width={200} height={75}/>)}
                </Box>
                <Box className="flex flex-col gap-4">
                  {Array(6).fill(null).map((_, index) => <Skeleton key={index} variant="rounded" width={200} height={75}/>)}
                </Box>
              </Box>
              }
              {!(isLoadingPosts || isFetchingPosts) && <Box className="flex flex-row gap-2">
                <Box className="flex flex-col gap-1">
                  {postData && postData.popularUsers.slice(0, 6).map((user: any) => <User user={user} />)}
                </Box>
                <Box className="flex flex-col gap-1">
                  {postData && postData.mentionedUsers.slice(0, 6).map((user: any) => <User user={user} />)}
                </Box>
              </Box>

              }
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="p-4">
              <div className="pb-4 text-xl">
                Spaces
              </div>
              {(isLoadingSpaces || isFetchingSpaces) && <Box className="flex flex-col gap-4">
                {Array(4).fill(null).map((_, index) => <Skeleton key={index} variant="rounded" width={575} height={120}/>)}
              </Box>
              }
              {!(isLoadingSpaces || isFetchingSpaces) && <Box className="flex flex-col gap-1">
                {spaces && spaces.slice(0, 4).map((space: any) => <Space space={space} />)}
              </Box>
              }
            </div>
          </Box>
          <Divider variant="middle" flexItem />
          <div className="p-4 dark">
            <div className="text-xl">
              Posts
            </div>
            {(isLoadingPosts || isFetchingPosts) && <Box className='flex flex-row flex-wrap gap-x-6 gap-y-0.5'>
              {Array(6).fill(null).map((_, index) => <Skeleton key={index} variant="rounded" width={500} height={500}/>)}
            </Box>
            }
            {!(isLoadingPosts || isFetchingPosts) && <Box className='flex flex-row flex-wrap gap-x-6 gap-y-0.5'>
              {posts && posts.posts && posts.posts.map((post: any) => <Tweet id={post.id} components={{TweetNotFound: undefined}} />)}
            </Box>
            }
          </div>
          </div>

          }
        </div>
      </div>
    </main>
  );
}