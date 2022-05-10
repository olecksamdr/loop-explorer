const KEYWORD = "keyword";
const FUNCTION = "function";
const IDENTIFIER = "identifier";
const INDENTATION = "indentation";
const NUMBER_LITERAL = "number-literal";
const BRACE = "brace";
const SYMBOL = "symbol";
const INPUT = "input";

export const TOKEN_TYPES = {
  INPUT,
  BRACE,
  SYMBOL,
  KEYWORD,
  FUNCTION,
  IDENTIFIER,
  INDENTATION,
  NUMBER_LITERAL,
};

export function parse(str) {
  const code = str;

  const spec = [
    [TOKEN_TYPES.KEYWORD, /for|in/y],
    [TOKEN_TYPES.FUNCTION, /range|print/y],
    [TOKEN_TYPES.INPUT, /\{\{(\w+):(\d+)\}\}/y],
    [TOKEN_TYPES.BRACE, /[\(\)\[\]]/y],
    [TOKEN_TYPES.SYMBOL, /[,:]+/y],
    [TOKEN_TYPES.IDENTIFIER, /\w+/y],
    [TOKEN_TYPES.INDENTATION, /\s+/y],
    [TOKEN_TYPES.NUMBER_LITERAL, /\d+/y],
  ];
  const tokens = [];
  let cursor = 0;

  while (cursor < code.length) {
    for (const [type, regexp] of spec) {
      regexp.lastIndex = cursor;
      const value = regexp.exec(code);

      if (value == null) continue;

      if (type === INPUT) {
        tokens.push({
          type,
          name: value[1],
          value: value[2],
        });
      } else {
        tokens.push({
          type,
          value: value[0],
        });
      }

      cursor += value[0].length;
    }
  }

  return tokens;
}
