var buttons = document.getElementsByTagName('button');

Array.prototype.forEach.call(buttons, function (b) {
  b.addEventListener('click', createRipple);
});
