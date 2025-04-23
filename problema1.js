$(() => {
  // --- Helpers (puras) ---
  const showLoader  = () => $('#loader').show();
  const hideLoader  = () => $('#loader').hide();
  const fetchData   = () => $.ajax({ url: 'data.json', dataType: 'json', beforeSend: showLoader })
                           .always(hideLoader);
                           