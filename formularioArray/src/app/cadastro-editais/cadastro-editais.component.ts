import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-editais',
  templateUrl: './cadastro-editais.component.html',
  styleUrls: ['./cadastro-editais.component.scss'],
})
export class CadastroEditaisComponent {

  checkbox = false;
  radio: string = '';
  fileName: string = '';
  anexoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.anexoForm = this.fb.group({
      titulo: ['', Validators.required],
      descreva: ['', Validators.required],
      email: ['', Validators.required],
      resultados: ['', Validators.required],
      filePdf: ['', Validators.required],
      anexos: this.fb.array([]),
    });
  }

  get anexos(): FormArray {
    return this.anexoForm.get('anexos') as FormArray;
  }

  newAnexo(): FormGroup {
    return this.fb.group({
      nameBt: ['', Validators.required],
      radio: ['', Validators.required],
      link: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  addAnexo() {
    this.anexos.push(this.newAnexo());
  }

  rmAnexo() {
    this.anexos.removeAt(-1);
  }

  show(i: number): string {
    return this.anexos.value[i].radio;
  }

  upload(event: any) {
    this.fileName = event.target.files[0].name;
    console.log(this.anexos.value);
  }

  radios(i: number) {
    this.radio = this.anexos.value[i].radio;
  }


  onSubmit() {
    console.log(this.anexoForm.value);
  }
}
