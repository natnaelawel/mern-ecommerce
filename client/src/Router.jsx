import React from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Signin from './components/user/Signin'
import Signup from './components/user/Signup';
import Home from './components/home/Home';
import PrivateRoute from './RouteHandler/Private';
import  UserDashboard from './components/user/Dashboard/Dashboard';
import UserProfile from './components/user/Profile/Profile'
import AdminDashboard from "./components/user/Admin/Dashboard/Dashboard";
import AdminRoute from './RouteHandler/Admin';
import createCategory from "./components/user/Admin/category/Create/Create";
import createProduct from "./components/user/Admin/product/Create/Create";
import Shop from './components/shop/Shop';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Orders from './components/user/Admin/order/Orders'
import Cart from './components/cart/Cart';

function Router() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/product/:productId" exact component={ProductDetail} />
          <Route path="/cart" exact component={Cart} />
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <PrivateRoute
            path="/user/profile/:userId"
            exact
            component={UserProfile}
          />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute
            path="/admin/category/create"
            exact
            component={createCategory}
          />
          <AdminRoute
            path="/admin/product/create"
            exact
            component={createProduct}
          />
          <AdminRoute path="/admin/orders" exact component={Orders} />
        </Switch>
      </BrowserRouter>
    );
}

export default Router
