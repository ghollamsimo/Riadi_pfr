import React, {useEffect, useMemo} from "react";
import Riadimage from "../../assets/img/image-header.jpg";
import {CiLocationOn} from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { FiTrash2 } from "react-icons/fi";
import { fetchRaids} from "../../redux/actions/RiadAction.jsx";
import {connect, useSelector} from "react-redux";
import TableServices from "../../data/TableServices.jsx";

const Dashboard = (props) => {
    useEffect(() =>{
        props.loader()
    }, [])

   /* const riads = useMemo(() => props.data.datalist || [], [props.data.datalist]);
    console.log("===riads", riads);*/
    const riads = useSelector(state => state.riadsData);

    // Now you can access the state managed by riadsData reducer
    // For example:
    console.log("useSelector",riads.datalist);
    return(
        <>

            <main className='container px-12 mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row'>
                <div className="block flex-grow mb-24 lg:mb-0">
                    <div className='lg:sticky lg:top-24'>
                        <div
                            className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
                            <div
                                className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-28 h-28 ring-1 ring-white dark:ring-neutral-900">
                                <img className="absolute inset-0 w-full h-full object-cover rounded-full"
                                     src="./static/media/Image-1.90baa8cc883db8970fda.png" alt="John Doe"/><span
                                className="wil-avatar__name">J</span><span
                                className=" bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute  w-6 h-6 -top-0.5 right-2"><i
                                className="las la-check"></i></span></div>
                            <div className="space-y-3 text-center flex flex-col items-center"><h2
                                className="text-3xl font-semibold">Kevin Francis</h2>
                                <div className="nc-StartRating flex items-center space-x-1 text-sm  !text-base"
                                     data-nc-id="StartRating">
                                    <div className="pb-[2px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true" className="w-[18px] h-[18px] text-orange-500">
                                            <path fill-rule="evenodd"
                                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="font-medium ">4.5</span><span
                                    className="text-neutral-500 dark:text-neutral-400">(112)</span></div>
                            </div>
                            <p className="text-neutral-500 dark:text-neutral-400">Providing lake views, The Symphony 9
                                Tam Coc in Ninh Binh provides accommodation, an outdoor.</p>
                            <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>
                        </div>
                    </div>
                </div>
                <div className='w-full  lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0'>
                    <div className='border border-gray-700 p-4 rounded-xl'>
                        <div><h2 className="text-2xl text-white font-semibold">Kevin Francis's listings</h2><span
                            className="block mt-2 text-neutral-500 dark:text-neutral-400">Kevin Francis's listings is very rich, 5 star reviews help him to be more branded.</span>
                        </div>
                        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                        <TableServices/>
                        <div className='mt-8 grid grid-cols-1 md:gap-7 sm:grid-cols-2'>

                            {riads?.datalist?.map(riad => (
                                <div key={riad.id} className="border border-gray-700 p-4 rounded-xl">
                                    <div className="relative group">
                                        <div className="overflow-hidden rounded aspect-w-1 aspect-h-1">
                                            <img
                                                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                                                src={Riadimage}
                                                alt=""
                                            />
                                        </div>
                                        <div className="absolute left-3 top-3">
                                            <p className="sm:px-3 sm:py-1 px-1.5 py-1 text-[8px] sm:text-xs font-bold flex tracking-wide text-white bg-[#111827] rounded-full gap-2">
                                                <span><CiLocationOn className="mt-0.5" /></span> {riad.localisation}
                                            </p>
                                        </div>

                                        <div className="absolute gap-2 flex justify-between right-3 top-3">
                                            <p className="sm:py-1 px-1 py-1 text-[8px] sm:text-sm font-bold flex tracking-wide text-white bg-[#111827] rounded-full gap-2">
                                                <span><GrUpdate /></span>
                                            </p>

                                            <p className="sm:py-1 px-1 py-1 text-[8px] sm:text-sm font-bold flex tracking-wide text-white bg-[#111827] rounded-full gap-2">
                                                <span><FiTrash2 /></span>
                                            </p>
                                        </div>
                                        <div className="flex items-start justify-between mt-4 space-x-4">
                                            <div>
                                                <h3 className="text-xs font-bold text-white sm:text-sm md:text-base">
                                                    <a href="#" title="">
                                                        {riad.name}
                                                        <span className="inset-0" aria-hidden="true"></span>
                                                    </a>
                                                </h3>
                                                <div className="text-xs text-white sm:text-sm md:text-base truncate">
                                                    <p>{riad.description}</p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-white sm:text-sm md:text-base">Mad {riad.prix}<span className="text-gray-400">/night</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

const riadStateProps = (state) => {
    return {
        data: state.data,
    };
};

const mapDispatchToRiad = (dispatch) => {
    return {
        loader: () => dispatch(fetchRaids())
    };
};

const ConnectedDashboard = connect(riadStateProps, mapDispatchToRiad)(Dashboard);

export default ConnectedDashboard;