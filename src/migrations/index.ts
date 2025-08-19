import * as migration_20250819_201233 from './20250819_201233';

export const migrations = [
  {
    up: migration_20250819_201233.up,
    down: migration_20250819_201233.down,
    name: '20250819_201233'
  },
];
