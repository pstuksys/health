import * as migration_20250815_140259_migrations_first from './20250815_140259_migrations_first';
import * as migration_20250817_222027 from './20250817_222027';

export const migrations = [
  {
    up: migration_20250815_140259_migrations_first.up,
    down: migration_20250815_140259_migrations_first.down,
    name: '20250815_140259_migrations_first',
  },
  {
    up: migration_20250817_222027.up,
    down: migration_20250817_222027.down,
    name: '20250817_222027'
  },
];
