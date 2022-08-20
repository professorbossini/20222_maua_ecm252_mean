import { Component, OnInit} from '@angular/core'
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
@Component({
  selector:'app-cliente-inserir',
  templateUrl:'./cliente-inserir.component.html',
  styleUrls:['./cliente-inserir.component.css']
})

export class ClienteInserirComponent implements OnInit{

  private modo: string = "criar"
  private idCliente: string;
  public cliente: Cliente;
  constructor(
    public clienteService: ClienteService,
    public route: ActivatedRoute
  ) {
    
  }

  //localhost:4200/criar
  //localhost:4200/editar/123456
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idCliente')){
        this.modo = 'editar'
        this.idCliente = paramMap.get('idCliente')
        this.clienteService.getCliente(this.idCliente).subscribe (dadosCli => {
          this.cliente = {
            id: dadosCli._id,
            nome: dadosCli.nome,
            fone: dadosCli.fone,
            email: dadosCli.email
          }
        })
      }
      else{
        this.modo = 'criar'
        this.idCliente = null
      }
    })
  }
  //exemplo de mapa de parâmetros
  // http://localhost:3000/clientes/123465/abcd
  // //clientes/:idCliente/:idPedido
  // //{idCliente: 123465, idPedido: abcd}


  onSalvarCliente(form: NgForm){
    if (form.invalid){
      return;
    }
    if (this.modo === "criar"){
      this.clienteService.adicionarCliente(
        form.value.nome,
        form.value.fone,
        form.value.email
      );
    }
    else{
      this.clienteService.atualizarCliente(
        this.idCliente,
        form.value.nome,
        form.value.fone,
        form.value.email
      )
    }
    form.resetForm();
  }
}
