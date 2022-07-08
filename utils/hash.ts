// generates a value based on todays date
export default function Hash(): string {
	const today = Date.now();
	const date = new Date(today);
	const day = date.getDate().toString();
	const month = (date.getMonth() + 1).toString();
	const year = date.getFullYear();
	const generatedDate = day + month + year;
	return (
		generatedDate
	)
}