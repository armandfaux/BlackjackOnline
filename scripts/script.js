var Valeur=1;
var Valeur2=1;
var Couleur=1;
var AdresseCarte=0;
var SpotActuel=1;
var CartesSorties=[];
var Sabot=0
var CarteID=0;
var Points=0;
var Points2=0;
var Credits=0;
var Mise=0;
var MisMin=0;
var add=0;
var CompteAssurance=0;
var PremiereCarte=0;
var SpotNumber="A";
var Splited=false;
var SplitIndice=0;
var PointsCroupier=0;
var BlackJack=0;
var Score=0;
var Name="";
var x=0;
var y=0;
var AsDouble=false;
document.getElementById("Assurance").innerHTML="";
document.getElementById("Mise").innerHTML="";
document.getElementById("Credits").innerHTML="";

function NewGame(){
	Score=0;
	document.getElementById("record").innerHTML="Score : "+String(Score);
	document.getElementById("sabot").innerHTML="<img src='images/cartes52/dos.svg' style='width: 4.8em;'>";
	Sabot=52;
	Valeur=1;
	Couleur=1;
	AdresseCarte=0;
	SpotActuel=1;
	CartesSorties=[];
	CarteID=0;
	SplitPossible=0;
	Points=0;
	Credits=500;
	PremiereCarte=0;
	PointsCroupier=0;
	CompteAssurance=0;
	Mise=0;
	MisMin=5;
	add=1;
	
	document.getElementById("sabot2").innerHTML=Sabot;
	document.getElementById("Credits").innerHTML="Credits : "+Credits;
	document.getElementById("Mise").innerHTML="Mise : "+Mise;
	
	setTimeout(NouvelleDonne, 100);
}

function NouvelleDonne(){
	
	if(Sabot<15){
		Sabot=52;
		CartesSorties=[];
		add++;
	}
	SplitIndice=0;
	x=Credits;
	Mise=prompt("Entre ta mise ("+MisMin+" minimum) ");
	if (Mise>=MisMin && Mise<=Credits){
	MisMin+=add;
	Credits-=Mise
	y=x-Credits
	document.getElementById("Credits").innerHTML="Credits : "+String(Credits);
	document.getElementById("Mise").innerHTML="Mise : "+String(Mise);
	AsDouble=false;
	CompteAssurance=0
	SpotActuel=1;
	Points=0;
	PointsCroupier=0;
	BlackJack=0
	SpotNumber="A";
	document.getElementById("spotA1").innerHTML=""; document.getElementById("spotA2").innerHTML=""; document.getElementById("spotA3").innerHTML=""; document.getElementById("spotA4").innerHTML=""; document.getElementById("spotA5").innerHTML=""; document.getElementById("spotA6").innerHTML=""; document.getElementById("spotA7").innerHTML="";
	document.getElementById("spotB1").innerHTML=""; document.getElementById("spotB2").innerHTML=""; document.getElementById("spotB3").innerHTML=""; document.getElementById("spotB4").innerHTML=""; document.getElementById("spotB5").innerHTML=""; document.getElementById("spotB6").innerHTML=""; document.getElementById("spotB7").innerHTML="";
	document.getElementById("croupier1").innerHTML=""; document.getElementById("croupier2").innerHTML=""; document.getElementById("croupier3").innerHTML=""; document.getElementById("croupier4").innerHTML=""; document.getElementById("croupier5").innerHTML=""; document.getElementById("croupier6").innerHTML=""; document.getElementById("croupier7").innerHTML="";
	document.getElementById("AbandonnerButton").innerHTML=" <img src='images/AbandonnerButton.png' style='height:1.25em; width: 5em;'>";
	document.getElementById("CarteButton").innerHTML=" <img src='images/CarteButton.png' style='height:1.25em; width: 5em;'>";
	document.getElementById("JeResteButton").innerHTML=" <img src='images/JeReste.png' style='height:1.25em; width: 5em;'>";
	document.getElementById("Assurance").innerHTML="";
	document.getElementById("AssuranceButton").innerHTML="";
	document.getElementById("ValeurAsButton").innerHTML="";
	document.getElementById("DoublerButton").innerHTML="";
	document.getElementById("SplitButton").innerHTML="";
	document.getElementById("un").innerHTML="";
	document.getElementById("onze").innerHTML="";
	document.getElementById("Accolade1").innerHTML=" <img src='images/Accolade.png' style='height:1.25em; width: 5em;'>";
	document.getElementById("Accolade2").innerHTML="";
	
	RandomCard();
	document.getElementById("croupier1").innerHTML=" <img src='"+AdresseCarte+"' style='height:7em;'>"
	Sabot--
	if (Valeur==1){
		PointsCroupier+=11;
		if(Credits>=Mise/2){
			AssuranceIsPossible();
			}
		}
	else if (Valeur>10){PointsCroupier+=10}
	else {PointsCroupier+=Valeur;}
	document.getElementById("compteur2").innerHTML=String(PointsCroupier);
		
	TirerCarte();
	Splited=false;
	}
	else{NouvelleDonne()}
}


