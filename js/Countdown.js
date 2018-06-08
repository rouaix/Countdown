

let Decompte;
let tempsEcoule;
let tempsCompteurEnSecondes;
let tempsDemande;

let cJours;
let cHeures;
let cMinutes;
let cSecondes;

let ctJours;
let ctHeures;
let ctMinutes;
let ctSecondes;

let action

tempsEcoule = 0;
tempsCompteurEnSecondes = 0;
tempsDemande = 0;



function LancerDecompte(){
    //if(tempsEcoule == 0){
        document.getElementById('Pause').innerHTML = "Pause";
        document.getElementById("image").style.display = "none";

        tempsDemande = 0;
        tempsEcoule = 0;

        cJours = document.getElementById("nJours").value;
        cHeures = document.getElementById("nHeures").value;
        cMinutes = document.getElementById("nMinutes").value;
        cSecondes = document.getElementById("nSecondes").value;

        if (!cJours){cJours=0;}
        if (!cHeures){cHeures=0;}
        if (!cMinutes){cMinutes=0;}
        if (!cSecondes){cSecondes=0;}

        ctJours = cJours;
        ctHeures = cHeures;
        ctMinutes = cMinutes;
        ctSecondes = cSecondes;

        if (cJours > 0){tempsDemande = tempsDemande + Math.round(cJours * 86400);}
        if (cHeures > 0){tempsDemande = tempsDemande + Math.round(cHeures * 3600);}
        if (cMinutes > 0){tempsDemande = tempsDemande + Math.round(cMinutes * 60);}
        if (cSecondes > 0){tempsDemande =  tempsDemande + Math.round(cSecondes) ;}

         tempsCompteurEnSecondes = tempsDemande;

        //tempsDemande = document.getElementById('nJours').value;  
        //document.getElementById("infos").innerHTML  = tempsDemande;

        document.getElementById("saisie").style.display = "none";
        //document.getElementById("Lancer").disabled = "true";


        Decompte = setInterval(CompteurDecompte,1000);
    //}
}

function CompteurDecompte(){    
    if (tempsCompteurEnSecondes > 0){
        if (action !="pause"){
            tempsEcoule += 1;
            tempsCompteurEnSecondes -= 1;  
            
            if (ctSecondes >0){ctSecondes --;}
            if (ctSecondes == 0){                              
                if (ctMinutes > 0){
                    ctSecondes = 59;  
                    ctMinutes --;
                }
                if (ctMinutes == 0){                    
                    if (ctHeures > 0){
                        ctMinutes = 60;
                        ctHeures --;
                    }
                    if (ctHeures == 0){
                        if (ctJours>0){
                            ctHeures = 24;    
                            ctJours --;
                         }
                        if (ctJours == 0){
                            
                        }
                    }
                }
            }
            
            //document.getElementById("Camenbert").className = "c100 p" + Math.round((ctSecondes / 60)*100) + " big";
  
            var Pourcentage = Math.round(((tempsCompteurEnSecondes / tempsDemande)*100));           
            new_degrees = 360 - Math.round(360 * Pourcentage / 100);            
            draw();
            
            //-------------------------------------------------------------          
            
            document.getElementById('xjours').innerHTML = ctJours + "<div>Jours</div>";
            document.getElementById('xheures').innerHTML = ctHeures + "<div>Heures</div>";
            document.getElementById('xminutes').innerHTML = ctMinutes + "<div>Minutes</div>";
            document.getElementById('xsecondes').innerHTML = ctSecondes + "<div>Secondes</div>";            
        }
    }else{
        document.getElementById('xjours').innerHTML = 0 + "<div>Jours</div>";
        document.getElementById('xheures').innerHTML = 0 + "<div>Heures</div>";
        document.getElementById('xminutes').innerHTML = 0 + "<div>Minutes</div>";
        document.getElementById('xsecondes').innerHTML = 0 + "<div>Secondes</div>";
        
        clearInterval(Decompte);
        document.getElementById("image").style.display = "block";
    }
}

