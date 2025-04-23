$(() => {
  // --- Helpers (puras) ---
  const showLoader  = () => $('#loader').show();
  const hideLoader  = () => $('#loader').hide();
  const fetchData   = () => $.ajax({ url: 'data.json', dataType: 'json', beforeSend: showLoader })
                           .always(hideLoader);
  const toOptionsHtml = regions => regions
    .map(r => `<option value="${r}">${r}</option>`)
    .join('');
  const toggleOption = ($select) => (e) => {
    if (e.target.tagName === 'OPTION') {
      e.preventDefault();
      const scroll = $select.prop('scrollTop');
      e.target.selected = !e.target.selected;
      setTimeout(() => $select.prop('scrollTop', scroll), 0);
    }
  };
  const getSelected = () => $('#regionSelect option:selected').map((_, o) => o.value).get();
  const clearSelection = () => $('#regionSelect option').prop('selected', false);
  const drawBarChart = (labels, values) => {
    const ctx = $('#graficoCasos')[0].getContext('2d');
    if (window.miGrafico) window.miGrafico.destroy();
    window.miGrafico = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Casos confirmados (último día)', data: values }] },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Región' } },
          y: { beginAtZero: true, title: { display: true, text: 'Casos confirmados' } }
        }
      }
    });
  };

  // -- Flujo principal -- 
  fetchData().then(data => {
    const regions = allowed.map(d => d.region);
    const $select = $('#regionSelect');

    // poblar select y setear toggle
    $select.html(toOptionsHtml(regions));
    $select.on('mousedown', toggleOption($select));

    // evento click para generar gráfico
    $('#btnGraficar').on('click', () => {
      const selected = getSelected();
      if (!selected.length) {
        return alert('Selecciona al menos una región.');
      }
      const values = selected.map(region => {
        const entry = data.find(d => d.region === region);
        return +entry.confirmed.slice(-1)[0].value;
      });
      drawBarChart(selected, values);
      clearSelection();
    });
  });
});     