function RandomCard(){

	Valeur=Math.floor(Math.random() * (14-1) + 1);
	Couleur=Math.floor(Math.random() * (5-1) + 1);
	if (Couleur==1){Couleur="c"}
	else if (Couleur==2){Couleur="k"}
	else if (Couleur==3){Couleur="p"}
	else if(Couleur==4){Couleur="t"}
		CarteID=String(Valeur)+String(Couleur)
	
	if (CartesSorties.includes(CarteID)){RandomCard()}
	else {
	AdresseCarte="images/cartes52/"+String(CarteID)+".svg"
	CartesSorties.push(CarteID);
	}
	
}

function TirerCarte(){
	if (SpotActuel>1){document.getElementById("AbandonnerButton").innerHTML=""}
	RandomCard()
	document.getElementById("spot"+String(SpotNumber)+String(SpotActuel)).innerHTML=" <img src='"+AdresseCarte+"' style=height:7em;>";
	SpotActuel++;
	
	if(SpotActuel==2){PremiereCarte=Valeur}
	if(SpotActuel==3 && Valeur==PremiereCarte && Splited===false){SplitIsPossible()}
	else {document.getElementById("SplitButton").innerHTML="";}
	
	if(Valeur>9){Valeur=10; Points+=Valeur; document.getElementById("compteur1").innerHTML=String(Points);}
	else if(Valeur==1 && SpotActuel>2){
		document.getElementById("ValeurAsButton").innerHTML=" <img src='images/ValeurAsButton.png' style='height: 2em; width: 8em'>";
		document.getElementById("un").innerHTML=" <img src='images/1.png' style='height:0.71em;'>";
		document.getElementById("onze").innerHTML=" <img src='images/11.png' style='height:0.71em;'>";
		document.getElementById("CarteButton").innerHTML="";
		document.getElementById("JeResteButton").innerHTML="";
		document.getElementById("DoublerButton").innerHTML="";
	}
	else if (Valeur==1){Points+=11}
	else {Points+=Valeur;}
	document.getElementById("compteur1").innerHTML=String(Points);
	
	if(Points>21){
		document.getElementById("CarteButton").innerHTML="";
		document.getElementById("JeResteButton").innerHTML="";
		document.getElementById("DoublerButton").innerHTML="";
		setTimeout(Brule, 100)
		}
	else{
	
	if(SpotActuel==3 && Points==21){if(SpotNumber=="A"){BlackJack+=1}
									else{BlackJack+=2}
									}
	
	if(SpotActuel==3 && Credits>=Mise && Valeur!=1){DoublerIsPossible();}
	else {document.getElementById("DoublerButton").innerHTML="";}
	
	if (SpotActuel>2){document.getElementById("AssuranceButton").innerHTML="";}
	Sabot--
	document.getElementById("sabot2").innerHTML=String(Sabot);
	}
}

