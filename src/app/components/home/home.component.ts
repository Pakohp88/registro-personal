import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  empleados: Empleado[] = [
    {id: 1, nombre: "Francisco", apellidoPaterno: "Hernandez", apellidoMaterno:"Perez", edad:33, sexo: "Masculino"},
    {id: 2, nombre: "Brenda", apellidoPaterno: "Hernandez", apellidoMaterno:"Perez", edad:30, sexo: "Femenino"}
  ];

  empleado: Empleado = { id: 0, nombre: "", apellidoPaterno: "", apellidoMaterno: "", edad: 0, sexo:""  };

  constructor() { }

  ngOnInit(): void {
  }

}
