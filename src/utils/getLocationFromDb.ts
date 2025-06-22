import type { GeoDb } from "@hebcal/geo-sqlite";
import { getLocationDb } from "../startup/geoDb.js";
import { Location } from "@hebcal/core/dist/esm/location";

export default async function getLocationFromDb(geoNameId: number) {
  const db = getLocationDb() as GeoDb;
  const location = await db.lookupGeoname(geoNameId);
  console.log(location);
  return location;
}

export async function getLocationFromId(geoNameId: number) {
  console.log("function called");

  const loc = await getLocationFromDb(geoNameId);
  const isIsrael = loc.cc === "IL";
  console.log(
    `lat: ${loc.lat}. long: ${loc.long}, isIsrael: ${isIsrael}, tzid: ${loc.tzid}`
  );

  return new Location(
    loc.latitude,
    loc.longitude,
    isIsrael,
    loc.tzid,
    loc.name,
    loc.cc,
    loc.geoNameId
  );
}
