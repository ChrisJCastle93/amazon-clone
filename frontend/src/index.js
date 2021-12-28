import HomeScreen from './srceens/HomeScreen.js';
import ProductScreen from './srceens/ProductScreen.js';
import { parseRequestUrl, showLoading, hideLoading } from './utils.js';
import Error404Screen from './srceens/Error404Screen.js';
import CartScreen from './srceens/CartScreen.js';
import SigninScreen from './srceens/SignInScreen.js';
import Header from './components/Header.js';
import RegisterScreen from './srceens/RegisterScreen';
import ProfileScreen from './srceens/ProfileScreen';
import ShippingScreen from './srceens/ShippingScreen';
import PaymentScreen from './srceens/PaymentScreen';
import PlaceOrderScreen from './srceens/PlaceOrderScreen.js';
import OrderScreen from './srceens/OrderScreen';
import DashboardScreen from './srceens/DashboardScreen.js';
import ProductListScreen from './srceens/ProductListScreen';
import ProductEditScreen from './srceens/ProductEditScreen';
import OrderListScreen from './srceens/OrderListScreen';

// URL Routers

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  '/product/:id/edit': ProductEditScreen,
  "/404": Error404Screen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/order/:id': OrderScreen,
  '/dashboard': DashboardScreen,
  '/productlist': ProductListScreen,
  '/orderlist': OrderListScreen,
};

// Router function - gets the URL, parses it. Then creates the URL path by adding together the requests resource, id, and verb. Using our routes object above, we then determine which screen we're going to show our users - home etc. We then use the method render on it.

const router = async () => {
  // showLoading();
  const request = parseRequestUrl(); 
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if(screen.after_render) await screen.after_render();
  hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
