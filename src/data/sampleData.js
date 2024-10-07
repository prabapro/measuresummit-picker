function generateRandomName() {
	const firstNames = [
		'John',
		'Jane',
		'Michael',
		'Emily',
		'David',
		'Sarah',
		'Robert',
		'Lisa',
		'William',
		'Emma',
		'Daniel',
		'Olivia',
		'Matthew',
		'Sophia',
		'Christopher',
		'Ava',
		'Andrew',
		'Isabella',
		'Joseph',
		'Mia',
	];
	const lastNames = [
		'Smith',
		'Johnson',
		'Brown',
		'Davis',
		'Wilson',
		'Moore',
		'Taylor',
		'Anderson',
		'Thomas',
		'Jackson',
		'White',
		'Harris',
		'Martin',
		'Thompson',
		'Garcia',
		'Martinez',
		'Robinson',
		'Clark',
		'Rodriguez',
		'Lewis',
	];
	return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
		lastNames[Math.floor(Math.random() * lastNames.length)]
	}`;
}

function generateMaskedEmail(name) {
	const domains = [
		'gmail.com',
		'yahoo.com',
		'hotmail.com',
		'outlook.com',
		'example.com',
	];
	const [firstName, lastName] = name.split(' ');
	const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}@${
		domains[Math.floor(Math.random() * domains.length)]
	}`;
	return `${email.substring(0, 3)}*****@${email
		.split('@')[1]
		.substring(0, 2)}*****`;
}

export const generateSampleData = (count = 100) => {
	return Array.from({ length: count }, () => {
		const name = generateRandomName();
		const email = generateMaskedEmail(name);
		return `${name} (${email})`;
	}).join('\n');
};
