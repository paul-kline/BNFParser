const nearley = require("nearley");
const bnfgrammar = require("./bnfgrammar.js");
const compile = require("nearley/lib/compile");
const generate = require("nearley/lib/generate");
const nearleyGrammar = require("nearley/lib/nearley-language-bootstrapped");
const codemirror = require("codemirror");
const bnfmode = require("codemirror/mode/ebnf/ebnf.js")
const anyhint = require("codemirror/addon/hint/anyword-hint.js");
const showhint = require("codemirror/addon/hint/show-hint.js");
global.CodeMirror = codemirror;
function compileGrammar(sourceCode) {
    // Parse the grammar source into an AST
    const grammarParser = new nearley.Parser(nearleyGrammar);
    grammarParser.feed(sourceCode);
    const grammarAst = grammarParser.results[0]; // TODO check for errors

    // Compile the AST into a set of rules
    const grammarInfoObject = compile(grammarAst, {});
    // Generate JavaScript code from the rules
    const grammarJs = generate(grammarInfoObject, "grammar");

    // Pretend this is a CommonJS environment to catch exports from the grammar.
    const module = { exports: {} };
    eval(grammarJs);

    return module.exports;
}

//const grammart = compileGrammar("main -> foo | bar");

// Create a Parser object from our grammar.
let bnfparser = new nearley.Parser(nearley.Grammar.fromCompiled(bnfgrammar));


function parseBNF(str) {
    str = str.trim();
    setBNFError("");
    document.getElementById("compilationStatus").innerText = compilationStatus.compiling;
    // Parse something!
    try{
        bnfparser.feed(str);
        global.bnfparser = bnfparser;
        // parser.results is an array of possible parsings.
        console.log(bnfparser.results); // [[[[ "foo" ],"\n" ]]]
        console.log(bnfparser);

        document.getElementById("compilationStatus").innerText = compilationStatus.good;
        return bnfparser.results;
        //okay,things went well, let's compile the grammar!

    }catch(e){
        setBNFError("Uhoh, looks like you have an error: " + e);
        document.getElementById("compilationStatus").innerText = compilationStatus.error;
        console.log(e)
         
    }finally{
        //things are very very broken if you don't reinitialize. Only good once I guess! 
        bnfparser = new nearley.Parser(nearley.Grammar.fromCompiled(bnfgrammar));
    }


    
}
 
//called when "compile bnf" is clicked.
function bnfsubmitted(){
    let enteredText = getEnteredCode();
    let parseTree = parseBNF(enteredText);
    if(!parseTree){return;}
    console.log("entered text: ", enteredText);
    let nearleycode = parseTreeToNearley(parseTree);
    
    console.log("transcompilation result:\n",nearleycode);
    let compiledgrammer = compileGrammar(nearleycode);
    //if we made it here, let's save the state. 
    global.state.enteredText = enteredText;
    global.state.parseTree = parseTree; //do I need this?
    global.state.nearleycode = nearleycode;
    global.state.compiledgrammer = compiledgrammer;
    console.log("here is my compiled grammar: ", compiledgrammer);
}
global.bnfsubmitted = bnfsubmitted //need this scope for button click entry.

function setBNFError(str){
    document.getElementById("bnferror").innerText = str;
}
function validityTest(){
    let testString = getTestString();
    if(document.getElementById("compilationStatus").innerText != compilationStatus.good){
        //you need to compile your grammar first!
        setBNFError("You need to compile your grammar before testing!");
        return;      
    }
    //now let's test it!
    let parser = new nearley.Parser(nearley.Grammar.fromCompiled(global.state.compiledgrammer));
    // Parse something!
    try{
        parser.feed(testString);
        if(parser.results.length > 0){
            document.getElementById("testinput").style.backgroundColor = "limeGreen";
        }else{
            document.getElementById("testinput").style.backgroundColor = "IndianRed";
        }
        
    }catch(e){
        console.log(e);
        document.getElementById("testinput").style.backgroundColor = "IndianRed";
    }
    

    // parser.results is an array of possible parsings.
    console.log(testString)
    console.log(parser.results); // [[[[ "foo" ],"\n" ]]]
    
}
global.validityTest = validityTest //need this scope for button click entry.

