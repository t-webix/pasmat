interface MathContext {
    propertyName: string;
    methodName: string;
    contextName: string;
    property: (word: string) => string;
    method: (word: string) => string;
}
declare type MathEvaluator = (d: Object, m: Object) => number | string;
export declare function parse(str: string, ctx: MathContext): string;
export declare function compile(str: string, ctx: MathContext): MathEvaluator;
export {};
