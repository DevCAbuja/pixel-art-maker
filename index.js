$(function () {
  
let kanvas = $('#pixel_canvas');
let colorPicked='#000000';
let valueH, valueW;

kanvas.empty();
/* this functions  read out the height and width information
*/
function getSizeH(){
   valueH=$('#input_height').val();
     return valueH;
}

function getSizeW(){
  valueW=$('#input_width').val();
  return valueW;
}

/* this Function creates the grid by adding cells and set the color at the end */  

 function makeGrid(row,heigh) {
    const ref='background-color';
    for (let i = 0; i<row; i++){
    kanvas.append('<tr></tr>');
    let h=0;
    while (h<heigh){
    kanvas.find('tr').last().append('<td></td>');
                 h++;
               }
         }
         $('td').css(ref, '#FFFFFF');
}

/*adding a reset button and setting its style */

rese = $("#sizePicker").first();
$('input[type="reset"]').css({'width':'65px','opacity': '0.6', 'cursor': 'not-allowed', });

rese.append('<h2>Reset </h2> <Button  id="eraser">');
$('#eraser').css({'height':'25px', 'width':'50px','opacity': '0.6', 'cursor': 'not-allowed', });

/* default color reading and listening to change of it */

$('input[type="color"]').change(function() {
  colorPicked=$('input[type="color"]').val();
});

/* to colour h1 after mouse event - just for fun and creative style */
$('h1').on('mouseover',function(){
       $('h1').css('color', colorPicked);
});

/* listening to event (submit) and get the data from the input fields and pass it through to makeGrid */
$('form').submit(function(even){
      even.preventDefault();
      clicked=true;
      getSizeH();
      getSizeW();
      kanvas.empty();
      makeGrid(valueH,valueW);
      $('td').css('box-shadow', '10px 7px 7px #999999');
});

/* clearing the grid after click on the Reset button,and alert box */
$('input[type="reset"]').click(function(eve){
      eve.preventDefault();
      $('td').css('background-color', '#FFFFFF');
});
  
/*here i give a try to continous drawing */
kanvas.on('mousedown', 'td',function(event) {
     event.preventDefault();
     clicked=true;
     $('input[type="reset"]').css({'opacity': '1', 'cursor': 'pointer',        });
 //       drawCell(event.target);
     $(event.target).css('background-color', colorPicked);

   // new simplified code for continues draw function
 kanvas.on('mouseenter', 'td', function(evt){ 
          if(evt.buttons === 1) {
            $(evt.target).css('background-color', colorPicked); 
          }
     }); 
  
});

/*resetting the cell color, if doubleclick occurs */
kanvas.dblclick(function(e){
       $(e.target).css('background-color', '#fff');
});
  
  //Save Canvas feature
$('#save').click(function(){
  html2canvas(document.querySelector('#pixel_canvas')).then (saveCanvas =>{
      let link= document.createElement('a'); 
      link.href= saveCanvas.toDataURL();
      link.download= "canvas.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  });
 
});
  
});
