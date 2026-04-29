import * as migration_20260429_184501 from './20260429_184501';
import * as migration_20260429_215943 from './20260429_215943';
import * as migration_20260429_223251 from './20260429_223251';
import * as migration_20260429_225806 from './20260429_225806';

export const migrations = [
  {
    up: migration_20260429_184501.up,
    down: migration_20260429_184501.down,
    name: '20260429_184501',
  },
  {
    up: migration_20260429_215943.up,
    down: migration_20260429_215943.down,
    name: '20260429_215943',
  },
  {
    up: migration_20260429_223251.up,
    down: migration_20260429_223251.down,
    name: '20260429_223251',
  },
  {
    up: migration_20260429_225806.up,
    down: migration_20260429_225806.down,
    name: '20260429_225806'
  },
];
