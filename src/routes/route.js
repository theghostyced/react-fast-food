import {
  Login,
  Landing,
  Signup,
  OrderView,
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
  {
    path: '/order',
    component: OrderView,
  },
];

export default routes;
