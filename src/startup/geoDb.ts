import { GeoDb } from "@hebcal/geo-sqlite";

let locationDb: GeoDb | null = null;

export function initGeoDb() {
  locationDb = new GeoDb(console, "zips.sqlite3", "geonames.sqlite3");

  process.on("SIGINT", () => {
    cleanup();
    process.exit();
  });

  process.on("SIGTERM", () => {
    cleanup();
    process.exit();
  });
}

function cleanup() {
  if (locationDb) {
    locationDb.close();
    console.log("Geo DB closed.");
  }
}

export function getLocationDb(): GeoDb | null {
  if (locationDb === null) {
    throw Error("db not initialized");
  }
  return locationDb;
}
