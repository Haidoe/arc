import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const location = await prisma.production.create({
    data: {},
  });
}

console.log(location);

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// model User {
//   id          String       @id @default(auto()) @map("_id") @db.ObjectId
//   externalId  String       @unique
//   created     DateTime     @default(now())
//   email       String       @unique
//   name        String?
//   company     String?
//   title       String?
//   productions Production[]
// }

// model Production {
//   id          String     @id @default(auto()) @map("_id") @db.ObjectId
//   directors   Director[]
//   producers   User?      @relation(fields: [producerId], references: [externalId])
//   producerId  String
//   description String
//   locations   Location[]
//   crews       Crew[]
//   scenes      Scenes[]

//   created DateTime @default(now())
//   updated DateTime @updatedAt

//   report ProductionReport[]
// }
