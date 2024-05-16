import * as React from "react";
import { cn } from "../../../utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnterPress: () => void; // Define a prop for handling Enter key press
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onEnterPress, ...props }, ref) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        onEnterPress(); // Call the onEnterPress function
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onKeyPress={handleKeyPress} // Add onKeyPress event listener
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
