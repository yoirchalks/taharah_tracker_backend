import db from "../startup/geoDb.js";

export default async function (geoNameId: number) {
  return await db?.lookupGeoname(geoNameId);
}
