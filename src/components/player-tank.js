import {Tank} from '../class/tank';
import{elementCoordinates} from "../game-app";
class playerTank extends Tank { 
   constructor(){
       super();
       this.x = this._getRandom(0,900);
       this.y = this._getRandom(600,700);
       this.name = 'player_tank';
       this.fire = false;
       elementCoordinates.push({id : this.id });
       this.fireInterval = "";
       this.loading = true;
       this._loadGun();
       window.addEventListener('mousedown', (event) => {
           this.fireInterval = setInterval(() => {
                if(!this.loading)
                    this._fire();
           }, 100);
        });

        window.addEventListener('mouseup', (event) => {
            clearInterval(this.fireInterval);
          });

        window.addEventListener("keydown", (event) => { 
          
            this.vectorX = Math.sin(this.rotation  * Math.PI / 180 );
            this.vectorY = - Math.cos(this.rotation  * Math.PI / 180 );

            switch(event.code){
                case "ArrowRight" : case "KeyD" : this.right = true;break;
                case "ArrowLeft" : case "KeyA" : this.left = true;break;
                case "ArrowUp" : case "KeyW" : this.forward = true;break;  
                case "ArrowDown" : case "KeyS" : this.back = true;break;
            }

        });

        window.addEventListener("keyup", (event) => { 
            switch(event.code){
                case "ArrowRight" : case "KeyD" : this.right = false;break;
                case "ArrowLeft" : case "KeyA" : this.left = false;break;
                case "ArrowUp" : case "KeyW" : this.forward = false;break;  
                case "ArrowDown" : case "KeyS" : this.back = false;break;
            }
            
        });
    }

    _fire(){
        this.gun = this.shadowRoot.querySelector("#gun");
        this.gunCenter = this._getCenter(this.gun);
        this.dispatchEvent(new CustomEvent("fire",
        {detail: 
            {
                tankRotation:this.rotation,
                gunCenter:this.gunCenter,
                angle:this._moveTurrent()
            }
        })
        );
        this.loading = true;
        this._loadGun();
    }

    _loadGun(){
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }



}

customElements.define("player-tank", playerTank);  


