var tableToImage = require('../tableToImage.js');
function gameStarted(P, ctx){
	let turn = P.players[ P.gameData.turn ];
	if(turn)
		ctx.replyWithHTML(`Es turno de <b>${turn.userName}</b>`)
	ctx.replyWithPhoto( tableToImage(P.gameData.table), {caption: 'Mesa actual', parse_mode:'MarkdownV2'} );

}
module.exports = gameStarted;