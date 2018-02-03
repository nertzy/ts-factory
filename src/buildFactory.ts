import * as assign from "lodash.assign";

export function buildFactory<T extends object>(defaultObject: T): (overrides?: Partial<T>) => T {
    return (overrides?: Partial<T>) => assign({}, defaultObject, overrides);
}
