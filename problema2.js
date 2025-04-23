$(() => {
    const showLoader = () => $('#loader').show();
    const hideLoader = () => $('#loader').hide();
  
    const fetchData = () =>
      $.ajax({
        url: 'data.json',
        dataType: 'json',
        beforeSend: showLoader
      }).always(hideLoader);
  
    const excludeRegions = (data, excluded = ['Lima', 'Callao']) =>
      data.filter(item => !excluded.includes(item.region));
  
    const createOptions = regions =>
      regions.map(({ region }) => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        return option;
      });
  
    const renderSelect = (selectEl, options) => {
      selectEl.innerHTML = '';
      options.forEach(opt => selectEl.appendChild(opt));
  
      selectEl.addEventListener('mousedown', e => {
        if (e.target.tagName !== 'OPTION') return;
        e.preventDefault();
        const prevScroll = selectEl.scrollTop;
        e.target.selected = !e.target.selected;
        setTimeout(() => { selectEl.scrollTop = prevScroll; }, 0);
      });
    };
  
    const getSelectedRegions = selectEl =>
      Array.from(selectEl.selectedOptions).map(opt => opt.value);
  
    const buildDatasets = (data, regions) =>
      regions.map(region => {
        const entry = data.find(d => d.region === region);
        return {
          label: region,
          data: entry.confirmed.map(c => Number(c.value)),
          fill: false,
          borderWidth: 2
        };
      });
  
    const renderChart = (ctx, labels, datasets) => {
      if (window.miGrafico) window.miGrafico.destroy();
  
      window.miGrafico = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Fecha' } },
            y: { title: { display: true, text: 'Casos confirmados' } }
          }
        }
      });
    };
  
    const showError = msg => {
      hideLoader();
      alert(msg);
    };
  
    // -- Flujo principal --
    $(document).ready(() => {
      const selectEl = document.getElementById('regionSelect');
      const btnGraf = document.getElementById('btnGraficar');
      const canvasCtx = document.getElementById('graficoCasos').getContext('2d');
  
      showLoader();
  
      fetchData()
        .done(data => {
          hideLoader();
          const regiones = excludeRegions(data);
          renderSelect(selectEl, createOptions(regiones));
  
          btnGraf.addEventListener('click', () => {
            const sel = getSelectedRegions(selectEl);
            if (sel.length === 0) {
              return alert('Selecciona al menos una región.');
            }
            const labels = data[0].confirmed.map(c => c.date);
            const datasets = buildDatasets(data, sel);
            renderChart(canvasCtx, labels, datasets);
  
            Array.from(selectEl.options).forEach(opt => opt.selected = false);
          });
        })
        .fail(() => showError('Error al cargar data.json'));
    });
});
  
  