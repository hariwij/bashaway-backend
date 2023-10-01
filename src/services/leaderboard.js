import { startCase } from 'lodash';
import { getLeaderboardSettings } from '@/repository/settings';
import { getLeaderboardData } from '@/repository/user';
import { faker } from '@faker-js/faker';

export const getLeaderboardRankings = async () => {
  const { freezed, freeze_at: freezeAt, freeze_vanguard: freezeVanguard } = await getLeaderboardSettings();
  const records = await getLeaderboardData();
  if (freezed) {
    const freezeDate = new Date(freezeAt);
    const names = new Set();
    for (let i = 0; i < records.length; i++) {
      if (i >= freezeVanguard) {
        break;
      }
      if (new Date() > freezeDate) {
        let name = faker.science.chemicalElement().name;
        while (names.has(name)) {
          name = faker.science.chemicalElement().name;
          names.add(name);
        }
        records[i].name = name;
        records[i].score = '????';
        records[i].name = name;
        records[i].university = startCase(faker.science.chemicalElement().symbol.toUpperCase());
        records[i].email = `${name.toLowerCase()}@bashaway.io`;
      }
    }
  }
  return records;
};
