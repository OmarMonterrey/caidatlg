require('dotenv').config()
const Telegraf = require('telegraf').Telegraf;
const bot = new Telegraf(process.env.TOKEN)
const botName = process.env.BOTNAME;
const Partida = require('./core/partida');
const Room = require('./core/room');
const bindEvents = require('./binds.js');
const Stickers = require('./stickers.js');
const MS = require('./messageStack.js');
const tableToImage = require('./tableToImage.js');

let RoomList = {};

function getRoom(groupId, ctx){
	if(RoomList[ groupId ]) return RoomList[ groupId ];
	RoomList[ groupId ] = new Room(groupId);
	return RoomList[ groupId ];
}
function getPerson(from){
	return {
		userId: from.id,
		userName: from.username,
		isAdmin: from._isAdmin
	};
}
function getUserRoom(userId){
	for(singleRoom in RoomList){
		let R = RoomList[ singleRoom ];
		if(R.chairs.findIndex(C => C.userId == userId) != -1)
			return R;
	}
	return false;
}
var messageStack = new MS;

bot.command('quit', (ctx) => {
	ctx.leaveChat()
})

bot.use(function(ctx, next){
	if(!ctx.chat) return next();
	if(ctx.chat.id > 0 ) return next();
	return bot.telegram.getChatAdministrators(ctx.chat.id)
		.then(function(data){
			if( !data || !data.length ) return;
			ctx.from._isAdmin = data.some( adm => adm.user.id === ctx.from.id );
		})
		.catch(console.log)
		.then(_ => next(ctx));
});


bot.on('text', (ctx) => {
	if(ctx.message.chat.type!=='group' && ctx.message.chat.type !=='supergroup'){
		ctx.reply(`Este bot sólo funciona en grupos`).catch(err => console.log(err.on.method))
		return;
	}
	let R = getRoom(ctx.message.chat.id);
	let person = getPerson( ctx.update.message.from );
	let R2 = getUserRoom(person.userId);
	if(R2!==false && R != R2){
		ctx.reply(`${person.userName} ya está jugando en otro grupo!`).catch(err => console.log(err.on.method));
		return;
	}
	let text = ctx.update.message.text;
	let regex = new RegExp(`\@${botName}$`);
	text = text.replace(regex, '');
	if( M = text.match(/\/sentar( [1-4])?/) ){
		let slot = M[1] ? parseInt( M[1] )-1 : false;
		if(R.sit(person, slot) === true){
			ctx.reply('Sentado con éxito :)').catch(err => console.log(err.on.method));
		} else {
			ctx.reply('Error al sentar :(').catch(err => console.log(err.on.method));
		}
	}
	if( M = text.match(/\/echar ([1-4])/) ){
		let slot = parseInt( M[1] )-1;
		if(R.kick(slot) === true){
			ctx.reply('Echado con éxito :)').catch(err => console.log(err.on.method));
		} else {
			ctx.reply('Error al echar :(').catch(err => console.log(err.on.method));
		}
	}
	if( M = text.match(/\/bot( [1-4])?/) ){
		let slot = M[1] ? parseInt( M[1] )-1 : false;
		if(R.addBot(slot) === true){
			ctx.reply('Bot creado con éxito :)').catch(err => console.log(err.on.method));
		} else {
			ctx.reply('Error al crear bot :(').catch(err => console.log(err.on.method));
		}
	}

	if(text === '/gameBot'){
		R.addBot();
		R.addBot();
		R.addBot();
		R.addBot();
		R.start(Partida);
		bindEvents(R.partida, ctx, messageStack);
	}
	if(text === '/parar'){
		if(R.stand(person)){
			ctx.reply('Silla abandonada con éxito :)').catch(err => console.log(err.on.method));
		} else {
			ctx.reply('Error al abandonar silla :(').catch(err => console.log(err.on.method));
		}
	}

	if(text === '/jugadores'){
		let chairs = R.getChairs();
		let response = "";
		Object.entries(chairs).forEach( e => {
			let [number, name] = e;
			response+= `<b>Silla ${number}</b>: ${name}\n`;
		});
		ctx.replyWithHTML(response).catch(err => console.log(err.on.method));
	}






	if(text === '/iniciar' && person.isAdmin){
		if(R.start(Partida) === true){
			ctx.reply('Juego iniciado :)').catch(err => console.log(err.on.method));
			bindEvents(R.partida, ctx, messageStack);
		} else {
			ctx.reply('Error al iniciar :(').catch(err => console.log(err.on.method));
		}
	}

	if(text === '/parejas' && person.isAdmin){
		if(R.start(Partida, true) === true){
			ctx.reply('Juego iniciado :)').catch(err => console.log(err.on.method));
			bindEvents(R.partida, ctx, messageStack);
		} else {
			ctx.reply('Error al iniciar :(').catch(err => console.log(err.on.method));
		}
	}

	if(text === '/detener' && person.isAdmin){
		R.stop();
		ctx.reply('Juego detenido').catch(err => console.log(err.on.method));
	}



	let P = R.partida || false;
	if(text === '/repartir' && P && P.checkTurn(person.userId, true)){
		if(P.deal()!==true){
			ctx.reply('Error al repartir.').catch(err => console.log(err.on.method));
		}
	}
	if( M = text.match(/\/lanzar (1|4)/) && P && P.checkTurn(person.userId, true)){
		P.table( M[1] );
	}

	if( (M = text.match(/\/play ([0-3])/)) && P && P.checkTurn(person.userId)){
		let cartas = R.partida.getHand(person.userId);
		let cardIndex = parseInt( M[1] );
		if(typeof cartas[ cardIndex ] !== 'undefined')
			P.play( cartas[ cardIndex ] );
	}
	if(text === '/puntos' && P){
		let points = P.getPoints();
		let response = "";
		Object.entries(points).forEach( e => {
			let [name, total] = e;
			response+= `<b>${name}</b>: ${total}\n`;
		});
		ctx.replyWithHTML(response).catch(err => console.log(err.on.method));
	}

	if(text === '/mesa' && P){
		ctx.replyWithPhoto( tableToImage(P.gameData.table), {caption: 'Mesa actual', parse_mode:'HTML'} ).catch(err => console.log(err.on.method));
	}

	if(text === '/ayuda'){
		let txt = require('fs').readFileSync('help.txt', 'utf8');
		ctx.replyWithHTML( txt ).catch(err => console.log(err));
	}
})


