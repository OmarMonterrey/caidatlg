var stickers = require('./../stickers.js');
function ultimas(P, ctx, messageStack, userIndex, valor){
	ctx.replyWithSticker( stickers.info.ultimas ).catch(err => console.log(err.on.method));
}
module.exports = ultimas;