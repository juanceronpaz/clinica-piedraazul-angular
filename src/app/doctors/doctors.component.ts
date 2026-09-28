import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor, Opcion } from '../models';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent {
  @Input() doctores: Doctor[] = [];
  @Input() especialidades: Opcion[] = [];
  @Input() especialidadSeleccionada = 'todos';
  @Input() descripcionTitulo = '';
  @Input() descripcionTexto = '';
  @Input() cantidadDoctores = 0;

  @Output() especialidadChange = new EventEmitter<string>();
  @Output() agendar = new EventEmitter<string>();

  seleccionarEspecialidad(id: string): void {
    this.especialidadChange.emit(id);
  }

  agendarCita(nombre: string): void {
    this.agendar.emit(nombre);
  }
}
