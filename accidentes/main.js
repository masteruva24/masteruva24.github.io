const rutaArchivoCSV = "accidentalidad-por-carreteras.csv";

//constantes de control de años
const anioSeleccionado = document.getElementById("anio");
const anio = anioSeleccionado.value;

//constantes de control de provincias
const provinciaSeleccionada = document.getElementById("provincia");

//constantes para las gráficas
//graficas de barras
const canvasProvincias = document.getElementById("grafico-barras-provincias");
//const graficoBarras = document.getElementById("grafico-barras");
const ctxAnio = document.getElementById("barras-provincias");
const ctxTred = document.getElementById("barras-tred");
//gráfica para el mapa
const mapa = document.getElementById("mapa");

//variables para los accidentes
const numeroTotal = document.getElementById("numero-total");
const numeroHeridos = document.getElementById("numero-heridos");
const numeroMuertos = document.getElementById("numero-muertos");
const infoMostrada = document.getElementById("info-mostrada");
const infoAnio = document.getElementById("info-anio");

// inicializar variable de datos
let datosAccidentes = {};


/* ******* Arrays de etiquetas ******** */
const provinciasPermitidas = ['AV', 'BU', 'LE', 'P', 'SA', 'SG', 'SO', 'VA', 'ZA'];
const provincias = ["Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"];
const tred = ["CIP", "CL", "CP", "CTL"];

/* ******* Arrays de inciales ******** */
const provincias_ini = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const tred_ini = [0, 0, 0, 0];




/* ** Cambio de año ** */
function cambiarAnio() {
	pintarGrafica(anioSeleccionado.value);
	pintarGraficaTred(anioSeleccionado.value);
	mostrarTotalAccidentes(anioSeleccionado.value);
}

/* ** Cambio de provincia ** */
function cambiarProvincia(){
	let info = "Castilla y León";
	if(provinciaSeleccionada.value == "all"){
		canvasProvincias.style.display = "block";
	} else {
		canvasProvincias.style.display = "none";
		info = provinciaSeleccionada.options[provinciaSeleccionada.selectedIndex].text;
	}
	pintarGraficaTred(anioSeleccionado.value);
	mostrarTotalAccidentes(anioSeleccionado.value);
	//cambiar texto
	infoMostrada.textContent = info;
}

function transformarProvincia(prov){
	let provincia = "SG";
	switch (prov) {
		case "Ávila":
			provincia = "AV";
			break;
		case "Burgos":
			provincia = "BU";
			break;
		case "León":
			provincia = "LE";
			break;
		case "Palencia":
			provincia = "P";
			break;
		case "Salamanca":
			provincia = "SA";
			break;
		case "Segovia":
			provincia = "SG";
			break;
		case "Soria":
			provincia = "SO";
			break;
		case "Valladolid":
			provincia = "VA";
			break;
		case "Zamora":
			provincia = "ZA";
			break;
		default:
			provincia = "SG";
	}
	return provincia;
}

function cambiarProvinciaMapa(d){
	let provincia = transformarProvincia(d);
	provinciaSeleccionada.value = provincia;
	provinciaSeleccionada.dispatchEvent(new Event("change"));
}

/* Calculo del total */
function mostrarTotalAccidentes(anio) {
	let numeroTotalAccidentes = datosAccidentes[anio]["total_accidentes"];
	let numeroTotalHeridos = datosAccidentes[anio]["total_heridos"];
	let numeroTotalMuertos = datosAccidentes[anio]["total_muertos"];
	if(provinciaSeleccionada.value != "all"){
		numeroTotalAccidentes = datosAccidentes[anio][provinciaSeleccionada.value]["accidentes"];
		numeroTotalHeridos = datosAccidentes[anio][provinciaSeleccionada.value]["heridos"];
		numeroTotalMuertos = datosAccidentes[anio][provinciaSeleccionada.value]["muertos"];
	}
	numeroTotal.textContent = numeroTotalAccidentes;
	numeroHeridos.textContent = numeroTotalHeridos;
	numeroMuertos.textContent = numeroTotalMuertos;
	infoAnio.textContent = anio;
}


/* **** Gráfico de Barras de años *********** */
function pintarGrafica(anio){
	ChartAnio.data.datasets[0].data = datosAccidentes[anio]["conjunto"];
	/*  Solo se muestra una variable para no entorpecer la visión */
	/*
	ChartAnio.data.datasets[1].data = datosAccidentes[anio]["heridos"];
	ChartAnio.data.datasets[2].data = datosAccidentes[anio]["muertos"];
	*/
	ChartAnio.update('active');
}

