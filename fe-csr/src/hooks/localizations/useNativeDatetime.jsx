import {DATE_STYLE, LOCALE, TIME_STYLE, TIME_ZONE} from "../../config/localizations.js";
import useNativeDateParser from "./useNativeDateParser.jsx";

const useNativeDatetime = () => {
  const parseDate = useNativeDateParser();

  const format = (date) => {
    return new Intl.DateTimeFormat(LOCALE, {
      dateStyle: DATE_STYLE,
      timeStyle: TIME_STYLE,
      timeZone: TIME_ZONE,
    }).format(parseDate.format(date))
  }

  return { format };
}

export default useNativeDatetime;