export function handleResponse(response) {
    return response.text().then(text => {
        let data = null;
        let parse_error = null;
        try {
            data = text && JSON.parse(text);
        } catch (e) {
            parse_error = 'Invalid response: ' + e.toString();
            console.error(parse_error);
        }
        if (parse_error || !response.ok) {
            const error = (data && (data.message || data.error)) || (`${response.status} ${response.statusText}`) || parse_error;
            return Promise.reject(error);
        }
        return data;
    });
}