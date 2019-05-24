import { DateTime } from 'luxon';

export const now = () => Math.floor(Date.now()/1000);
export const nDaysAgo = (n) => DateTime.fromSeconds(now()).minus({days: n}).toSeconds();
