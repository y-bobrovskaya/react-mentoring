const BASE_URL = 'https://api.themoviedb.org';
const VERSION = '3';

const MOVIE_DETAIL_ENDPOINT = 'movie';
const MOVIE_CREDITS_PART = 'credits';

const PERSON_DETAIL_ENDPOINT = 'person';
const PERSON_MOVIE_CREDITS_PART = 'movie_credits';

const SEARCH_MOVIE_ENDPOINT = 'search/movie';
const SEARCH_PERSON_ENDPOINT = 'search/person';

const BASE_PARAMS = {
    api_key: '172283afd6dcc9211e5e1ee68cca7767',
    language: 'en-US'
};

const MOVIE_DETAIL_URL = `${BASE_URL}/${VERSION}/${MOVIE_DETAIL_ENDPOINT}`;
const PERSON_DETAIL_URL = `${BASE_URL}/${VERSION}/${PERSON_DETAIL_ENDPOINT}`;

const SEARCH_MOVIE_URL = `${BASE_URL}/${VERSION}/${SEARCH_MOVIE_ENDPOINT}`;
const SEARCH_PERSON_URL = `${BASE_URL}/${VERSION}/${SEARCH_PERSON_ENDPOINT}`;

function getUrlWithQuery(base, query) {
    return `${base}?${new URLSearchParams({...BASE_PARAMS, query})}`;
}
function getUrlWithIdAndAdditions(base, id, additions) {
    let params = additions.length ? {...BASE_PARAMS, append_to_response: additions.join(',')} : {...BASE_PARAMS};

    return `${base}/${id}?${new URLSearchParams(params)}`;
}

export function getMovieDetailUrl(id, additions = []) {
    return getUrlWithIdAndAdditions(MOVIE_DETAIL_URL, id, additions);
}

export function getPersonDetailUrl(id, additions = []) {
    return getUrlWithIdAndAdditions(PERSON_DETAIL_URL, id, additions);
}

export function getSearchMovieUrl(query) {
    return getUrlWithQuery(SEARCH_MOVIE_URL, query);
}

export function getSearchPersonUrl(query) {
    return getUrlWithQuery(SEARCH_PERSON_URL, query);
}
