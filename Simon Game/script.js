let gameSeq=[];  //initialized the game sequence
let userSeq=[];  //initialized the user sequence

let btns=["yellow","green","red","purple"];  //buttons initialized into the array

let started=false;  //At starting of the game set to false 
let level=0;        //starting game level set to zero

let h2=document.querySelector("h2");  

// if any key key press the game will start

document.addEventListener("keypress",function(){   //this function is used when the user before starting of the game press...
    if(started==false){                            //...any key in the keyboard the game will start.
        started=true;
        levelUp();
     }
});

// after pressing the key and the game starts after that the computer gives a random flash

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
};

// after the random flash the user will press the color

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
};

// after each successful iteration the level increases

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
};


function checkAns(idx){
    // console.log("curr level=",level);
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML=`game Over! Your score is <b>${level-1}</b> <br>press any key to restart`;
        document.querySelector("body").style.background="red";
        setTimeout(function(){
            document.querySelector("body").style.background="white"; 
        },150);
        reset();
    }
};

// the user will press the color and the color changes to userFlash

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
};

let allBtns=document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",btnPress);
};


function reset(){          //after user clicks the wrong button the game restarts.
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}