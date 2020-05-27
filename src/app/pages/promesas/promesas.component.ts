import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {    

    this.contarTres().then(
       (message) => console.log('Joya',message)
    )
    .catch( err => console.error('Error', err));
   }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean>{
    return new Promise((resolve, reject) =>{
      let contador = 0;

      let intervalo = setInterval( () =>{
        contador += 1;
        console.log(contador);

        if(contador === 3){
          resolve(true);
          clearInterval(intervalo);
        }
      }, 2000);

    });

  }

}
