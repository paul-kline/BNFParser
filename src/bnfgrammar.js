// Generated automatically by nearley, version 2.11.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "bnf", "symbols": ["rule"]},
    {"name": "bnf", "symbols": ["rule", "multinewline", "bnf"]},
    {"name": "multinewline$ebnf$1", "symbols": [{"literal":"\n"}]},
    {"name": "multinewline$ebnf$1", "symbols": ["multinewline$ebnf$1", {"literal":"\n"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "multinewline", "symbols": ["multinewline$ebnf$1"], "postprocess":  function(d) {
        return {
                 type : "newline",
                 value : "\n"
               };
        } 
        },
    {"name": "rule$string$1", "symbols": [{"literal":":"}, {"literal":":"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "rule", "symbols": ["nonterminal", "_+", "rule$string$1", "_+", "rulebody"], "postprocess":  function(d) {
        return {
                 type : "rule",
                 value : {nonterminal : d[0],
                          rulebody : d[4]
                         }
               };
        } 
        },
    {"name": "nonterminal", "symbols": [{"literal":"<"}, "ident", {"literal":">"}], "postprocess":  function(d) {
        return {
                 type : "nonterminal",
                 value : d[1]
               };
        } 
        },
    {"name": "ident$ebnf$1$subexpression$1", "symbols": [/[a-zA-Z_]/]},
    {"name": "ident$ebnf$1$subexpression$1", "symbols": [/[0-9]/]},
    {"name": "ident$ebnf$1", "symbols": ["ident$ebnf$1$subexpression$1"]},
    {"name": "ident$ebnf$1$subexpression$2", "symbols": [/[a-zA-Z_]/]},
    {"name": "ident$ebnf$1$subexpression$2", "symbols": [/[0-9]/]},
    {"name": "ident$ebnf$1", "symbols": ["ident$ebnf$1", "ident$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ident", "symbols": ["ident$ebnf$1"], "postprocess":  function(d) { 
        return  {
           type : "ident",
           value : d[0].join("") 
        }
        } },
    {"name": "rulebody", "symbols": ["rb2"]},
    {"name": "cases", "symbols": ["caseX"], "postprocess":  function(d) {
        return {
                 type : "case",
                 value : d[0]
               }
        } 
        },
    {"name": "caseX", "symbols": [{"literal":"("}, "_", "caseX", "_", {"literal":")"}]},
    {"name": "caseX", "symbols": ["caseX", "caseM"]},
    {"name": "caseX", "symbols": ["caseX", "wesym"]},
    {"name": "caseX", "symbols": ["caseM"]},
    {"name": "caseM", "symbols": ["caseM", "_+", "caseG"]},
    {"name": "caseM", "symbols": ["caseM", "_+", {"literal":"|"}, "_+", "caseG"]},
    {"name": "caseM", "symbols": ["caseG"]},
    {"name": "caseG", "symbols": ["term"]},
    {"name": "case1", "symbols": [{"literal":"("}, "_", "case1", "_", {"literal":")"}]},
    {"name": "case1", "symbols": ["case1", "wesym"]},
    {"name": "case1", "symbols": ["case2", "_+", {"literal":"|"}, "_+", "case1"]},
    {"name": "case1", "symbols": ["case2", "_+", "case1"]},
    {"name": "case1", "symbols": ["term"]},
    {"name": "case2", "symbols": [{"literal":"("}, "_", "case2", "_", {"literal":")"}]},
    {"name": "case2", "symbols": ["case2", "wesym"]},
    {"name": "case2", "symbols": ["case3", "_+", {"literal":"|"}, "_+", "case2"]},
    {"name": "case2", "symbols": ["case3", "_+", "case2"]},
    {"name": "case2", "symbols": ["term"]},
    {"name": "case3", "symbols": [{"literal":"("}, "_", "case3", "_", {"literal":")"}]},
    {"name": "case3", "symbols": ["case3", "wesym"]},
    {"name": "case3", "symbols": ["case4", "_+", {"literal":"|"}, "_+", "case3"]},
    {"name": "case3", "symbols": ["case4", "_+", "case3"]},
    {"name": "case3", "symbols": ["term"]},
    {"name": "case4", "symbols": [{"literal":"("}, "_", "case4", "_", {"literal":")"}]},
    {"name": "case4", "symbols": ["case3", "wesym"]},
    {"name": "case4", "symbols": ["case5", "_+", {"literal":"|"}, "_+", "case4"]},
    {"name": "case4", "symbols": ["case5", "_+", "case4"]},
    {"name": "case4", "symbols": ["term"]},
    {"name": "case5", "symbols": [{"literal":"("}, "_", "case5", "_", {"literal":")"}]},
    {"name": "case5", "symbols": ["case3", "wesym"]},
    {"name": "case5", "symbols": ["term", "_+", {"literal":"|"}, "_+", "case5"]},
    {"name": "case5", "symbols": ["term", "_+", "case5"]},
    {"name": "case5", "symbols": ["term"]},
    {"name": "case6", "symbols": ["term"], "postprocess": id},
    {"name": "rb2", "symbols": ["rb2", "_+", "t"]},
    {"name": "rb2", "symbols": ["rb2", "_+", {"literal":"|"}, "_+", "t"]},
    {"name": "rb2", "symbols": ["t"]},
    {"name": "t", "symbols": ["t2", "wesym"]},
    {"name": "t", "symbols": ["t2"]},
    {"name": "t2", "symbols": ["term"]},
    {"name": "t2", "symbols": [{"literal":"("}, "_", "rb2", "_", {"literal":")"}]},
    {"name": "wesym", "symbols": ["esym"], "postprocess":  function(d) {
        return {
                 type : "esym", 
                 value : d[0]
               };
        } 
        },
    {"name": "esym", "symbols": [{"literal":"+"}], "postprocess": id},
    {"name": "esym", "symbols": [{"literal":"?"}], "postprocess": id},
    {"name": "esym", "symbols": [{"literal":"*"}], "postprocess": id},
    {"name": "term", "symbols": ["nonterminal"], "postprocess": id},
    {"name": "term", "symbols": ["terminal"], "postprocess": id},
    {"name": "terminal", "symbols": ["terminalstr"], "postprocess":  function(d) {
        return {
                 type : "terminal", 
                 value : d[0]
               };
        } 
        },
    {"name": "terminal", "symbols": ["regex"], "postprocess":  function(d) {
        return {
                 type : "terminal",
                 value : d[0]
               };
        } 
        },
    {"name": "terminalstr$ebnf$1", "symbols": ["validterminal"]},
    {"name": "terminalstr$ebnf$1", "symbols": ["terminalstr$ebnf$1", "validterminal"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "terminalstr", "symbols": [{"literal":"\""}, "terminalstr$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "regex", "symbols": [{"literal":"["}, "range", {"literal":"]"}], "postprocess":  function(d) {return {
        type : "regex",
        value : d.join("")
         } 
        } },
    {"name": "range", "symbols": ["numrange"]},
    {"name": "range", "symbols": ["letterrange"], "postprocess": id},
    {"name": "numrange", "symbols": ["digit", {"literal":"-"}, "digit"], "postprocess": function(d) {return d.join(""); }},
    {"name": "letterrange", "symbols": ["letter", {"literal":"-"}, "letter"], "postprocess": function(d) {return d.join(""); }},
    {"name": "digit", "symbols": [/[0-9]/], "postprocess": id},
    {"name": "letter", "symbols": [/[a-zA-Z]/], "postprocess": id},
    {"name": "validterminal", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "validterminal", "symbols": ["symbol"], "postprocess": id},
    {"name": "symbol", "symbols": [{"literal":"|"}]},
    {"name": "symbol", "symbols": [{"literal":" "}]},
    {"name": "symbol", "symbols": [{"literal":"-"}]},
    {"name": "symbol", "symbols": [{"literal":"!"}]},
    {"name": "symbol", "symbols": [{"literal":"#"}]},
    {"name": "symbol", "symbols": [{"literal":"$"}]},
    {"name": "symbol", "symbols": [{"literal":"%"}]},
    {"name": "symbol", "symbols": [{"literal":"&"}]},
    {"name": "symbol", "symbols": [{"literal":"("}]},
    {"name": "symbol", "symbols": [{"literal":")"}]},
    {"name": "symbol", "symbols": [{"literal":"*"}]},
    {"name": "symbol", "symbols": [{"literal":"+"}]},
    {"name": "symbol", "symbols": [{"literal":","}]},
    {"name": "symbol", "symbols": [{"literal":"-"}]},
    {"name": "symbol", "symbols": [{"literal":"."}]},
    {"name": "symbol", "symbols": [{"literal":"/"}]},
    {"name": "symbol", "symbols": [{"literal":":"}]},
    {"name": "symbol", "symbols": [{"literal":";"}]},
    {"name": "symbol", "symbols": [{"literal":">"}]},
    {"name": "symbol", "symbols": [{"literal":"="}]},
    {"name": "symbol", "symbols": [{"literal":"<"}]},
    {"name": "symbol", "symbols": [{"literal":"?"}]},
    {"name": "symbol", "symbols": [{"literal":"@"}]},
    {"name": "symbol", "symbols": [{"literal":"["}]},
    {"name": "symbol", "symbols": [{"literal":"\\"}]},
    {"name": "symbol", "symbols": [{"literal":"]"}]},
    {"name": "symbol", "symbols": [{"literal":"^"}]},
    {"name": "symbol", "symbols": [{"literal":"_"}]},
    {"name": "symbol", "symbols": [{"literal":"`"}]},
    {"name": "symbol", "symbols": [{"literal":"{"}]},
    {"name": "symbol", "symbols": [{"literal":"}"}]},
    {"name": "symbol", "symbols": [{"literal":"~"}]},
    {"name": "symbol", "symbols": [{"literal":"-"}]},
    {"name": "symbol", "symbols": [{"literal":"'"}], "postprocess": id},
    {"name": "_+$ebnf$1", "symbols": [/[\s]/]},
    {"name": "_+$ebnf$1", "symbols": ["_+$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_+", "symbols": ["_+$ebnf$1"], "postprocess": function(d) {return null }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null }}
]
  , ParserStart: "bnf"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
