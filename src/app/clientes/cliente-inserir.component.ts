import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, EventEmitter, Output } from '@angular/core'
@Component({
  selector:'app-cliente-inserir',
  templateUrl:'./cliente-inserir.component.html',
  styleUrls:['./cliente-inserir.component.css']
})

export class ClienteInserirComponent {
  @Output() clienteAdicionado = new EventEmitter();

  nome: string = "";
  fone: string = "";
  email: string = "";

  onAdicionarCliente(){
    const cliente = {
      nome: this.nome,
      fone: this.fone,
      email: this.email,
    };
    this.clienteAdicionado.emit(cliente);
  }
}
