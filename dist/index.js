'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function parse(str, ctx) {
    var out = "";
    var count = str.length;
    var i = 0;
    var quoted = false;
    var literal = false;
    var start = 0;
    while (i < count) {
        var key = str[i];
        i++;
        if (key === "\"") {
            if (!quoted) {
                start = i - 1;
            }
            else {
                out += str.substr(start, i - start);
            }
            quoted = !quoted;
        }
        else {
            if (quoted)
                continue;
            var isOperator = (key === "," || key === "/" || key === "*" || key === "+" || key === "-" || key === "(" || key === ")");
            var isSpace = (key === " " || key === "\t" || key === " \n" || key === "\r");
            if (literal) {
                if (isOperator || isSpace) {
                    // literal end
                    var word = str.substr(start, i - start - 1);
                    if (key === "(")
                        out += ctx.method(word);
                    else
                        out += ctx.property(word);
                    literal = false;
                }
                else {
                    continue;
                }
            }
            // ignore whitespaces
            if (isSpace)
                continue;
            // allowed operator
            if (isOperator)
                out += key;
            else {
                var isNumber = (key === "0" || key === "1" || key === "2" || key === "3" || key === "4" || key === "5" || key === "6" || key === "7" || key === "8" || key === "9");
                if (isNumber)
                    out += key;
                else {
                    // literal start
                    literal = true;
                    start = i - 1;
                }
            }
        }
    }
    // literal end
    if (literal)
        out += ctx.property(str.substr(start, i - start));
    return out;
}
function compile(str, ctx) {
    return new Function(ctx.propertyName, ctx.methodName, ctx.contextName, "return " + parse(str, ctx));
}

exports.compile = compile;
exports.parse = parse;
//# sourceMappingURL=index.js.map
