$(() => {
    const showLoader  = () => $('#loader').show();
    const hideLoader  = () => $('#loader').hide();
    
    const fetchData = () =>
      $.ajax({
        url: 'data.json',
        dataType: 'json',
        beforeSend: showLoader
      })
      .always(hideLoader);
    
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
    
    
});
  