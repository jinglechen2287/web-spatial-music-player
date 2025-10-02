# 📌 Lofi Jingle

![Project Logo](./public/icons/icon-192.png)

This repo demonstrate the possibility of using [WebSpatial](https://webspatial.dev/) & [React](https://react.dev/) to create a Web App and an Apple VisionOS App at the same time in the same codebase. The app itself is a Lofi Music Player with Spatial UI Layout and Animations. 

---

## 📸 Screenshots / Demo

[Demo Video](https://youtu.be/MoEajnh3-uk)

[Vision Pro App TestFlight](https://testflight.apple.com/join/MeMbUqcC)
![Vision Pro App Screenshot](./docs/AVP%20View.webp)  

[Web App](https://lofi-jingle.vercel.app/)
![Web App Screenshot](./docs/Web%20View.webp)  

---

## ✨ Features

- ✅ Play/Pause music
- ✅ Switch between songs
- ✅ Show/Hide music selection carousel
- ✅ Toggle between light and dark mode for the Web experience

---

## 📦 Installation

```bash
npm install
cp .env.example .env.local
```

---

## 🚀 Usage

### Run the web app:

```bash
npm run dev
```

### Run in Vision Pro Simulator:

- Start Dev Server:

```bash
npm run start:avp
```

- Launch in Simulator:

```bash
npm run simulate:avp
```

### Build to Vision Pro:

- Follow Steps in [Build and Publish to VisionOS](https://gist.github.com/dexteryy/9dce5f5b129115f85172f5174f22173d)

- Start Dev Server:

```bash
npm run start:avp
```

- Instead of using the build command from WebSpatial run the following:

```bash
npm run build
npm run deploy:avp
```

### Build Troubleshooting

- Double check your bundle id and team id

- Delete `dist`, `build`, and `node_modules` directories

- Run `npm install` and try building again

- If all of the above doesn't work, there might be some issues with your xcode setup, run `open node_modules/.webspatial-builder-temp/platform-visionos/project/web-spatial.xcodeproj` to open xcode and build from there

### Publish to TestFlight or App Store

- Follow Steps in [Build and Publish to VisionOS](https://gist.github.com/dexteryy/9dce5f5b129115f85172f5174f22173d)

- Build Production Server:

```bash
npm run build:avp
```

- Before Deployment:

```bash
cd dist
touch vercel.json
```

 - vercel.json content:
```json
{
  "routes": [
    {
      "src": "/webspatial/avp/(.*)",
      "dest": "/webspatial/avp/$1"
    }
  ]
}
```

- Deploy to Vercel (assuming you have vercel cli installed):

```bash
vercel --prod
```

- Now, if you go to `$BASEURL.vercel.app/webspatial/avp`, you should see the web experience

- In `.env.local`, set `XR_PROD_SERVER` to your `$BASEURL.vercel.app/webspatial/avp`

- Publish

```bash
npm run publish:avp
```

---

## 📚 Resources

- ✅ [WebSpatial Starter](https://github.com/jinglechen2287/webspatial-starter)
- ✅ [Build and Publish to VisionOS](https://gist.github.com/dexteryy/9dce5f5b129115f85172f5174f22173d)
- 🔘 Create a WebSpatial Project (Coming Soon)
- 🔘 Setup dotenv & npm scripts (Coming Soon)
- 🔘 More...

---

## 🛠️ Tech Stack

- ⚡ [WebSpatial](https://webspatial.dev/)
- ⚡ [React](https://react.dev/)
- ⚡ [TypeScript](https://www.typescriptlang.org/)
- ⚡ [Vite](https://vite.dev/)
- ⚡ [AnimeJS](https://animejs.com/)

---

## 😕 Known Issues

- Vision Pro App Animation is not as smooth as the Web App
- Vision Pro App Animation would temporally disable and enable border-radius, causing a very subtle visual glitch
- TransformZ, RotateY, and Scale animation doesn't work on Vision Pro App
- Assets are large, but I'm too lazy to deal with it lol
- Web App not mobile-friendly