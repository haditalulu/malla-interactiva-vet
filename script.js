// Función para saber si un ramo está desbloqueado (prerrequisitos aprobados)
function estaDesbloqueado(ramo) {
  const prereqs = ramo.dataset.prereq;
  if (!prereqs) return true; // sin prerrequisitos está desbloqueado

  const prereqIds = prereqs.split(',');
  return prereqIds.every(id => {
    const preRamo = document.querySelector(`.ramo[data-id="${id}"]`);
    return preRamo && preRamo.classList.contains('aprobado');
  });
}

// Actualiza el bloqueo/desbloqueo de todos los ramos
function actualizarBloqueos() {
  document.querySelectorAll('.ramo').forEach(ramo => {
    if (estaDesbloqueado(ramo)) {
      ramo.classList.remove('bloqueado');
    } else {
      ramo.classList.add('bloqueado');
      // Opcional: si está bloqueado, quitar aprobado
      ramo.classList.remove('aprobado');
    }
  });
}

// Al iniciar, actualizar bloqueos según prerrequisitos
actualizarBloqueos();

// Agregar evento click para manejar cambio de estado y animación
document.querySelectorAll('.ramo').forEach(boton => {
  boton.addEventListener('click', () => {
    if (boton.classList.contains('bloqueado')) {
      // No hace nada si está bloqueado
      return;
    }

    // Animación movimiento horizontal
    boton.classList.add('animar');
    setTimeout(() => {
      boton.classList.remove('animar');
    }, 300);

    // Alternar aprobado / no aprobado
    if (!boton.classList.contains('aprobado')) {
      boton.classList.add('aprobado');
    } else {
      boton.classList.remove('aprobado');
    }

    // Actualizar bloqueos de los demás ramos tras el cambio
    actualizarBloqueos();
  });
});
