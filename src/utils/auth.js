import { redirect } from 'react-router-dom';

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