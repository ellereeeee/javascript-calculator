/* 
This code is from https://github.com/GeekLaunch/button-ripple-effect
I studied the tutorial and incorporated it into my code. 
*/

var buttons = document.getElementsByTagName('button'); // put buttons into array

Array.prototype.forEach.call(buttons, function (b) {
  b.addEventListener('click', createRipple);
}); // add click event called "createRipple" for each button

function createRipple (e) {
  if (this.getElementsByClassName('ripple').length > 0) {
    this.removeChild(this.childNodes[1]);
  }
  var circle = document.createElement('div');
  this.appendChild(circle);
  
  var d = Math.max(this.clientWidth, this.clientHeight);
  
  circle.style.width = circle.style.height = d + 'px';
  
  circle.style.left = e.clientX - this.offsetLeft - d/2 + 'px';
  circle.style.top = e.clientY - this.offsetTop - d/2 + 'px';
  
  circle.classList.add('ripple');
} /* Make element called "circle" with class of "ripple."
Make dimensions of circle equal to the higher of the button width of height.
Make the circle originate from the origin of the click, accounting for
the offset of the buttons parent element in the display. */