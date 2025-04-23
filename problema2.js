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
});
  