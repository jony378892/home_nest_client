import React, { use } from "react";
import AuthContext from "../context/auth/AuthContext";

export default function useAuthContext() {
  const auth = use(AuthContext);

  return auth;
}
