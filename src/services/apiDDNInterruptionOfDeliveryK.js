// import { getAuthToken } from "../utils/auth";
import { PAGE_SIZE } from "../utils/constants";
import { getMonthStartEnd } from "../utils/helpers";
import { apiFetch } from "../utils/auth";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Returns all STAYS that are were created after the given date
export async function getListDDNInterruptionOfDeliveryK(
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
    const url = `${API_URL}/interruptionofusers?start_date=${firstDay}&end_date=${lastDay}&mrc=${mrcId}&page_size=${PAGE_SIZE}&page_id=${page}`;
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
    const prekidik = jsonResponse.prekidik || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: prekidik,
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

export async function getListDDNInterruptionOfDeliveryKPeriod(
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
    const url = `${API_URL}/interruptionofusers?start_date=${firstDay}&end_date=${lastDay}&mrc=${mrcId}&page_size=${PAGE_SIZE}&page_id=${page}`;
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
      throw new Error("Failed getting all prekidk after date");
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
    const prekidik = jsonResponse.prekidik || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: prekidik,
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
export async function getListDDNInterruptionOfDeliveryKExcel(
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
    const url = `${API_URL}/interruptionofusers_excel?start_date=${firstDay}&end_date=${lastDay}&mrc=${mrcId}`;
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
      throw new Error("Failed getting all prekidk after date");
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
    const prekidik = jsonResponse.prekidik || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: prekidik,
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
export async function getListDDNInterruptionOfDeliveryKExcelPeriod(
  firstDay,
  lastDay,
  mrcId
) {
  //   const token = getAuthToken();

  if (!mrcId || mrcId === 9) {
    mrcId = "all";
  }

  // const { firstDay, lastDay } = getMonthStartEnd(month, year);
  
  try {
    const url = `${API_URL}/interruptionofusers_excel?start_date=${firstDay}&end_date=${lastDay}&mrc=${mrcId}`;
    
    const res = await apiFetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all prekidk after date");
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
    const prekidik = jsonResponse.prekidik || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0;

    // Vratite rezultat kao objekat
    return {
      data: prekidik,
      count: total, // Osiguranje da je broj
    };

    // Ako ne postoji polje "reservations", vrati prazan niz []
    //return jsonResponse.prekidp || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching prekidik:", error.message);
    throw error;
  }
}

export async function createEditInterruptionOfUsers(newInterruption, id, version) {
  // Ako ima id → UPDATE, ako nema → CREATE

  
  const isEdit = Boolean(id);

  // Validacija samo za UPDATE
  if (isEdit && (version === undefined || version === null)) {
    throw new Error("Verzija je obavezna za update");
  }

  const url = isEdit
    ? `${API_URL}/interruptionofusers/${id}/${version}` // UPDATE endpoint
    : `${API_URL}/createinterruptionofusers`; // CREATE endpoint

  const method = isEdit ? "PUT" : "POST";

  // Payload mora 1:1 da odgovara backend struct-u
  const interruptionData = {
    id_s_mrc: newInterruption.id_s_mrc,
    id_tipob: newInterruption.id_tipob,
    ob_id: newInterruption.ob_id,
    vrepoc: newInterruption.vrepoc,
    vrezav: newInterruption.vrezav || "",
    id_s_vr_prek: newInterruption.id_s_vr_prek,
    id_s_uzrok_prek: newInterruption.id_s_uzrok_prek || 0,
    snaga: newInterruption.snaga || "",
    opis: newInterruption.opis || "",
    id_s_poduzrok_prek: newInterruption.id_s_poduzrok_prek || 0,
    id_s_merna_mesta: newInterruption.id_s_merna_mesta || 0,
    broj_mesta: newInterruption.broj_mesta || "",
  };

  console.log("interruptionData:", interruptionData);

  try {
    const response = await apiFetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interruptionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.error ||
          `Failed to ${isEdit ? "update" : "create"} interruption`
      );
    }

    // CREATE → obično vraća objekat
    // UPDATE → često vraća update-ovani objekat
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(
      `Error ${isEdit ? "updating" : "creating"} interruption of users:`,
      error.message
    );
    throw error;
  }
}


