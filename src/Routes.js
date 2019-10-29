import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import Home from "./core/Home"
import AdminDashboard  from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory"


import AdminRoute from "./auth/AdminRoute"

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <AdminRoute
                path={"/admin/dashboard"}
                exact
                component={AdminDashboard}
                />
                <AdminRoute
                    path={"/create/category"}
                    exact
                    component={AddCategory}
                />

            </Switch>
        </BrowserRouter>
    )
}


export default Routes
