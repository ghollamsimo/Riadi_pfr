import {useState, Fragment, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Navbar.scss";
import { TbPoint } from "react-icons/tb";
import { IoFilter } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Modalsearch from "../Modalsearch.jsx";
import Api from "../../api/Api.jsx";
import config from "../../helpers/config.js";
import getCookie from "../../helpers/cookie.js";
import {toast} from "react-toastify";
import Notification from "../Notification.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchRaidSearch} from "../../redux/actions/SearchAction.jsx";
import ProfileSettings from "../ProfileSettings.jsx";
import {fetchCount} from "../../redux/actions/CountAction.jsx";

function Navbar({id}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [query, setQuery] = useState('');
    const search = useSelector((state) => state.searchRiad.datalist)
    const countnotification = useSelector((state) => state.count.datalist?.notification)
    console.log('heeeeey' ,countnotification )
    useEffect(() => {
        if (query.trim() !== '') {
            dispatch(fetchRaidSearch(query));
        } else {
            if (search.length === 0) {
                console.log('No raid found');
            }
        }
        dispatch(fetchCount())
    }, [dispatch, query, search]);
    const toggleSearchBar = () => {
        setIsSearchBarOpen(!isSearchBarOpen);}
    return (
        <Fragment>
            <header className=" header bg-[#111827] z-50  fixed ">
                <nav className="  bg-[#111827] header__content__nav text-white  py-3 px-4 flex items-center justify-between">
                    <Link to="/" className="header__content__logo md:flex hidden font-extrabold font-serif">
                        Riadi <span><TbPoint/></span>
                    </Link>
                    <div className="flex items-center">
                        <ul className={`${`z-50 flex items-center`}`}>
                            <li>
                                <Link to="/home" >Home</Link>
                            </li>

                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>

                            <div className='relative'>
                                <span
                                    className=' w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300   transition-all focus:outline-none flex items-center justify-center'>
                                    <span className="w-3 text-center text-[10px] h-3 bg-blue-500 absolute top-2 right-1 text-white rounded-full">{countnotification}</span>
                                <Notification/>
                                </span>
                            </div>
                            <div className="relative z-20">
                                <button onClick={toggleSearchBar}
                                        className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-gray-700 transition-all focus:outline-none flex items-center justify-center"
                                        type="button" aria-expanded={isSearchBarOpen} id="searchButton">
                                    <CiSearch/>
                                </button>
                                {isSearchBarOpen && (
                                    <>
                                    <div
                                        className="right-0 z-50 absolute w-screen max-w-sm mt-2 opacity-100 translate-y-0"
                                        tabIndex="-1">
                                            <input type="search"
                                                   value={query}
                                                   onChange={(e) => setQuery(e.target.value)}
                                                   className="block w-full outline-0  bg-white dark:border-neutral-700  dark:bg-[#1F2937] rounded-2xl text-sm font-normal h-11 px-4 py-3 "
                                                   placeholder="Type and Search"/>

                                        {search.length > 0 ? (
                                                <div className='bg-[#0E131F] flex-wrap w-full py-6 text-white rounded-t-md mt-1 px-4  rounded-b-2xl'>
                                            <ul className='flex-wrap'>
                                                {search.map(item => (
                                                    <li className='w-full text-left' key={item.id}>
                                                        <div className='flex justify-between'>
                                                            <Link to={`/riad/${item.id}`}>{item.name}</Link>
                                                            <span className=''>{item.prix} {item.currency}</span>
                                                        </div>

                                                    </li>
                                                ))}
                                            </ul>
                                                </div>
                                        ) : (
                                            <div className='bg-[#0E131F] py-6 text-white rounded-t-md mt-1 rounded-b-2xl'>This Riad Not Found</div>
                                        )}

                                    </div>

                                    </>
                                )}
                            </div>

                           <div className='relative'>
                               <ProfileSettings user={id}/>
                           </div>


                        </ul>

                    </div>
                </nav>

                <div className="lg:hidden p-4 sm:sticky flex w-full">
                    <label
                        onClick={() => {
                            setShowModal(true);
                        }}
                        className="w-full cursor-pointer transition-all	 bg-transparent min-w-sm max-w-4xl flex flex-col-2 md:flex-row items-center justify-center border border-gray-500 py-2 px-2 rounded-2xl  shadow-2xl focus-within:border-gray-300"
                        htmlFor="search-bar">

                        <button

                            className="w-fit md:w-auto px-3 bg-transparent  text-white fill-white active:scale-95 duration-100 text-2xl will-change-transform overflow-hidden relative rounded-full transition-all disabled:opacity-70">

                            <div className="relative">

                                <div
                                    className="flex items-center justify-center h-3 w-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                                    <svg className="opacity-0 animate-spin w-full h-full"
                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                </div>

                                <div className="flex items-center transition-all opacity-1 valid:"><span
                                    className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                                        <CiSearch/>
                </span>
                                </div>

                            </div>

                        </button>

                        <div
                            className="px-2 z-10 py-2 w-full rounded-md flex-1 outline-none bg-transparent text-gray-300">your
                            keyword here
                        </div>

                        <button
                            className="w-fit  md:w-auto px-3 py-3 bg-transparent border-gray-500 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-full transition-all disabled:opacity-70">

                            <div className="relative">

                                <div
                                    className="flex items-center justify-center h-3 w-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                                    <svg className="opacity-0 animate-spin w-full h-full"
                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                </div>

                                <div className="flex items-center transition-all opacity-1 valid:"><span
                                    className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                                        <IoFilter/>
                </span>
                                </div>

                            </div>

                        </button>
                    </label>
                </div>

            </header>


            {showModal && <Modalsearch setOpenModal={setShowModal}/>}



        </Fragment>
    );
}

export default Navbar;