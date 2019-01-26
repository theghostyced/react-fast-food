import {
  Login,
  Landing,
  Signup,
} from '../containers';


const routes = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
];

export default routes;
