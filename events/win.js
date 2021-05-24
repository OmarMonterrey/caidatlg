function win(P, ctx, messageStack, userIndex){
	let person  = P.players[ userIndex ];
	if(person){
		messageStack.push({
			chatId: ctx.message.chat.id,
			content: `<b>${person.userName} ganó!!!</b>`
		});
	}
}
module.exports = win;