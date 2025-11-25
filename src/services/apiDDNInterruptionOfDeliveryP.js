// import { getAuthToken } from "../utils/auth";
import { PAGE_SIZE } from "../utils/constants";
import { getMonthStartEnd } from "../utils/helpers";
import { apiFetch } from "../utils/auth";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Returns all STAYS that are were created after the given date
export async function getListDDNInterruptionOfDeliveryP(
  month,
  year,
  mrcId,
  page
) {
  //   const token = getAuthToken();

  if (!page) {
    page = 1; // Podrazumevana stranica
  }
  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  const { firstDay, lastDay } = getMonthStartEnd(month, year);
  // let from = (page - 1) * PAGE_SIZE;
  // console.log("from je", from);

  // from = 1;
  // console.log(firstDay, lastDay);
  try {
    const url = `${API_URL}/interruptionofproduction?start_date=${firstDay}&end_date=${lastDay}&mrc=${mrcId}&page_size=${PAGE_SIZE}&page_id=${page}`;
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
      throw new Error("Failed getting all prekidp after date");
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

    // Proverite da li postoji polje "reservations" i "total"
    const prekidip = jsonResponse.prekidip || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: prekidip,
      count: total, // Osiguranje da je broj
    };

    // Ako ne postoji polje "reservations", vrati prazan niz []
    //return jsonResponse.prekidp || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching prekidip:", error.message);
    throw error;
  }
}

export async function getListDDNInterruptionOfDeliveryPPeriod(
  firstDay,
  lastDay,
  mrcId,
  page
) {
  //   const token = getAuthToken();

  if (!page) {
    page = 1; // Podrazumevana stranica
  }
  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  // const { firstDay, lastDay } = getMonthStartEnd(month, year);
  // let from = (page - 1) * PAGE_SIZE;
  // console.log("from je", from);

  // from = 1;
  // console.log(firstDay, lastDay);
  try {
    const url = `${API_URL}/interruptionofproduction?start_date=${firstDay}&end_date=${lastDay}&mrc=${mrcId}&page_size=${PAGE_SIZE}&page_id=${page}`;
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
      throw new Error("Failed getting all prekidp after date");
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

    // Proverite da li postoji polje "reservations" i "total"
    const prekidip = jsonResponse.prekidip || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: prekidip,
      count: total, // Osiguranje da je broj
    };

    // Ako ne postoji polje "reservations", vrati prazan niz []
    //return jsonResponse.prekidp || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching prekidip:", error.message);
    throw error;
  }
}

// Daje sve prekide za odredjeni mesec, godinu i rdc pripremljene za export u excel
export async function getListDDNInterruptionOfDeliveryPExcel(
  month,
  year,
  mrcId
) {
  //   const token = getAuthToken();

  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  const { firstDay, lastDay } = getMonthStartEnd(month, year);
  // let from = (page - 1) * PAGE_SIZE;
  // console.log("from je", from);

  // from = 1;
  // console.log(firstDay, lastDay);
  try {
    const url = `${API_URL}/interruptionofproduction_excel?start_date=${firstDay}&end_date=${lastDay}&mrc=${mrcId}`;
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
      throw new Error("Failed getting all prekidp after date");
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

    // Proverite da li postoji polje "reservations" i "total"
    const prekidip = jsonResponse.prekidip || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: prekidip,
      count: total, // Osiguranje da je broj
    };

    // Ako ne postoji polje "reservations", vrati prazan niz []
    //return jsonResponse.prekidp || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching prekidip:", error.message);
    throw error;
  }
}

// Daje sve prekide za odredjeni mesec, godinu i rdc pripremljene za export u excel
export async function getListDDNInterruptionOfDeliveryPExcelPeriod(
  firstDay,
  lastDay,
  mrcId
) {
  //   const token = getAuthToken();

  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  // const { firstDay, lastDay } = getMonthStartEnd(month, year);
  // let from = (page - 1) * PAGE_SIZE;
  // console.log("from je", from);

  // from = 1;
  // console.log(firstDay, lastDay);
  try {
    const url = `${API_URL}/interruptionofproduction_excel?start_date=${firstDay}&end_date=${lastDay}&mrc=${mrcId}`;
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
      throw new Error("Failed getting all prekidp after date");
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

    // Proverite da li postoji polje "reservations" i "total"
    const prekidip = jsonResponse.prekidip || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: prekidip,
      count: total, // Osiguranje da je broj
    };

    // Ako ne postoji polje "reservations", vrati prazan niz []
    //return jsonResponse.prekidp || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching prekidip:", error.message);
    throw error;
  }
}
