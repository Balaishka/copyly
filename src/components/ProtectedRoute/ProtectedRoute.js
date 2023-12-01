import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  return <Route>{loggedIn ? children : <Redirect to="/auth" />}</Route>;
}

export default ProtectedRoute;
