
import { PAGE_SIZE } from "../utils/constants";
import { apiFetch } from "../utils/auth";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Vraca sve ispade/kvarove za dan u godini - pogonski
export async function getJSDSShemeByOrg(orgId) {
  if (!orgId || orgId === "1") {
    orgId = 1;
  }

  try {
    const url = `${API_URL}/getshemebyorg/${orgId}`;

    const res = await apiFetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting shemas for org");
    }

    const jsonResponse = await res.json();

    return {
      jednopolne: jsonResponse.jednopolne || [],
      dispozicione: jsonResponse.dispozicione || [],
    };
  } catch (error) {
    console.error("Error fetching sheme:", error.message);
    throw error;
  }
}
