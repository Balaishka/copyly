import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, loggedIn, path }) {
  return <Route path={path}>{loggedIn ? children : <Redirect to="/auth" />}</Route>;
}

export default ProtectedRoute;
