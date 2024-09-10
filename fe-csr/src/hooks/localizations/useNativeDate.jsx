import {DATE_STYLE, LOCALE, TIME_ZONE} from "../../config/localizations.js";
import useNativeDateParser from "./useNativeDateParser.jsx";

const useNativeDate = () => {
  const parseDate = useNativeDateParser();

  const format = (date) => {
    return new Intl.DateTimeFormat(LOCALE, {
      dateStyle: DATE_STYLE,
      timeZone: TIME_ZONE,
    }).format(parseDate.format(date))
  }

  return { format };
}

export default useNativeDate;