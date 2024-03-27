class AssertionError extends Error {
    constructor(message?: string) {
        super();
        this.name = "AssertionError";
        this.message = message ?? "AssertionError";
    }
}

export function equals<T>(a: T, b: T) {
    if (a !== b) throw new AssertionError(`${a} does not strictly equal ${b}`);
}

export function matches(a: string, pattern: RegExp) {
    if (!pattern.test(a)) throw new AssertionError();
}

export function isAmong<T>(
    value: T,
    options: readonly T[]
): asserts value is (typeof options)[number] {
    for (const option of options) {
        if (value == option) {
            return;
        }
    }

    throw new AssertionError(`${value} is not among [${options}]`);
}
