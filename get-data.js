const swagImages = [];
const fileNames = [];
const swagList = require('./data.json').map(swag => {
	// Generate unique filename
	const extension = 'jpeg';
	const fileBase = swag.name
		.replace(/[^a-z0-9]/gi, '_')
		.replace(/_{2,}/g, '_')
		.toLowerCase();
	let index = 0;

	let fileName = `${fileBase}.${extension}`;
	while (fileNames.includes(fileName)) {
		fileName = `${fileBase}-${++index}.${extension}`;
	}
	// End generate unique filename

	swagImages.push({
		url: swag.image,
		file: fileName
	});
	swag.image = `/assets/swag-img/${fileName}`;
	fileNames.push(fileName);

	return swag;
});
//Sort list by most recent
swagList.sort(function (a, b) {
	a = new Date(a.dateAdded);
	b = new Date(b.dateAdded);
	return a > b ? -1 : a < b ? 1 : 0;
});
module.exports = {swagList, swagImages};
