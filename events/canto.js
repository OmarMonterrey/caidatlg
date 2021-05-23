function canto(P, ctx, userIndex, cantoData){
	let person  = P.players[ userIndex ];
	if(person)
		ctx.replyWithHTML(`${person.userName} cantó <b>${cantoData.name}</b>`);
}
module.exports = canto;