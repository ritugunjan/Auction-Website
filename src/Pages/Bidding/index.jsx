import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiRequest from '../../Api'

let getBidInfo = async (id, callback) =>
{
    try
    {
        let response = await apiRequest(`/api/v1/auction/listings/${id}?_bids=true&_seller=true`, 'GET');
        callback({
            error: false,
            data: response
        });
    } catch (error)
    {
        callback({
            error: true,
            message: error.message
        })

    }
}


let makeBid = async (amount, id) =>
{
    try
    {
        let response = await apiRequest(`/api/v1/auction/listings/${id}/bids`, 'POST', { "amount": amount * 1 }, window.localStorage.getItem("accessToken"));
        return {
            error: false,
            data: response
        };
    } catch (error)
    {
        return {
            error: true,
            message: error.message
        }
    }
}
const Bidding = () =>
{
    let [bidInfo, setBidInfo] = useState(false);
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let { id } = useParams();


    let creditRef = useRef(0);

    useEffect(() =>
    {
        getBidInfo(id, (response) =>
        {
            if (response.error)
            {
                window.alert(response.message);
                navigate("/products", { replace: true });
                return
            }
            let { data } = response;
            setBidInfo({ ...data, "heighestBid": data.bids[data.bids.length - 1]?.amount })
        })

    }, [])

    async function handleSubmit()
    {
        if (creditRef.current.value.trim() == "") return;
        setLoading(true)
        let response = await makeBid(creditRef.current.value, id);
        if (response.error)
        {
            window.alert(response.message);
            setLoading(false)
            return
        }
        let { data } = response;
        setBidInfo({
            ...bidInfo,
            '_count': data._count,
            'heighestBid': creditRef.current.value
        })
        window.alert("bidding was success.");
        creditRef.current.value = ""
        setLoading(false)

    }

    return (
        bidInfo ?
            <div className="mx-auto px-24 py-8">
                <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-10">
                    <div className="mt-6">
                        <div className="group relative">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white group-hover:opacity-75 h-[30rem]">
                                <img src={bidInfo.media[0] ? bidInfo.media[0] : "public/no-preview.png"} alt="Front of men&#039;s Basic Tee in black." className={`h-full w-full lg:h-full lg:w-full object-contain`} />

                            </div>

                        </div>
                    </div>
                    <div className="mt-4 flex justify-between">

                        <div>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">Bid Information</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {bidInfo.title}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bidInfo.description}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Created On</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(bidInfo.created).toLocaleDateString()}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Total bids</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bidInfo._count.bids}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Heighest bid</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bidInfo.heighestBid} credit</dd>
                                    </div>
                                    {
                                        bidInfo.seller.name != window.localStorage.getItem("name") &&

                                        <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-4 sm:px-0">
                                            <div>
                                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Credits
                                                </label>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        ref={creditRef}
                                                        onKeyPress={(e) =>
                                                        {
                                                            // Allow only numeric characters and some special keys like Backspace, Arrow keys, etc.
                                                            const allowedCharacters = /[0-9\b]/;
                                                            if (!allowedCharacters.test(e.key))
                                                            {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        type="text"
                                                        name="price"
                                                        id="price"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="0.00"
                                                    />

                                                </div>

                                                < button type="submit" onClick={() => { handleSubmit() }} disabled={loading} className="flex w-full mt-2 items-center justify-center rounded-md border shadow-sm bg-slate-500 px-3 py-2 text-sm text-white">
                                                    {
                                                        loading ? 'Making your bid....' : 'Make bid'
                                                    }
                                                </button>

                                            </div>
                                        </div>
                                    }

                                </dl>
                            </div>
                        </div>




                    </div>
                </div >
            </div > : <h1> Fetching..... </h1>
    )
}

export default Bidding