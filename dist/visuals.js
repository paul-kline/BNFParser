var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


//to be called when resizing code window. 
//editor is in scope. I globalized it. :/
function onCodeSizeMouseDown(ths){
  ths.keepresizing = true;
  scheduleResizes(ths,editor,-20,20);
}
function scheduleResizes(ths,ed,sizediff, freq){
  if(ths.keepresizing){
    setTimeout(()=>{
      //console.log("resizing!");
      ed.setSize(null,pxadd(ths.style.height, sizediff));
      if(ths.keepresizing){
        scheduleResizes(ths,ed,sizediff,freq);
      }
    },freq);
  }
  
}
function onCodeSizeMouseUp(ths){
  ths.keepresizing = false;
}
function resizeEditor(height,ed){
  ed.setSize(null,height);
}
function pxadd(px1, px2){
 return parseInt(px1, 10) + parseInt(px2,10);
}