import { Time } from '../shared/constants';

export function isString (string) {
  return typeof string === 'string' || string instanceof String;
}

export function breakDownTimeDiff(timeDiff) {
  return {
    days: Math.floor(timeDiff / Time.DAY),
    hours: Math.floor((timeDiff % Time.DAY) / Time.HOUR),
    minutes: Math.floor((timeDiff % Time.HOUR) / Time.MINUTE),
    seconds: Math.floor((timeDiff % Time.MINUTE) / Time.SECOND),
  };
}
