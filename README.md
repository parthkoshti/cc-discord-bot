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

4. Set `listenFor` and `responses` in `index.ts`
5. Run `npm run dev`

## How it works

The bot listens for messages in the channels specified in `listenFor` and responds with the messages specified in `responses`. Responses are randomly selected from the array.

## Contributing

Pull requests are welcome :)
