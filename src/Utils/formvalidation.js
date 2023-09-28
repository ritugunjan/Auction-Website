export function validateUserData(name, password, email)
{
    const nameValid = name.length >= 6;
    const passwordValid = password.length >= 8;
    const emailValid = /^[\w-]+(\.[\w-]+)*@stud\.noroff\.no$/.test(email);

    if (!nameValid) return { error: true, message: "Name is invalid should be 6 character long" };

    if (!passwordValid) return { error: true, message: "Password is invalid should be 8 character long" };

    if (!emailValid) return { error: true, message: "Email is invalid should be of stud.noroff.no" };

    return {
        error: false,
        message: ""
    }
}

export function validateUserDataForLogin(password, email)
{
    const passwordValid = password.length >= 8;
    const emailValid = /^[\w-]+(\.[\w-]+)*@stud\.noroff\.no$/.test(email);


    if (!passwordValid) return { error: true, message: "Password is invalid should be 8 character long" };

    if (!emailValid) return { error: true, message: "Email is invalid should be of stud.noroff.no" };

    return {
        error: false,
        message: ""
    }
}