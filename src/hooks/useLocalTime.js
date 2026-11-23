import { useEffect, useState } from 'react';

/** Live HH:MM clock for a given IANA time zone, updated every 15s. */
export function useLocalTime(timeZone) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-IN', { timeZone, hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date());
  const [time, setTime] = useState(fmt);

  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}
