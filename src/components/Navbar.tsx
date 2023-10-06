import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { TiMicrophone } from 'react-icons/ti';
import { BsYoutube, BsCameraVideo, BsBell } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdApps } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import reactIcon from '../assets/react.svg';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeSearchTerm, clearSearchTerm, clearVideos } from '../store';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';
export default function Navbar() {
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
   const handleSearch = () => {
      if (location.pathname !== '/search') {
         navigate('/search');
      } else {
         dispatch(clearVideos());
         dispatch(getSearchPageVideos(false));
      }
   };
   console.log(searchTerm);
   return (
      <div className="flex justify-between items-center px-14 h-12 bg-[#212121] opacity-95 sticky top-0 z-50">
         <div className="flex gap-8 items-center text-2xl">
            <div>
               {' '}
               <GiHamburgerMenu />
            </div>
            <Link to="/">
               <div className="flex gap-1 justify-center items-center">
                  <BsYoutube className="text-3xl text-[#FF0000] " />
                  <div className="text-xl font-medium">Youtube</div>
               </div>
            </Link>
         </div>
         <div className="flex items-center justify-center gap-5">
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
               }}
            >
               <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
                  <div className="flex gap-4 items-center pr-5">
                     <div>
                        <AiOutlineSearch className="text-xl" />
                     </div>
                     <input
                        onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
                        value={searchTerm}
                        type="text"
                        className="w-96  bg-zinc-900 focus:outline-none border-none"
                     />

                     <AiOutlineClose
                        onClick={() => dispatch(clearSearchTerm())}
                        className={`text-xl cursor-pointer ${!searchTerm ? 'invisible' : 'visible'}`}
                     />
                  </div>
                  <button className="h-10 w-10 flex items-center justify-center">
                     <AiOutlineSearch className="text-xl" />
                  </button>
               </div>
            </form>
            <div className="text-xl p-3 bg-zinc-900 rounded-full">
               <TiMicrophone />
            </div>
         </div>
         <div className="flex gap-5 items-center text-xl">
            <BsCameraVideo />
            <IoMdApps />
            <div className="relative">
               <BsBell />
               <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full">9+</span>
            </div>
            <img src={reactIcon} alt="logo" className="w-9 h-9 rounded-full" />
         </div>
      </div>
   );
}
