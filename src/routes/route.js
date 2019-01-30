import {
  Login,
  Landing,
  Signup,
  OrderView,
  HistoryView,
  CartContainer,
  Admin
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
  {
    path: '/history',
    component: HistoryView,
  },
  {
    path: '/cart',
    component: CartContainer,
  },
  {
    path: '/admin-list',
    component: Admin
  }
];

export default routes;
