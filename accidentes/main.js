const rutaArchivoCSV = "accidentalidad.csv";

const anioSeleccionado = document.getElementById("anio");
const anio = anioSeleccionado.value;
const provinciaSeleccionada = document.getElementById("provincia");
const mapa = document.getElementById("mapa");
const numeroTotal = document.getElementById("numero-total");
//const graficoBarras = document.getElementById("grafico-barras");
const ctx = document.getElementById("barras-provincias");

/* ******* Datos de pruebas ******** */
const provincias = ["Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"];
const accidentes2022 = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const accidentes2021 = [900, 800, 700, 600, 500, 400, 300, 200, 100];
const accidentes2020 = [100, 100, 200, 200, 300, 300, 400, 400, 400];
const accidentes2019 = [500, 500, 500, 500, 500, 500, 500, 500, 500];
const accidentes2018 = [300, 300, 300, 300, 300, 300, 300, 300, 300];
const accidentes2017 = [350, 450, 350, 560, 760, 460, 580, 300, 820];
const accidentes2016 = [800, 800, 800, 800, 800, 800, 800, 300, 300];
const datosAccidentes = {
    "2022": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    "2021": [900, 800, 700, 600, 500, 400, 300, 200, 100],
    "2020": [100, 100, 200, 200, 300, 300, 400, 400, 400],
    "2019": [500, 500, 500, 500, 500, 500, 500, 500, 500],
    "2018": [300, 300, 300, 300, 300, 300, 300, 300, 300],
    "2017": [350, 450, 350, 560, 760, 460, 580, 300, 820],
    "2016": [800, 800, 800, 800, 800, 800, 800, 300, 300]
};


/* ** Cambio de anño ** */
function cambiarAnio() {
	//const select = document.getElementById("anio");
	//const opcionSeleccionada = select.value;
	console.log("Opción seleccionada:", anioSeleccionado.value);
	pintarGrafica(anioSeleccionado.value);
	mostrarTotalAccidentes(anioSeleccionado.value);
}



/* Calculo del total */
function mostrarTotalAccidentes(anio) {
	const numeroTotalAccidentes = datosAccidentes[anio].reduce((acumulador, valorActual) => acumulador + valorActual, 0);
	numeroTotal.textContent = numeroTotalAccidentes;
	console.log("Total accidentes:", numeroTotalAccidentes);
}


/* **** Gráfico de Barras *********** */
function pintarGrafica(anio){
	myChart.data.datasets[0].data = datosAccidentes[anio];
	myChart.update('active');
}

/* ** Definiciones iniciales ** */
const data = {
  labels: provincias,
  datasets: [{
    axis: 'y',
    label: 'Accidentes',
    data: datosAccidentes[anio],
    fill: false,
	/*
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
	*/
    borderWidth: 1
  }]
};
const config = {
  type: 'bar',
  data: data,
  options: {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
		legend: false,
      /*legend: {
        position: 'right',
      },*/
      title: {
        display: true,
        text: 'Número de accidentes'
      }
    }
  },
};
const myChart = new Chart(ctx, config);
myChart.update('active');



/* **** Pruebas Mapa *********** */

// Carga del mapa
// Carga el archivo geojson
d3.json("provincias-CyL.geojson").then(function(data) {
	const width = 800;
	const height = 600;

	// Crea una proyección geográfica
	const projection = d3.geoMercator()
		.fitSize([width, height], data);

	const path = d3.geoPath().projection(projection);

	// Crea el lienzo SVG
	const svg = d3.select("#mapa")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	// Dibuja los elementos del mapa
	svg.selectAll("path")
		.data(data.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill", "lightblue")
		.style("stroke", "white")
		.style("stroke-width", 1);
});





//const svg = d3.select(mapa).append("svg");
//const path = svg.selectAll("path").data("provincias-CyL.geojson");
/*
async function loadEspanaData() {
  const response = await fetch("espana.json");
  const data = await response.json();
  return data;
}

loadEspanaData().then(espana => {
  // Use the 'espana' object for map creation
  const svg = d3.select(mapa).append("svg");
  const path = svg.selectAll("path").data(topojson.feature(espana, espana.provincias).features);
  // ... rest of your code using espana
});
*/


/* **** Llamadas a funciones iniciales  ***** */
console.log("Año inicial:", anio);
mostrarTotalAccidentes(anio)