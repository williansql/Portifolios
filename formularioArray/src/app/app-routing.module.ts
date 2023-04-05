import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroEditaisComponent } from './cadastro-editais/cadastro-editais.component';

const routes: Routes = [
  {path: '', component: CadastroEditaisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
