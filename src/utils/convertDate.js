export function convertDate(dateString) {
    // Split the date string into an array of parts.
    const parts = dateString.split("T");

    // Get the date part of the string.
    const datePart = parts[0];

    // Split the date part into an array of parts.
    const dateParts = datePart.split("-");

    // Get the year, month, and day parts of the date.
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    // Return the date in the DD-MM-YYYY format.
    return `${day}-${month}-${year}`;
}


//Get current Date
export function getCurrentDate() {
    const today = new Date();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();
  
    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }
  
    return `${today.getFullYear()}-${month}-${day}`;
  }

  
