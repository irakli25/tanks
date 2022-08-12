import {Tank} from '../class/tank';
import{elementCoordinates} from "../game-app";
class enemyTank extends Tank { 
   constructor(){
       super();
       this.x = this._getRandom(0,900);
       this.y = this._getRandom(0,250);
       this.name = 'enemy_tank';
       this.rotation = 180;
       this.targetX = null;
       this.targetY = null;
       this.fire = false;
       elementCoordinates.push({id : this.id});
       this.gameInterval = setInterval(() => {
        elementCoordinates.map(this._checkcoordinates.bind(this));
        }, 50);

       
   }

   _checkcoordinates(element){
        if(element.name == "player_tank"){
            if(this._checkDistance(element.center.x,element.center.y)){
                this.targetX  = element.center.x;
                this.targetY = element.center.y;
                if(!this.fire){
                    this.fireInterval = setInterval(this._fire.bind(this),2000);
                    this.fire=true;
                }   
            }
            else{
                this.fire=false;
                clearInterval(this.fireInterval);
            }
        }
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
      
   }
   

   _checkDistance(targetX = this.targetX, targetY = this.targetY){
       let distance = this._length(this.vehicleCenter.x, this.vehicleCenter.y,targetX,targetY);
       return distance < 410;
   }

}

customElements.define("enemy-tank", enemyTank);  


