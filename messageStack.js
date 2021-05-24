class messageStack{
	constructor(){
		this.messages = [];
	}
	push(data){
		this.messages.push(data);
	}
	get(){
		let sendNow = {};
		this.messages.forEach(singleMessage => {
			if(typeof sendNow[ singleMessage.chatId ] === 'undefined') sendNow[ singleMessage.chatId ] = [];
			sendNow[ singleMessage.chatId ].push( singleMessage.content );
		})
		this.messages = [];
		return sendNow;
	}

}
module.exports = messageStack;