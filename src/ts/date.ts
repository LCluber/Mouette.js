function addZero(value: number): string | number {
  return value < 10 ? "0" + value : value;
}

export function formatDate(): string {
  // Create a date object with the current time
  const now: Date = new Date();
  // Create an array with the current month, day and time
  const date: (number | string)[] = [
    addZero(now.getMonth() + 1),
    addZero(now.getDate()),
    now
      .getFullYear()
      .toString()
      .substr(-2)
  ];
  // Create an array with the current hour, minute and second
  const time: (number | string)[] = [
    addZero(now.getHours()),
    addZero(now.getMinutes()),
    addZero(now.getSeconds())
  ];
  // Determine AM or PM suffix based on the hour
  //let t0 = time[0];
  //let suffix:string = ( t0 < 12 ) ? "AM" : "PM";
  // Convert hour from military time
  //t0 = ( t0 < 12 ) ? t0 : <number>t0 - 12;
  // If hour is 0, set it to 12
  //t0 = t0 || 12;
  // Return the formatted string
  return date.join("/") + " " + time.join(":") /*+ " " + suffix*/;
}
