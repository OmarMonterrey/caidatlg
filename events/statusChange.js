function statusChange(P, ctx, newStatus){
	if(newStatus === 'dealing'){
		let turn = P.players[ P.gameData.dealer ];
		if(turn)
			ctx.replyWithHTML(`<b>${turn.userName}</b> Debe repartir`);
	} else {
		console.log('Unhandled status', newStatus);
	}

}
module.exports = statusChange;