function PauseRepriseDecompte(){
    if (action == "pause"){
        action = "";
        document.getElementById('Pause').innerHTML = "Stop";
    }else{
        action= "pause";
        document.getElementById('Pause').innerHTML = "Play";
    }
}

function InitialiserDecompte(){
    
    
    clearInterval(Decompte); 
      
    document.getElementById('xjours').innerHTML = 0 + "<div>Jours</div>";
    document.getElementById('xheures').innerHTML = 0 + "<div>Heures</div>";
    document.getElementById('xminutes').innerHTML = 0 + "<div>Minutes</div>";
    document.getElementById('xsecondes').innerHTML = 0 + "<div>Secondes</div>";
    
    document.getElementById("nJours").value = "";
    document.getElementById("nHeures").value = "";
    document.getElementById("nMinutes").value = "";
    document.getElementById("nSecondes").value = "";
    
    document.getElementById("saisie").style.display = "block";
    document.getElementById("image").style.display = "none";
    
    //document.getElementById("Lancer").disabled = "false" ;
    
    tempsEcoule = 0;
    
    degrees = -1;
    new_degrees = 0;
    
    draw();
    document.location.reload(true);
}

function ResetDecompte(){    
    clearInterval(Decompte);  
    LancerDecompte();
}

function ControleSaisie(xid){
    var temp = document.getElementById(xid).value 
    temp = Math.round(temp);
    if (temp < 0){temp = 0;}
    
    switch (xid) {
      case 'nJours':
          if (temp > 365){temp = 365;}
        break;
      case 'nHeures':
          if (temp > 24){temp = 24;}          
        break;
      case 'nMinutes':
          if (temp > 60){temp = 60;}             
        break;
      case 'nSecondes':
          if (temp > 60){temp = 60;}   
        break;    
      default:
        console.log('Sorry, we are out of ' + expr + '.');
    } 
    document.getElementById(xid).value = temp;
}

//-Gauge -------------------------------- 
//-------------------------------------------------------------
let degrees;
let new_degrees;
let canvas;
let Gauge;
let W;
let H;
let difference;
let color;
let bgcolor;
let text;
let animation_loop, redraw_loop;     

//-------------------------------------------------------------
//-------------------------------------------------------------     
//canvas initialization
canvas = document.getElementById("canvas");
Gauge = canvas.getContext("2d");
//dimensions
W = canvas.width;
H = canvas.height;
//Variables
degrees = -1;
new_degrees = 0;
difference = 0;
//color = "#A0D783";
color = "#fff";
bgcolor = "#1C2021";
//------------------------------------------------------------- 

draw();

function init()
{
    Gauge.clearRect(0, 0, W, H);
    Gauge.beginPath();
    Gauge.strokeStyle = bgcolor;
    Gauge.lineWidth = 30;
    Gauge.arc(W/2, H/2, 100, 0, Math.PI*2, false); 
    Gauge.stroke();
    var radians = degrees * Math.PI / 180;
    Gauge.beginPath();
    Gauge.strokeStyle = color;
    Gauge.lineWidth = 30;
    Gauge.arc(W/2, H/2, 100, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false); 
    Gauge.stroke();
    Gauge.fillStyle = color;
    Gauge.font = "50px tahoma";                
    
    text = Math.floor(degrees/360*100) + " %";
    text_width = Gauge.measureText(text).width;
    Gauge.fillText(text, W/2 - text_width/2, H/2 + 15);
}

function draw()
{
        if(typeof animation_loop != undefined) clearInterval(animation_loop);
        difference = new_degrees - degrees;
        animation_loop = setInterval(animate_to, 1);
}

function animate_to()
{
        if(degrees == new_degrees) 
                clearInterval(animation_loop);		
        else
                degrees = new_degrees;
        init();
}