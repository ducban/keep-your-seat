import { format, toZonedTime } from 'date-fns-tz';

/**
 * Get current time in a specific timezone
 * @param timezone - IANA timezone (e.g., 'Asia/Ho_Chi_Minh')
 * @returns Date object in the specified timezone
 */
export function getTimeInTimezone(timezone: string): Date {
  return toZonedTime(new Date(), timezone);
}

/**
 * Format time for display in a specific timezone
 * @param date - Date object or ISO string
 * @param timezone - IANA timezone
 * @param formatString - Format string (default: 'HH:mm')
 * @returns Formatted time string
 */
export function formatTimeInTimezone(
  date: Date | string,
  timezone: string,
  formatString: string = 'HH:mm'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(toZonedTime(dateObj, timezone), formatString, { timeZone: timezone });
}

/**
 * Format date for display in a specific timezone
 * @param date - Date object or ISO string
 * @param timezone - IANA timezone
 * @param formatString - Format string (default: 'MMM dd, yyyy')
 * @returns Formatted date string
 */
export function formatDateInTimezone(
  date: Date | string,
  timezone: string,
  formatString: string = 'MMM dd, yyyy'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(toZonedTime(dateObj, timezone), formatString, { timeZone: timezone });
}

/**
 * Get timezone offset string (e.g., 'GMT+7')
 * @param timezone - IANA timezone
 * @returns Timezone offset string
 */
export function getTimezoneOffset(timezone: string): string {
  const now = new Date();
  const zonedTime = toZonedTime(now, timezone);
  const offsetMinutes = zonedTime.getTimezoneOffset();
  const offsetHours = Math.abs(offsetMinutes / 60);
  const sign = offsetMinutes <= 0 ? '+' : '-';

  return `GMT${sign}${Math.floor(offsetHours)}`;
}

/**
 * Format full date and time for display
 * @param date - Date object or ISO string
 * @param timezone - IANA timezone
 * @returns Formatted date and time string
 */
export function formatFullDateTime(
  date: Date | string,
  timezone: string
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(
    toZonedTime(dateObj, timezone),
    'MMM dd, yyyy HH:mm',
    { timeZone: timezone }
  );
}
