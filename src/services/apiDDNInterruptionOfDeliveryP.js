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

// export async function createInterruptionOfProduction(newInterruption) {
  
//   const url = `${API_URL}/createinterruptionofproduction`;
//   const method = "POST";

//   // Payload mora 1:1 da odgovara backend struct-u
//   const interruptionData = {
//     id_s_mrc: newInterruption.id_s_mrc,              // required
//     id_tipob: newInterruption.id_tipob,              // required
//     ob_id: newInterruption.ob_id,                    // required
//     vrepoc: newInterruption.vrepoc,                  // required (dd.mm.yyyy hh:mm)
//     vrezav: newInterruption.vrezav || "",            // optional
//     id_s_vr_prek: newInterruption.id_s_vr_prek,      // required
//     id_s_uzrok_prek: newInterruption.id_s_uzrok_prek || 0,
//     snaga: newInterruption.snaga || "",
//     opis: newInterruption.opis || "",
//     p2_traf_id: newInterruption.p2_traf_id || 0,
//     id_s_poduzrok_prek: newInterruption.id_s_poduzrok_prek || 0,
//     id_tip_objekta_ndc: newInterruption.id_tip_objekta_ndc || "",
//     id_tip_dogadjaja_ndc: newInterruption.id_tip_dogadjaja_ndc || "",
//   };

//   try {
//     const response = await apiFetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(interruptionData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData?.error || "Failed to create interruption");
//     }

//     // Backend vraća ceo objekat (pr)
//     const jsonResponse = await response.json();
//     return jsonResponse;
//   } catch (error) {
//     console.error("Error creating interruption of production:", error.message);
//     throw error;
//   }
// }

export async function createEditInterruptionOfProduction(newInterruption, id, version) {
  // Ako ima id → UPDATE, ako nema → CREATE

  
  const isEdit = Boolean(id);

  // Validacija samo za UPDATE
  if (isEdit && (version === undefined || version === null)) {
    throw new Error("Verzija je obavezna za update");
  }

  const url = isEdit
    ? `${API_URL}/interruptionofproduction/${id}/${version}` // UPDATE endpoint
    : `${API_URL}/createinterruptionofproduction`; // CREATE endpoint

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
    p2_traf_id: newInterruption.p2_traf_id || 0,
    id_s_poduzrok_prek: newInterruption.id_s_poduzrok_prek || 0,
    id_tip_objekta_ndc: newInterruption.id_tip_objekta_ndc || "",
    id_tip_dogadjaja_ndc: newInterruption.id_tip_dogadjaja_ndc || "",
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
      `Error ${isEdit ? "updating" : "creating"} interruption of production:`,
      error.message
    );
    throw error;
  }
}

export async function updateDDNInterruptionOfDeliveryBI(id, version, bi) {
  console.log("updateDDNInterruptionOfDeliveryBI called with:", { id, version, bi });
  if (!id) {
    throw new Error("ID je obavezan");
  }

  if (version === undefined || version === null) {
    throw new Error("Verzija je obavezna za izmenu BI polja");
  }
  if (bi == 0) {
    bi = 1;
  } else {
    bi = 0;
  }

  const url = `${API_URL}/interruptionofdelivery/bi/${id}/${version}`;

  // Backend očekuje JSON: { bi: number }
  const payload = {
    bi: bi, // 1 ili 0
  };
  

  try {
    const res = await apiFetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 409) {
      throw new Error(
        "Zapis je u međuvremenu izmenjen od strane drugog korisnika"
      );
    }

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || "Neuspešna izmena BI polja");
    }

    // Backend vraća osvežen objekat
    const jsonResponse = await res.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error updating BI field:", error.message);
    throw error;
  }
}



export async function deleteDDNInterruptionOfDelivery(id, version) {
  if (!id) {
    throw new Error("ID је обавезан за брисање");
  }

  if (version === undefined || version === null) {
    throw new Error("Верѕија је обавезна за брисање");
  }

  try {
    const url = `${API_URL}/interruptionofdelivery/${id}/${version}`;

    const res = await apiFetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 409) {
      throw new Error(
        "Запис је у међувремену измењен од стране другог корисника и не може бити обрисан"
      );
    }

    if (!res.ok) {
      throw new Error("Грешка при брисању прекида");
    }

    // backend vraća 204 No Content
    return true;
  } catch (error) {
    console.error("Error deleting prekid:", error.message);
    throw error;
  }
}

