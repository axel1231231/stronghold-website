// ============================================================
// STRONGHOLD: shared behaviour
// Mobile nav toggle + mailto-based form submission (no backend)
// ============================================================

(function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }
})();

// Builds a mailto: link from a form's fields and opens the user's mail client.
// data-mailto-to, data-mailto-subject set on the <form>.
function strongholdMailtoSubmit(form) {
  var to = form.getAttribute('data-mailto-to') || 'axel@stronghold.life';
  var subject = form.getAttribute('data-mailto-subject') || 'Enquiry: Stronghold';
  var lines = [];
  var fields = form.querySelectorAll('[data-field]');
  var valid = true;

  fields.forEach(function (el) {
    if (el.hasAttribute('required') && !el.value.trim()) {
      valid = false;
      el.style.borderColor = '#B3261E';
    } else {
      el.style.borderColor = '';
    }
  });

  if (!valid) {
    var status = form.querySelector('.form-status');
    if (status) {
      status.textContent = 'Please fill in the required fields before sending.';
      status.style.color = '#B3261E';
      status.classList.add('visible');
    }
    return false;
  }

  fields.forEach(function (el) {
    var label = el.getAttribute('data-field');
    var value = el.value.trim();
    if (value) lines.push(label + ': ' + value);
  });

  var body = encodeURIComponent(lines.join('\n'));
  var mailto = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + body;

  var status = form.querySelector('.form-status');
  if (status) {
    status.textContent = 'Opening your email client. Send the message to complete your enquiry.';
    status.style.color = '#3A3530';
    status.classList.add('visible');
  }

  window.location.href = mailto;
  return false;
}
