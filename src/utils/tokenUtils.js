const TOKEN_KEY = "library_token";
const USER_KEY  = "library_user";

// TOKEN
export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// USER
export const saveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
    try {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};

export const removeUser = () => {
    localStorage.removeItem(USER_KEY);
};

// CLEAR ALL — on logout
export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

// CHECK AUTH
export const isAuthenticated = () => {
    return !!getToken();
};

export const getUserRole = () => {
    const user = getUser();
    return user ? user.role : null;
};

export const getUserId = () => {
    const user = getUser();
    return user ? user.userId : null;
};