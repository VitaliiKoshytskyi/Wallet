export const toDateString = (value) => {
    let today = value;
    const date =
      today.getDate() < 10
        ? today.getDate().toString().padStart(2, 0)
        : today.getDate();
    const month =
      today.getMonth() < 10
        ? (today.getMonth() + 1).toString().padStart(2, 0)
        : today.getMonth() + 1;
    const year = today.getFullYear();
    const dateNow = `${year}-${month}-${date}`;
    return dateNow;
  }