function ontestStringChanged(obj){
   // let val = "" + obj.value;
    //document.getElementById("testinput").style.backgroundColor = "white";
   // if(document.getElementById("onenter").checked && val[val.length-1] == "\n"){
    //    console.log(typeof val);
        
    //    obj.value = val.trim();
        validityTest();
   // } 
    
}
global.ontestStringChanged = ontestStringChanged;
function parseTreeToNearley(data){
    if(data == null){return " "};
    if(data instanceof Array){ return data.reduce((acc,x)=>acc + parseTreeToNearley(x),"")}
    if(typeof data == "object" && data.type){
        if(data.type == "rule"){ return parseTreeToNearley(data.value.nonterminal).trim() + " ->" + parseTreeToNearley(data.value.rulebody);}
        if(data.type == "case"){ return parseTreeToNearley(data.value)};
        if(data.type == "terminal"){ if(typeof data.value == "string"){return ' "' + data.value + '"'}else{return parseTreeToNearley(data.value) }};
        if( data.type == "nonterminal"){ return  " " + parseTreeToNearley(data.value)}; //SPACE
        if(data.type == "newline"){return "\n";} 
        if(data.type == "regex"){return " " + data.value}
        if(data.type == "esym"){return ":" + data.value}
    }
    // if(typeof data == "string"){return " " + data}
    console.log("unhandled case:", data, "appending anyway");
    return "" + data;
} 

// //check the defined or nots while we traverse the tree. 
// function parseTreeToNearley2(tree,state){
    
//     if(tree == null){state.nearley += " "; return state};
//     if(tree instanceof Array){ return data.reduce((st,x)=> parseTreeToNearley2(x,st),state)}
//     if(typeof data == "object" && data.type){
//         if(data.type == "rule"){
//             state.inruleleft = true;
//             let stprime = parseTreeToNearley2(data.value.nonterminal, state); //OTHER FUNCTION CALL. 
//             stprime.inruleleft = false;
//             return parseTreeToNearley2(data.value.rulebody, stprime);}
//         if(data.type == "case"){ return parseTreeToNearley2(data.value, state)};
//         if(data.type == "terminal"){ if(typeof data.value == "string"){
//             state.nearley += ' "' + data.value + '"'
//             return state
//             }
//             else{
//                 return parseTreeToNearley2(data.value,state) }};
//         if( data.type == "nonterminal"){ 
//             if(state.inruleleft){
//                 state.nearley +=
//             }
//             return  " " + parseTreeToNearley(data.value)}; //SPACE
//         if(data.type == "newline"){return "\n";} 
//         if(data.type == "regex"){return " " + data.value}
//         if(data.type == "esym"){return ":" + data.value}
//     }
//     // if(typeof data == "string"){return " " + data}
//     console.log("unhandled case:", data, "appending anyway");
//     return "" + data;
// } 
 
function getEnteredCode(){
    return editor.doc.getValue();
}
function getTestString(){
    return document.getElementById("testinput").value;
}

function initializeBNFEditor(){
    let editor = codemirror.fromTextArea(document.getElementById("textinput"), {
        mode: {name: "ebnf"},
        lineNumbers: true,
        bracesMode: 'javascript',
        extraKeys : {"Ctrl-Space" : "autocomplete"}
      });
      global.editor = editor; //for debugging purposes.
    editor.on("change", onEditorChanged);
}

function onEditorChanged(myself, changeObj){
    //console.log("onchange event",myself,changeObj);
    document.getElementById("compilationStatus").innerText = compilationStatus.modified;
}


let compilationStatus = {
    good : "All good!",
    error : "Error",
    modified : "uncompiled",
    compiling : "compiling.."
}
global.state = {} //which will hold our bnf and parse info. 
initializeBNFEditor();
console.log("main has loaded!!!");