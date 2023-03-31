import Cookie from "js-cookie";

const GetCookie = (cookiename) => {
    const cookie = Cookie.get(cookiename);
    return cookie;
};

export default GetCookie;