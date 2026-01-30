const API_URL = import.meta.env.VITE_BACKEND_URL;

export function openPiMmPdfReport({ startDate, endDate, tipd, komisija }) {
    
  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    tipd,
    komisija,
  });

  const url = `${API_URL}/reports/pi-mm/pdf?${params.toString()}`;

  // PDF se samo otvara – ne fetch, ne react-query
  window.open(url, "_blank");
}
