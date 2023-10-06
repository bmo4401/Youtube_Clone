import { HomePageVideos } from '../Types';
import { Link } from 'react-router-dom';
export default function SearchCard({ data }: { data: HomePageVideos }) {
   return (
      <div className="w-full h-56 flex gap-3">
         <div className="relative">
            <span className="absolute bottom-14 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
               {data.videoDuration}
            </span>
            <Link to={`/watch/${data.videoId}`} className="flex h-48 w-80">
               <img src={data.videoThumbnail} alt="thumbnail" />
            </Link>
         </div>
         <div className="flex gap-1 flex-col">
            <div>
               <h3>
                  <a href="#" className="line-clamp-2">
                     {' '}
                     {/* video title exceeds 2 lines show ... */}
                     {data.videoTitle}
                  </a>
               </h3>
            </div>
            <div className="text-sm text-gray-400">
               <div>
                  <span className="after:content-['*'] after:mx-1">{data.videoViews} views</span>
                  <span>{data.videoAge}</span>
               </div>
            </div>
            <div className="min-w-fit my-3">
               <a href="#" className="flex gap-3 items-center">
                  <img src={data.channelInfo.image} alt="channel" className="h-9 w-9 rounded-full " />
                  <span className="text-sm hover:text-white">{data.channelInfo.name}</span>
               </a>
            </div>
            <div
               className="line-clamp-2 text-xs opacity-90
            "
            >
               <p>{data.videoDescription}</p>
            </div>
         </div>
      </div>
   );
}
