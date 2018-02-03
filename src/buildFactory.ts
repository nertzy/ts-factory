export function buildFactory<T>(defaultObject: T): (overrides?:T) => T {
    return () => defaultObject;
}