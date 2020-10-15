import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import MusicContainer from '@containers/MusicContainer/Loadable'
export const routeConfig = {
  results: {
    component: MusicContainer,
    ...routeConstants.repos
  },

  notFoundPage: {
    component: NotFound,
    route: '/'
  }

};
