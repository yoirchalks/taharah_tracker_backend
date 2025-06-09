import { prisma } from "./prismaClient.js";

function addLocation(data: { location: string; code: number }[]) {
  try {
    prisma.locations.createMany({
      data,
    });
  } catch (err) {
    console.log(err);
  }
}
