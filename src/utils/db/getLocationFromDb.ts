import type { GeoDb } from "@hebcal/geo-sqlite";
import { getLocationDb } from "../../startup/geoDb.js";
import { GeoLocation } from "@hebcal/core";

export default async function getLocationFromDb(geoNameId: number) {
  const db = getLocationDb() as GeoDb;
  const location = await db.lookupGeoname(geoNameId);
  return location;
}

export async function getLocationFromId(geoNameId: number) {
  const loc = await getLocationFromDb(geoNameId);
  return new GeoLocation(
    loc.name,
    loc.latitude,
    loc.longitude,
    loc.elevation,
    loc.timeZoneId
  );
}
