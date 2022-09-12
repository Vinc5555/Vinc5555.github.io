//Push Benachrichtigungen zulassen / Anfrage
console.log(Notification.permission);

if (Notification.permission==="granted"){
  alert("Wir haben Zugriff!!!");
}else if(Notification.permission!=="denied"){
Notification.requestPermission().then(permission=>{
  console.log(permission);
  })  
};

// FUNKTION FÜR VALUE IM TIME INPUT
function setMinTime() {
  
  let future = new Date();

  var zerozero="00"
  future.setTime(future.getTime() + 2*3600000);

 var futureYear= future.getFullYear();
 var futureHour=future.getHours();  
 if(futureHour<10){futureHour="0"+futureHour}
    var futureMonth = future.getMonth()+1;
        if(futureMonth<10){futureMonth="0"+futureMonth};
    var futureDay = future.getDate();
        if(futureDay<10){futureDay = "0"+futureDay};
    var futureDate = futureYear+"-"+futureMonth+"-"+futureDay+"T"+futureHour+":"+zerozero;
    document.getElementById('daytime').value=futureDate;
    //document.getElementById('daytime').setAttribute("value", futureDate);
    

}

//Burger Menu button mit Responsivitätseinstellung
function openNav() {
  var screenSize=window.innerWidth;
  if(screenSize<=600){
    document.getElementById("mytopbar").style.height = "150px";
    document.getElementById("box").style.marginBottom = "0";
  }
  else{document.getElementById("mytopbar").style.height = "250px";
  document.getElementById("box").style.marginTop = "250px";
  }
  
};

//close button (x) - function
function closeNav() {
  document.getElementById("mytopbar").style.height = "0";
  document.getElementById("box").style.marginTop= "0";
};

//Funktion zum Abruf des Enddatums
function showEnddate(){
  var endDatum =  new Date(localStorage.getItem('chosenDate'));
  var dateString =
    endDatum.getUTCFullYear() + "/" +
    ("0" + (endDatum.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + endDatum.getUTCDate()).slice(-2) + " " +
    ("0" + endDatum.getHours()).slice(-2) + ":" +
    ("0" + endDatum.getUTCMinutes()).slice(-2) + ":" +
    ("0" + endDatum.getUTCSeconds()).slice(-2);
  document.getElementById("endDate").innerHTML = "Ende: "+dateString;
};

//dateTime packt die Variablen im Locel-
function dateAuswahl(){
  var dayPick = new Date(document.getElementById("daytime").value);
  
    localStorage.setItem('chosenDate',dayPick);
    var now=new Date();
    let max=dayPick.getTime()-now.getTime(); //maximalste Differenz für Progbar
    localStorage.setItem('max',max)
  

}

//Im Grunde unsere main Funktion zum Anzeigen Aller anforderung (Progressbar, Countdown,Uhrzeit )
function onload(){
  
  
 showEnddate();
 setMinTime();
  var i=60;
 
  setInterval(function differenzanzeige(){
  
  var dayPick=new Date(localStorage.getItem('chosenDate'));
  var max=localStorage.getItem('max');
  
  let jetzt = new Date();
  // let diff=new Date(dayPick.getTime()-jetzt.getTime());
  let diff=dayPick.getTime()-jetzt.getTime();
  
  //Progress Bar
  
  var prozent=((diff-max)/max)*(-100);
  if(prozent<=100) {2
    document.getElementById("progress-done").style.width=prozent+"%";
  }else{document.getElementById("progress-done").style.width="100%"};

  var h = Math.floor(((diff%(1000*60*60*4))/(1000*60*60))+Math.floor(diff/(1000*60*60*24))*24);
  var m = Math.floor((diff%(1000*60*60))/(1000*60));
  var s = Math.floor((diff%(1000*60))/(1000));
  
  
  
  // wenn volle Stunde dann mit führender Null
  if(h>=1 && m<10){
    m="0"+m;
    document.getElementById("differenz").innerHTML = "noch "+h+" h "+m+" min ";
  } 
  ////wenn 1h:00m:sec dann 60min
  if(diff<=1000*60*60){
    document.getElementById("differenz").innerHTML = "noch "+(m+1)+" min ";
  }
  else{
   document.getElementById("differenz").innerHTML = "noch "+h+" h "+m+" min "; //+s+" Sekunden"
  }

  if (diff<0){
    clearInterval();
    document.getElementById("differenz").innerHTML = "Abgelaufen";
  }

 //BLINKER
 if(h>=1&&m==00||h>=1&&m==45||h>=1&&m==30||h>=1&&m==15||h==0&&m==44||h==0&&m==29||h==0&&m==14||h==0&&m==9||h==0&&m==4||h==0&&m==0&&s>0||diff<0){
    document.getElementById("differenz").className = "red";
     $restzeit="noch "+h+" Stunden und "+m+" Minuten";
      if (i==60){
      const notification=new Notification("Countdown",{
      body:$restzeit
      });
      
      }
      i--;
      //wenn i durch intervall kleiner 1 ist dann wird es wieder aufgefüllt (nach 1min )
      if(i<=0){
      i=60
      };
      
  }
 
 else{document.getElementById("differenz").className = "norm";}
},1000)
};




//Progress Bar

// function showProgressbar(){
//   var endDate = new Date(document.getElementById("daytime").value);
//   var now=new Date();
//   let max=endDate.getTime()-now.getTime();  
//   var prozent=0;
//   if(prozent<=100){
//     let unterschied=endDate.getTime()-now.getTime();
      
//       prozent=((max-unterschied)/max)*100;
//       document.getElementById("progress-done").style.width=prozent+"%";
//   } 
//   //setInterval(document.getElementById("progress-done").style.width=prozent+"%",1000)
// };


let uhrzeitanzeige = setInterval(uhrzeitausgabe, 1000);
function uhrzeitausgabe() {
  let zeitpunkt = new Date();
  let uhrzeit = zeitpunkt.toLocaleTimeString();

  document.getElementById("currTime").innerHTML = uhrzeit;
  
};


