
var leilaoIndicadores = 0
var totalLeilaoIndicadores = 0
var vendaDiretaIndicadores = 0
var totalVendaDiretaIndicadores = 0
var vendaOnlineIndicadores = 0
var totalVendaOnlineIndicadores = 0
var vendaDiretaEspecialIndicadores = 0
var totalVendaDiretaEspecialIndicadores = 0

function graficoValorIndicadores(totalVendaDiretaIndicadores, totalVendaOnlineIndicadores, totalLeilaoIndicadores, totalVendaDiretaEspecialIndicadores) {
totalVendaDiretaIndicadores = (totalVendaDiretaIndicadores / 1000000).toFixed(2)
totalVendaOnlineIndicadores = (totalVendaOnlineIndicadores / 1000000).toFixed(2)
totalLeilaoIndicadores = (totalLeilaoIndicadores / 1000000).toFixed(2)
totalVendaDiretaEspecialIndicadores = (totalVendaDiretaEspecialIndicadores / 1000000).toFixed(2)

    var chart = document.getElementById('graficoValorTotalIndicadores').getContext('2d')
    var myChart = new Chart(chart, {
        type: 'horizontalBar',
        data: {
            labels: ['Valores em milhões de reais'],
            datasets: [{
                label: ['Venda Direta: (R$)'],
                data: [totalVendaDiretaIndicadores],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            },
            {
                label: ['Venda Online: (R$)'],
                data: [totalVendaOnlineIndicadores],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            },
            {
                label: ['Leilão: (R$)'],
                data: [totalLeilaoIndicadores],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            },
            {
                label: ['Venda Direta Especial: (R$)'],
                data: [totalVendaDiretaEspecialIndicadores],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: false
        }
    })
}

$(document).ready(function () {
    $.getJSON("imoveis.json", function(dados){
            $.each(dados, function(key, item){ 
                if(item.precoOferta >= 1000000){                  
                switch (item.modalidadeVenda) {                      
                    case 'Venda Direta Online':
                        vendaDireta++
                        totalVendaDiretaIndicadores += Number(item.precoOferta.replace(',', '.'))
                        break
                    case 'Venda Online':
                        vendaOnline++
                        totalVendaOnlineIndicadores += Number(item.precoOferta.replace(',', '.'))
                        break
                    case '2º Leilão SFI':
                        leilao++
                        totalLeilaoIndicadores += Number(item.precoOferta.replace(',', '.'))
                        break
                    case 'Venda Direta Especial':
                        vendaDiretaEspecial++
                        totalVendaDiretaEspecialIndicadores += Number(item.precoOferta.replace(',', '.'))
                        break
                }
            }
        })
        
    })
    setTimeout(function(){
        graficoValorIndicadores(totalVendaDiretaIndicadores, totalVendaOnlineIndicadores, totalLeilaoIndicadores, totalVendaDiretaEspecialIndicadores)
    }, 2000)
})