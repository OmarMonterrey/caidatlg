var stickers = require('../stickers.js');
function tableCardPlaced(P, ctx, cardId, guess){
	ctx.reply(`\¡\¡\¡*${guess}*\\\!\\\!\\\!: ${P.getCardName(cardId)}`, {parse_mode: 'MarkdownV2'});
}
module.exports = tableCardPlaced;