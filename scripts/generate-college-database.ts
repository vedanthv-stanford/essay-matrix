// generate-college-database.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

interface CollegeRaw {
  name: string;
  usNewsRank: string;
  location: string;
  applicationSystems: string;
  appFeeDomestic: string;
  decisionTypes: string;
  freshmanAcceptanceRate: string;
  transferAcceptanceRate: string;
  testPolicy: string;
  academicCalendar: string;
  undergradPopulation2022: string;
  inStateCOA: string;
  outOfStateCOA: string;
}

(async () => {
  const url = 'https://applyingto.college/resources/complete-university-database';
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  // Adjust selectors to match the table structure on that page:
  const rows = $('table tr').slice(1); // skip header

  const colleges: CollegeRaw[] = [];
  rows.each((_, row) => {
    const tds = $(row).find('td');
    if (tds.length < 13) return; // skip malformed

    colleges.push({
      name:        $(tds[0]).text().trim(),
      usNewsRank:  $(tds[1]).text().trim(),
      location:    $(tds[2]).text().trim(),
      applicationSystems:  $(tds[3]).text().replace(/\n/g, ' / ').trim(),
      appFeeDomestic:      $(tds[4]).text().trim(),
      decisionTypes:       $(tds[5]).text().trim(),
      freshmanAcceptanceRate: $(tds[6]).text().trim(),
      transferAcceptanceRate: $(tds[7]).text().trim(),
      testPolicy:             $(tds[8]).text().trim(),
      academicCalendar:       $(tds[9]).text().trim(),
      undergradPopulation2022: $(tds[10]).text().trim(),
      inStateCOA:             $(tds[11]).text().trim(),
      outOfStateCOA:          $(tds[12]).text().trim(),
    });
  });

  // Build TS file content
  const lines: string[] = [];
  lines.push(`// Generated College Database`);
  lines.push(`export interface CollegeInfo {`);
  lines.push(`  name: string;`);
  lines.push(`  usNewsRank: number;`);
  lines.push(`  location: string;`);
  lines.push(`  applicationSystems: string;`);
  lines.push(`  appFeeDomestic: string;`);
  lines.push(`  decisionTypes: string;`);
  lines.push(`  freshmanAcceptanceRate: string;`);
  lines.push(`  transferAcceptanceRate: string;`);
  lines.push(`  testPolicy: string;`);
  lines.push(`  academicCalendar: string;`);
  lines.push(`  undergradPopulation2022: string;`);
  lines.push(`  inStateCOA: string;`);
  lines.push(`  outOfStateCOA: string;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export const collegeDatabase: CollegeInfo[] = [`);

  for (const c of colleges) {
    lines.push(`  {`);
    lines.push(`    name: ${JSON.stringify(c.name)},`);
    lines.push(`    usNewsRank: ${parseInt(c.usNewsRank)||0},`);
    lines.push(`    location: ${JSON.stringify(c.location)},`);
    lines.push(`    applicationSystems: ${JSON.stringify(c.applicationSystems)},`);
    lines.push(`    appFeeDomestic: ${JSON.stringify(c.appFeeDomestic)},`);
    lines.push(`    decisionTypes: ${JSON.stringify(c.decisionTypes)},`);
    lines.push(`    freshmanAcceptanceRate: ${JSON.stringify(c.freshmanAcceptanceRate)},`);
    lines.push(`    transferAcceptanceRate: ${JSON.stringify(c.transferAcceptanceRate)},`);
    lines.push(`    testPolicy: ${JSON.stringify(c.testPolicy)},`);
    lines.push(`    academicCalendar: ${JSON.stringify(c.academicCalendar)},`);
    lines.push(`    undergradPopulation2022: ${JSON.stringify(c.undergradPopulation2022)},`);
    lines.push(`    inStateCOA: ${JSON.stringify(c.inStateCOA)},`);
    lines.push(`    outOfStateCOA: ${JSON.stringify(c.outOfStateCOA)},`);
    lines.push(`  },`);
  }

  lines.push(`];`);

  const outPath = resolve(process.cwd(), 'college-database.ts');
  writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`✔️  Wrote ${colleges.length} entries to ${outPath}`);
})();
