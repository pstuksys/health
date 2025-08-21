import * as migration_20250819_201233 from './20250819_201233';
import * as migration_20250821_213539 from './20250821_213539';

export const migrations = [
  {
    up: migration_20250819_201233.up,
    down: migration_20250819_201233.down,
    name: '20250819_201233',
  },
  {
    up: migration_20250821_213539.up,
    down: migration_20250821_213539.down,
    name: '20250821_213539'
  },
];
