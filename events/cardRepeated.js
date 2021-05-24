function cardRepeated(P, ctx, messageStack){
	messageStack.push({
		chatId: ctx.message.chat.id,
		content: `Carta repetida`
	});
}
module.exports = cardRepeated;