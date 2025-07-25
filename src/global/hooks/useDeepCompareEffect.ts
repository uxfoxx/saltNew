import React from 'react';
import deepEqual from 'lodash/isEqual';

type UseEffectParamsType = Parameters<typeof React.useEffect>;
type EffectCallbackType = UseEffectParamsType[0];
type DependencyListType = UseEffectParamsType[1];

// yes, I know it's void, but I like what this communicates about
// the intent of these functions: It's just like useEffect
type UseEffectReturn = ReturnType<typeof React.useEffect>;

/**
 * The checkDeps function checks if the dependency list is valid for use with useDeepCompareEffect.
 * It throws an error if the dependency list is empty or contains only primitive values.
 */
function checkDeps(deps: DependencyListType) {
	if (!deps || !deps.length) {
		throw new Error('useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.');
	}
	if (deps.every(isPrimitive)) {
		throw new Error(
			'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
		);
	}
}

/**
 * The isPrimitive function checks if a value is a primitive type.
 * It returns true if the value is null, undefined, a string, a boolean, or a number.
 */
function isPrimitive(val: unknown) {
	return val == null || /^[sbn]/.test(typeof val);
}

/**
 * The isPrimitive function checks if a value is a primitive type.
 * It returns true if the value is null, undefined, a string, a boolean, or a number.
 */
export function useDeepCompareMemoize<T>(value: T) {
	const ref = React.useRef<T>(value);
	const signalRef = React.useRef<number>(0);

	if (!deepEqual(value, ref.current)) {
		ref.current = value;
		signalRef.current += 1;
	}

	return React.useMemo(() => ref.current, []);
}

/**
 * The isPrimitive function checks if a value is a primitive type.
 * It returns true if the value is null, undefined, a string, a boolean, or a number.
 */
function useDeepCompareEffect(callback: EffectCallbackType, dependencies: DependencyListType): UseEffectReturn {
	if (process.env.NODE_ENV !== 'production') {
		checkDeps(dependencies);
	}

	return React.useEffect(callback, [callback]);
}

export function useDeepCompareEffectNoCheck(
	callback: EffectCallbackType,
	dependencies: DependencyListType
): UseEffectReturn {
	return React.useEffect(callback, [callback]);
}

export default useDeepCompareEffect;
