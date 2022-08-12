import {LitElement, html, css} from "lit-element";
import "./components/player-tank";
import "./components/enemy-tank";
import "./components/bullet";

export const elementCoordinates = new Array();

class GameApp extends LitElement {
    constructor(){
       super();
       this.x = 2;
       this.y = 2;
       this.playerX = null;
       this.playerY = null;
       this.boardWidth = window.innerWidth;
       this.boardHeight = window.innerHeight;
       this.gameBoard = {};
       
       this.addEventListener("mousemove", (event) => {
            this.cursorX = event.pageX;
            this.cursorY = event.pageY;
        });
        this.gameInterval = setInterval(() => { 
            this.bullets = this.shadowRoot.querySelectorAll(".bullet");
            for(let bullet of this.bullets){
                if(bullet !== null){
                    bullet.bulletMove();
                }
            }
            
               
            
            this.player = this.shadowRoot.querySelector("player-tank");
            if(this.player !== null)
                this.player.tankMove();

        });
}

_checkcoordinates(element){
    // if(element.name == "player_tank"){
    //     this.playerX = element.center.x;
    //     this.playerY = element.center.y;
    // }
}

    static get properties(){
        return {

            gameBoard : {
                type:Object,
            },

            boardWidth : {
                type:Number,
            },

            boardHeight : {
                type:Number,
            },

            cursorX:{
                type:Number,
            },

            cursorY:{
                type:Number,
            },
            playerX:{
                type:Number,
            },
            playerY:{
                type:Number,
            },
            bullets: Array,
            x:Number,
            y:Number,

        }
    }

    static get styles(){
        return css `
            .board {
                position:relative;
                background:green;
                overflow:hidden;
                height:0;
                width:0;
                cursor:none;
            }
            #cursor{
                width:30px;
                height:30px;
                background-image:url('./asset/target.png');
                position:absolute;
                z-index:10;
                background-repeat:no-repeat;
                background-position:center;
                background-size:contain;
            }
        `; 
    } 

    updated(changedProperties){
        if(changedProperties.has("boardHeight") || changedProperties.has("boardWidth")){
           this.gameBoard = this.shadowRoot.querySelector("#gameBoard");
           this.gameBoard.style.height = `${this.boardHeight}px`;
           this.gameBoard.style.width = `${this.boardWidth}px`;
           this.bullet = this.shadowRoot.querySelector("tank-bullet");
           this.cursor = this.shadowRoot.querySelector("#cursor");
           this.player = this.shadowRoot.querySelector("player-tank");
        }
        if(changedProperties.has("cursorX") || changedProperties.has("cursorY")){
           this.cursor.style.top = `${this.cursorY - 15}px`;
           this.cursor.style.left = `${this.cursorX - 15}px`;

        }
    }

    _fire(event){
        const template = document.createElement("template");
        template.innerHTML = `<tank-bullet class="bullet" undefined></tank-bullet>`;
        this.shadowRoot.querySelector('#gameBoard').appendChild(template.content.cloneNode(true));
        const bullet = this.shadowRoot.querySelector('tank-bullet[undefined]');
        bullet.removeAttribute('undefined');
        let tankRotation = event.detail.tankRotation * (Math.PI/180);
        let angle = event.detail.angle;
        let turrentRotation = angle + tankRotation;
        bullet.incX = Math.sin(turrentRotation);
        bullet.incY = - Math.cos(turrentRotation);
        bullet.firstY = event.detail.gunCenter.y - 2.5;
        bullet.firstX = event.detail.gunCenter.x - 2.5;
        bullet.addEventListener('bulletDown',this._bulletDown);
    } 


    _bulletDown(event){
        this.removeEventListener('bulletDown',this._bulletDown);
        this.remove();
    }


    render(){
        return html `
            <div class="board" id="gameBoard">
                <div id="cursor"></div>
                <player-tank
                    .targetX = "${this.cursorX}"
                    .targetY = "${this.cursorY}"
                    .boardWidth = "${this.boardWidth}"
                    .boardHeight = "${this.boardHeight}"
                    @fire="${this._fire}"
                ></player-tank>

                <enemy-tank
                    .boardWidth = "${this.boardWidth}"
                    .boardHeight = "${this.boardHeight}"
                    @fire="${this._fire}"
                ></enemy-tank>
                <enemy-tank
                    .boardWidth = "${this.boardWidth}"
                    .boardHeight = "${this.boardHeight}"
                    @fire="${this._fire}"
                ></enemy-tank>
                <enemy-tank
                    .boardWidth = "${this.boardWidth}"
                    .boardHeight = "${this.boardHeight}"
                    @fire="${this._fire}"
                ></enemy-tank>
                
                
                
            </div>
            
        `;
    }
}

customElements.define("game-app", GameApp);


