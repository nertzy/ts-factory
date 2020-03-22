export function buildFactory<T extends object>(defaultObject: T): (overrides?: Partial<T>) => T {
    return (overrides?: Partial<T>) => Object.assign({}, defaultObject, overrides);
}
