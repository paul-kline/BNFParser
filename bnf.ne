bnf -> rule | rule multinewline bnf
multinewline -> "\n":+ {% function(d) {return null } %}
rule -> nonterminal _+ "::=" _+ rulebody
nonterminal -> "<" ident ">"
ident -> [a-zA-Z]:+
rulebody -> case | case _+ "|" _+ rulebody
case -> term | term _+ case | "(" case ")" | case esym
esym -> "+" | "?" | "*"
term -> nonterminal | terminal
terminal -> "\"" validterminal:+ "\"" | regex
regex -> "[" range "]"
range -> numrange | letterrange
numrange -> digit "-" digit
letterrange -> letter "-" letter
digit -> [0-9]
letter -> [a-zA-Z]
validterminal -> [a-zA-Z0-9] | symbol
symbol ->  "|" | " " | "-" | "!" | "#" | "$" | "%" 
| "&" | "(" | ")" | "*" | "+" | "," | "-" | "." 
| "/" | ":" | ";" | ">" | "=" | "<" | "?" | "@" 
| "[" | "\\" | "]" | "^" | "_" | "`" | "{" | "}" | "~"
_+ -> [\s]:+     {% function(d) {return null } %}
_ -> [\s]:*     {% function(d) {return null } %}
