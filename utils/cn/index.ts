import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The function `cn` in TypeScript merges multiple class values using `clsx` and `twMerge`.
 * @param {ClassValue[]} inputs - The `cn` function takes in an array of `ClassValue` inputs. These
 * inputs are used to generate a combined class string that can be applied to HTML elements for styling
 * purposes. The `clsx` function is used to merge these class values together, and the `twMerge`
 * function is
 * @returns The `cn` function is returning the result of merging the class names passed as arguments
 * using the `clsx` function and then applying Tailwind CSS utility classes using the `twMerge`
 * function.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
