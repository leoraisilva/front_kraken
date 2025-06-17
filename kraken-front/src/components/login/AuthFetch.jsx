export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token JWT não encontrado');

    const defaultHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
    });

    if (!response.ok) {
        throw new Error(`Erro ao acessar ${url}: ${response.status}`);
    }

    return response.json();
};