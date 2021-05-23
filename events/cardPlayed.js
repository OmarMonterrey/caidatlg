var tableToImage = require('../tableToImage.js');
function cardPlayed(P, ctx, data){
	ctx.replyWithPhoto( tableToImage(data.table), {caption: `Carta jugada: <b>${P.getCardName(data.cardPlayed.id)}</b>`, parse_mode:'HTML'} );
}
module.exports = cardPlayed;