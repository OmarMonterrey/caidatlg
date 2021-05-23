function tableToImage(arr){
	let items = arr.map(el => el.id);
	items = items.join(",");
	return `https://mediasfollowers.com/caidabot2/img.php?i=${items}`;
}
module.exports = tableToImage;