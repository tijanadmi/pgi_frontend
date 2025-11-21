const API_URL = import.meta.env.VITE_BACKEND_URL;
import { apiFetch } from "../utils/auth";

// Returns all STAYS that are were created after the given date
export async function getRadApuMes(godina) {
  try {
    const url = `${API_URL}/radapu_mes?godina=${godina}`;
    /*const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      credentials: "include",
    });*/
    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting rad apu po mesecima");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log("JSON Response:", jsonResponse);

    // if (!jsonResponse.mrcs) {
    //   throw new Error("Unexpected response structure");
    // }

    // Vratite sobe
    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching rad apu po mesecima:", error.message);
    throw error;
  }
}

export async function getDApuA(godina) {
  try {
    const url = `${API_URL}/dapua?godina=${godina}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed getting rad apu po mesecima");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log("JSON Response:", jsonResponse);

    // if (!jsonResponse.mrcs) {
    //   throw new Error("Unexpected response structure");
    // }

    // Vratite sobe
    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching rad apu po mesecima:", error.message);
    throw error;
  }
}