/**
 * Report a autocomplete suggestion click through event. A click through event is when a user
 * clicks on a suggestion within an autocomplete Dropdown.
 *
 * @param suggestionQuery String The suggestion query that was
 * clicked
 * @param position Number The position of the suggestion query. Zero based.
 * @param tag Array[String] Optional Tags which can be used to categorize
 * this click event
 */
export default function trackAutocompleteSuggestionClickThrough(suggestionQuery: string, position: number, tags?: string[]): void;
