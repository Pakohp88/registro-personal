import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  empleados: Empleado[] = [{ id: 1, nombre: "Francisco", apellidoPaterno: "Hernandez", apellidoMaterno: "Perez", email: "pako@mail.com", edad: 33, sexo: "Masculino" }];
  empleado: Empleado = { id: 0, nombre: "", apellidoPaterno: "", apellidoMaterno: "", email: "", edad: 0, sexo: "" };
  form: FormGroup;
  formValid: boolean = true;



  constructor(private formBuilder: FormBuilder) {}

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidoPaternoNoValido() {
    return this.form.get('apellidoPaterno').invalid && this.form.get('apellidoPaterno').touched;
  }

  get apellidoMaternoaternoNoValido() {
    return this.form.get('apellidoMaterno').invalid && this.form.get('apellidoMaterno').touched;
  }

  get emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get edadNoValido() {
    return this.form.get('edad').invalid && this.form.get('edad').touched;
  }

  get sexoNoValido() {
    return this.form.get('sexo').invalid && this.form.get('sexo').touched;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: 0,
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(5)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      edad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      sexo: ['', Validators.required]
    });    

    this.listener();
  }

  addOrEdit() {

    if (this.form.invalid) {

      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else {
      let Id = this.form.get('id').value;

      if (Id === 0) {
        this.empleado = {
          id: this.empleados.length + 1,
          nombre: this.form.get('nombre').value,
          apellidoPaterno: this.form.get('apellidoPaterno').value,
          apellidoMaterno: this.form.get('apellidoMaterno').value,
          email: this.form.get('email').value,
          edad: this.form.get('edad').value,
          sexo: this.form.get('sexo').value
        }

        this.empleados.push(this.empleado)
      }
      else {
        this.empleado = {
          id: this.form.get('id').value,
          nombre: this.form.get('nombre').value,
          apellidoPaterno: this.form.get('apellidoPaterno').value,
          apellidoMaterno: this.form.get('apellidoMaterno').value,
          email: this.form.get('email').value,
          edad: this.form.get('edad').value,
          sexo: this.form.get('sexo').value
        }

        let index = 0;

        this.empleados.forEach(function (empleado) {                    
          if(empleado.id != Id){
            index++;
          }
        });
        
        this.empleados[index] = this.empleado;              
      }
    }

    this.empleado = { id: 0, nombre: "", apellidoPaterno: "", apellidoMaterno: "", email: "", edad: 0, sexo: "" }
    this.form.reset();
  }

  editar(e: Empleado) {
    this.form.reset(
      {
        id: e.id,
        nombre: e.nombre,
        apellidoPaterno: e.apellidoPaterno,
        apellidoMaterno: e.apellidoMaterno,
        email: e.email,
        edad: e.edad,
        sexo: e.sexo
      });
  }

  borrar(e: Empleado) {
    this.empleados = this.empleados.filter(x => x != e);
  }

  listener() {

    this.form.statusChanges.subscribe( status => {      
      if(status =="VALID"){        
        this.formValid = false;
      }
      else{
        this.formValid = true;
      }  
    });  
  }


}
