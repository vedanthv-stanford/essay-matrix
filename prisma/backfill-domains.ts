import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const domainMap: Record<string, string> = {
  "Stanford University": "stanford.edu",
  "Yale University": "yale.edu",
  "University of Arizona": "arizona.edu",
  "University of Texas at Austin": "utexas.edu",
  "University of Washington": "washington.edu",
  // Add more colleges and domains as needed
};

async function main() {
  for (const [name, domain] of Object.entries(domainMap)) {
    await prisma.college.updateMany({
      where: { name },
      data: { domain },
    });
    console.log(`Updated ${name} with domain ${domain}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 