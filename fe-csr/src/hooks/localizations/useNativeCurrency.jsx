import {CURRENCY_CODE, LOCALE} from "../../config/localizations.js";

const useNativeCurrency = () => {
  const format = (value) => {
    return new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY_CODE }).format(value)
  }

  return { format }
}

export default useNativeCurrency;