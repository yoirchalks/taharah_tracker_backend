import type { GeoDb } from "@hebcal/geo-sqlite";
import { getLocationDb } from "../startup/geoDb.js";
import { Location } from "@hebcal/core/dist/esm/location";

export default async function getLocationFromDb(geoNameId: number) {
  const db = getLocationDb() as GeoDb;
  const location = await db.lookupGeoname(geoNameId);
  return location;
}

export async function getLocationFromId(geoNameId: number) {
  const loc = await getLocationFromDb(geoNameId);
  const isIsrael = loc.cc === "IL";

  return new Location(
    loc.latitude,
    loc.longitude,
    isIsrael,
    loc.timeZoneId,
    loc.name,
    loc.cc,
    loc.geonameid
  );
}
