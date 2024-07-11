export default function scrollToSection() {
  const sections = ['quiz', 'form']; // массив идентификаторов для прокрутки
  sections.forEach((sectionId) => {
    document.querySelectorAll(`.scroll[href="#${sectionId}"]`).forEach((scrollElement) => {
      scrollElement.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const yOffset = -100;
          const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({
            top: y,
            behavior: 'smooth',
          });
        }
      });
    });
  });
}
