import * as migration_20260429_184501 from './20260429_184501';
import * as migration_20260429_215943 from './20260429_215943';

export const migrations = [
  {
    up: migration_20260429_184501.up,
    down: migration_20260429_184501.down,
    name: '20260429_184501',
  },
  {
    up: migration_20260429_215943.up,
    down: migration_20260429_215943.down,
    name: '20260429_215943'
  },
];