/* **** Gráfico de Barras de tipos de red *********** */
function pintarGraficaTred(anio){
	let datosTred = datosAccidentes[anio]["TRED"];
	if(provinciaSeleccionada.value != "all"){
		datosTred = datosAccidentes[anio][provinciaSeleccionada.value]["TRED"];
	}
	ChartTred.data.datasets[0].data = Object.values(datosTred);
	ChartTred.update('active');
}

/* ** Definiciones iniciales gráfico de barras distribución por provincias** */
const dataAnio = {
	labels: provincias,
	datasets: [
		{
			axis: 'y',
			label: 'Accidentes',
			data: provincias_ini,
			fill: false,
			borderWidth: 1
		}
		/*  Solo se muestra una variable para no entorpecer la visión */
		/*
		,
		{
			axis: 'y',
			label: 'Heridos',
			data: provincias_ini,
			fill: false,
			borderWidth: 1
		},
		{
			axis: 'y',
			label: 'Muertos',
			data: provincias_ini,
			fill: false,
			borderWidth: 1
		}
		*/
	]
};
const configAnio = {
  type: 'bar',
  data: dataAnio,
  options: {
	indexAxis: 'y',
	elements: {
	  bar: {
		borderWidth: 2,
	  }
	},
	responsive: true,
	plugins: {
		legend: false,
		/*
		legend: {
			display: true,
			position: 'right',
		},*/
		title: {
			display: true,
			text: 'Número de accidentes'
		}
	},
  },
};



/* ** Definiciones iniciales para gráfica de barras de TRED ** */
const dataTred = {
  labels: tred,
  datasets: [{
	axis: 'y',
	label: 'Tipo de vía',
	data: tred_ini,
	fill: false,
	borderWidth: 1
  }]
};
const configTred = {
  type: 'bar',
  data: dataTred,
  options: {
	indexAxis: 'y',
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
		text: 'Accidentes por tipo de vía'
	  },
	  
      tooltip: {
        callbacks: {
          title: function(context) {
            var labelMap = {
              "CIP": "Carretera de Interés Regional",
              "CL": "Carretera Local",
              "CP": "Carretera Provincial",
              "CTL": "Carretera de Interés Provincial"
            };
            return labelMap[context[0].label];
          },
		  label: function(context) {
            return context.formattedValue;
          }
        }
      }
	  
	}
  }
};
const ChartAnio = new Chart(ctxAnio, configAnio);
const ChartTred = new Chart(ctxTred, configTred);
ChartAnio.update('active');
ChartTred.update('active');


