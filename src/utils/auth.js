import { redirect } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // Ako nije 401 → vrati rezultat odmah
  if (response.status !== 401) {
    return response;
  }

  // Ako jeste 401 → pokušaj refresh
  const refreshed = await attemptTokenRefresh();

  if (!refreshed) {
    return response; // refresh nije uspeo → ostaje 401
  }

  // Refresh uspeo → ponovo pozivamo originalni request
  return fetch(url, {
    ...options,
    credentials: "include",
  });
}

async function attemptTokenRefresh() {
  try {
    const res = await fetch(`${API_URL}/tokens/renew_access`, {
      method: "POST",
      credentials: "include", // jako važno — da donese refresh_token cookie
    });

    if (!res.ok) {
      console.warn("Refresh failed");
      return false;
    }

    console.log("Tokens refreshed");
    return true;
  } catch (error) {
    console.error("Refresh error:", error);
    return false;
  }
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  if (!storedExpirationDate) {
    return -1; 
  }


  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  // console.log("expirationDate (UTC)", expirationDate.toISOString());
  // console.log("now (UTC)", now.toISOString());

  const duration = expirationDate.getTime() - now.getTime();
  
  // console.log("duration (ms)", duration);
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/login');
  }
}