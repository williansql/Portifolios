import { Component } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-cadastro-editais',
    templateUrl: './cadastro-editais.component.html',
    styleUrls: ['./cadastro-editais.component.scss'],
})
export class CadastroEditaisComponent {
    valid: boolean = false;
    filePdf: string = '';
    checkbox: boolean = false;
    radio: string = '';
    fileName?: string;
    anexoForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.anexoForm = this.fb.group({
            titulo: ['', Validators.required],
            descreva: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            resultados: [Boolean, Validators.required],
            nameBt: ['', Validators.required],
            radio: ['', Validators.required],
            link: '',
            file: '',
            filePdf: ['', Validators.required],
            anexos: this.fb.array([]),
        });
    }

    get anexos(): FormArray {
        return this.anexoForm.get('anexos') as FormArray;
    }

    anexoGroup(index: number) {
        return this.anexos.get(String(index))?.get('file')!.value;
    }

    nameBtn(index: number){
        return this.anexos.get(String(index))?.get('nameBtn')!.value;
    }

    newAnexo(): FormGroup {
        return this.fb.group({
            nameBtn: ['', Validators.required],
            radio: ['', Validators.required],
            link: '',
            file: '',
        });
    }

    addAnexo() {
        this.anexos.push(this.newAnexo());
    }

    rmAnexo() {
        this.anexos.removeAt(-1);
    }

    show() {
        return this.anexoForm.value.radio;
    }

    showArray(i: number): string {
        return this.anexos.value[i].radio;
    }

    upload(event: any) {
        if (event.target.files[0] == undefined) {
            this.fileName = '';
        } else {
            this.fileName = event.target.files[0].name;
        }
    }

    uploadArray(event: any, index: number) {
        if (event.target.files[0] != undefined) {
            this.anexos
                .get(String(index))
                ?.patchValue({ file: event.target.files[0].name });
        } else {
            this.anexos.get(String(index))?.patchValue({ file: '' });
        }
    }

    uploadPdf(event: any) {
        if (event.target.files[0] == undefined) {
            this.filePdf = '';
        } else {
            this.filePdf = event.target.files[0].name;
        }
    }

    clearFile() {
        this.fileName = '';
        this.anexoForm.get('file')!.patchValue({ file: '' });
    }

    clearFileArray(index: number) {
        this.anexos.get(String(index))?.patchValue({ file: '' });
    }

    clearPdf() {
        this.filePdf = '';
        this.anexoForm.get('filePdf')!.patchValue('');
        console.log(this.filePdf);
    }

    radios(i: number) {
        this.radio = this.anexos.value[i].radio;
    }

    invalidFieldArray(field: string, i: number) {
        return (
            this.anexos.controls[i].get('nameBtn')?.invalid &&
            (this.anexos.controls[i].get('nameBtn')?.dirty ||
                this.anexos.controls[i].get('nameBtn')?.touched)
        )
    }

    invalidField(field: string){
        return (
            this.anexoForm.controls[field].invalid &&
            (this.anexoForm.controls[field].dirty ||
                this.anexoForm.controls[field].touched)
        );
    }

    onSubmit() {
        console.log(this.anexoForm.value);
    }
}
