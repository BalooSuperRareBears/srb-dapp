import { RouteNamesEnum } from 'localConstants';
import { Dashboard, Disclaimer, Home, ClaimHype, Ais } from 'pages';
import { RouteType } from 'types';

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: Home
  },
  {
    path: RouteNamesEnum.dashboard,
    title: 'Dashboard',
    component: Dashboard
  },
  {
    path: RouteNamesEnum.disclaimer,
    title: 'Disclaimer',
    component: Disclaimer
  },
  {
    path: RouteNamesEnum.claimHype,
    title: 'ClaimHype',
    component: ClaimHype
  },
  {
    path: RouteNamesEnum.ais,
    title: 'Ais',
    component: Ais
  }
];
