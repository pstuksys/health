import * as migration_20250819_201233 from './20250819_201233';
import * as migration_20250821_213539 from './20250821_213539';
import * as migration_20250831_204056 from './20250831_204056';
import * as migration_20250901_193007 from './20250901_193007';
import * as migration_20250902_192230 from './20250902_192230';

export const migrations = [
  {
    up: migration_20250819_201233.up,
    down: migration_20250819_201233.down,
    name: '20250819_201233',
  },
  {
    up: migration_20250821_213539.up,
    down: migration_20250821_213539.down,
    name: '20250821_213539',
  },
  {
    up: migration_20250831_204056.up,
    down: migration_20250831_204056.down,
    name: '20250831_204056',
  },
  {
    up: migration_20250901_193007.up,
    down: migration_20250901_193007.down,
    name: '20250901_193007',
  },
  {
    up: migration_20250902_192230.up,
    down: migration_20250902_192230.down,
    name: '20250902_192230'
  },
];
