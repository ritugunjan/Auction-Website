
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useRef, useState } from 'react'
import apiFileRequest from '../../Api/fileuploadapi';
import { data } from 'autoprefixer';
import apiRequest from '../../Api';
import { json, useNavigate } from 'react-router-dom';
import useStore from '../../Store/store';

export default function AddBid()
{
    let title = useRef(null);
    let description = useRef(null);
    let endDate = useRef(null);
    let media = useRef(null);
    let navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    const { myListing, setMyListing } = useStore();


    let handleSubmit = async (e) =>
    {
        setLoading(true)
        e.preventDefault();
        let data = {
            "title": title.current.value,
            "description": description.current.value,
            "endsAt": endDate.current.value,
            "media": [media.current.value]
        };

        try
        {
            let response = await apiRequest("/api/v1/auction/listings", "POST", data, window.localStorage.getItem("accessToken"));
            setMyListing([...myListing, response]);
            console.log({ response })
            navigate("/mylisting", { replace: false })
        } catch (error)
        {
            window.alert(error.message);
        }

        setLoading(false)

    }

    return (
        <form className='px-[25%] mt-8'>
            <div className="space-y-12 ">
                <div >
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">List Your own bid</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        ref={title}
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="janesmith"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        ref={description}
                                        type="text"
                                        name="description"
                                        id="description"
                                        autoComplete="description"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="description"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                End date
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        ref={endDate}
                                        type="date"
                                        name="date"
                                        id="date"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="janesmith"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                Media
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        ref={media}
                                        type="text"
                                        name="media"
                                        id="media"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="image url"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>



            </div>

            <div className="mt-2 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    disabled={loading}
                    onClick={(e) => handleSubmit(e)}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    )
}
