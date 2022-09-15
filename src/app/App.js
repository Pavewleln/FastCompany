import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { ProfessionProvider } from "./hooks/useProfessions";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import { ProtectedRoute } from "./components/common/protectedRoute";
import { Logout } from "./layouts/logout";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <ProfessionProvider>
                        <QualitiesProvider>
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={Logout} />
                        </QualitiesProvider>
                    </ProfessionProvider>
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>
        </div>
    );
}

export default App;
