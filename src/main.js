import { sum, sayHello } from './lib/sampleLib.js'
import { Markup, Telegraf } from 'telegraf';
import { botToken } from './config.js';

await run()

async function run() {
	console.log('start')

	//Lib example
	console.log(sum(5, 10))
	const name = 'test'
	console.log(sayHello(name))


	//Bot example
	const bot = new Telegraf(botToken);

	//Simple command /hello
	bot.command('hello', ctx => {
		console.log('it\'s command hello')
		ctx.reply(`Hello ${ctx.message.from.first_name + ' ' + ctx.message.from.last_name}`)
	})

	//Command /keyboard to show keyboard
	bot.command('keyboard', ctx => {
		console.log('it\'s command keyboard')

		const keyboard = [
			['1.1', '1.2'],
			['2.1', '2.2', '2.3'],
			[Math.random().toString()]]
		const tgKeyboard = Markup.keyboard(keyboard);

		ctx.reply('Here keyboard', tgKeyboard)
	})

	//Command /remove_keyboard to remove keyboard
	bot.command('remove_keyboard', ctx => {
		console.log('it\'s command remove keyboard')
		ctx.reply('Keyboard removed', Markup.removeKeyboard())
	})

	//Command /inline_keyboard to send inline keyboard
	bot.command('inline_keyboard', ctx => {
		console.log('it\'s command send inline keyboard')

		const keyboard = [
			[Markup.button.callback('1.1', '1.1'), Markup.button.callback('1.2', '1.2')],
			[Markup.button.callback('2.1', '2.1'), Markup.button.callback('2.2', '2.2'), Markup.button.callback('2.3', '2.3')],
			[Markup.button.callback(Math.random().toString(), 'random')],
		]
		const tgKeyboard = Markup.inlineKeyboard(keyboard);

		ctx.reply('Here inline keyboard', tgKeyboard)
	})


	//Simple echo text
	bot.on('text', ctx => {
		ctx.reply(ctx.update.message)
	})

	//Answer callback query button
	bot.on('callback_query', ctx => {
		const data = ctx.update.callback_query.data

		ctx.answerCbQuery(`You choose ${data}`);
		ctx.editMessageText(`You choose ${data}`)
		console.log(`Chosen data: ${data}`);
	})


	await bot.launch();
}