fetch(rutaArchivoCSV)
	.then(response => response.text())
	.then(data => {
		let rows = data.split('\n');
		let headers = rows[0].split(';');

		for (let i = 1; i < rows.length; i++) {
			if (rows[i].trim() === '') continue; // Si la línea está vacía, pasa a la siguiente
			
		  let row = rows[i].split(';');
		  let provincia = row[headers.indexOf('NOMBRE')].split('-')[0];

		  if (provinciasPermitidas.includes(provincia)) {
			let anio_fila = row[headers.indexOf('AÑO')];
			let tred = row[headers.indexOf('T.RED')];
			let accidentes = parseFloat(row[headers.indexOf('ASV')]) + parseFloat(row[headers.indexOf('ACV')]);
			let heridos = parseFloat(row[headers.indexOf('HERIDOS')]);
			let muertos = parseFloat(row[headers.indexOf('MUERTOS')]);

			if (!datosAccidentes[anio_fila]) {
			  datosAccidentes[anio_fila] = {
				total_accidentes: 0,
				total_heridos: 0,
				total_muertos: 0,
				TRED: {
					"CIP": 0, 
					"CL": 0, 
					"CP": 0, 
					"CTL": 0
				},
				conjunto: [],
				heridos: [],
				muertos: []
			  };
			}

			datosAccidentes[anio_fila].total_accidentes += accidentes;
			datosAccidentes[anio_fila].total_heridos += heridos;
			datosAccidentes[anio_fila].total_muertos += muertos;

			if (!datosAccidentes[anio_fila].TRED[tred]) {
				datosAccidentes[anio_fila].TRED[tred] = 0;
			}

			datosAccidentes[anio_fila].TRED[tred]++;

			if (!datosAccidentes[anio_fila][provincia]) {
			  datosAccidentes[anio_fila][provincia] = {
				accidentes: 0,
				heridos: 0,
				muertos: 0,
				TRED: {
					"CIP": 0, 
					"CL": 0, 
					"CP": 0, 
					"CTL": 0
				}
			  };
			}

			datosAccidentes[anio_fila][provincia].accidentes += accidentes;
			datosAccidentes[anio_fila][provincia].heridos += heridos;
			datosAccidentes[anio_fila][provincia].muertos += muertos;

			if (!datosAccidentes[anio_fila][provincia].TRED[tred]) {
			  datosAccidentes[anio_fila][provincia].TRED[tred] = 0;
			}

			datosAccidentes[anio_fila][provincia].TRED[tred]++;
		  }
		}

		for (let anio_fila in datosAccidentes) {
		  for (let provincia of provinciasPermitidas) {
			if (datosAccidentes[anio_fila][provincia]) {
			  datosAccidentes[anio_fila].conjunto.push(datosAccidentes[anio_fila][provincia].accidentes);
			  datosAccidentes[anio_fila].heridos.push(datosAccidentes[anio_fila][provincia].heridos);
			  datosAccidentes[anio_fila].muertos.push(datosAccidentes[anio_fila][provincia].muertos);
			}
		  }
		}

		//con los datos del csv cargados pasamos a crear los gráficos
		
		// Carga del mapa a partir del archivo geojson
		function crearMapa(anio){
			// Limpia el mapa existente
			d3.select("#mapa").selectAll("*").remove();
	
			//creamos el mapa
			d3.json("provincias-CyL.geojson").then(function(geoData) {
				const width = 800;
				const height = 600;

				// Crea una proyección geográfica
				const projection = d3.geoMercator()
					.fitSize([width, height], geoData);

				const path = d3.geoPath().projection(projection);

				// Crea el lienzo SVG
				const svg = d3.select("#mapa")
					.append("svg")
					.attr("width", width)
					.attr("height", height);
					

				var tooltip = d3.select("body")
				.append("div")
				.style("position", "absolute")
				.style("z-index", "10")
				.style("visibility", "hidden")
				.style("background", "#f0f0f0")
				.style("width", "130px")
				.style("height", "105px")
				.style("border-radius", "5px")
				.style("padding", "5px")
				.style("text-align", "left")
				.text("");
			  
				// Define una escala de colores
				const colorScale = d3.scaleLinear()
				  .domain([d3.min(datosAccidentes[anio]["conjunto"]), d3.max(datosAccidentes[anio]["conjunto"])])
				  .range(["lightblue", "darkblue"]);
				  
				//mostramos la leyenda
				const min = d3.min(datosAccidentes[anio]["conjunto"]);
				const max = d3.max(datosAccidentes[anio]["conjunto"]);
				const vari = (max - min) / 5;
				const leyendaValores = d3.select("#leyenda-valores");
				leyendaValores.selectAll("span").remove();
				const leyendaColores = d3.select("#leyenda-colores");
				leyendaColores.selectAll("span").remove();
				for (let i = min; i <= max; i+= vari) {
					leyendaValores.append("span")
					.text(` ${Math.floor(i)}  `);
					leyendaColores.append("span")
					.style("background-color", colorScale(i))
					.text(" ");
				}

				// Dibuja los elementos del mapa
				svg.selectAll("path")
					.data(geoData.features)
					.enter()
					.append("path")
					.attr("d", path)
					.attr("fill", function(d) {
						return colorScale(datosAccidentes[anio]["conjunto"][d.properties.orden]);
					})
					.style("stroke", "black")
					.style("stroke-width", 1)
					.on("mouseover", function(d) {
						let provincia = transformarProvincia(d.target.__data__.properties.provincia);
						tooltip.html(`<p id="titulo-tooltip">${d.target.__data__.properties.provincia}: </p>
						<p>Accidentes: ${datosAccidentes[anio][provincia]["accidentes"]}
						Heridos: ${datosAccidentes[anio][provincia]["heridos"]}
						Fallecidos: ${datosAccidentes[anio][provincia]["muertos"]}</p>`)
						  .style("visibility", "visible")
						  .style("left", `${d.pageX}px`)
						  .style("top", `${d.pageY}px`);
					})
					.on("mouseout", function() {
						tooltip.style("visibility", "hidden");
					})
					.on("click", function(d) {
						cambiarProvinciaMapa(d.target.__data__.properties.provincia);
					});
			});
		}

		/* **** Llamadas a funciones iniciales  ***** */
		crearMapa(anio);
		mostrarTotalAccidentes(anio)
		cambiarAnio();
		// listener para cambio de mapa
		anioSeleccionado.addEventListener("change", function() {
			var nuevoAnio = anioSeleccionado.value;
			// Llama a la función para actualizar el mapa
			crearMapa(nuevoAnio);
		});
		
	});
