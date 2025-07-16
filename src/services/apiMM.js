// import { getAuthToken } from "../utils/auth";
import { getMonthStartEnd } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Vraca sve ispade/kvarove za izabrani mesec u godini - mesecni
export async function getT1ForMonth(month, year) {
  //   const token = getAuthToken();

  const { firstDay, lastDay } = getMonthStartEnd(month, year);

  // console.log(firstDay, lastDay);
  try {
    const url = `${API_URL}/mesecni?start_date=${firstDay}&end_date=${lastDay}&tipd=1`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all reservations after date");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // Ako je odgovor prazan objekat {}, vrati prazan niz []
    if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
      return {
        data: [],
        count: 0,
      };
    }

    // Proverite da li postoji polje "prekidik" i "total"
    const dogadjaji = jsonResponse.dogadjaji || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // console.log(dogadjaji, total);
    // Vratite rezultat kao objekat
    return {
      data: dogadjaji,
      count: total, // Osiguranje da je broj
    };
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching ispade i kvarove:", error.message);
    throw error;
  }
}

// Vraca sve ispade/kvarove za izabrani mesec u godini - mesecni
export async function getT1ForMonthForPagination(month, year, page, filter) {
  //   const token = getAuthToken();

  if (!filter) {
    filter = "all";
  }

  if (!page) {
    page = 1; // Podrazumevana stranica
  }

  const { firstDay, lastDay } = getMonthStartEnd(month, year);

  // console.log(firstDay, lastDay);
  try {
    const url = `${API_URL}/mesecnip?start_date=${firstDay}&end_date=${lastDay}&tipd=1&page_size=${PAGE_SIZE}&page_id=${page}&fup=${filter}`;
    // console.log(url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all reservations after date");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // Ako je odgovor prazan objekat {}, vrati prazan niz []
    if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
      return {
        data: [],
        count: 0,
      };
    }

    // Proverite da li postoji polje "prekidik" i "total"
    const dogadjaji = jsonResponse.dogadjaji || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: dogadjaji,
      count: total, // Osiguranje da je broj
    };
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching ispade i kvarove:", error.message);
    throw error;
  }
}

// Vraca sva iskljucenja za izabrani mesec u godini - mesecni
export async function getT2ForMonthForPagination(month, year, page, filter) {
  if (!filter) {
    filter = "all";
  }

  if (!page) {
    page = 1; // Podrazumevana stranica
  }

  const { firstDay, lastDay } = getMonthStartEnd(month, year);

  // console.log(firstDay, lastDay);
  try {
    const url = `${API_URL}/mesecnip?start_date=${firstDay}&end_date=${lastDay}&tipd=2&page_size=${PAGE_SIZE}&page_id=${page}&fup=${filter}`;
    // console.log(url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all reservations after date");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // Ako je odgovor prazan objekat {}, vrati prazan niz []
    if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
      return {
        data: [],
        count: 0,
      };
    }

    // Proverite da li postoji polje "prekidik" i "total"
    const dogadjaji = jsonResponse.dogadjaji || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: dogadjaji,
      count: total, // Osiguranje da je broj
    };
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching ispade i kvarove:", error.message);
    throw error;
  }
}

// Vraca sve duze ispade/kvarove za izabrani mesec u godini - mesecni
export async function getT3ForMonthForPagination(month, year, page, filter) {
  if (!filter) {
    filter = "all";
  }

  if (!page) {
    page = 1; // Podrazumevana stranica
  }

  const { firstDay, lastDay } = getMonthStartEnd(month, year);

  // console.log(firstDay, lastDay);
  try {
    const url = `${API_URL}/mesecnip?start_date=${firstDay}&end_date=${lastDay}&tipd=3&page_size=${PAGE_SIZE}&page_id=${page}&fup=${filter}`;
    // console.log(url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all reservations after date");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // Ako je odgovor prazan objekat {}, vrati prazan niz []
    if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
      return {
        data: [],
        count: 0,
      };
    }

    // Proverite da li postoji polje "prekidik" i "total"
    const dogadjaji = jsonResponse.dogadjaji || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: dogadjaji,
      count: total, // Osiguranje da je broj
    };
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching ispade i kvarove:", error.message);
    throw error;
  }
}

// Vraca sve duze ispade/kvarove za izabrani mesec u godini - mesecni
export async function getT4ForMonthForPagination(month, year, page) {
  if (!page) {
    page = 1; // Podrazumevana stranica
  }

  const { firstDay, lastDay } = getMonthStartEnd(month, year);

  // console.log(firstDay, lastDay);
  try {
    const url = `${API_URL}/mesecnit4p?start_date=${firstDay}&end_date=${lastDay}&tipd=3&page_size=${PAGE_SIZE}&page_id=${page}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all duze ispade/kvarove");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // Ako je odgovor prazan objekat {}, vrati prazan niz []
    if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
      return {
        data: [],
        count: 0,
      };
    }

    // Proverite da li postoji polje "prekidik" i "total"
    const dogadjaji = jsonResponse.dogadjaji || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: dogadjaji,
      count: total, // Osiguranje da je broj
    };
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching duze ispade/kvarove:", error.message);
    throw error;
  }
}
