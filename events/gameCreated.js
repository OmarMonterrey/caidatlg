function gameCreated(P, ctx){
	let Dealer = P.players[ P.gameData.dealer ].userName;
	ctx.reply(`${Dealer} las está dando.`);
}
module.exports = gameCreated;