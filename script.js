document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach((ramo) => {
    ramo.addEventListener("click", () => {
      ramo.classList.toggle("aprobado");
    });
  });
});

