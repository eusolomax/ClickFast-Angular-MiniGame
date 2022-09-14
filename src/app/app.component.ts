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
  caradavez = 0
  showMiniGame = false
  showStartScreen = true
  id = 0
  valueId = 0
  valueCheckbox = 0
  StartDisabledCheckBox = false
  redClassBoolean = false
  disableChoice = false

  clearChoices(){
    document.getElementsByName("prefabChoice").forEach((el: any) => {el.checked = false})
  }

  startMiniGame(){
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
    if (this.valueCheckbox > 120) {
      this.StartDisabledCheckBox = true
      this.redClassBoolean = true
      setTimeout(() => {
        this.StartDisabledCheckBox = false
        this.redClassBoolean = false
        event.target.value = 120
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
}
