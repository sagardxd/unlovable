import { prisma } from "../src"

async function SeedData() {
  await prisma.user.createMany({
    data: [
      { email: 'sagardxd@gmail.com', password: 'password123' },
      { email: 'ragasdxd@gmail.com', password: 'password123' },
    ],
  })

  console.log('seed data worked');
}

SeedData();