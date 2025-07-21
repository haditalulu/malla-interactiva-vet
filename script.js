// Función que verifica si un semestre está aprobado (todos sus ramos con clase 'aprobado')
function semestreAprobado(semestre) {
  const semDiv = document.getElementById(`sem${semestre}`);
  if (!semDiv) return false;
  const ramos = semDiv.querySelectorAll('.ramo');
  return Array.from(ramos).every(ramo => ramo.classList.contains('aprobado'));
}

// Función para saber si un ramo está desbloqueado (prerrequisitos aprobados)
function estaDesbloqueado(ramo) {
  // Prerrequisitos por ramo (data-prereq-ramo)
  const prereqsRamo = ramo.dataset.prereqRamo; // puede ser undefined
  if (prereqsRamo) {
    const ids = prereqsRamo.split(',').map(id => id.trim());
    const todosAprobados = ids.every(id => {
      const preRamo = document.querySelector(`.ramo[data-id="${id}"]`);
      return preRamo && preRamo.classList.contains('aprobado');
    });
    if (!todosAprobados) return false;
  }

  // Prerrequisitos por semestre (data-prereq-semestre)
  const prereqsSem = ramo.dataset.prereqSemestre; // puede ser undefined
  if (prereqsSem) {
    const semestres = prereqsSem.split(',').map(s => s.trim());
    const todosSemAprobados = semestres.every(s => semestreAprobado(s));
    if (!todosSemAprobados) return false;
  }

  return true;
}

// Actualiza el bloqueo/desbloqueo de todos los ramos
function actualizarBloqueos() {
  document.querySelectorAll('.ramo').forEach(ramo => {
    if (estaDesbloqueado(ramo)) {
      ramo.classList.remove('bloqueado');
    } else {
      ramo.classList.add('bloqueado');
      // Si está bloqueado, quitar aprobado
      ramo.classList.remove('aprobado');
    }
  });
}

// Al iniciar, actualizar bloqueos según prerrequisitos
actualizarBloqueos();

// Evento click para cambiar estado aprobado y animar movimiento horizontal
document.querySelectorAll('.ramo').forEach(boton => {
  boton.addEventListener('click', () => {
    if (boton.classList.contains('bloqueado')) {
      return; // no hace nada si está bloqueado
    }

    // Agrega clase animar para animación horizontal
    boton.classList.add('animar');
    setTimeout(() => boton.classList.remove('animar'), 300);

    // Alternar clase aprobado
    boton.classList.toggle('aprobado');

    // Actualizar bloqueos luego del cambio
    actualizarBloqueos();
  });
});
