import {LitElement, html, css} from "lit-element";
import{elementCoordinates} from "../game-app";

export class Tank extends LitElement { 
    constructor(){
        super();
        this.name = "";
        this.id = `id_${Math.round(this._getRandom(100,1000))}`;
        this.turrent = {};
        this.vehicle = {};
        this.vehicleCenter = {};
        this.turrentCenter = {};
        this.targetX = 0;
        this.targetY = 0;
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.rotation = 0;
        this.vectorX = 0;
        this.vectorY = 0;
        this.x = 0;
        this.y = 0;
        this.left = false;
        this.right = false;
        this.forward = false;
        this.back = false;
        
        
       
    }

    static get properties(){
        return {
            vehicle:{
                type:Object,
            },
            vehicleCenter:{
                type:Object,
            },
            turrent: {
                type:Object,
            },
            turrentCenter: {
                type:Object, 
            },
            targetX : {
                type:Number,
            },

            targetY : {
                type:Number,
            },
            x : {
                type:Number,
            },

            y : {
                type:Number,
            },
            rotation:{
                type: Number,
            },
            boardWidth:Number,
            boardHeight:Number,
            vectorX:Number,
            vectorY:Number,
            left:Boolean,
            right:Boolean,
            back:Boolean,
            forward:Boolean,

        }
    }

    _getCenter(element) {
        const {left, top, width, height} = element.getBoundingClientRect();
        if (left != 0 && top !=0)
            return {x: left + width / 2, y: top + height / 2}
        else 
            return 0;    
    }

    _moveTurrent(){
        const angle = Math.atan2(this.targetY - this.turrentCenter.y, this.targetX - this.turrentCenter.x) - Math.PI/2 - (this.rotation + 180) * (Math.PI/180);
        this.turrent.style.transform = `rotate(${angle}rad)`; 
        return angle;
    }

    _move() {
        this.vehicle.style.top = `${this.y}px`; 
        this.vehicle.style.left = `${this.x}px`; 
        this.vehicle.style.transform = `rotate(${this.rotation}deg)`;
        this.turrentCenter = this._getCenter(this.turrent);
        this._moveTurrent();

        this.topLeft = this.shadowRoot.querySelector("#topLeft");
        this.bottomLeft = this.shadowRoot.querySelector("#bottomLeft");
        this.topRight = this.shadowRoot.querySelector("#topRight");
        this.bottomRight = this.shadowRoot.querySelector("#bottomRight");

        this.topLeftCentr = this._getCenter(this.topLeft);
        this.bottomLeftCentr = this._getCenter(this.bottomLeft);
        this.topRightCentr = this._getCenter(this.topRight);
        this.bottomRightCentr = this._getCenter(this.bottomRight);
        
        // if( 
        //     Math.round(
        //         this._triangleArea(
        //             this._length(this.topLeftCentr.x,this.topLeftCentr.y,this.bottomLeftCentr.x,this.bottomLeftCentr.y),
        //             this._length(this.topLeftCentr.x,this.topLeftCentr.y,this.targetX,this.targetY),
        //             this._length(this.bottomLeftCentr.x,this.bottomLeftCentr.y,this.targetX,this.targetY)
        //         ) +
        //         this._triangleArea(
        //             this._length(this.bottomLeftCentr.x,this.bottomLeftCentr.y,this.bottomRightCentr.x,this.bottomRightCentr.y),
        //             this._length(this.bottomLeftCentr.x,this.bottomLeftCentr.y,this.targetX,this.targetY),
        //             this._length(this.bottomRightCentr.x,this.bottomRightCentr.y,this.targetX,this.targetY)
        //         ) +
        //         this._triangleArea(
        //             this._length(this.bottomRightCentr.x,this.bottomRightCentr.y,this.topRightCentr.x,this.topRightCentr.y),
        //             this._length(this.bottomRightCentr.x,this.bottomRightCentr.y,this.targetX,this.targetY),
        //             this._length(this.topRightCentr.x,this.topRightCentr.y,this.targetX,this.targetY)
        //         ) +
        //         this._triangleArea(
        //             this._length(this.topLeftCentr.x,this.topLeftCentr.y,this.topRightCentr.x,this.topRightCentr.y),
        //             this._length(this.topLeftCentr.x,this.topLeftCentr.y,this.targetX,this.targetY),
        //             this._length(this.topRightCentr.x,this.topRightCentr.y,this.targetX,this.targetY)
        //         ) 
        //     ) <= 5000 
        // )
        // {
        //     console.log("boom");
        // }
    }

