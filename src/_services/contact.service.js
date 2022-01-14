import { handleResponse } from '../_helpers/handle-response.js';

const config = require('../config.json');

export const contactService = {
    getPage,
};

function getPage({pageNumber}) {
    const requestOptions = { method: 'GET' };
    const apiUrl = config.apiUrl;
    let params = { page: pageNumber || 0 }
    const query = new URLSearchParams(params).toString();
    return fetch(`${apiUrl}/contacts/?${query}`, requestOptions).then(handleResponse);
}