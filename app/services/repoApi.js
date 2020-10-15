import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');
const resultApi = generateApiClient('itunes');

export const getRepos = repoName => repoApi.get(`/search/repositories?q=${repoName}`);
export const getResults = query => resultApi.get(`search?term=${query}`);
