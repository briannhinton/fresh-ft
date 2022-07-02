/** @jsx h */
import { Fragment, h } from "preact";

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    // Months use 0 index.

    return (month[1] ? month : '0' + month[0]) + '/' +
      (day[1] ? day : '0' + day[0]) + '/' + 
      date.getFullYear();
  }
}

type PublishedProps = {
  start: string;
  end: number;
};
  
export default function TimeSincePub({ start, end }: PublishedProps) {
  const dateToString = formatDate(start);
  const startDate = new Date(dateToString);
  // todo: move current date to this function
  const endDate = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = endDate.getTime() - startDate.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);
  // TODO: if days > 365 then convert to years
  // if > 365 then output 1 year for every 365 * 2 (eep how to leapyear?)
  // then take remaining days after multiples to display the year formated at 2 years 34 days old
  return (
  <Fragment>{diffInDays} days old</Fragment>
  );
}