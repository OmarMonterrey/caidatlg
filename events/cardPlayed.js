var tableToImage = require('../tableToImage.js');
function cardPlayed(P, ctx, messageStack, data){
	let placedBy = P.players[ data.cardPlayed.turn ];
	let nextTurn = P.players[ data.cardPlayed.next ];
	let cardName = P.getCardName(data.cardPlayed.id);
	let caption = `Carta jugada por <b>${placedBy.userName}</b>: <b>${cardName}</b>\n`;
	caption    += `Ahora es turno de <b>${nextTurn.userName}</b>`;
	ctx.replyWithPhoto( tableToImage(data.table), {caption, parse_mode:'HTML'} ).catch(err => console.log(err.on.method));
}
module.exports = cardPlayed;