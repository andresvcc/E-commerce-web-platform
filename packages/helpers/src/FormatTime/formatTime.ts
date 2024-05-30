import { formatTimes } from './types';

export const formatTime: formatTimes = (uptimeSeconds: number) => {
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInMonth = secondsInDay * 30; // Suponiendo un mes de 30 días
  const secondsInYear = secondsInDay * 365; // Suponiendo un año de 365 días

  const years = Math.floor(uptimeSeconds / secondsInYear);
  const months = Math.floor((uptimeSeconds % secondsInYear) / secondsInMonth);
  const days = Math.floor((uptimeSeconds % secondsInMonth) / secondsInDay);
  const hours = Math.floor((uptimeSeconds % secondsInDay) / secondsInHour);
  const minutes = Math.floor((uptimeSeconds % secondsInHour) / secondsInMinute);
  const seconds = Math.floor(uptimeSeconds % secondsInMinute);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};

export const toFormatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // El mes comienza desde 0, por lo que se suma 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
