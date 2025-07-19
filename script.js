document.querySelectorAll('.ramo').forEach(boton => {
  boton.addEventListener('click', () => {
    if (boton.classList.contains('bloqueado')) {
      // No hacer nada si está bloqueado
      return;
    }

    // Animación de movimiento
    boton.classList.add('animar');
    setTimeout(() => {
      boton.classList.remove('animar');
    }, 300);

    // Ciclo de estados: normal -> aprobado -> bloqueado -> normal
    if (!boton.classList.contains('aprobado')) {
      boton.classList.add('aprobado');
    } else if (!boton.classList.contains('bloqueado')) {
      boton.classList.remove('aprobado');
      boton.classList.add('bloqueado');
    } else {
      boton.classList.remove('bloqueado');
    }
  });
});