    _length(x1,y1,x2,y2){
        let a = x1 - x2;
        let b = y1 - y2;
        return Math.sqrt( a*a + b*b );
    }

    _triangleArea(side1,side2,side3){
        let perimeter = (side1 + side2 + side3)/2;
        return  Math.sqrt(perimeter*((perimeter-side1)*(perimeter-side2)*(perimeter-side3)));
    }

    updated(changedProperties){
        if(changedProperties.has("turrent")){
            this.turrent = this.shadowRoot.querySelector('#turrent');
            this.turrentCenter = this._getCenter(this.turrent);
        }

        if(changedProperties.has("vehicle")){
            this.vehicle = this.shadowRoot.querySelector('#vehicle');
            this.vehicleCenter = this._getCenter(this.vehicle);
        }


        if(changedProperties.has("x") || changedProperties.has("y") || changedProperties.has("rotation")){

            elementCoordinates.map(this._updateCenter.bind(this));
            if(this.x <= 20) this.x = 20;
            if(this.y <= 0) this.y = 0;
            if(this.x >= this.boardWidth-70) this.x = this.boardWidth-70;
            if(this.y >= this.boardHeight-100) this.y = this.boardHeight-100;
            this.vehicleCenter = this._getCenter(this.vehicle);
            this._move();
           
        }

        if(changedProperties.has("targetX") || changedProperties.has("targetY")){
            this._moveTurrent();
        }
      
    }

    tankMove(){
        this._changeDirection();
    }

    _updateCenter(element){
        if(element.id == this.id){
            element.name = this.name;
            element.center=this.vehicleCenter;
        }
    }
    
    _changeDirection(){
        if (this.forward){
            this.x += this.vectorX * 0.3 ;
            this.y += this.vectorY * 0.3;
        }

        if (this.back){
            this.x -= this.vectorX * 0.3 ;
            this.y -= this.vectorY * 0.3 ;
        }

        if (this.right){
            if(this.back)
                this.rotation-= 0.1;
            else 
                this.rotation+=0.1;    
        }
        
        if (this.left){
            if(this.back)
                this.rotation+=0.1;
            else    
                this.rotation-=0.1;
        }

    }

    _getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    static get styles(){
        return css `

            .tank-body{
                background-image: url(./asset/tank-body.svg);
                width: 50px;
                height: 100px;
                background-repeat: no-repeat;
                background-size: 100%;
                background-position: center center;
                transform: rotate(0deg);
                display: inline-block;
                top: 0px;
                left: 0px;
                position: absolute;
            }

            .tank-turrent{
                background-image: url(./asset/tank-turret.svg);
                width: 50px;
                height: 70px;
                background-repeat: no-repeat;
                background-size: 60%;
                background-position: 10px 4px;
                padding-top: 12px;
                transform: rotate(0deg);
            }
        
            .point{
                position:absolute;
                width:0px;
                height:0px;
            }

            #topLeft{
                top:0;
                left:0;
            }

            #bottomLeft{
                bottom:0;
                left:0;
            }

            #topRight{
                top:0;
                right:0;
            }

            #bottomRight{
                bottom:0;
                right:0;
            }

            #gun {
                position: absolute;
                width: 5px;
                height: 5px;
                background: red;
                top: 0px;
                left: 22.5px;
                opacity:0;
            }

        `; 
    } 

    render(){
        return html `
            
            <div id="vehicle" class="tank-body">
                <div id="topLeft" class="point"></div>
                <div id="bottomLeft" class="point"></div>
                <div id="topRight" class="point"></div>
                <div id="bottomRight" class="point"></div>
                <div id="turrent" class="tank-turrent">
                    <div id="gun"></div>
                </div>
            </div>
        `;
    }

}

 


