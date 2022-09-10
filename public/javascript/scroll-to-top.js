function recursiveAccScrollToTop(y, dy)
{
  y = y - dy;
  if (y < 0)
  {
    y = 0;
  }
  window.scrollTo(0, y);
  
  var timer = 0;
  if (y > 0)
  {
    dy *= 1.1;
    timer = setTimeout(function() { recursiveAccScrollToTop(y, dy) }, 10);
  }
  else
  {
    clearTimeout(timer);
  }
}

function scrollToTop()
{
  var y = window.scrollY;
  dy = 10;
  recursiveAccScrollToTop(y, dy);
}    