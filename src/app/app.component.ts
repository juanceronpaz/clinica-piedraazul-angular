import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { FooterComponent } from './footer/footer.component';
import { Doctor, Producto, Opcion } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, CarouselComponent, DoctorsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  doctores: Doctor[] = [
    { nombre: 'Laura Martinez', especialidad: 'Terapia neural', subespecialidad: 'Dolor cronico', frase: 'La atencion se centra en el bienestar integral.', imagen: 'assets/img/doctores/doctor-1.jpg', area: 'terapia' },
    { nombre: 'Carlos Ramirez', especialidad: 'Quiropraxia', subespecialidad: 'Columna y postura', frase: 'Movimiento saludable para una mejor calidad de vida.', imagen: 'assets/img/doctores/doctor-2.jpg', area: 'quiro' },
    { nombre: 'Sofia Gomez', especialidad: 'Fisioterapia', subespecialidad: 'Rehabilitacion', frase: 'Recuperar movimiento tambien es recuperar confianza.', imagen: 'assets/img/doctores/doctor-3.jpg', area: 'fisio' },
    { nombre: 'Andres Torres', especialidad: 'Nutricion y Dietetica', subespecialidad: 'Nutricion clinica', frase: 'Una alimentacion adecuada acompana cada proceso de salud.', imagen: 'assets/img/doctores/doctor-4.jpg', area: 'nutri' },
    { nombre: 'Daniel Herrera', especialidad: 'Medicina general', subespecialidad: 'Atencion primaria', frase: 'La prevencion es parte fundamental del cuidado.', imagen: 'assets/img/doctores/doctor-5.jpg', area: 'general' },
    { nombre: 'Valentina Castro', especialidad: 'Medicina general', subespecialidad: 'Consulta general', frase: 'Escuchar al paciente es el primer paso para cuidarlo.', imagen: 'assets/img/doctores/doctor-6.jpg', area: 'general' },
    { nombre: 'Miguel Rodriguez', especialidad: 'Terapia neural', subespecialidad: 'Terapias integrales', frase: 'Cada paciente necesita una atencion pensada para sus necesidades.', imagen: 'assets/img/doctores/doctor-7.jpg', area: 'terapia' },
    { nombre: 'Camila Vargas', especialidad: 'Fisioterapia', subespecialidad: 'Terapia fisica', frase: 'Avanzar paso a paso tambien es parte de la recuperacion.', imagen: 'assets/img/doctores/doctor-8.jpg', area: 'fisio' }
  ];

  productos: Producto[] = [
    { nombre: 'Kit de cuidado personal', descripcion: 'Elementos basicos para complementar rutinas de cuidado.', precio: '$35.000', categoria: 'cuidado', icono: 'bi-heart' },
    { nombre: 'Crema corporal', descripcion: 'Producto para complementar el cuidado diario de la piel.', precio: '$28.000', categoria: 'cuidado', icono: 'bi-droplet-half' },
    { nombre: 'Infusion natural', descripcion: 'Alternativa para complementar momentos de bienestar.', precio: '$18.000', categoria: 'nutricion', icono: 'bi-cup-hot' },
    { nombre: 'Complemento nutricional', descripcion: 'Producto orientado a complementar una alimentacion equilibrada.', precio: '$42.000', categoria: 'nutricion', icono: 'bi-apple' },
    { nombre: 'Kit de relajacion', descripcion: 'Elementos para crear un espacio de descanso y relajacion.', precio: '$45.000', categoria: 'bienestar', icono: 'bi-stars' },
    { nombre: 'Cuaderno de bienestar', descripcion: 'Espacio para registrar habitos, objetivos y rutinas.', precio: '$22.000', categoria: 'bienestar', icono: 'bi-journal-heart' }
  ];

  especialidades: Opcion[] = [
    { id: 'todos', nombre: 'Todos los especialistas' },
    { id: 'terapia', nombre: 'Terapia neural' },
    { id: 'quiro', nombre: 'Quiropraxia' },
    { id: 'fisio', nombre: 'Fisioterapia' },
    { id: 'nutri', nombre: 'Nutricion y Dietetica' },
    { id: 'general', nombre: 'Medicina general' }
  ];

  categorias: Opcion[] = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'cuidado', nombre: 'Cuidado personal' },
    { id: 'nutricion', nombre: 'Nutricion' },
    { id: 'bienestar', nombre: 'Bienestar' }
  ];

  descripciones: Record<string, string> = {
    todos: 'Conoce el equipo completo de profesionales de la Clinica Piedraazul.',
    terapia: 'Atencion orientada al tratamiento y bienestar mediante tecnicas terapeuticas especializadas.',
    quiro: 'Atencion enfocada en movilidad, postura y cuidado de la columna.',
    fisio: 'Procesos de rehabilitacion para recuperar movimiento y funcionalidad.',
    nutri: 'Orientacion profesional para mejorar habitos alimentarios y apoyar procesos de salud.',
    general: 'Atencion primaria para valoracion, prevencion y seguimiento.'
  };

  especialidadSeleccionada = 'todos';
  categoriaSeleccionada = 'todos';
  descripcionTitulo = 'Todos los especialistas';
  descripcionTexto = this.descripciones['todos'];
  mensajeDoctor = '';
  confirmacionRegistro = '';
  registroRealizado = false;
  mostrarArriba = false;

  nombres = '';
  apellidos = '';
  correo = '';
  confirmarCorreo = '';
  telefono = '';
  tipoUsuario = '';
  terminosAceptados = false;

  errores: Record<string, string> = {};

  get cantidadDoctores(): number {
    return this.doctoresFiltrados.length;
  }

  get cantidadEspecialidades(): number {
    return this.especialidades.length - 1;
  }

  get doctoresFiltrados(): Doctor[] {
    return this.especialidadSeleccionada === 'todos'
      ? this.doctores
      : this.doctores.filter(doctor => doctor.area === this.especialidadSeleccionada);
  }

  get productosFiltrados(): Producto[] {
    return this.categoriaSeleccionada === 'todos'
      ? this.productos
      : this.productos.filter(producto => producto.categoria === this.categoriaSeleccionada);
  }

  seleccionarEspecialidad(id: string): void {
    this.especialidadSeleccionada = id;
    const opcion = this.especialidades.find(item => item.id === id);
    this.descripcionTitulo = opcion?.nombre ?? 'Especialistas';
    this.descripcionTexto = this.descripciones[id] ?? '';
  }

  seleccionarCategoria(id: string): void {
    this.categoriaSeleccionada = id;
  }

  agendarCita(nombre: string): void {
    this.mensajeDoctor = `Estas registrando tus datos para solicitar una cita con ${nombre}.`;
    document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('nombres')?.focus(), 400);
  }

  validarCampo(campo: string, valor: string, mensaje: string): boolean {
    const texto = valor.trim();
    if (texto === '') {
      this.errores[campo] = mensaje;
      return false;
    }
    if (campo === 'nombres' || campo === 'apellidos') {
      if (texto.length < 2) {
        this.errores[campo] = campo === 'nombres' ? 'Los nombres deben tener al menos 2 caracteres.' : 'Los apellidos deben tener al menos 2 caracteres.';
        return false;
      }
      if (texto.length > 30) {
        this.errores[campo] = campo === 'nombres' ? 'Los nombres no pueden superar los 30 caracteres.' : 'Los apellidos no pueden superar los 30 caracteres.';
        return false;
      }
      if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+(?:\s+[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+)*$/.test(texto)) {
        this.errores[campo] = campo === 'nombres' ? 'Los nombres solo pueden contener letras y espacios.' : 'Los apellidos solo pueden contener letras y espacios.';
        return false;
      }
    }
    delete this.errores[campo];
    return true;
  }

  validarCorreo(): boolean {
    if (this.correo.trim() === '') { this.errores['correo'] = 'El correo es obligatorio.'; return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo.trim())) { this.errores['correo'] = 'Ingresa un correo valido.'; return false; }
    delete this.errores['correo']; return true;
  }

  validarConfirmacionCorreo(): boolean {
    if (this.confirmarCorreo.trim() === '') { this.errores['confirmarCorreo'] = 'Debes confirmar tu correo.'; return false; }
    if (this.correo.trim() !== this.confirmarCorreo.trim()) { this.errores['confirmarCorreo'] = 'Los correos no coinciden.'; return false; }
    delete this.errores['confirmarCorreo']; return true;
  }

  validarTelefono(): boolean {
    const numero = this.telefono.trim();
    if (numero === '') { this.errores['telefono'] = 'El telefono es obligatorio.'; return false; }
    if (!/^[0-9]{7,10}$/.test(numero)) { this.errores['telefono'] = 'Ingresa un telefono valido.'; return false; }
    delete this.errores['telefono']; return true;
  }

  validarTipoUsuario(): boolean {
    if (!this.tipoUsuario) { this.errores['tipoUsuario'] = 'Selecciona un tipo de usuario.'; return false; }
    delete this.errores['tipoUsuario']; return true;
  }

  validarTerminos(): boolean {
    if (!this.terminosAceptados) { this.errores['terminos'] = 'Debes aceptar el tratamiento de datos.'; return false; }
    delete this.errores['terminos']; return true;
  }

  validarFormulario(): boolean {
    const nombres = this.validarCampo('nombres', this.nombres, 'Los nombres son obligatorios.');
    const apellidos = this.validarCampo('apellidos', this.apellidos, 'Los apellidos son obligatorios.');
    const correo = this.validarCorreo();
    const confirmar = this.validarConfirmacionCorreo();
    const telefono = this.validarTelefono();
    const tipo = this.validarTipoUsuario();
    const terminos = this.validarTerminos();
    return nombres && apellidos && correo && confirmar && telefono && tipo && terminos;
  }

  registrar(evento: Event): void {
    evento.preventDefault();
    if (!this.validarFormulario()) return;
    this.registroRealizado = true;
    this.confirmacionRegistro = `${this.nombres.trim()}, tu registro fue realizado correctamente. La confirmacion se enviara a ${this.correo.trim()}.`;
  }

  nuevoRegistro(): void {
    this.nombres = ''; this.apellidos = ''; this.correo = ''; this.confirmarCorreo = ''; this.telefono = '';
    this.tipoUsuario = ''; this.terminosAceptados = false; this.errores = {}; this.mensajeDoctor = '';
    this.confirmacionRegistro = ''; this.registroRealizado = false;
  }

  @HostListener('window:scroll')
  alDesplazar(): void { this.mostrarArriba = window.scrollY > 300; }

  volverArriba(): void { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
