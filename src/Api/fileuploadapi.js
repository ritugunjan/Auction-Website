async function apiFileRequest(path, method, data = null, authToken = null)
{
    try
    {
        const formData = new FormData();

        if (data && data.image)
        {
            formData.append('image', data.image);
            delete data.image; // Remove image property from data object

        }

        Object.keys(data).forEach(key =>
        {
            formData.append(key, data[key]);
        });



        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken ? `Bearer ${authToken}` : '',
                // Add any additional headers here if needed
            },
            body: formData
        };

        const response = await fetch("https://api.noroff.dev" + path, options);
        const responseData = await response.json();
        if (!response.ok)
        {
            if (response.status === 400)
            {
                throw new Error(responseData?.errors[0].message || 'Bad Request');
            }

            if (response.status === 401)
            {
                throw new Error(responseData?.errors[0].message || 'Bad Request');
            }

            throw new Error(responseData.message || 'HTTP error');
        }

        console.log({ responseData })
        return responseData;
    } catch (error)
    {

        console.error('Error:', error);
        throw error; // Rethrow the error for handling at a higher level if needed
    }
}

export default apiFileRequest;
