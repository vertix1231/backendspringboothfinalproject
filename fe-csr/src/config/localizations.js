/**
 * Datetime and currency configuration
 * @type {string}
 */
export const DATETIME_STYLES_LONG = "long";
export const DATETIME_STYLES_FULL = "full";
export const DATETIME_STYLES_MEDIUM = "medium";
export const DATETIME_STYLES_SHORT = "short";

// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export const LOCALE = Intl.DateTimeFormat().resolvedOptions().locale;
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const DATE_STYLE = DATETIME_STYLES_MEDIUM;
export const TIME_STYLE = DATETIME_STYLES_MEDIUM;
// https://www.techonthenet.com/js/currency_codes.php ISO 4217 Standard
export const CURRENCY_CODE = "IDR"