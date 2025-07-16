import { getAuthToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function login({ email, password }) {
  const loginData = {
    username: email,
    password: password,
  };
  const url = `${API_URL}/users/login`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      throw new Error("Failed getting user");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();

    // Proverite da li postoji polje "user"
    if (!jsonResponse.user) {
      throw new Error("Unexpected response structure");
    }

    const token = jsonResponse.access_token;
    localStorage.setItem("token", token);

    const expiration = jsonResponse.access_token_expires_at;
    localStorage.setItem("expiration", expiration);

    // Vrati user data
    return jsonResponse.user;
  } catch (error) {
    console.error("Error login user:", error.message);
    throw error;
  }
}

export async function getCurrentUser() {
  const access_token = getAuthToken();
  // console.log(access_token);

  if (!access_token || access_token === "EXPIRED") return null;

  const payload = {
    access_token: access_token,
  };
  const url = `${API_URL}/users/get_user_by_token`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      //throw new Error('Failed getting user');
      return null;
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await res.json();
    // console.log('JSON Response from getCurrentUser:', jsonResponse);

    const user = jsonResponse;
    // Vrati user data
    return user;
  } catch (error) {
    console.error("Error get user by token:", error.message);
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  // if (error) throw new Error(error.message);
}

export async function signup({ firstName, lastName, email, phone, password }) {
  const url = `${API_URL}/v1/create_user`;

  const data = {
    firstName,
    lastName,
    email,
    phone,
    password,
  };
  // console.log(data);

  const userData = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    password: data.password,
  };

  // console.log(userData);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed insert user");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await response.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "room"
    if (!jsonResponse.user) {
      throw new Error("Unexpected response structure");
    }

    // Vratite sobu
    return jsonResponse.user;
  } catch (error) {
    console.error("Error insert user:", error.message);
    throw error;
  }
}

export async function updateCurrentUser({
  password,
  firstNameU,
  lastNameU,
  email,
  phoneU,
}) {
  const token = getAuthToken();

  const url = `${API_URL}/v1/update_user`;

  const data = {
    password,
    firstNameU,
    lastNameU,
    email,
    phoneU,
  };

  let userData;
  if (password) {
    // console.log("Email:", email);
    // console.log("Password:", password);
    userData = {
      password: data.password,
      email: data.email,
    };
  } else {
    userData = {
      first_name: data.firstNameU,
      last_name: data.lastNameU,
      email: data.email,
      phone: data.phoneU,
    };
  }

  try {
    // console.log(userData);
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed uu user");
    }

    // Parsirajte JSON odgovor
    const jsonResponse = await response.json();
    // console.log('JSON Response:', jsonResponse);

    // Proverite da li postoji polje "room"
    if (!jsonResponse.user) {
      throw new Error("Unexpected response structure");
    }
    const updateUser = jsonResponse.user;
    // Vratite sobu
    return updateUser;
  } catch (error) {
    console.error("Error update user:", error.message);
    throw error;
  }
}
