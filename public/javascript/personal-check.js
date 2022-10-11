button = $('.personal-submit-button')[0];
personal_check = $('#personal-check')[0];
if (!personal_check.checked)
{
  button.setAttribute('disabled', true);
}
personal_check.addEventListener('change', function()
{
  if (this.checked)
  {
    button.removeAttribute('disabled');
  }
  else
  {
    button.setAttribute('disabled', true);
  }
});