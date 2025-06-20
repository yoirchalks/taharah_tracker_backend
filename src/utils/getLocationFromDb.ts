import type { GeoDb } from "@hebcal/geo-sqlite";
import { getLocationDb } from "../startup/geoDb.js";

export default async function (geoNameId: number) {
  const db = getLocationDb() as GeoDb;
  return await db.lookupGeoname(geoNameId);
}
