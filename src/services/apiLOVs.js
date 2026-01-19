const API_URL = import.meta.env.VITE_BACKEND_URL;
import { apiFetch } from "../utils/auth";

// Returns all STAYS that are were created after the given date
export async function getMrcs() {
  try {
    const url = `${API_URL}/mrc`;
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
      throw new Error("Failed getting mrcs");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching mrcs:", error.message);
    throw error;
  }
}

export async function getTipPrek() {
  try {
    const url = `${API_URL}/tipprek`;
    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting tip prekida");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching tip prekida:", error.message);
    throw error;
  }
}
// Returns all vrsta prekida for insert/update forms
export async function getVrstaPrek() {
  try {
    const url = `${API_URL}/vrprek`;
    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting vrste prekida");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching vrste prekida:", error.message);
    throw error;
  }
}

// Returns all podvrsta prekida for insert/update forms
export async function getPodVrstaPrek() {
  try {
    const url = `${API_URL}/podvrprek`;
    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting podvrste prekida");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching podvrste prekida:", error.message);
    throw error;
  }
}

export async function getUzrokPrek() {
  try {
    const url = `${API_URL}/uzrokprek`;
    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting uzroke prekida");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching uzroke prekida:", error.message);
    throw error;
  }
}

export async function getPodUzrokPrek() {
  try {
    const url = `${API_URL}/poduzrokprek`;
    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting poduzroke prekida");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching poduzroke prekida:", error.message);
    throw error;
  }
}

// Returns all mrcs for insert/update forms
export async function getMrcsForInsert() {
  try {
    const url = `${API_URL}/mrciu`;

    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting mrcs");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // console.log("getMrcsForInsert - fetched mrcs:", jsonResponse);
    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching mrcs:", error.message);
    throw error;
  }
}

// Returns all objects of type HE, TE,VE for insert/update forms
export async function getObjHETEVE(mrcId) {
  if (!mrcId) return [];
  
  try {
    const url = `${API_URL}/objheteve?mrc=${mrcId}`;

    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting objects of type HE, TE,VE");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log("getObjHETEVE - fetched objects:", jsonResponse);
    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching objects of type HE, TE,VE:", error.message);
    throw error;
  }
}

// Returns all objects TS/RP for insert/update forms
export async function getObjTSRP(mrcId) {
  if (!mrcId) return [];
  
  try {
    const url = `${API_URL}/objtsrp?mrc=${mrcId}`;

    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting objects of type TS/RP");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log("getObjTSRP - fetched objects:", jsonResponse);
    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching objects of type TS/RP:", error.message);
    throw error;
  }
}

// Returns all fields of type Generator for insert/update forms
export async function getPoljaGE(obId) {
  if (!obId) return [];
  try {
    const url = `${API_URL}/poljage?obj_id=${obId}`;

    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting ofields of type Generator");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching fields of type Generator:", error.message);
    throw error;
  }
}

// Returns all merna mesta for insert/update forms
export async function getMernaMesta() {
  try {
    const url = `${API_URL}/mernamesta`;
    const res = await apiFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      throw new Error("Failed getting merna mesta");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    return jsonResponse || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching merna mesta:", error.message);
    throw error;
  }
}