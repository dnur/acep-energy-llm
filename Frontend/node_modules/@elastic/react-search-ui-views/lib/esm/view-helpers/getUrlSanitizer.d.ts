/**
 *
 * @param {URL} URLParser URL interface provided by browser https://developer.mozilla.org/en-US/docs/Web/API/URL
 * @param {String} currentLocation String representation of the browser's current location
 */
export default function getUrlSanitizer(URLParser: typeof URL, currentLocation: string): (url: any) => any;
