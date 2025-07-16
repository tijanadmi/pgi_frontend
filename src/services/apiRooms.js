import { getAuthToken } from "../utils/auth";

const API_URL = "http://localhost:8080";

export async function getRooms() {
  const token = getAuthToken();

  try {
    const url = `${API_URL}/v1/list_rooms?limit=100&offset=0`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    // console.log('Response:', res);

    if (!res.ok) {
      throw new Error("Failed getting rooms");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "rooms"
    if (!jsonResponse.rooms) {
      throw new Error("Unexpected response structure");
    }

    // Vratite sobe
    return jsonResponse.rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error.message);
    throw error;
  }
}

export async function createEditRoom(newRoom, id) {
  const token = getAuthToken();

  // 1. Create/edit room
  let url = "/rooms";
  let method = "POST";
  let roomData = {};

  //  const roomData = {
  //       room_name_sr: newRoom.room_name_sr,
  //       room_name_en: newRoom.room_name_en,
  //       room_name_bg: newRoom.room_name_bg,
  //       room_shortdes_sr: newRoom.room_shortdes_sr,
  //       room_shortdes_en: newRoom.room_shortdes_en,
  //       room_shortdes_bg: newRoom.room_shortdes_bg,
  //       room_des_sr: newRoom.room_des_sr,
  //       room_des_en: newRoom.room_des_en,
  //       room_des_bg: newRoom.room_des_bg,
  //       room_pictures_folder: newRoom.room_pictures_folder,
  //       room_guest_number: newRoom.room_guest_number,
  //       room_price_en: newRoom.room_price_en,
  //     };

  if (id) {
    // console.log('edit room with id:', id);
    url = `${API_URL}/v1/update_room`;
    method = "PATCH";
    roomData = {
      room_id: id,
      room_name_sr: newRoom.room_name_sr,
      room_name_en: newRoom.room_name_en,
      room_name_bg: newRoom.room_name_bg,
      room_shortdes_sr: newRoom.room_shortdes_sr,
      room_shortdes_en: newRoom.room_shortdes_en,
      room_shortdes_bg: newRoom.room_shortdes_bg,
      room_des_sr: newRoom.room_des_sr,
      room_des_en: newRoom.room_des_en,
      room_des_bg: newRoom.room_des_bg,
      room_pictures_folder: newRoom.room_pictures_folder,
      room_guest_number: newRoom.room_guest_number,
      room_price_en: newRoom.room_price_en,
    };
  } else {
    // console.log('insert new room:');
    url = `${API_URL}/v1/create_room`;
    method = "POST";
    roomData = {
      room_name_sr: newRoom.room_name_sr,
      room_name_en: newRoom.room_name_en,
      room_name_bg: newRoom.room_name_bg,
      room_shortdes_sr: newRoom.room_shortdes_sr,
      room_shortdes_en: newRoom.room_shortdes_en,
      room_shortdes_bg: newRoom.room_shortdes_bg,
      room_des_sr: newRoom.room_des_sr,
      room_des_en: newRoom.room_des_en,
      room_des_bg: newRoom.room_des_bg,
      room_pictures_folder: newRoom.room_pictures_folder,
      room_guest_number: newRoom.room_guest_number,
      room_price_en: newRoom.room_price_en,
    };
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(roomData),
    });

    if (!response.ok) {
      throw new Error("Failed insert/update room");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await response.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "room"
    if (!jsonResponse.room) {
      throw new Error("Unexpected response structure");
    }

    // Vratite sobu
    return jsonResponse.room;
  } catch (error) {
    console.error("Error insert/update room:", error.message);
    throw error;
  }

  //  return data;
}

export async function deleteRoom(roomId) {
  const token = getAuthToken();

  try {
    const response = await fetch(
      `${API_URL}/v1/delete_room?room_id=${roomId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed deleting rooms");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await response.json();

    // Proverite da li postoji polje message
    if (!jsonResponse.message) {
      throw new Error("Unexpected response structure");
    }

    return jsonResponse.message;
  } catch (error) {
    console.error("Error deleting room:", error.message);
    throw error;
  }
}
