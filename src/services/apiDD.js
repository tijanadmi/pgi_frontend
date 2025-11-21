import { PAGE_SIZE } from "../utils/constants";
import { apiFetch } from "../utils/auth";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Vraca sve ispade/kvarove za izabrani mesec u godini - mesecni
export async function getT1ForDay(day, mrcId) {
  //   const token = getAuthToken();
  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  try {
    const url = `${API_URL}/dnevni?datizv=${day}&tipd=1&id_s_mrc=${mrcId}&fup=all`;
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

// Vraca sve ispade/kvarove za izabrani dan
export async function getT1ForDayForPagination(day, mrcId, page, filter) {
  //   const token = getAuthToken();

  // console.log("Parametar day u apiDD", day);

  if (!filter) {
    filter = "all";
  }

  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  if (!page) {
    page = 1; // Podrazumevana stranica
  }

  try {
    const url = `${API_URL}/dnevnip?datizv=${day}&tipd=1&page_size=${PAGE_SIZE}&page_id=${page}&fup=${filter}&id_s_mrc=${mrcId}`;
    // console.log(url);
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

// Vraca sve ispade/kvarove za izabrani dan bez paginacije
export async function getT1ForDayFilter(day, mrcId, filter) {
  //   const token = getAuthToken();

  // console.log("Parametar day u apiDD", day);

  if (!filter) {
    filter = "all";
  }

  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }


  try {
    const url = `${API_URL}/dnevni?datizv=${day}&tipd=1&fup=${filter}&id_s_mrc=${mrcId}`;
    // console.log(url);
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

// Vraca sva iskljucenja/ukljucenja za izabrani dan
export async function getT2ForDayForPagination(day, mrcId, page, filter) {
  //   const token = getAuthToken();

  // console.log("Parametar day u apiDD", day);

  if (!filter) {
    filter = "all";
  }

  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  if (!page) {
    page = 1; // Podrazumevana stranica
  }

  try {
    const url = `${API_URL}/dnevnip?datizv=${day}&tipd=2&page_size=${PAGE_SIZE}&page_id=${page}&fup=${filter}&id_s_mrc=${mrcId}`;
    // console.log(url);
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
    console.error("Error fetching iskljucenja/ukljucenja:", error.message);
    throw error;
  }
}

// Vraca sve iskljucenja/ukljucenja za izabrani dan bez paginacije
export async function getT2ForDayFilter(day, mrcId, filter) {
  //   const token = getAuthToken();

  // console.log("Parametar day u apiDD", day);

  if (!filter) {
    filter = "all";
  }

  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }


  try {
    const url = `${API_URL}/dnevni?datizv=${day}&tipd=2&fup=${filter}&id_s_mrc=${mrcId}`;
    // console.log(url);
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

// Vraca sve duze kvarove za izabrani dan
export async function getT3ForDayForPagination(day, mrcId, page, filter) {
  //   const token = getAuthToken();

  // console.log("Parametar day u apiDD", day);

  if (!filter) {
    filter = "all";
  }

  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  if (!page) {
    page = 1; // Podrazumevana stranica
  }

  try {
    const url = `${API_URL}/dnevnip?datizv=${day}&tipd=3&page_size=${PAGE_SIZE}&page_id=${page}&fup=${filter}&id_s_mrc=${mrcId}`;
    // console.log(url);
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

// Vraca sve duze kvarove za izabrani dan bez paginacije
export async function getT3ForDayFilter(day, mrcId, filter) {
  //   const token = getAuthToken();

  // console.log("Parametar day u apiDD", day);

  if (!filter) {
    filter = "all";
  }

  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }


  try {
    const url = `${API_URL}/dnevni?datizv=${day}&tipd=3&fup=${filter}&id_s_mrc=${mrcId}`;
    // console.log(url);
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

// Vraca t4 za odredjeni dan i odredjeni mrc
export async function getT4ForDay(day, mrcId) {
  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  try {
    const url = `${API_URL}/dnevnit4p?datizv=${day}&id_s_mrc=${mrcId}`;
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
      throw new Error("Failed getting all problematika pogona mreze");
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

    // console.log("T4 dogadjaji:", dogadjaji);

    // Vratite rezultat kao objekat
    return {
      data: dogadjaji,
      count: total, // Osiguranje da je broj
    };
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching t4:", error.message);
    throw error;
  }
}

