import { GeoDb } from "@hebcal/geo-sqlite";

let locationDb: GeoDb | null = null;

export function initGeoDb() {
  locationDb = new GeoDb(console, "zips.sqlite3", "geonames.sqlite3");

  process.on("SIGINT", () => {
    cleanup();
  });

  process.on("SIGTERM", () => {
    cleanup();
  });

  process.on("beforeExit", () => {
    cleanup();
  });
}

function cleanup() {
  if (locationDb) {
    locationDb.close();
    console.log("Geo DB closed.");
  }
}

export default locationDb;
