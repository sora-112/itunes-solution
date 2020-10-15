import { generateApiClient } from '@utils/apiUtils';
const resultApi = generateApiClient('itunes');

export const getResults = query => resultApi.get(`search?term=${query}`);
