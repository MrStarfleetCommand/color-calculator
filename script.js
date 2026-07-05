(() => {
	const form = document.querySelector('form');

	form.addEventListener('submit', event => {
		event.preventDefault();

		const formData = new FormData(form);
		const backgroundColor = formData.get('background-color');
		const foregroundColor = formData.get('foreground-color');
		const opacity = formData.get('opacity');

		console.log(backgroundColor);
		console.log(foregroundColor);
		console.log(opacity);
	});
})();
