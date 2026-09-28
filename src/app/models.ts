export interface Doctor {
  nombre: string;
  especialidad: string;
  subespecialidad: string;
  frase: string;
  imagen: string;
  area: string;
}

export interface Producto {
  nombre: string;
  descripcion: string;
  precio: string;
  categoria: string;
  icono: string;
}

export interface Opcion {
  id: string;
  nombre: string;
}
