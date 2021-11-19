export const IntializeMP = (preferenceId) => {
  if (preferenceId) {
    const mp = new window.MercadoPago(
      "TEST-43345686-0080-4baf-a461-b8e634b69bde",
      {
        locale: "es-AR",
      }
    );
    mp.checkout({
      preference: {
        id: preferenceId,
      },
      autoOpen: true, // Habilita la apertura automática del Checkout Pro
    });
  }
};
