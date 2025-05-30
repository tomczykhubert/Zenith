import { apiRoutes } from "./apiRoutes";

const GUEST_ROLE_API_ROUTES = [
  apiRoutes.auth.updateUser,
  apiRoutes.auth.signOut,
];

const GUEST_ROLE_PATHS = [...GUEST_ROLE_API_ROUTES];

export default GUEST_ROLE_PATHS;
