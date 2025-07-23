const API_URL = import.meta.env.VITE_BACKEND_URL;

// Returns all STAYS that are were created after the given date
export async function getRadApuMes(godina) {
  try {
    const url = `${API_URL}/radapu_mes?godina=${godina}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
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