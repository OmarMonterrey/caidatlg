function points(P, ctx, userIndex, valor, reason){
	let player = P.players[userIndex];
	let message;
	switch(reason){
		case "canto":
			message = "%u sumó %p por canto.";
		break;
		case "caida":
			message = "%u dió caida de %p.";
		break;
		case "clear":
			message = "%u hizo mesa limpia.";
		break;
		case "count":
			message = "%u sumó %p por cartas.";
		break;
		case "guess":
			message = "%u pegó %p.";
		break;
		case "noguess":
			message = "%u obtuvo %p de malhechada.";
		break;
		default:
			message = "%u recibió %p.";
		break;
	}
	message = message.replace("%u", player.userName);
	message = message.replace("%p", (valor == 1 ? "1 punto" : valor + " puntos"));
	ctx.reply(message);
}
module.exports = points;