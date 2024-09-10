const useNativeDateParser = () => {
  const format = (dateString) => {
    const timestamp = Date.parse(dateString);

    if (isNaN(timestamp)) {
      console.log('Invalid date string');
      return null; // or return an error, throw an exception, etc.
    }

    const parsedDate = new Date(timestamp);
    return parsedDate;
  }

  return { format }
}

export default useNativeDateParser;