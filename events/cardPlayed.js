var tableToImage = require('../tableToImage.js');
function cardPlayed(P, ctx, data){
	let placedBy = P.players[ data.cardPlayed.turn ];
	let nextTurn = P.players[ data.cardPlayed.next ];
	let cardName = P.getCardName(data.cardPlayed.id);
	let caption = `Carta jugada por <b>${placedBy.userName}</b>: <b>${cardName}</b>\n`;
	caption    += `Ahora es turno de <b>${nextTurn.userName}</b>`;
	ctx.replyWithPhoto( tableToImage(data.table), {caption, parse_mode:'HTML'} ).then(msg => {
		setTimeout(() => ctx.telegram.editMessageCaption(msg.chat.id,msg.message_id, undefined, `Carta jugada: <b>${cardName}</b>`, {parse_mode: 'HTML'}), 15000);
	});
}
module.exports = cardPlayed;