document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;
        
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nombreRegex.test(nombre)) {
        alert('El nombre solo puede contener letras.');
        return;
    }
    
    guardarDatosFormulario(nombre, mensaje);
});

function guardarDatosFormulario(nombre, mensaje) {
    console.log('Nombre:', nombre);
    console.log('Mensaje:', mensaje);
    
} 
