function statusChange(P, ctx, messageStack, newStatus){
	if(newStatus === 'dealing'){
		let turn = P.players[ P.gameData.dealer ];
		if(turn){
			messageStack.push({
				chatId: ctx.message.chat.id,
				content: `<b>${turn.userName}</b> Debe repartir`
			});
		}
	} else {
		console.log('Unhandled status', newStatus);
	}
}
module.exports = statusChange;