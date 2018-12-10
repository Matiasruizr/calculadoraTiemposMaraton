var tiempo, ritmo, distancia
var btnCalcular = document.getElementById('calcular')


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

const actualizaValores = () => {
// Actualiza los valores ingresados en el formulario

    // Ritmo
    ritmo = {
        segundos: document.getElementById('segundos_vel').value, 
        minutos: document.getElementById('minutos_vel').value,
        // minutosPorKm: 1000 / parseInt(document.getElementById('minutos_vel').value),
        // segundosPorKm:   (parseInt(document.getElementById('segundos_vel').value) / 60), 
        
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
        metros: document.getElementById('mm_r_d').value,
        kilometros: document.getElementById('km_r_d').value 
    }
}



    const calculaDistancia = () => {
        let minutos = (tiempo.calculaTotal().getHours() * 60) + tiempo.calculaTotal().getMinutes() + (tiempo.calculaTotal().getSeconds() / 100)
        let ritmoxMinutos = ritmo.calcularTotalRitmo().getMinutes() +  ( ritmo.calcularTotalRitmo().getSeconds() / 60)
        // alert( 'La distancia es de ' + minutos / ritmoxMinutos + 'Kilometros' )
        // document.getElementById('km_r_d').innerHTML(minutos / ritmoxMinutos)  
        document.getElementById('km_r_d').value = Math.floor(minutos / ritmoxMinutos)
        document.getElementById('mm_r_d').value = minutos / ritmoxMinutos - Math.floor(minutos / ritmoxMinutos)
    }
    const calculaRitmo = () => {
        let minutos = (tiempo.calculaTotal().getHours() * 60) + tiempo.calculaTotal().getMinutes() + (tiempo.calculaTotal().getSeconds() / 60)
        alert( 'el ritmo es de ' + minutos / distancia.kilometros + ' minutos por kilometro' )
        // document.getElementById('minutos_vel').value  = Math.floor(minutos / distancia.kilometro) 
    }
    const calculaTiempo = () => {
        alert( 'el tiempo es de ' + ritmo.calcularTotalRitmo().getMinutes() * distancia.kilometros   + ' minutos ' )
        document.getElementById('minutos_r_t').value = ritmo.calcularTotalRitmo().getMinutes() * distancia.kilometros
    }


btnCalcular.onclick = function() {
    actualizaValores()
    console.log(`Minutos:   ${ritmo.minutos}  minutos    ${ritmo.segundos}  segundos`)
    console.log(`Tiempo:    ${tiempo.horas} horas ${tiempo.minutos} minutos    ${tiempo.segundos} segundos`)
    console.log(`Distancia: ${distancia.kilometros}   kilometros ${distancia.metros}   metros`)

    if(!distancia.kilometros){
        calculaDistancia()
    }else if (!tiempo.horas){
        calculaTiempo()
    }else if (!ritmo.minutos){
        calculaRitmo()
    } else{
        alert("Debes ingresar dos de 3 valores")
    }
}
