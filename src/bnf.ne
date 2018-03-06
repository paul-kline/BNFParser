bnf -> rule | rule multinewline bnf

multinewline -> "\n":+ {% function(d) {
    return {
             type : "newline",
             value : "\n"
           };
    } 
%}

rule -> nonterminal _+ "::=" _+ rulebody {% function(d) {
    return {
             type : "rule",
             value : {nonterminal : d[0],
                      rulebody : d[4]
                     }
           };
    } 
%}

nonterminal -> "<" ident ">"  {% function(d) {
    return {
             type : "nonterminal",
             value : d[1]
           };
    } 
%}

ident -> [a-zA-Z_]:+ {% function(d) { 
  return  {
     type : "ident",
     value : d[0].join("") 
  }
  } %}

rulebody -> rb2

cases -> caseX {% function(d) {
    return {
             type : "case",
             value : d[0]
           }
    } 
%}


caseX -> "(" _ caseX _ ")" | caseX caseM | caseX wesym | caseM #| caseX wesym  | case1 _+ "|" _+ caseX | case1 _+ caseX | term

caseM -> caseM _+ caseG | caseM _+ "|" _+ caseG | caseG

caseG -> term 

case1 -> "(" _ case1 _ ")" | case1 wesym  | case2 _+ "|" _+ case1 | case2 _+ case1 | term
case2 -> "(" _ case2 _ ")" | case2 wesym  | case3 _+ "|" _+ case2 | case3 _+ case2 | term
case3 -> "(" _ case3 _ ")" | case3 wesym  | case4 _+ "|" _+ case3 | case4 _+ case3 | term
case4 -> "(" _ case4 _ ")" | case3 wesym  | case5 _+ "|" _+ case4 | case5 _+ case4 | term
case5 -> "(" _ case5 _ ")" | case3 wesym  | term _+ "|" _+ case5 | term _+ case5 | term

case6 -> term {% id %}

#rb -> rb2 | "(" _ rb2 _ ")" | rb _+ rb2 | rb _+ "|"  _+ rb2 | rb2 wesym
#rb2 -> term
rb2 -> rb2 _+ t | rb2 _+ "|" _+   t | t
t -> t2 wesym | t2
t2 -> term | "(" _ rb2 _ ")"



#justin says:
#rb -> "(" _ rb2 _ ")" | rb2
#rb2 -> rb2 _+ rb3 | rb3
#rb3 -> rb3 _+ "|" _+ rb4 | rb4
#rb4 -> term | rb 

#rb2 -> rb2 _+ rb3 | rb2 _+ "|" _+ rb3 | rb3
#rb3 ->  rb
#t ->  term | "(" _ rb _ ")" #| rb wesym
#rb -> rb2 | "(" _ rb2 _ ")" | rb _+ rb2 | rb _+ "|"  _+ rb2 | rb2 wesym
#rb2 -> term

#caseP arenthesis
#caseP -> "(" caseP ")" | case1

#case1 -> case1 _+ "||" _+ case2 | case2

#case2 -> nonterminal {% id %} | terminal {% id %}

#wcase -> case2 {% function(d) {
 #   return {
 #            type : "case",
  #           value : d[0]
  #         }
  ##  } 
#%}
#<num> ::= "0" | ([1-9] [0-9]+) ("." [0-9]+)?
#case -> term | term _+ case | "(" case ")" | case wesym
#case -> term  wesym:? | term _+ case | "(" case ")"  wesym:? 
#case2 -> case | case _+ case2
#case -> term  | term _+ case | case _+ "||" _+ case {% function(d){ return [d[0],null,"|",null,d[4]]} %}  |  "(" case ")" | case wesym

#unit -> term {% id %} | term _+ unit | "(" unit ")" | unit wesym
wesym -> esym  {% function(d) {
    return {
             type : "esym", 
             value : d[0]
           };
    } 
%}
esym -> "+" {% id %}| "?" {% id %}| "*"  {% id %}

term -> nonterminal {% id %} | terminal {% id %}

terminal -> terminalstr {% function(d) {
    return {
             type : "terminal", 
             value : d[0]
           };
    } 
%} | regex  {% function(d) {
    return {
             type : "terminal",
             value : d[0]
           };
    } 
%} 

terminalstr -> "\"" validterminal:+  "\"" {% function(d) {return d[1].join(""); } %} #| "'" (validterminal  ):+  "'" {% function(d) {return d[1].join(""); } %}

regex -> "[" range "]"  {% function(d) {return {
    type : "regex",
    value : d.join("")
     } 
    } %}

range -> numrange | letterrange  {% id %}

numrange -> digit "-" digit  {% function(d) {return d.join(""); } %}

letterrange -> letter "-" letter  {% function(d) {return d.join(""); } %}

digit -> [0-9]  {% id %}

letter -> [a-zA-Z]  {% id %}

validterminal -> [a-zA-Z0-9] | symbol  {% id %}

symbol ->  "|" | " " | "-" | "!" | "#" | "$" | "%" 
| "&" | "(" | ")" | "*" | "+" | "," | "-" | "." 
| "/" | ":" | ";" | ">" | "=" | "<" | "?" | "@" 
| "[" | "\\" | "]" | "^" | "_" | "`" | "{" | "}" | "~"  {% id %}

_+ -> [\s]:+     {% function(d) {return null } %}

_ -> [\s]:*     {% function(d) {return null } %}