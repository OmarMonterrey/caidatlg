function gameCreated(P, ctx, messageStack){
	let Dealer = P.players[ P.gameData.dealer ].userName;
	messageStack.push({
		chatId: ctx.message.chat.id,
		content: `${Dealer} las está dando.`
	});
}
module.exports = gameCreated;