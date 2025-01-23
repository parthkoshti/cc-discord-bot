# Finance Daddy is back

![](/public/images/big-missing.png)

## How to use

1. Clone the repo
2. Install dependencies
3. Create a `.env` file in the root directory and add the following variables:

```
DISCORD_BOT_TOKEN=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
```

4. Set your `responsePairs` in `src/responsePairs.ts`
5. Run `npm run dev` for local development. `npm run build` for production.
6. Install the bot on your server using the following link:

```
https://discord.com/oauth2/authorize?client_id=<YOUR_DISCORD_CLIENT_ID_HERE>&permissions=309237697600&integration_type=0&scope=bot
```

## How it works

The bot listens for messages specified in `responsePairs.listenFor` and responds with the messages specified in `responsePairs.responses`. Responses are randomly selected from the array.

You can add as many pairs as you want. Each pair can have multiple triggering keywords and key-phrases, as well as multiple responses.

## For CC Mods

Shoot me a DM @iambeanmachine on Discord and I'll send you a link to the bot I've set up for the CC! :D

And if you want to add your own triggering keywords and responses, please let me know—it's no trouble at all!

## Contributing

Pull requests are welcome :)
