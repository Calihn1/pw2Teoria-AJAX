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
})      


