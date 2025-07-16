import { getAuthToken } from "../utils/auth";
const API_URL = "http://localhost:8080";

export async function getRestrictions() {
  const token = getAuthToken();
  try {
    const url = `${API_URL}/v1/list_restrictions?limit=100&offset=0`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed getting rooms");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "rooms"
    if (!jsonResponse.restrictions) {
      throw new Error("Unexpected response structure");
    }

    // Vratite sobe
    return jsonResponse.restrictions;
  } catch (error) {
    console.error("Error fetching restrictions:", error.message);
    throw error;
  }
}

export async function createEditRestriction(newRestriction, id) {
  const token = getAuthToken();

  // 1. Create/edit room
  let url = "/restrictions";
  let method = "POST";
  let restrictionData = {};

  if (id) {
    console.log("edit restriction with id:", id);
    url = `${API_URL}/v1/update_restriction`;
    method = "PATCH";
    restrictionData = {
      restriction_id: id,
      restriction_name_sr: newRestriction.restriction_name_sr,
      restriction_name_en: newRestriction.restriction_name_en,
      restriction_name_bg: newRestriction.restriction_name_bg,
    };
  } else {
    console.log("insert new roomrestriction:");
    url = `${API_URL}/v1/create_restriction`;
    method = "POST";
    restrictionData = {
      restriction_name_sr: newRestriction.restriction_name_sr,
      restriction_name_en: newRestriction.restriction_name_en,
      restriction_name_bg: newRestriction.restriction_name_bg,
    };
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(restrictionData),
    });

    if (!response.ok) {
      throw new Error("Failed insert/update restriction");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await response.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "restriction"
    if (!jsonResponse.restriction) {
      throw new Error("Unexpected response structure");
    }

    // Vratite sobu
    return jsonResponse.restriction;
  } catch (error) {
    console.error("Error insert/update restriction:", error.message);
    throw error;
  }

  //  return data;
}

export async function deleteRestriction(restrictionId) {
  const token = getAuthToken();

  try {
    const response = await fetch(
      `${API_URL}/v1/delete_restriction?restriction_id=${restrictionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed deleting restriction");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await response.json();

    // Proverite da li postoji polje message
    if (!jsonResponse.message) {
      throw new Error("Unexpected response structure");
    }

    return jsonResponse.message;
  } catch (error) {
    console.error("Error deleting restriction:", error.message);
    throw error;
  }
}
