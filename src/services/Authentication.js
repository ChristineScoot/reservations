import decode from 'jwt-decode';

let loggedIn = () => {
    const token = getToken();
    return token!=="" && !isTokenExpired(token);
};

let getToken = () => {
    return localStorage.getItem('token')
};

let isTokenExpired = (token) => {
    try {
        const decoded = decode(token);
        return decoded.exp < Date.now() / 1000;
    }
    catch (err) {
        console.log("expired check failed! Line 42: AuthService.js");
        return false;
    }
};

let logout = () => {
    // localStorage.removeItem('token');
    localStorage.setItem('token', "");
};

export {loggedIn};
export {logout};
