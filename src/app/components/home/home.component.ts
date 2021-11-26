import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  empleados: Empleado[] = [{id: 1, nombre: "Francisco", apellidoPaterno: "Hernandez", apellidoMaterno:"Perez", email:"pako@mail.com", edad:33, sexo: "Masculino"}];
  empleado: Empleado = { id: 0, nombre: "", apellidoPaterno: "", apellidoMaterno: "", email:"",  edad: 0, sexo:""  };
  form: FormGroup;

  

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
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(5)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(5)]],   
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      edad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      sexo: ['', Validators.required]
    });
  
  }

  addOrEdit() {    

    if (this.form.invalid) {      
            
      return Object.values( this.form.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }              
      });
      
      /*if (this.empleado.id === 0) {
        this.empleado.id = this.empleados.length + 1;
        this.empleados.push(this.empleado);
      }
      this.empleado = { id: 0, nombre: "", apellidoPaterno: "", apellidoMaterno: "", email: "", edad: 0, sexo: "" };*/
    }
  }

  editar(e: Empleado){
    this.empleado = e;
  }

  borrar(e: Empleado){
    this.empleados = this.empleados.filter(x => x != e);
  }
  

}
