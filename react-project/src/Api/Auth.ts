const register = (name: string, email: string, password: string, password_confirmation: string) => {
    return axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        password_confirmation
    });
};

const login = (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

const logout = () => {
    return axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

const getUser = () => {
    return axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

export { register, login, logout, getUser };