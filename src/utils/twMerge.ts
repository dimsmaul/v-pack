// src/utils/twMerge.ts

/**
 * Check if value is a plain object (not array, null, or other types)
 */
const isPlainObject = (item: any): boolean => {
  return (
    item !== null &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    !(item instanceof Date) &&
    !(item instanceof RegExp)
  );
};

/**
 * Deep merge utility for Tailwind config objects
 * Handles nested objects, arrays, null, and undefined values
 *
 * @param target - The base object (default theme)
 * @param source - The override object (custom theme)
 * @returns Merged object with deep merge applied
 *
 * @example
 * ```typescript
 * const defaultTheme = {
 *   colors: { primary: { 500: '#blue' }, secondary: { 500: '#gray' } }
 * };
 * const customTheme = {
 *   colors: { primary: { 500: '#red' } }
 * };
 * const merged = twMerge(defaultTheme, customTheme);
 * // Result: { colors: { primary: { 500: '#red' }, secondary: { 500: '#gray' } } }
 * ```
 */
export const twMerge = (target: any, source: any): any => {
  // Handle null or undefined source
  if (source === null || source === undefined) {
    return target;
  }

  // Handle null or undefined target
  if (target === null || target === undefined) {
    return source;
  }

  // If both are not plain objects, source wins
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return source;
  }

  // Create shallow copy of target to avoid mutation
  const output = { ...target };

  // Iterate through source keys
  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = target[key];

    // Handle arrays - replace instead of merge
    if (Array.isArray(sourceValue)) {
      output[key] = [...sourceValue];
      return;
    }

    // If source value is a plain object, recursively merge
    if (isPlainObject(sourceValue)) {
      if (isPlainObject(targetValue)) {
        // Both are objects - deep merge them
        output[key] = twMerge(targetValue, sourceValue);
      } else {
        // Target is not object - use source
        output[key] = twMerge({}, sourceValue);
      }
    } else {
      // Primitive value - source wins
      output[key] = sourceValue;
    }
  });

  return output;
};

/**
 * Merge multiple theme configs at once
 * Useful for merging base + multiple override themes
 *
 * @param configs - Array of config objects to merge
 * @returns Single merged config object
 *
 * @example
 * ```typescript
 * const merged = twMergeAll([baseTheme, pluginTheme, userTheme]);
 * ```
 */
export const twMergeAll = (...configs: any[]): any => {
  return configs.reduce((acc, config) => {
    return twMerge(acc, config);
  }, {});
};
