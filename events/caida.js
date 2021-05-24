var stickers = require('./../stickers.js');
function caida(P, ctx, messageStack, userIndex, valor){
	ctx.replyWithSticker( stickers.info.caida ).catch(err => console.log(err.on.method));
}
module.exports = caida;