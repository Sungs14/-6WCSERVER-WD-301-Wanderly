// Destination filter buttons (only present on destination.html)
document.querySelectorAll('.filters button').forEach(function (b) {
  b.addEventListener('click', function () {
    document.querySelectorAll('.filters button').forEach(function (x) {
      x.setAttribute('aria-pressed', x === b);
    });
    document.querySelectorAll('#dgrid .card').forEach(function (c) {
      c.style.display = (b.dataset.f === 'all' || c.dataset.c === b.dataset.f) ? '' : 'none';
    });
  });
});