function AS1(){
	if (AsDouble===true){JeReste()}
	document.getElementById("un").innerHTML="";
	document.getElementById("onze").innerHTML="";
	document.getElementById("ValeurAsButton").innerHTML="";
	
	Points+=1;
	if (Points>21){Brule()}
	
	document.getElementById("compteur1").innerHTML=String(Points);
	document.getElementById("CarteButton").innerHTML=" <img src='images/CarteButton.png' style='height:1.25em; width: 5em;'>";
	document.getElementById("JeResteButton").innerHTML=" <img src='images/JeReste.png' style='height:1.25em; width: 5em;'>";
	if(SpotActuel==3){DoublerIsPossible();}
}function AS11(){
	if (AsDouble===true){JeReste()}
	document.getElementById("un").innerHTML="";
	document.getElementById("onze").innerHTML="";
	document.getElementById("ValeurAsButton").innerHTML="";
	
	Points+=11;
	if (Points>21){Brule()}
	
	document.getElementById("compteur1").innerHTML=String(Points);
	document.getElementById("CarteButton").innerHTML=" <img src='images/CarteButton.png' style='height:1.25em; width: 5em;'>";
	document.getElementById("JeResteButton").innerHTML=" <img src='images/JeReste.png' style='height:1.25em; width: 5em;'>";
	if(SpotActuel==3){DoublerIsPossible();}
}


function JeReste(){
	if (Splited===true && SplitIndice==0){
		SplitIndice=1
		SpotNumber="B"
		SpotActuel=2
		document.getElementById("DoublerButton").innerHTML="";
		document.getElementById("Accolade1").innerHTML="";
		document.getElementById("Accolade2").innerHTML=" <img src='images/Accolade.png' style='height:1.25em; width: 5em;'>";
		Points2=Points;
		Points=Valeur2
		document.getElementById("compteur1").innerHTML=Points;
	}
	else {
	document.getElementById("CarteButton").innerHTML="";
	document.getElementById("JeResteButton").innerHTML="";
	document.getElementById("DoublerButton").innerHTML="";
	document.getElementById("SplitButton").innerHTML="";
	document.getElementById("AbandonnerButton").innerHTML="";
	document.getElementById("Accolade1").innerHTML="";
	document.getElementById("Accolade2").innerHTML="";
	TourCroupier();
	}
}

function DoublerIsPossible(){
	document.getElementById("DoublerButton").innerHTML=" <img src='images/DoublerButton.png' style='height:1.25em; width: 5em;'>";
}function Doubler(){
	Credits-=Mise
	Mise*=2;
	y*=2;
	document.getElementById("Mise").innerHTML="Mise : "+Mise;
	document.getElementById("Credits").innerHTML="Credits : "+Credits;
	document.getElementById("DoublerButton").innerHTML="";
	TirerCarte()
	if(Valeur==1){AsDouble=true}
	else if (Points<=21){
	setTimeout(JeReste, 100)
	}
}

function SplitIsPossible(){
	document.getElementById("SplitButton").innerHTML=" <img src='images/SplitButton.png' style='height:1.25em; width: 5em;'>";
}function Split(){
	document.getElementById("SplitButton").innerHTML="";
	Splited=true
	document.getElementById("un").innerHTML="";
	document.getElementById("onze").innerHTML="";
	document.getElementById("ValeurAsButton").innerHTML="";
	document.getElementById("DoublerButton").innerHTML="";
	document.getElementById("spotA2").innerHTML="";
	document.getElementById("spotB1").innerHTML=" <img src='"+AdresseCarte+"' style='height:7em;'>";
	SpotActuel--;
	if(Valeur==1){
	Valeur2=11;
	document.getElementById("CarteButton").innerHTML=" <img src='images/CarteButton.png' style='height:1.25em; width: 5em;'>";
	document.getElementById("JeResteButton").innerHTML=" <img src='images/JeReste.png' style='height:1.25em; width: 5em;'>";
	}
	else{
	Points-=Valeur;
	Valeur2=Valeur
	}
	document.getElementById("compteur1").innerHTML=String(Points);
}

function AssuranceIsPossible(){
	document.getElementById("AssuranceButton").innerHTML=" <img src='images/AssuranceButton.png' style='height:1.25em; width: 5em;'>";
}function Assurance(){
	document.getElementById("AssuranceButton").innerHTML="";
	CompteAssurance=Mise/2;
	Credits-=CompteAssurance;
	document.getElementById("Assurance").innerHTML="Assurance : "+String(CompteAssurance);
	document.getElementById("Credits").innerHTML="Credits : "+String(Credits);
}function Remboursement(){
	alert("Tu t'es fais remboursé de "+Mise+" Crédits")
	Credits+=y;
	Mise=0;
	CompteAssurance=0;
	
	document.getElementById("Credits").innerHTML="Credits : "+String(Credits);
	document.getElementById("Assurance").innerHTML="";
	document.getElementById("Mise").innerHTML="Credits : "+String(Mise);
	setTimeout(NouvelleDonne, 100);
	}

