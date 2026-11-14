import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const base_URL = import.meta.env.VITE_BASE_URL;

function useSyncUser() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    async function sync() {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const res = await axios.post(
            `${base_URL}/api/auth/`,
            { email: user.email, name: user.name, nickname: user.nickname },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log("Full Axios Response:", res);
          console.log("Response Data:", res.data);
          console.log("User Data", res.data.user)
          setCurrentUser(res.data.user);
        } catch (error) {
          console.error("Failed to sync user to flask", error);
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserLoading(false);
      }
    }
    sync();
  }, [isAuthenticated, user, getAccessTokenSilently]);
  return { currentUser, userLoading };
}

export default useSyncUser;
