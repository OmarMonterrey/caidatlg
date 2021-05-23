var stickers = require('./../stickers.js');
function caida(P, ctx, userIndex, valor){
	ctx.replyWithSticker( stickers.info.caida );
}
module.exports = caida;