function Abandonner(){
	Mise=Mise/2
	Credits+=Mise
	Mise=0
	document.getElementById("Credits").innerHTML="Credits : "+Credits;
	document.getElementById("Mise").innerHTML="Mise : "+Mise;
	document.getElementById("CarteButton").innerHTML="";
	document.getElementById("JeResteButton").innerHTML="";
	document.getElementById("AssuranceButton").innerHTML="";
	document.getElementById("AbandonnerButton").innerHTML="";
	setTimeout(NouvelleDonne, 250);
}


function TourCroupier(){
	SpotActuel=2;
	while (PointsCroupier<=16){
	RandomCard();
	document.getElementById("croupier"+String(SpotActuel)).innerHTML=" <img src='"+AdresseCarte+"' style='height:7em;'>";
	if (Valeur==1){
		if (PointsCroupier<=10)
		{PointsCroupier+=11}
		else 
		{PointsCroupier+=1}	
	}
	else if (Valeur>10){PointsCroupier+=10}
	else {
	PointsCroupier+=Valeur;
	}
	SpotActuel++;
	document.getElementById("compteur2").innerText=String(PointsCroupier);
	Sabot--
	document.getElementById("sabot2").innerHTML=String(Sabot);
	}
		if(Splited===true){
			SplitDecompte();
		}
		else{
	if(PointsCroupier==21 && SpotActuel==3){if (CompteAssurance>0){setTimeout(Remboursement, 200)}
											else {setTimeout(Perdu, 600)}
										}
	else if(PointsCroupier>21){setTimeout(Gagne, 600)}
	else if(BlackJack==1){setTimeout(Gagne, 600)}
	else if(Points>PointsCroupier){setTimeout(Gagne, 600)}
		else{setTimeout(Perdu, 600)}
		}
}


function Brule(){
	if (Splited===false){
		alert("Tu brûles !");
		if (Credits==0){
			document.getElementById("CarteButton").innerHTML="";
			document.getElementById("JeResteButton").innerHTML="";
			setTimeout(FinPartie, 200)
			}
		if (Credits>0){
		Mise=0;
		document.getElementById("Mise").innerHTML="Mise : "+Mise;
		setTimeout(NouvelleDonne, 200);
		}
	}
	else{
		if (SplitIndice==0){
			alert("Tu brûles !")
			SplitIndice=1;
			SpotNumber="B";
			SpotActuel=2;
			document.getElementById("DoublerButton").innerHTML="";
			document.getElementById("Accolade1").innerHTML="";
			document.getElementById("Accolade2").innerHTML=" <img src='images/Accolade.png' style='height:1.25em; width: 5em;'>";
			document.getElementById("CarteButton").innerHTML="<img src='images/CarteButton.png' style='height:1.25em; width: 5em;'>";
			document.getElementById("JeResteButton").innerHTML="<img src='images/JeReste.png' style='height:1.25em; width: 5em;'>";
			Points2=22;
			Points=Valeur2;
			document.getElementById("compteur1").innerHTML=Points;
			}
		else{
		JeReste();
		}
	}
}

function Perdu(){
	alert("Tu as perdu cette manche !")
	Mise=0;
	document.getElementById("Mise").innerHTML="Mise : "+Mise;
	if (Credits==0){
		document.getElementById("CarteButton").innerHTML="";
		document.getElementById("JeResteButton").innerHTML="";
		setTimeout(FinPartie, 200)
		}
	else if(Credits<MisMin && Credits>0){
		document.getElementById("CarteButton").innerHTML="";
		document.getElementById("JeResteButton").innerHTML="";
		setTimeout(FinPartie2, 200)
		}
	else {setTimeout(NouvelleDonne, 200)}
}

