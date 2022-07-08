/** @jsx h */
import { Fragment, h } from "preact";

type PublishedProps = {
  start: string;
};
  
export default function TimeSincePub({ start }: PublishedProps) {
 
  // get the publish date and translate to time
  const startDate = new Date(start).getTime();

  // get the current date and translate to time
  const endDate = new Date().getTime();

  const t = endDate - startDate; 
  const years = Math.floor(t / (1000 * 60 * 60 * 24)/ 365);
  
  // calculated leap year by dividing the number of years by 4 and add 1
  const leapDays = Math.floor((years / 4) + 1);
  const days = Math.floor((t % (1000 * 60 * 60 * 24 * 365))/(1000 * 60 * 60 * 24) - leapDays); 

  return (
  <Fragment>Published {years > 0 ? years + " yrs and" : ""} {days} days ago</Fragment>
  );
}