import './style.css';
import confetti from 'canvas-confetti';
import { generateSampleData } from './data/sample-data.js';

// Configuration
const config = {
	animationDuration: 8500, // 8.5 seconds in milliseconds
	audioFile: '/assets/media/drumroll.mp3',
};

// DOM Elements
let animatedBg,
	drawAgainBtn,
	drawContent,
	entries,
	fillSampleDataBtn,
	mainContent,
	pickNowBtn,
	processDraw,
	pullServerDataBtn,
	saveEntriesBtn,
	sidebar,
	sidebarArrow,
	winnerDisplay,
	winnerEmail,
	winnerName;

let entriesList = [];
let drumrollAudio;

// Initialize function to be called when DOM is fully loaded
const initialize = () => {
	// Get DOM Elements
	animatedBg = document.getElementById('gradient-background');
	drawAgainBtn = document.getElementById('draw-again-btn');
	drawContent = document.getElementById('draw-content');
	entries = document.getElementById('entries');
	fillSampleDataBtn = document.getElementById('fill-sample-data-btn');
	mainContent = document.getElementById('main-content');
	pickNowBtn = document.getElementById('pick-now-btn');
	processDraw = document.getElementById('process-draw');
	pullServerDataBtn = document.getElementById('pull-server-data-btn');
	saveEntriesBtn = document.getElementById('save-entries-btn');
	sidebar = document.getElementById('sidebar');
	sidebarArrow = document.getElementById('sidebar-arrow');
	winnerDisplay = document.getElementById('winner-display');
	winnerEmail = document.getElementById('winner-email');
	winnerName = document.getElementById('winner-name');

	// Event Listeners
	drawAgainBtn.addEventListener('click', startDraw);
	fillSampleDataBtn.addEventListener('click', fillSampleData);
	pickNowBtn.addEventListener('click', startDraw);
	saveEntriesBtn.addEventListener('click', saveEntries);
	sidebarArrow.addEventListener('click', toggleSidebar);

	// Initialize the page
	resetToHome();
};

const toggleSidebar = () => {
	sidebar.classList.toggle('right-0');
	sidebar.classList.toggle('-right-96');
	sidebarArrow.classList.toggle('rotate-180');
};

const saveEntries = () => {
	entriesList = entries.value
		.split('\n')
		.filter((entry) => entry.trim() !== '');
	updateDrawButtonVisibility();
	if (entriesList.length > 0) {
		toggleSidebar();
	}
};

const updateDrawButtonVisibility = () => {
	pickNowBtn.classList.toggle('hidden', entriesList.length === 0);
};

const startDraw = () => {
	// Hide sidebar arrow
	sidebarArrow.classList.add('hidden');

	// Reset UI first
	winnerDisplay.classList.add('hidden');
	mainContent.classList.add('hidden');
	drawAgainBtn.classList.add('hidden');
	processDraw.classList.remove('hidden');
	if (drumrollAudio) {
		drumrollAudio.pause();
		drumrollAudio.currentTime = 0;
	}

	// Start background animation
	animatedBg.style.animationDuration = '5s';

	drumrollAudio = new Audio(config.audioFile);
	drumrollAudio.play();

	// Delay showing the animation
	setTimeout(() => {
		drawContent.innerHTML = '';

		const fragment = document.createDocumentFragment();
		entriesList.forEach((entry) => {
			const entryElement = document.createElement('div');
			// Extract only the name part (assuming format: "Name (email)")
			const name = entry.split('(')[0].trim();
			entryElement.textContent = name;
			entryElement.classList.add(
				'entry',
				'absolute',
				'opacity-50',
				'scale-40',
				'transition-all',
				'duration-500',
				'ease-in-out',
				'whitespace-nowrap'
			);
			fragment.appendChild(entryElement);
		});
		drawContent.appendChild(fragment);

		animateEntries();
	}, 500);

	setTimeout(showWinner, config.animationDuration);
};

const animateEntries = () => {
	const entries = document.querySelectorAll('.entry');
	const drawArea = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	entries.forEach((entry) => {
		const animate = () => {
			const top = Math.random() * (drawArea.height - 100);
			const left = Math.random() * (drawArea.width - 400);

			entry.style.top = `${top}px`;
			entry.style.left = `${left}px`;
			entry.style.animation = `float ${
				2 + Math.random() * 2
			}s ease-in-out infinite`;

			entry.classList.add('opacity-100', 'scale-30');

			setTimeout(() => {
				entry.classList.remove('opacity-100', 'scale-30');
				setTimeout(animate, Math.random() * 1000);
			}, 2000 + Math.random() * 2000);
		};

		setTimeout(animate, Math.random() * 2000);
	});
};

const showWinner = () => {
	mainContent.classList.add('hidden');
	processDraw.classList.add('hidden');

	// Stop background animation
	animatedBg.style.animationDuration = '15s';

	const winner = entriesList[Math.floor(Math.random() * entriesList.length)];
	const [name, email] = winner.split('(');

	winnerName.textContent = name.trim();
	winnerEmail.textContent = `(${email.trim()}`;

	winnerDisplay.classList.remove('hidden');

	fireExtendedConfetti();

	setTimeout(() => {
		drawAgainBtn.classList.remove('hidden', 'opacity-0');
	}, 5000);
};

const fireExtendedConfetti = () => {
	const duration = 8 * 1000; // 8 seconds
	const animationEnd = Date.now() + duration;
	const defaults = { startVelocity: 30, spread: 360, ticks: 120, zIndex: 0 };

	function randomInRange(min, max) {
		return Math.random() * (max - min) + min;
	}

	const interval = setInterval(function () {
		const timeLeft = animationEnd - Date.now();

		if (timeLeft <= 0) {
			return clearInterval(interval);
		}

		const particleCount = 100 * (timeLeft / duration);

		confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			})
		);
		confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			})
		);
	}, 250);
};

const resetToHome = () => {
	// Reset UI to initial state
	winnerDisplay.classList.add('hidden');
	mainContent.classList.remove('hidden');
	processDraw.classList.add('hidden');
	drawAgainBtn.classList.add('hidden', 'opacity-0');

	// Show sidebar arrow
	sidebarArrow.classList.remove('hidden');

	// Reset background animation
	animatedBg.style.animationDuration = '15s';

	// Stop audio if it's playing
	if (drumrollAudio) {
		drumrollAudio.pause();
		drumrollAudio.currentTime = 0;
	}

	// Clear any remaining confetti
	confetti.reset();

	// Update Draw Now button visibility
	updateDrawButtonVisibility();
};

const fillSampleData = () => {
	entries.value = generateSampleData();

	// Automatically save entries and close sidebar
	saveEntries();

	// Add a small delay before closing the sidebar for better UX
	setTimeout(() => {
		if (sidebar.classList.contains('right-0')) {
			toggleSidebar();
		}
	}, 300);
};

// TODO: Pull data from the Server

// TODO: Send winner entries to Google Sheet

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initialize);

// Event listener to handle window resizing
window.addEventListener('resize', () => {
	if (!processDraw.classList.contains('hidden')) {
		animateEntries();
	}
});
