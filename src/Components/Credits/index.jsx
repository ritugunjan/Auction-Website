import React, { useEffect, useState } from 'react'
import apiRequest from '../../Api'

let getUserCredits = async (name, callback) =>
{
    try
    {
        let response = await apiRequest(`/api/v1/auction/profiles/${name}/credits`, 'GET', null, window.localStorage.getItem("accessToken"));
        callback({
            error: false,
            data: response
        })
    } catch (error)
    {
        callback({
            error: true,
            message: error.message
        })
    }
}

const Credits = () =>
{
    let [credits, setCredits] = useState(0);
    let [loading, setLoading] = useState(false);
    useEffect(() =>
    {
        setLoading(true)
        getUserCredits(window.localStorage.getItem("name"), (response) =>
        {
            if (response.error)
            {
                setCredits(0);
                return
            }
            setCredits(response.data.credits)
            setLoading(false)
        })

    }, [])
    return (
        loading ? "" :
            <div>Credits: {credits}</div>
    )
}

export default Credits