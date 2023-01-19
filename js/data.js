let default_user_data = {"results":[{
	"gender":"male",
	"name":{
		"title":"Mr",
		"first":"Kyle",
		"last":"Bowman"},
	"location":{
		"street":{
			"number":733,
			"name":"Timber Wolf Trail"},
		"city":"Coffs Harbour",
		"state":"Queensland",
		"country":"Australia",
		"postcode":2089,
		"coordinates":{
			"latitude":"-85.9637",
			"longitude":"32.7085"},
		"timezone":{
			"offset":"+2:00",
			"description":"Kaliningrad, South Africa"}},
	"email":"kyle.bowman@example.com",
	"dob":{
		"date":"2000-09-15T19:19:40.054Z",
		"age":22},
	"phone":"06-0773-2679",
	"cell":"0459-792-034",
	"picture":{
		"large":"img/1.jpg",
		"medium":"img/1-med.jpg",
		"thumbnail":"img/1-thumbnail.jpg"},
	"nat":"AU"}]};

function getNationality(nat){
	if(nat == "AU" || nat == "au"){
		return "Australiano";
	}
	if(nat == "ES" || nat == "es"){
		return "Español";
	}
	if(nat == "MX" || nat == "mx"){
		return "Mexicano";
	}
	return "Sin Nacionalidad";
}
function getGender(gender){
	if(gender == "male"){
		return "Masculino";
	}
	if(gender == "female"){
		return "Femenino";
	}
	return "No Indicado";
}
function getCountry(country){
	if(country == "Spain"){
		return "España";
	}
	return country;
}
function getYear(date){
	let year = "";
	for(let i = 0; i < 4; i++){
		year += date[i];
	}
	return year;
}
function getMonth(date){
	let month = "";
	for(let i = 5; i < 7; i++){
		month += date[i];
	}
	return month;
}
function getDay(date){
	let day = "";
	for(let i = 8; i < 10; i++){
		day += date[i];
	}
	return day;
}
function getDate(date){
	let buffer = "";
	buffer = getDay(date) + "/" + getMonth(date) + "/" + getYear(date);
	return buffer;
}
function setUserData(user_data){
	document.getElementById('nombre').innerHTML = user_data.results[0].name.first;
	document.getElementById('apellido').innerHTML = user_data.results[0].name.last;
	document.getElementById('fecha_nacimiento').innerHTML = getDate(user_data.results[0].dob.date); // Convertir
	document.getElementById('edad').innerHTML = 2023 - getYear(user_data.results[0].dob.date);
	document.getElementById('sexo').innerHTML = getGender(user_data.results[0].gender);
	document.getElementById('nacionalidad').innerHTML = getNationality(user_data.results[0].nat);
	document.getElementById('perfil').innerHTML = '<img class="img-perfil" alt="Imagen de Perfil" src="' + user_data.results[0].picture.large + '">'

	let user_location = user_data.results[0].location;
	let latitud = user_location.coordinates.latitude;
	let longitud = user_location.coordinates.longitude;

	document.getElementById('calle').innerHTML = user_location.street.number + " " + user_location.street.name;
	document.getElementById('ciudad').innerHTML = user_location.city;
	document.getElementById('estado').innerHTML = user_location.state;
	document.getElementById('pais').innerHTML = getCountry(user_location.country);
	document.getElementById('cp').innerHTML = user_location.postcode;
	
	if(!navigator.onLine){
		document.getElementById('map').innerHTML = '<p class="domicilio-map-error">Error al cargar el mapa. Revise su conexión a Internet</p>';
	}
	else{
		let map = L.map('map').setView([latitud, longitud], 13);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    maxZoom: 19,
		    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		let marker = L.marker([latitud, longitud]).addTo(map);
	}

	document.getElementById('email').innerHTML = user_data.results[0].email;
	document.getElementById('telefono').innerHTML = user_data.results[0].phone;
	document.getElementById('celular').innerHTML = user_data.results[0].cell;
}

fetch("https://randomuser.me/api/?exc=login,registered,id&noinfo&format=json&gender=male&nat=au,mx,es")
  .then(function (response) {
    return response.json();
  })
  .then(function (user_data) {
	  setUserData(user_data);
  })
  .catch(function(error) {
	  setUserData(default_user_data);
  })
