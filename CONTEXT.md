This is a mobile adaptation of the open-source 8-bit-style [SuperRetroWeather](https://superretroweather.onrender.com) web app (Github repo available [here](https://github.com/owenwexler/superretroweather)) converted from a TanStack Start web app to an Expo/React Native mobile app.  SuperRetroWeather uses the [VisualCrossing Weather API](https://www.visualcrossing.com/weather-api/) to get real-time weather information and uses Google's [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) font for a retro 80s Nintendo Entertainment System-style look.

# What Has Been Done So Far
* Scaffold a new Expo project using [the official Expo offline-first starter](https://github.com/expo-starter/expo-local-first-template) and Bun as the runtime.
* Bring in shared logic such as typedefs, helper functions, offline fixtures, API calls, etc. 
* Convert all components syntactically 1:1 from TanStack Start components to Expo components
* During conversion a stub function was used for API responses
* Remove spacers that was keeping text from being obscured by the Navbar in the web app as that was not necessary in the mobile app that was just creating whitespace due to the different way layouts worked
* Replace stub function with actual API call functions used by the web app, which only work in "offline dev" mode on this app for now

# How SuperRetroWeather Works With Data
* User enters in a city in the search bar up top
* The app validates the user input, then:
** checks the in-memory cache for a recent response matching this input
** get the cached response if it exists, but if not, make a fetch request to the VC API for a response, then cache the response for an hour
** if the app is in "offline dev" mode (denoted by DEV_MODE environment variable being set to "offline"), return an offline-mode fixture extracted from actual VC API data on October 31, 2023 instead of live VC responses.  This is so the app can be developed/tested without an internet connection or a VC key and responses can be tested reliably with fixture data.  Fixture data was collected on this day for a handful of cities, and entering a city 
** if no response is found from either the cache or the live response, return an empty response and display a not found message
** response is displayed on the frontend

# Questions

## Caching Strategy
Weather API responses still need to be cached to reduce calls to the rate-limited API.  What caching strategy makes sense for the mobile version of this app?  The SQLite database?  REDIS?  Another in-memory cache tailored for Expo apps?

## The Most Important Consideration - Secrets
The key to the rate-limited VisualCrossing Weather API is a crucial secret that absolutely can not be revealed in app code.  Server-side environment variables worked on the web side, but this is not an option in an entirely client-side mobile app.  So what is the solution?  A professional secrets manager like Hashicorp Vault?  Expo routes/server functions?  Separate backend?  If the latter, how is that to be protected?  For that matter...

## Do We Need A Separate Backend?  
All SuperRetroWeather does is described above in How SuperRetroWeather Works With Data.  A separate backend for this feels excessive --- feels like the only advantage is a shared cache for both web and mobile apps.  How would a separate backend be protected from access outside the app (e.g. Postman or CURL scripts) - API key?  OAuth?

## How To Handle Offline Development With Fixtures?  
Fixtures are located in /offlineWeatherData/VCMockData.  What is the best way to handle these?  Keep them as JSON file fixtures?  Embed them in the SQLite DB?

## FOUC 
There is a long FOUC (Flash Of Unstyled Content) before the font is loaded and that is no good.  Do we need to cover this up with an animated splash screen?
