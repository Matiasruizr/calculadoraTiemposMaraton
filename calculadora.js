var tiempo, ritmo, distancia
var btnCalcular = document.getElementById('calcular')
var btnBorrarDatos = document.getElementById('borrarDatos')
var errorMsj = document.getElementById('error')

const creaFecha = (minutos, segundos) => {
    let total = new Date(1970, 0, 1)
    if(minutos){
        total.setMinutes(minutos)
    }
    if(segundos){
        total.setSeconds(segundos)
    }
    return total;
}

const getRatioDistancia = () => {
    let km, m, distance

    if (document.getElementById('5k_r').checked) {
        km = document.getElementById('5k_r').value 
    } else if (document.getElementById('10k_r').checked) {
        km = document.getElementById('10k_r').value 
    } else if (document.getElementById('21k_r').checked){
        km = document.getElementById('21k_r').value
        m = 097
    } else if (document.getElementById('42k_r').checked){
        km = document.getElementById('42k_r').value 
        m = 195
    } else {
        km = parseInt(document.getElementById('km_r_d').value) + (parseFloat(document.getElementById('mm_r_d').value / 1000) ) 
    }
    distance = [km, m]
    return distance
}

const actualizaValores = () => {
// Actualiza los valores ingresados en el formulario

    // Ritmo
    ritmo = {
        segundos: document.getElementById('segundos_vel').value, 
        minutos: document.getElementById('minutos_vel').value,

        calcularTotalRitmo(){
            return creaFecha( this.minutos, this.segundos)
        }
    }
    
    // Tiempo
    tiempo = {
        segundos: document.getElementById('segundos_r_t').value, 
        minutos: document.getElementById('minutos_r_t').value,
        horas: document.getElementById('horas_r_t').value,

        calculaTotal(){
            let horas = 0
            if(this.horas){
                horas = parseInt(this.horas * 3600)
            }
            let minutos = 0
            if(this.minutos){
                minutos = parseInt(this.minutos * 60)
            }
            let segundos = 0
            if(this.segundos){
                segundos = parseInt(this.segundos)
            }

            let total = new Date(1970, 0, 1)
            total.setSeconds(horas + minutos + segundos)
            return total
        }
    }

    // Distancia= 
    distancia = {
        metros: getRatioDistancia()[1],
        kilometros:  getRatioDistancia()[0]
    }
}

const calculaRitmo = () => {
    alert(distancia.kilometros)
    let minutos = (tiempo.calculaTotal().getHours() * 60) + tiempo.calculaTotal().getMinutes() + (tiempo.calculaTotal().getSeconds() / 60)
    alert( 'el ritmo es de ' + minutos / distancia.kilometros + ' minutos por kilometro' )
    let imprMinutos  = (60 * (minutos / distancia.kilometros - Math.floor(minutos / distancia.kilometros)) ).toString()
    document.getElementById('minutos_vel').value =  Math.floor(minutos / distancia.kilometros)
    document.getElementById('segundos_vel').value =  Math.floor(imprMinutos)
    document.getElementById('divRitmo').className = 'categoria bgReverse'
}
const calculaDistancia = () => {
    let minutos = (tiempo.calculaTotal().getHours() * 60) + tiempo.calculaTotal().getMinutes() + (tiempo.calculaTotal().getSeconds() / 100)
    let ritmoxMinutos = ritmo.calcularTotalRitmo().getMinutes() +  ( ritmo.calcularTotalRitmo().getSeconds() / 60)
    document.getElementById('km_r_d').value = Math.floor(minutos / ritmoxMinutos)
    document.getElementById('mm_r_d').value =  (minutos / ritmoxMinutos - Math.floor(minutos / ritmoxMinutos)).toFixed(3).substr(2, 5)
    document.getElementById('divDistancia').className = 'categoria bgReverse'
}

const calculaTiempo = () => {
    errorMsj.innerHTML = ""
    alert( 'el tiempo es de ' + ritmo.calcularTotalRitmo().getMinutes() * distancia.kilometros   + ' minutos ' )
    document.getElementById('minutos_r_t').value = Math.floor(ritmo.calcularTotalRitmo().getMinutes() * distancia.kilometros) 
    document.getElementById('divTiempo').className = 'categoria bgReverse'
}


btnCalcular.onclick = function() {
    actualizaValores()
    console.log(`Minutos:   ${ritmo.minutos}  minutos    ${ritmo.segundos}  segundos`)
    console.log(`Tiempo:    ${tiempo.horas} horas ${tiempo.minutos} minutos    ${tiempo.segundos} segundos`)
    console.log(`Distancia: ${distancia.kilometros}   kilometros ${distancia.metros}   metros`)

    if(!distancia.kilometros && !tiempo.horas && !ritmo.minutos){
        errorMsj.innerHTML = "Debes ingresar 2 de 3 secciones para calcular la tercera"
    } else if(!distancia.kilometros){
        calculaDistancia()
    } else if (!tiempo.horas){
        calculaTiempo()
    } else if (!ritmo.minutos){
        calculaRitmo()
    } else{
    // Mensaje error    
    }     
}

btnBorrarDatos.onclick = function() {
    document.getElementById('km_r_d').value = ''
    document.getElementById('mm_r_d').value= ''

    document.getElementById('minutos_r_t').value = ''
    document.getElementById('horas_r_t').value = ''
    document.getElementById('segundos_r_t').value = ''

    document.getElementById('minutos_vel').value = ''
    document.getElementById('segundos_vel').value= ''

    document.getElementById('5k_r').checked = false;
    document.getElementById('10k_r').checked = false;
    document.getElementById('21k_r').checked = false;
    document.getElementById('42k_r').checked = false;
}