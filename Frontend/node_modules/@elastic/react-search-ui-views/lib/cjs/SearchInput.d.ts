/// <reference types="react" />
export declare type InputViewProps = {
    getAutocomplete: () => JSX.Element;
    getButtonProps: (additionalProps?: any) => any;
    getInputProps: (additionalProps?: any) => any;
};
declare function SearchInput({ getAutocomplete, getButtonProps, getInputProps }: InputViewProps): JSX.Element;
export default SearchInput;
