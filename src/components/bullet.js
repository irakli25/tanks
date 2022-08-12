import {LitElement, html, css} from "lit-element";

export class Bullet extends LitElement {
    constructor(){
        super();
        this.x = 0;
        this.y = 0;
        this.firstX = 0;
        this.firstY = 0;
        this.incX = 0;
        this.incY = 0;
        this.maxDistance = 400;
        this.id = `id_${Math.round(Math.random()*1000)}`;
    }


    static get properties()
    {
        return{
            x:Number,
            y:Number,
            incX:Number,
            incY:Number,
            firstX:Number,
            firstY:Number,
        }
        
    }

    static get styles(){
        return css `
            .bullet{
                position: absolute;
                background-image: url(./asset/bullet.png);
                width: 5px;
                height: 5px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        `;
    }

    updated(changedProperties){
       
        if(changedProperties.has('firstX') || changedProperties.has('firstY')){
            
            this.x = this.firstX;
            this.y = this.firstY;
        }

        if(changedProperties.has("x") || changedProperties.has("y")){
            this.shadowRoot.querySelector(".bullet").style.top = `${this.y}px`;
            this.shadowRoot.querySelector(".bullet").style.left = `${this.x}px`;
            this.distance = this._length(this.firstX,this.firstY, this.x,this.y);
            if(this.distance > this.maxDistance){
                this.dispatchEvent(new CustomEvent('bulletDown',{detail:{
                    id:this.id
                }
            }
            ));
            window.clearInterval(this.interval);
            }
        }

    }

    bulletMove(){  
        this.x += this.incX;
        this.y += this.incY;
    }

    _length(x1,y1,x2,y2){
        let a = x1 - x2;
        let b = y1 - y2;
        return Math.sqrt( a*a + b*b );
    }

    render(){
        return html `
            <div class="bullet"></div>
        `;
    }
}

customElements.define("tank-bullet",Bullet);