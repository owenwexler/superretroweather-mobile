# SuperRetroWeather
## An open-source 8-bit weather app by Owen Wexler
SuperRetroWeather is an open-source weather app with a twist - an 8-bit retro experience that takes you right back to the good old days of the Nintendo Entertainment System. Just type your location into the search box and you can get a variety of weather data for your city in a fun nostalgic 8-bit package. As an added bonus, the app also remembers the last five locations you visited!

SuperRetroWeather is a single codebase that runs as a native iOS and Android app and as a web app.

## Current Tech Stack
* Language: [TypeScript](https://www.typescriptlang.org/) (strict mode)
* Runtime and package manager: [Bun](https://bun.sh) (`bun.lock` is the lockfile)
* Framework: [Expo](https://expo.dev/) SDK 54 with [React Native](https://reactnative.dev/) 0.81 and React 19, New Architecture enabled
* Routing: [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routes in `app/`)
* Bundler: [Metro](https://metrobundler.dev/) (native and web)
* Web target: [react-native-web](https://necolas.github.io/react-native-web/), exported as a static site with `expo export --platform web`
* CSS Library: [NativeWind](https://www.nativewind.dev/) 4 (Tailwind CSS 3.4 under the hood), with `tailwind-merge` and `tailwindcss-animate`
* UI Library: none. Buttons, inputs and other primitives are custom, in `components/primitives/`. Several of them use Radix UI on web and a React Native implementation on native
* Icons: [lucide-react-native](https://lucide.dev/guide/packages/lucide-react-native)
* Animation and gestures: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/), [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
* Lists and sheets: [FlashList](https://shopify.github.io/flash-list/) and [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/)
* Client state management: [Jotai](https://jotai.org/)
* Server state and data fetching: [TanStack Query](https://tanstack.com/query) (installed), [Snaxios](lib/snaxios.ts) for the weather endpoint, with the query cache saved to MMKV
* Local persistence: [react-native-MMKV](https://github.com/mrousavy/react-native-mmkv) for saved locations
* Database: [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) with [Drizzle ORM](https://orm.drizzle.team/) (`db/`); the schema is currently empty. On web, Drizzle uses [sql.js](https://sql.js.org/) instead (`db/drizzle.web.ts`)
* Forms and validation: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
* Weather API: [VisualCrossing Weather API](https://www.visualcrossing.com/weather-api/), called through the app's backend (see below)
* Custom font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P), loaded through `@expo-google-fonts/press-start-2p`
* Environment variables: `EXPO_PUBLIC_*` variables read at build time (see [Environment variables](#environment-variables))
* Linting: [ESLint](https://eslint.org/) 9 with `eslint-config-expo`
* Formatting: [Biome](https://biomejs.dev/) (`biome.json`, run via `bun run format`)
* Testing: none yet
* Logging: none
* Error-handling library: none
* CI: none
* Native builds: [EAS](https://expo.dev/eas) is not configured yet (the `projectId` in `app.config.ts` is empty)

## Architecture Notes
* `app/` contains the Expo Router routes. `app/_layout.tsx` sets up the providers (React Query, the database, theme and bottom sheets) and loads the fonts, and `app/index.tsx` renders the home screen.
* `components/` holds the screens and UI, and `components/primitives/` holds the cross-platform building blocks. Files with a `.native.tsx` or `.web.tsx` suffix are picked up automatically by Metro on each platform.
* `store/` holds the Jotai atoms, `lib/` holds shared utilities and the weather API client, `helper/` holds small pure functions, and `typedefs/` holds the TypeScript types for VisualCrossing responses.
* `offlineWeatherData/` contains pre-fetched VisualCrossing responses for several cities, which are useful for working on the UI without spending API calls.
* `server/` and `VC/` contain server-side code left over from the earlier web version of the app. Their Redis cache and VisualCrossing client are the planned backend for the mobile app. The mobile client cannot import them, because they are server-only.

## Setup
1.  Install [Bun](https://bun.sh/). Install the native toolchains you need: Xcode for iOS (macOS only), Android Studio for Android, or a modern browser for web only.
2.  Sign up for a VisualCrossing account and get an API key (instructions below).
3.  Install dependencies by running `bun install`.
4.  Start the Expo dev server with `bun run dev`. Press `w` to open the web version. Native builds need a development build, because `expo-dev-client` is installed and Expo Go is not enough. Use `bun run android` or `bun run ios` to build and install one.
5.  Run `bun run lint` to check for lint errors before you open a pull request.

## Environment Variables
Expo inlines any variable prefixed with `EXPO_PUBLIC_` into the client bundle, so never put secrets in them. Create a `.env` file in the project root (it is gitignored) with:

| Variable | Required | Purpose |
| --- | --- | --- |
| `EXPO_PUBLIC_BASE_API_URL` | Yes | Base URL of the SuperRetroWeather web app, which serves `/api/weather?location=...` (e.g. `http://localhost:3000` in development). Validated with T3-Env in `lib/env.ts`; the app will not start without a valid URL. On the Android emulator use `http://10.0.2.2:3000`, and on a physical device use your computer's LAN IP. |
| `EXPO_PUBLIC_WEATHER_IMAGE_BASE_URL` | No | Base URL for the 8-bit weather images. Defaults to `/images/weather`. |

Restart the dev server after changing `.env`, because Expo reads these values when it starts.

## Accessing the VisualCrossing Weather API
- SuperRetroWeather uses [VisualCrossing's Weather Data Services](https://www.visualcrossing.com/weather/weather-data-services#/login) to retrieve all weather data.
- To get SuperRetroWeather working on your machine, you will have to sign up for a VisualCrossing account at the above site and get an API key. Your API key can be found by clicking the _Account_ tab in the upper right hand corner, and is called your _Account Key_.
- The API key belongs on the backend, not in the app. Put it in the backend's environment, never in an `EXPO_PUBLIC_` variable, because those values ship inside the app bundle.

## Font
SuperRetroWeather uses the [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) font from Google Fonts. It is loaded with `@expo-google-fonts/press-start-2p` and `expo-font`, so the font files are bundled with the app and work offline. Body text uses [Inter](https://fonts.google.com/specimen/Inter) from `@expo-google-fonts/inter`.

## Images
As of September 2024, the current 8-bit weather images are from [Freepik.com](https://www.freepik.com).  The license is a premium commercial license that allows for any use including commercial use and derivative works.  We swapped out the images so we could include them in the repo, which is necessary for them to be hosted on the same server as the app.

## TypeScript
SuperRetroWeather uses [TypeScript](https://www.typescriptlang.org/).  This is non-negotiable.  Any pull requests removing TypeScript from the project will be rejected.

## Scripts
| Command | What it does |
| --- | --- |
| `bun run dev` | Starts the Expo dev server |
| `bun run dev:android` | Starts the dev server with a cleared cache, opening Android |
| `bun run android` | Builds and runs the native Android app |
| `bun run ios` | Builds and runs the native iOS app (macOS only) |
| `bun run build:web` | Exports the static web build |
| `bun run lint` | Runs ESLint |
| `bun run format` | Runs Biome to check, fix and format the code |
| `bun run expo-check` | Checks that installed Expo packages match the SDK version |
