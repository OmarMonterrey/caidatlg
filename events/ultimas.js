var stickers = require('./../stickers.js');
function ultimas(P, ctx, userIndex, valor){
	ctx.replyWithSticker( stickers.info.ultimas );
}
module.exports = ultimas;