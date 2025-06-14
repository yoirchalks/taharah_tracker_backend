import { prisma } from "./prismaClient.js";

function addLocations(data) {
  try {
    prisma.locations.createMany({
      data,
    });
  } catch (err) {
    console.log(err);
  }
}

addLocations([
  {
    location: "london",
    code: 2643743,
  },
  {
    location: "manchester",
    code: 2643123,
  },
  {
    location: "gateshead",
    code: 2648773,
  },
  {
    location: "jerusalem",
    code: 281184,
  },
  {
    location: "meron",
    code: 294258,
  },
  {
    location: "eilat",
    code: 295277,
  },
]);
