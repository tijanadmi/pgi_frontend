import { apiFetch } from "../utils/auth";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Vraca sve ispade/kvarove za izabrani mesec u godini - mesecni
export async function getOpenShifts() {
  //   const token = getAuthToken();
//   console.log("JSON Response from API:");

  try {
    const url = `${API_URL}/listopenshifts`;
 

    const res = await apiFetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!res.ok) {
      throw new Error("Failed getting all open shifts");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log("JSON Response from API:", jsonResponse);

    return  jsonResponse.data || jsonResponse || []; // Vraća data polje ili ceo odgovor ili prazan niz;

  } catch (error) {
    // console.log("catch")
    console.error("Error fetching open shifts:", error.message);
    throw error;
  }
}
