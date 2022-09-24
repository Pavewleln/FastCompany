import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { ProtectedRoute } from "./components/common/protectedRoute";
import { Logout } from "./layouts/logout";
import AppLoader from "./hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <ProtectedRoute
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Redirect to="/" />
                    </Switch>
            </AppLoader>
        </div>
    );
}

export default App;
