var tableToImage = require('../tableToImage.js');
function gameStarted(P, ctx, messageStack){
	let turn = P.players[ P.gameData.turn ];
	if(turn){
		messageStack.push({
			chatId: ctx.message.chat.id,
			content: `Es turno de <b>${turn.userName}</b>`
		});
	}
	ctx.replyWithPhoto( tableToImage(P.gameData.table), {caption: 'Mesa actual', parse_mode:'MarkdownV2'} ).catch(err => console.log(err.on.method));

}
module.exports = gameStarted;