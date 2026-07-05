(() => {
	const form = document.querySelector('form');

	form.addEventListener('submit', event => {
		event.preventDefault();

		const formData = new FormData(form);
		const bgColor = formData.get('background-color');
		const fgColor = formData.get('foreground-color');
		const opacity = formData.get('opacity');

		const bgColorR = parseInt(bgColor[1] + bgColor[2], 16);
		const bgColorG = parseInt(bgColor[3] + bgColor[4], 16);
		const bgColorB = parseInt(bgColor[5] + bgColor[6], 16);

		const fgColorR = parseInt(fgColor[1] + fgColor[2], 16);
		const fgColorG = parseInt(fgColor[3] + fgColor[4], 16);
		const fgColorB = parseInt(fgColor[5] + fgColor[6], 16);

		const finalR = Math.round((fgColorR - bgColorR * (1 - (opacity / 100))) / (opacity / 100));
		const finalG = Math.round((fgColorG - bgColorG * (1 - (opacity / 100))) / (opacity / 100));
		const finalB = Math.round((fgColorB - bgColorB * (1 - (opacity / 100))) / (opacity / 100));

		if (finalR > 255 || finalG > 255 || finalB > 255 || finalR < 0 || finalG < 0 || finalB < 0){
			alert('No such color at this opacity setting');
		} else {
			alert(`rgb(${finalR} ${finalG} ${finalB} / ${opacity}%)`);
		}
	});
})();
