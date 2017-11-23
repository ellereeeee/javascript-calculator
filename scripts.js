var buttons = document.getElementsByTagName('button');

Array.prototype.forEach.call(buttons, function (b) {
  b.addEventListener('click', createRipple);
});

function createRipple (e) {
  var circle = document.createElement('div');
  this.appendChild(circle);
  
  circle.classList.add('ripple');
}