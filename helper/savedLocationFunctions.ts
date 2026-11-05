// The app remembers the last five locations searched
export const MAX_SAVED_LOCATIONS = 5;

// Puts the new location first, removes duplicates, and keeps only the most recent MAX_SAVED_LOCATIONS
const addLocation = (newLocation: string, userLocations: string[]) => {
  return Array.from(new Set([newLocation, ...userLocations])).slice(0, MAX_SAVED_LOCATIONS);
}

export {
  addLocation
}
