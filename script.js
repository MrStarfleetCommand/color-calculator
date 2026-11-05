(() => {
	const overlayForm = document.querySelector('#overlay');

	overlayForm.addEventListener('submit', event => {
		event.preventDefault();

		const formData = new FormData(overlayForm);
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

		if (finalR > 255 || finalG > 255 || finalB > 255 || finalR < 0 || finalG < 0 || finalB < 0) {
			alert('No such color at this opacity setting');
		} else {
			alert(`rgb(${finalR} ${finalG} ${finalB} / ${opacity}%)`);
		}
	});

	for (const input of document.querySelectorAll('#converter input')) {
		input.addEventListener('input', () => {
			if (input.id === 'converter-color' && isValid(hexToRgb(input.value))) {
				document.querySelector('#converter-rgb').value = hexToRgb(input.value);
				document.querySelector('#converter-ycbcr').value = hexToYcbcr(input.value);
			} else if (input.id === 'converter-rgb' && isValid(input.value)) {
				document.querySelector('#converter-color').value = rgbToHex(input.value);
				document.querySelector('#converter-ycbcr').value = rgbToYcbcr(input.value);
			} else if (input.id === 'converter-ycbcr' && isValid(ycbcrToRgb(input.value))) {
				document.querySelector('#converter-color').value = ycbcrToHex(input.value);
				document.querySelector('#converter-rgb').value = ycbcrToRgb(input.value);
			}
		});
	}

	function isValid(rgb) {
		return rgb.split(', ').every(n => n <= 255 && n >= 0);
	}

	function hexToRgb(value) {
		return value.split('').slice(1).join('').match(/.{2}/g).map(val => parseInt(val, 16)).join(', ');
	}

	function hexToYcbcr(value) {
		return rgbToYcbcr(hexToRgb(value));
	}

	function rgbToHex(value) {
		return `#${value.split(', ').map(n => Math.round(Number(n)).toString(16).padStart(2, 0)).join('')}`;
	}

	function rgbToYcbcr(value) {
		const vals = value.split(', ').map(Number);
		return [
			Math.round(vals[0] * 0.299 + vals[1] * 0.587 + vals[2] * 0.114),
			Math.round(127.5 - vals[0] * 0.169 - vals[1] * 0.331 + vals[2] * 0.5),
			Math.round(127.5 + vals[0] * 0.5 - vals[1] * 0.419 - vals[2] * 0.081),
		].join(', ');
	}

	function ycbcrToHex(value) {
		return rgbToHex(ycbcrToRgb(value));
	}

	function ycbcrToRgb(value) {
		const vals = value.split(', ').map(Number);
		return [
			Math.round(vals[0] + (vals[2] - 127.5) * 1.402),
			Math.round(vals[0] - (vals[1] - 127.5) * 0.344 - (vals[2] - 127.5) * 0.714),
			Math.round(vals[0] + (vals[1] - 127.5) * 1.772),
		].join(', ');
	}
})();
