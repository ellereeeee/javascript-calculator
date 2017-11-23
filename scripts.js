var buttons = document.getElementsByTagName('button');

Array.prototype.forEach.call(buttons, function (b) {
  b.addEventListener('click', createRipple);
});

function createRipple (e) {
  var circle = document.createElement('div');
  this.appendChild(circle);
  
  var d = Math.max(this.clientWidth, this.clientHeight);
  
  circle.style.width = circle.style.height = d + 'px';
  
  circle.classList.add('ripple');
}