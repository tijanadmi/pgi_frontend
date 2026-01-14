import { formatDistance, parseISO } from "date-fns";
//import { differenceInDays } from 'date-fns/esm';

// We want to make this function work for both Date objects and strings (which come from Supabase)
// export const subtractDates = (dateStr1, dateStr2) =>
//   differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const getMonthStartEnd = (month, year) => {
  // Први и последњи дан у месецу
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  // Форматирање у "dd.mm.yyyy" формат без размака
  const formatDate = (date) =>
    `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;

  return {
    // firstDay: firstDay.toLocaleDateString("sr-RS"),
    // lastDay: lastDay.toLocaleDateString("sr-RS"),
    firstDay: formatDate(firstDay),
    lastDay: formatDate(lastDay),
  };
};

/** dd.mm.yyyy hh:mm -> yyyy-mm-ddThh:mm */
export function dotDateTimeToInput(val) {
  if (!val) return "";

  const [date, time] = val.split(" ");
  if (!date || !time) return "";

  const [dd, mm, yyyy] = date.split(".");
  if (!dd || !mm || !yyyy) return "";

  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${time}`;
}

/** yyyy-mm-ddThh:mm -> dd.mm.yyyy hh:mm */
export function inputToDotDateTime(val) {
  if (!val) return "";

  const [date, time] = val.split("T");
  if (!date || !time) return "";

  const [yyyy, mm, dd] = date.split("-");
  if (!yyyy || !mm || !dd) return "";

  return `${dd.padStart(2, "0")}.${mm.padStart(2, "0")}.${yyyy} ${time}`;
}
