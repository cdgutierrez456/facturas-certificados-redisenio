export const formatDateTime12h = (dateTimeStr: string): string => {
  if (!dateTimeStr) return '';

  const parts = dateTimeStr.split(' ');

  const datePart = parts.length > 1 ? parts[0] : '';
  const timePart = parts.length > 1 ? parts[1] : parts[0];

  const [hourString, minuteString] = timePart.split(':');
  let hour = parseInt(hourString, 10);

  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;

  const formattedTime = `${hour}:${minuteString} ${ampm}`;

  if (datePart) {
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year} - ${formattedTime}`;
  }
  return formattedTime;
};