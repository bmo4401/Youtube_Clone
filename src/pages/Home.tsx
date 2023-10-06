import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
import { HomePageVideos } from '../Types';
import Card from '../components/Card';
import { clearVideos } from '../store';
export default function Home() {
   const dispatch = useAppDispatch();
   const videos = useAppSelector((state) => state.youtubeApp.videos);
   useEffect(() => {
      dispatch(clearVideos());
   }, [dispatch]);

   useEffect(() => {
      dispatch(getHomePageVideos(false));
   }, [dispatch]);

   return (
      <div className="max-h-screen overflow-hidden">
         <div className="h-[7.8vh]">
            <Navbar />
         </div>
         <div className="flex h-[92.2vh]">
            <Sidebar />
            {videos.length ? (
               <InfiniteScroll
                  dataLength={videos.length}
                  next={() => dispatch(getHomePageVideos(true))}
                  hasMore={videos.length < 500}
                  loader={<Spinner />}
                  height={750}
               >
                  <div className="grid gap-y-10 gap-x-8 grid-cols-3 p-8">
                     {videos.map((item: HomePageVideos) => (
                        <Card data={item} key={item.videoId} />
                     ))}
                  </div>
               </InfiniteScroll>
            ) : (
               <Spinner />
            )}
         </div>
      </div>
   );
}
