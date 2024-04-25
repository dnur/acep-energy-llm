declare type fnType = (...args: any[]) => void;
declare type DebounceInstance = fnType & {
    cancel: () => void;
};
declare class DebounceManager {
    debounceCache: Record<string, DebounceInstance>;
    /**
     * Dynamically debounce and cache a debounced version of a function at the time of calling that function. This avoids
     * managing debounced version of functions locally.
     *
     * In other words, debounce usually works by debouncing based on
     * referential identity of a function. This works by comparing provided function names.
     *
     * This also has the ability to short-circuit a debounce all-together, if no wait
     * time is provided.
     *
     * Assumption:
     * Functions are debounced on a combination of unique function name and wait times. So debouncing won't work on
     * subsequent calls with different wait times or different functions. That also means that the debounce manager
     * can be used for different functions in parallel, and keep the two functions debounced separately.
     *
     * @param {number} wait Milliseconds to debounce. Executes immediately if falsey.
     * @param {function} fn Function to debounce
     * @param {function} functionName Name of function to debounce, used to create a unique key
     * @param {...any} parameters Parameters to pass to function
     */
    runWithDebounce(wait: number, functionName: string, fn: fnType, ...parameters: any[]): void;
    /**
     * Cancels existing debounced function calls.
     *
     * This will cancel any debounced function call, regardless of the debounce length that was provided.
     *
     * For example, making the following series of calls will create multiple debounced functions, because
     * they are cached by a combination of unique name and debounce length.
     *
     * runWithDebounce(1000, "_updateSearchResults", this._updateSearchResults)
     * runWithDebounce(500, "_updateSearchResults", this._updateSearchResults)
     * runWithDebounce(1000, "_updateSearchResults", this._updateSearchResults)
     *
     * Calling the following will cancel all of those, if they have not yet executed:
     *
     * cancelByName("_updateSearchResults")
     *
     * @param {string} functionName The name of the function that was debounced. This needs to match exactly what was provided
     * when runWithDebounce was called originally.
     */
    cancelByName(functionName: string): void;
    /**
     * Perform a standard debounce
     *
     * @param {number} wait Milliseconds to debounce. Executes immediately if falsey.
     * @param {function} fn Function to debounce
     */
    static debounce: (wait: number, fn: fnType) => DebounceInstance;
}
export default DebounceManager;
