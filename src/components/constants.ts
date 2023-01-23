const { REACT_APP_API_URL, REACT_APP_PMM_URL } = process.env;
export const namespace = 'default';
export const serverProxyUrl = `${REACT_APP_API_URL}/proxy`;
export const serverUrl = REACT_APP_API_URL;
export const pmmHome = `${REACT_APP_PMM_URL}/graph`;