function Gagne(){
	alert("Bien joué ! Tu as gagné cette manche ! Tu remportes "+Mise*2+" Crédits !");
	Score+=Math.floor(y)
	Credits+=Mise*2;
	Mise=0;
	document.getElementById("Credits").innerHTML="Credits : "+Credits;
	document.getElementById("Mise").innerHTML="Mise : "+Mise;
	document.getElementById("record").innerHTML="Score : "+String(Score);
	Points=0;
	PointsCroupier=0;
	BlackJack=0
	setTimeout(NouvelleDonne, 200);
}


function SplitDecompte(){
	if(PointsCroupier==21 && SpotActuel==3){if (CompteAssurance>0){setTimeout(Remboursement, 200)}
											else {
												setTimeout(DoublePerdu, 200)
											}
											}
	else if(Points>21 && Points2>21){setTimeout(DoublePerdu, 200)}
	else if(PointsCroupier>21){
		if(Points>21 && Points2<=21){setTimeout(HalfWin, 200)}
		else if(Points<=21 && Points2>21){setTimeout(HalfWin, 200)}
		else if(Points<=21 && Points2<=21){setTimeout(DoubleGain, 200)}
	}
	else if(PointsCroupier<=21){
		if (BlackJack==3){setTimeout(DoubleGain, 200)}
		else if(BlackJack==1){if (Points>PointsCroupier && Points<=21){setTimeout(DoubleGain, 200)}
								else {setTimeout(HalfWin, 200)}
								}
		else if(BlackJack==2){if (Points2>PointsCroupier && Points2<=21){setTimeout(DoubleGain, 200)}
								else {setTimeout(HalfWin, 200)}
								}
		else if (Points>21){if (PointsCroupier>=Points2){setTimeout(DoublePerdu, 200)}
						else{setTimeout(HalfWin, 200)}
						}
		else if (Points2>21){if (PointsCroupier>=Points){setTimeout(DoublePerdu, 200)}
						else{setTimeout(HalfWin, 200)}
						}
		else if (Points>PointsCroupier){
			if (Points2>PointsCroupier){setTimeout(DoubleGain, 200)}
			else{setTimeout(HalfWin, 200)}
			}
		else if(Points2>PointsCroupier){setTimeout(HalfWin, 200)}
		else{setTimeout(DoublePerdu, 200)}
	}
}

function DoublePerdu(){
	Credits-=Mise;
	document.getElementById("Credits").innerHTML="Credits : "+Credits;
	document.getElementById("CarteButton").innerHTML="";
	document.getElementById("JeResteButton").innerHTML="";
	alert("Coup dur ! Tu as perdu "+y+" Credits !")
	if (Credits<=0){setTimeout(FinPartie, 200)}
	else if (Credits<MisMin && Credits>0){setTimeout(FinPartie2, 200)}
	else {setTimeout(NouvelleDonne, 200)}
}function HalfWin(){
	Credits+=y;
	document.getElementById("Credits").innerHTML="Credits : "+Credits;
	document.getElementById("CarteButton").innerHTML="";
	document.getElementById("JeResteButton").innerHTML="";
	alert("Tu récupères ta mise")
	setTimeout(NouvelleDonne, 200)
}function DoubleGain(){
	Mise*=2;
	Credits+=Mise*2;
	Score+=Math.floor(y*4)
	document.getElementById("Credits").innerHTML="Credits : "+Credits;
	document.getElementById("CarteButton").innerHTML="";
	document.getElementById("JeResteButton").innerHTML="";
	document.getElementById("record").innerHTML="Score : "+String(Score);
	alert("Double Gain ! Tu es riche !")
	if (Credits<=0){setTimeout(FinPartie, 200)}
	else if (Credits<5 && Credits>0){setTimeout(FinPartie2, 200)}
	else {setTimeout(NouvelleDonne, 200)}
}


function FinPartie(){
	alert("Fin de la Partie !")
	setTimeout(SendScore, 500)
}function FinPartie2(){
	alert("Fin de la Partie ! (pas assez de crédits restants pour une nouvelle mise)")
	setTimeout(SendScore, 500)
}

function SendScore(){
	Name=prompt("Entre ton nom pour savoir si tu fais partie des 10 meilleurs joueurs !")
	document.getElementById.innerHTML='<form method="post" action="../server/score.php"><input id="send" name="formulaire" type="hidden" value="'+Score+'"></form>'
}