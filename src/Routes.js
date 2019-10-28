import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path"/signup" exact component={Signup}/>
            </Switch>
        </BrowserRouter>
    )
}
