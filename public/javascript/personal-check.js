order_button = $('#order-button')[0];
personal_check = $('#personal-check')[0];
if (!personal_check.checked)
{
  order_button.setAttribute('disabled', true);
}
personal_check.addEventListener('change', function()
{
  if (this.checked)
  {
    order_button.removeAttribute('disabled');
  }
  else
  {
    order_button.setAttribute('disabled', true);
  }
});