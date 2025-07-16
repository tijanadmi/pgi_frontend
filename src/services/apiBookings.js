import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";
import { getAuthToken } from "../utils/auth";
// import supabase from "./supabase";

const API_URL = "http://localhost:8080";

export async function getAllReservations() {
  const token = getAuthToken();

  try {
    const url = `${API_URL}/v1/list_all_reservations?limit=100&offset=0`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    // console.log('Response:', res);

    if (!res.ok) {
      throw new Error("Failed getting reservations");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "rooms"
    if (!jsonResponse.reservations) {
      throw new Error("Unexpected response structure");
    }

    // Vratite reservations
    return jsonResponse.reservations;
  } catch (error) {
    console.error("Error fetching all reservations:", error.message);
    throw error;
  }
}

export async function getNewReservations() {
  const token = getAuthToken();

  try {
    const url = `${API_URL}/v1/list_new_reservations?limit=100&offset=0`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    // console.log('Response:', res);

    if (!res.ok) {
      throw new Error("Failed getting new reservations");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "rooms"
    if (!jsonResponse.reservations) {
      throw new Error("Unexpected response structure");
    }

    // Vratite sobe
    return jsonResponse.reservations;
  } catch (error) {
    console.error("Error fetching new reservations:", error.message);
    throw error;
  }
}

export async function getProcessedReservations() {
  const token = getAuthToken();

  try {
    const url = `${API_URL}/v1/list_processed_reservations?limit=100&offset=0`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    // console.log('Response:', res);

    if (!res.ok) {
      throw new Error("Failed getting new reservations");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "rooms"
    if (!jsonResponse.reservations) {
      throw new Error("Unexpected response structure");
    }

    // Vratite sobe
    return jsonResponse.reservations;
  } catch (error) {
    console.error("Error fetching new reservations:", error.message);
    throw error;
  }
}

export async function getReservationsWithParams(filter, filter1, sortBy, page) {
  const token = getAuthToken();

  if (!filter) {
    filter = "all";
  }

  if (!filter1) {
    filter1 = "all";
  }
  if (!sortBy) {
    sortBy = { field: "created_at", direction: "ASC" };
  }

  if (!page) {
    page = 1; // Podrazumevana stranica
  }

  // Mapiranje filtera na odgovarajuće vrednosti
  const processedFilter = filter === "1" ? "1" : filter === "0" ? "0" : "all";

  const statusFilter =
    filter1.value === "checked-in"
      ? "checked-in"
      : filter1.value === "checked-out"
      ? "checked-out"
      : filter1.value === "unconfirmed"
      ? "unconfirmed"
      : "all";

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  try {
    const url = `${API_URL}/v1/list_reservations_params?limit=${PAGE_SIZE}&offset=${from}&order_by=${sortBy.field}&order_dir=${sortBy.direction}&processed=${processedFilter}&status=${statusFilter}`;

    //console.log(url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all reservations with params");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    //console.log('JSON Response:', jsonResponse);

    // Proveri ako je odgovor prazan i vrati podrazumevani odgovor
    if (Object.keys(jsonResponse).length === 0) {
      //console.log("No reservations found.");
      return {
        data: [],
        count: 0,
      };
    }

    // Proverite da li postoji polje "reservations" i "total"
    const reservations = jsonResponse.reservations || []; // Ako nema rezervacija, postavi praznu listu
    const total = jsonResponse.total ? parseInt(jsonResponse.total, 10) : 0; // Ako nema ukupnog broja, postavi 0

    // Vratite rezultat kao objekat
    return {
      data: reservations,
      count: total, // Osiguranje da je broj
    };
  } catch (error) {
    //console.log("catch")
    console.error("Error fetching new reservations:", error.message);
    throw error;
  }
}

export async function getBooking(reservationId) {
  const token = getAuthToken();
  try {
    const url = `${API_URL}/v1/get_reservation?reservation_id=${reservationId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    // console.log('Response:', res);

    if (!res.ok) {
      throw new Error("Failed getting reservation");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    if (!jsonResponse.reservation) {
      throw new Error("Unexpected response structure");
    }
    return jsonResponse.reservation;
  } catch (error) {
    console.error("Error fetching reservation:", error.message);
    throw error;
  }
}

export async function updateBooking(reservation_id, editedReservation) {
  const token = getAuthToken();
  // console.log("reservation_id in updateBooking is:", reservation_id);
  // console.log("editedReservation:", editedReservation);
  const url = `${API_URL}/v1/update_reservation`;
  const reservationData = {
    reservation_id: reservation_id,
    ...editedReservation, // Dodaj sve ključeve i vrednosti iz editedReservation
  };

  // console.log("reservationData:", reservationData);
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      throw new Error("Failed update reservation");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await response.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "room"
    if (!jsonResponse.reservation) {
      throw new Error("Unexpected response structure");
    }

    // Vratite sobu
    return jsonResponse.reservation;
  } catch (error) {
    console.error("Error update reservation:", error.message);
    throw error;
  }
}

export async function deleteBooking(reservationId) {
  const token = getAuthToken();
  try {
    const response = await fetch(
      `${API_URL}/v1/delete_reservation?reservation_id=${reservationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed deleting reservation");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await response.json();

    // Proverite da li postoji polje message
    if (!jsonResponse.message) {
      throw new Error("Unexpected response structure");
    }

    return jsonResponse.message;
  } catch (error) {
    console.error("Error deleting reservation:", error.message);
    throw error;
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const token = getAuthToken();

  const dateParam = new Date(date).toISOString().split("T")[0];
  const today = new Date(getToday({ end: true })).toISOString().split("T")[0];

  try {
    const url = `${API_URL}/v1/list_reservations_after_date?start_date=${dateParam}&end_date=${today}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all reservations after date");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // Ako je odgovor prazan objekat {}, vrati prazan niz []
    if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
      return [];
    }

    // Ako ne postoji polje "reservations", vrati prazan niz []
    return jsonResponse.reservations || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching new reservations:", error.message);
    throw error;
  }
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const token = getAuthToken();

  const dateParam = new Date(date).toISOString().split("T")[0];
  const today = new Date(getToday({ end: true })).toISOString().split("T")[0];

  try {
    const url = `${API_URL}/v1/list_stays_after_date?start_date=${dateParam}&end_date=${today}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all reservations after date");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // Ako je odgovor prazan objekat {}, vrati prazan niz []
    if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
      return [];
    }

    // Ako ne postoji polje "reservations", vrati prazan niz []
    return jsonResponse.reservations || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching new reservations:", error.message);
    throw error;
  }
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const token = getAuthToken();

  const todayP = new Date(getToday({ end: true })).toISOString().split("T")[0];

  try {
    const url = `${API_URL}/v1/list_today_activities_date?today=${todayP}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting all reservations after date");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // Ako je odgovor prazan objekat {}, vrati prazan niz []
    if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
      return [];
    }

    // Ako ne postoji polje "reservations", vrati prazan niz []
    return jsonResponse.reservations || [];
  } catch (error) {
    // console.log("catch")
    console.error("Error fetching new reservations:", error.message);
    throw error;
  }
}
