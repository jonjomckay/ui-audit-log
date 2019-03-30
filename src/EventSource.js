import { stringify } from 'query-string';

export function listUsers(token) {
    const request = {
        headers: {
            'Authorization': token
        }
    };

    return fetch('/api/admin/1/users?pageSize=1000', request)
        .then(response => response.json());
}

export function searchEvents(token, parameters) {
    const request = {
        headers: {
            'Authorization': token
        }
    };

    return fetch('/api/metrics/1/search?' + stringify(parameters), request)
        .then(response => response.json());
}
