import { apiRoutes } from "./apiRoutes";
import { routes } from "./routes";

const GUEST_ROUTES = [routes.auth.signIn, routes.auth.signUp];
const GUEST_API_ROUTES = [
  apiRoutes.auth.signIn.email,
  apiRoutes.auth.signIn.social,
  apiRoutes.auth.signUp.email,
  apiRoutes.auth.callback.google,
];

const GUEST_PATHS = [...GUEST_ROUTES, ...GUEST_API_ROUTES];

export default GUEST_PATHS;
