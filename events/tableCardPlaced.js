var stickers = require('../stickers.js');
function tableCardPlaced(P, ctx, messageStack, cardId, guess){
	messageStack.push({
		chatId: ctx.message.chat.id,
		content: `¡¡¡<b>${guess}</b>!!! ${P.getCardName(cardId)}`
	});
}
module.exports = tableCardPlaced;