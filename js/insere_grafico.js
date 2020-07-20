var leilao = 0
var totalLeilao = 0
var vendaDireta = 0
var totalVendaDireta = 0
var vendaOnline = 0
var totalVendaOnline = 0
var vendaDiretaEspecial = 0
var totalVendaDiretaEspecial = 0

function graficodeVenda(vendaDireta, vendaOnline, leilao, vendaDiretaEspecial) {
    var chart = document.getElementById('graficoVenda').getContext('2d')
    var myChart = new Chart(chart, {
        type: 'pie',
        data: {
            labels: ['Venda Direta', 'Venda Online', 'Leilão', 'Venda Direta Especial'],
            datasets: [{
                label: '# of Votes',
                data: [vendaDireta, vendaOnline, leilao, vendaDiretaEspecial],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
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

function graficoValor(totalVendaDireta, totalVendaOnline, totalLeilao, totalVendaDiretaEspecial) {
totalVendaDireta = (totalVendaDireta / 1000000).toFixed(2)
totalVendaOnline = (totalVendaOnline / 1000000).toFixed(2)
totalLeilao = (totalLeilao / 1000000).toFixed(2)
totalVendaDiretaEspecial = (totalVendaDiretaEspecial / 1000000).toFixed(2)

    var chart = document.getElementById('totalModalidadeVenda').getContext('2d')
    var myChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: ['Valores em milhões de reais'],
            datasets: [{
                label: ['Venda Direta: (R$)'],
                data: [totalVendaDireta],
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
                data: [totalVendaOnline],
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
                data: [totalLeilao],
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
                data: [totalVendaDiretaEspecial],
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

function converteEmDinheiro(numero) {
    let valorConvertido = numero.replace(',', '.')
    valorConvertido = Number(valorConvertido).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})
    return valorConvertido
}

$(document).ready(function () {
    $.getJSON("imoveis.json", function(dados){
        $.each(dados, function(key, item){                   
            switch (item.modalidadeVenda) {                      
                case 'Venda Direta Online':
                    vendaDireta++
                    totalVendaDireta += Number(item.precoOferta.replace(',', '.'))
                    break
                case 'Venda Online':
                    vendaOnline++
                    totalVendaOnline += Number(item.precoOferta.replace(',', '.'))
                    break
                case '2º Leilão SFI':
                    leilao++
                    totalLeilao += Number(item.precoOferta.replace(',', '.'))
                    break
                case 'Venda Direta Especial':
                    vendaDiretaEspecial++
                    totalVendaDiretaEspecial += Number(item.precoOferta.replace(',', '.'))
                    break
            }
        })
        
    })
    setTimeout(function(){
        graficoValor(totalVendaDireta, totalVendaOnline, totalLeilao, totalVendaDiretaEspecial)
        graficodeVenda(vendaDireta, vendaOnline, leilao, vendaDiretaEspecial)
    }, 2000)
})