import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const base_URL = import.meta.env.VITE_BASE_URL;

function useSyncUser() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function sync() {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          await axios.post(
            `${base_URL}/api/auth/`,
            { email: user.email, name: user.name, nickname: user.nickname },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } catch (error) {
          console.error("Failed to sync user to flask", error);
        }
      }
    }
    sync();
  }, [isAuthenticated, user, getAccessTokenSilently]);
}

export default useSyncUser;
