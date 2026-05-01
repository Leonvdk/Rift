import * as migration_20260429_184501 from './20260429_184501';
import * as migration_20260429_215943 from './20260429_215943';
import * as migration_20260429_223251 from './20260429_223251';
import * as migration_20260429_225806 from './20260429_225806';
import * as migration_20260430_055242 from './20260430_055242';
import * as migration_20260430_102129 from './20260430_102129';
import * as migration_20260501_132610 from './20260501_132610';
import * as migration_20260501_144222 from './20260501_144222';

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
    name: '20260429_225806',
  },
  {
    up: migration_20260430_055242.up,
    down: migration_20260430_055242.down,
    name: '20260430_055242',
  },
  {
    up: migration_20260430_102129.up,
    down: migration_20260430_102129.down,
    name: '20260430_102129',
  },
  {
    up: migration_20260501_132610.up,
    down: migration_20260501_132610.down,
    name: '20260501_132610',
  },
  {
    up: migration_20260501_144222.up,
    down: migration_20260501_144222.down,
    name: '20260501_144222'
  },
];
