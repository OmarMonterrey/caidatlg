function dealt(P, ctx, messageStack){
	messageStack.push({
		chatId: ctx.message.chat.id,
		content: `Cartas repartidas`
	});
}
module.exports = dealt;