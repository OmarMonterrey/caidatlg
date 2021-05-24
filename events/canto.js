function canto(P, ctx, messageStack, userIndex, cantoData){
	let person  = P.players[ userIndex ];
	if(person){
		messageStack.push({
			chatId: ctx.message.chat.id,
			content: `${person.userName} cantó <b>${cantoData.name}</b>`
		});
	}
}
module.exports = canto;