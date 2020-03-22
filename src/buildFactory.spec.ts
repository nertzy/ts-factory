import {buildFactory} from "./buildFactory";

describe("a factory function with a complete default object", () => {
    interface MyType {
        field1: number;
        field2?: number;
    }

    let defaultObject: MyType;
    let factory: (overrides?: Partial<MyType>) => MyType;

    beforeEach(() => {
        defaultObject = {
            field1: 1,
            field2: 2
        };

        factory = buildFactory<MyType>(defaultObject);
    });

    it("returns a copy of the default object when called with no parameters", () => {
        expect(factory()).toEqual(defaultObject);
        expect(factory()).not.toBe(defaultObject);
    });

    it('applies overrides that are passed in', () => {
        expect(factory({field1: 3})).toEqual({field1: 3, field2: 2});
        expect(factory({field2: 3})).toEqual({field1: 1, field2: 3});
        expect(factory({field1: 3, field2: 4})).toEqual({field1: 3, field2: 4});
    });
});

describe("a factory function with an incomplete default object", () => {
    interface MyType {
        field1: number;
        field2?: number;
    }

    let defaultObject: MyType;
    let factory: (overrides?: Partial<MyType>) => MyType;

    beforeEach(() => {
        defaultObject = {
            field1: 1,
        };

        factory = buildFactory<MyType>(defaultObject);
    });

    it("returns a copy of the default object when called with no parameters", () => {
        expect(factory()).toEqual(defaultObject);
        expect(factory()).not.toBe(defaultObject);
    });

    it('applies overrides that are passed in', () => {
        expect(factory({field1: 3})).toEqual({field1: 3});
        expect(factory({field2: 3})).toEqual({field1: 1, field2: 3});
        expect(factory({field1: 3, field2: 4})).toEqual({field1: 3, field2: 4});
    });
});
