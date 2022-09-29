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
  lastScores: Array<any> = [localStorage.getItem("data")]
  caradavez: number = 0
  showMiniGame: boolean = false
  showMiniGameDisplay: boolean = true
  showStartScreen: boolean = true
  id: number = 0
  valueId: number = 0
  valueCheckbox: number = 0
  StartDisabledCheckBox: boolean = false
  redClassBoolean: boolean = false
  redClassBooleanTitle: boolean = false
  disableChoice: boolean = false
  textButtonMiniGame: string = "START"

  minigameSet: boolean = false
  minigameGo: boolean = false
  minigameState: boolean = false
  startStopWatch: any
  stopStopWatch = () => { clearInterval(this.startStopWatch) }
  watchMin: any = 0
  watchSec: any = "0" + 0
  watchMl: any = "00" + 0

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

  setGo(){
    this.minigameGo = false
    this.minigameSet = true
    setTimeout(() => {
      this.minigameSet = false
      this.minigameGo = true
      this.minigameState = true
      this.startWatch()
    }, 2000);
  }

  startWatch(){
    if (this.minigameState = true){
      this.startStopWatch = setInterval(() => {
          this.watchMl++
          this.watchMl = this.watchMl < 10 ? "0" + this.watchMl : this.watchMl

          if (this.watchMl == 100) {
            this.watchSec++
            this.watchSec = this.watchSec < 10 ? "0" + this.watchSec : this.watchSec

            this.watchMl = 0
          }

          if (this.watchSec == 60) {
            this.watchMin++
            this.watchMin = this.watchMin < 10 ? "0" + this.watchMin : this.watchMin

            this.watchSec = 0
          }
      }, 10)
    } else {
      clearInterval(this.startStopWatch)
    }
  }

  endGame(){
    this.stopStopWatch()
    this.minigameState = false
    this.showMiniGameDisplay = false
    this.textButtonMiniGame = "RESTART"
    
    this.lastScores = [this.getData()]
    localStorage.setItem("data", `${this.lastScores}`)
  }

  addCounter(){
    this.caradavez = this.caradavez + 1

    if (this.caradavez == this.inputs.length) {
      this.endGame()
    }
  }

  getData(){
    let data = `(${this.valueId}) | ${this.watchMin}m ${this.watchSec}s ${this.watchMl}ms`
    return data
  }
}

