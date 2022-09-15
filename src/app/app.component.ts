import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/app.component.css',
    './css/start.component.css',
    './css/minigame.component.css'
  ]
})
export class AppComponent {
  inputs: Array<number> = []
  caradavez: number = 0
  showMiniGame: boolean = false
  showStartScreen: boolean = true
  id: number = 0
  valueId: number = 0
  valueCheckbox: number = 0
  StartDisabledCheckBox: boolean = false
  redClassBoolean: boolean = false
  redClassBooleanTitle: boolean = false
  disableChoice: boolean = false

  clearChoices(){
    document.getElementsByName("prefabChoice").forEach((el: any) => {el.checked = false})
  }

  startMiniGame(){
    if (this.valueId == 0 || this.valueCheckbox == 0){
      this.redClassBooleanTitle = true
      setTimeout(() => {
        this.redClassBooleanTitle = false
      }, 1200);
    }

    for(let i = 0; i < document.getElementsByName("prefabChoice").length; i++) {
      const el: any = document.getElementsByName("prefabChoice")[i]
      if (el.checked) {
        this.id = i
        
        switch (this.id) {
          case 0:
            this.valueId = 10
            break;
        case 1:
            this.valueId = 25
            break;
        case 2:
            this.valueId = 30
            break;
        case 3:
            this.valueId = 45
            break;
        }        

        this.showMiniGame = true
        this.showStartScreen = false
      } 
      
      if (this.valueCheckbox > 0) {
        this.valueId = this.valueCheckbox
        this.showMiniGame = true
        this.showStartScreen = false
      }
    }

    for(let i = 0; i < this.valueId; i++) {
      this.inputs.push(1)
    }
  }

  checkMaxLength(event: any){
    if (this.valueCheckbox > 90) {
      this.StartDisabledCheckBox = true
      this.redClassBoolean = true
      setTimeout(() => {
        this.StartDisabledCheckBox = false
        this.redClassBoolean = false
        event.target.value = 90
        this.valueCheckbox = 90
      }, 1200);
    }

    if (this.valueCheckbox > 0) {
      this.disableChoice = true
      
    } else {
      this.disableChoice = false
    }
  }

  getValue(event: any){
    this.valueCheckbox = event.target.value
    this.checkMaxLength(event)
  }

  endToLobby(){
    window.location.replace("http://localhost:4200");  
  }
}
