# Prescurity Dashboard

Prescurity dashboard.       
Digital mockup can be found here: [Maquette Figma](https://www.figma.com/file/IyhCpbbaLwfUO4TRwOuBGF/Prescurity?node-id=1%3A10402)

## Stack
### Platform 📑
- [NextJS (React Framework)](https://nextjs.org/)
### UI (User Interaction) 🎨
- [chakraUI (Component library)](https://chakra-ui.com/)
### Deployment 🚀
- [Vercel (Deploy platform)](https://vercel.com/home)
### Coding style 🔨
- [Typescript support (Typed Javascript)](https://www.typescriptlang.org/)
### Blockchain support ⛓
- [Web3.js (Ethereum support)](https://web3js.readthedocs.io/en/v1.3.4/getting-started.html)
### Database 💿
- [Realtime Database (Cloud Hosted NoSQL database)](https://firebase.google.com/docs/database/web/start)
### Blockchain wallet 💰
- [Metamask](https://metamask.io/)

## How-to-use
- `git pull https://github.com/azerpas/prescurity-dashboard.git`
- `yarn install` ([Install yarn before](https://classic.yarnpkg.com/en/docs/install/#mac-stable))
- `cp .env.example .env.local`
- Modify the `.env.local` variables with the right ones
- `yarn dev`
- Navigate to `http://localhost:3000`

## Notes

Chakra has supported Gradients and RTL in `v1.1`. To utilize RTL, [add RTL direction and swap](https://chakra-ui.com/docs/features/rtl-support).

If you don't have multi-direction app, you should make `<Html lang="ar" dir="rtl">` inside `_document.ts`.