function createInlineResult(sticker, command){
	return {
		type: "sticker",
		id: Math.random(),
		sticker_file_id: sticker,
		input_message_content: {
			"message_text": command
		}
	}
}
bot.on('inline_query', (ctx) => {
	let defaultResults = [
		createInlineResult(Stickers.action.Sentar1, `/sentar 1@${botName}`),
		createInlineResult(Stickers.action.Sentar2, `/sentar 2@${botName}`),
		createInlineResult(Stickers.action.Sentar3, `/sentar 3@${botName}`),
		createInlineResult(Stickers.action.Sentar4, `/sentar 4@${botName}`),
		createInlineResult(Stickers.action.Abandonar, `/parar@${botName}`),
		createInlineResult(Stickers.action.Jugadores, `/jugadores@${botName}`),
	];
	let userId = ctx.update.inline_query.from.id;
	let R = getUserRoom( userId );
	if(R!==false && R.partida){
		if(R.partida.gameData.status === 'playing'){
			let cartas = R.partida.getHand(userId);
			if(typeof cartas.forEach === 'function'){
				let results = [];
				cartas.forEach((i, k) => {
					results.push( createInlineResult(Stickers.card[i], `/play ${k}@${botName}`));
				})
				ctx.answerInlineQuery(results, {is_personal: true, cache_time: 1})
			}
		}
		else if(R.partida.gameData.status === 'dealing' && R.partida.checkTurn(userId, true)){
			let results = [
				createInlineResult(Stickers.action.Lanzar1, `/lanzar 1@${botName}`),
				createInlineResult(Stickers.action.Lanzar4, `/lanzar 4@${botName}`),
				createInlineResult(Stickers.action.Repartir, `/repartir@${botName}`)
			];
			ctx.answerInlineQuery(results, {is_personal: true, cache_time: 1})
		} else {
			ctx.answerInlineQuery([], {is_personal: true, cache_time: 1});
		}
	} else if(R===false){
		ctx.answerInlineQuery(defaultResults, {is_personal: true, cache_time: 1})
	} else {
		bot.telegram.getChatAdministrators(R.name).then(data => {
			if( !data || !data.length ) return;
			isAdmin = data.some( adm => adm.user.id === ctx.update.inline_query.from.id );
			let results = defaultResults;
			if(isAdmin){
				results.push( createInlineResult(Stickers.action.Kick1, `/kick 1@${botName}`) );
				results.push( createInlineResult(Stickers.action.Kick2, `/kick 2@${botName}`) );
				results.push( createInlineResult(Stickers.action.Kick3, `/kick 3@${botName}`) );
				results.push( createInlineResult(Stickers.action.Kick4, `/kick 4@${botName}`) );
				results.push( createInlineResult(Stickers.action.Iniciar, `/iniciar@${botName}`) );
			}
			ctx.answerInlineQuery(results, {is_personal: true, cache_time: 1})
		})
	}
})

bot.launch();

setInterval(() => {

	let messages = messageStack.get();
	Object.entries(messages).forEach(singleMessage => {
		[chatId, text] = singleMessage;
		text = text.join("\n");
		bot.telegram.sendMessage(chatId, text, {parse_mode: 'HTML'}).catch(err => console.log(err.on.method));
	});


}, 2000);


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
