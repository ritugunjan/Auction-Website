import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Product = ({ loggedin, id, title, media, tags, created, endsAt, _count, description }) =>
{

    let navigate = useNavigate()

    function makeBid()
    {
        if (!loggedin)
        {
            navigate('/login', { replace: true });
        } else
        {
            navigate(`/makebid/${id}`, { replace: false })
        }
    }


    return (
        <div className="mt-6 ">
            <div className="group relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img src={media[0] ? media[0] : "public/no-preview.png"} alt="Front of men&#039;s Basic Tee in black." className={`h-full w-full lg:h-full lg:w-full object-cover`} />

                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            {title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">

                        <button onClick={makeBid} type="submit" className=" flex w-full items-center justify-center rounded-md border border-transparent shadow-sm bg-slate-100 px-3 py-2 text-xs text-black-400">Make Bid</button>
                    </p>
                </div>
            </div>

        </div>



    )
}

export default Product