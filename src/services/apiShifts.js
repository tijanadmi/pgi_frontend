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

export async function getIskljucenjeById(dogId) {

// Provera da li je dogId validan
  if (!dogId || isNaN(dogId)) {
    console.error("Invalid dogId:", dogId);
    return null; 
  }

  try {
    const url = `${API_URL}/getiskljucenje/${dogId}`;
 

    const res = await apiFetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!res.ok) {
      throw new Error(`Failed getting iskljucenje by ID ${dogId}`);
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log("JSON Response from API:", jsonResponse);

    return jsonResponse || [];

  } catch (error) {
    // console.log("catch")
    console.error("Error fetching iskljucenje by ID:", error.message);
    throw error;
  }
}

export async function getObavestenjeBeleskaById(dogId) {

// Provera da li je dogId validan
  if (!dogId || isNaN(dogId)) {
    console.error("Invalid dogId:", dogId);
    return null; 
  }

  try {
    const url = `${API_URL}/getobavbeleska/${dogId}`;
 

    const res = await apiFetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!res.ok) {
      throw new Error(`Failed getting obavestenje tipa beleska by ID ${dogId}`);
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log("JSON Response from API:", jsonResponse);

    return jsonResponse || [];

  } catch (error) {
    // console.log("catch")
    console.error("Error fetching obavestenje tipa beleska by ID:", error.message);
    throw error;
  }
}

