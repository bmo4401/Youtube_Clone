import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { YOU_API_URL } from '../../utils/constants';
import axios from 'axios';
import { parseData } from '../../utils';
import { HomePageVideos } from '../../Types';

const API_KEY = import.meta.env.VITE_APP_YOUTUBE_DATA_API_KEY;
export const getHomePageVideos = createAsyncThunk(
   'youtubeApp/homePageVideos',
   async (isNext: boolean, { getState }) => {
      const {
         youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
      } = getState() as RootState;
      const {
         data: { items, nextPageToken },
      } = await axios.get(
         `${YOU_API_URL}/search?maxResults=12&q="here your perfect cover"&key=${API_KEY}&part=snippet&type=video&${
            isNext ? `pageToken=${nextPageTokenFromState}` : ''
         }`,
      );
      /*   const {data:{items, nextPageToken}} = await axios.get(`${YOU_API_URL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${}`) */
      const parsedData: HomePageVideos[] = await parseData(items); //array of 20 result search video
      return { parsedData: [...videos, ...parsedData], nextPageToken };
   },
);
