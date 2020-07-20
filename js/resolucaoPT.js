
$(document).ready(function(){
    $.getJSON("imoveis.json", function(dados){
        $.each(dados, function(key, item) {
            var linha = `<tr> +
            <td>${item.endereco}</td>
            <td>${item.bairro}</td>
            <td>${item.cidade}</td>
            <td>${item.modalidadeVenda}</td>
            <td>${item.precoOferta}</td>
            <td>${item.valorAvaliacao}</td>
            <td>${item.porcentagemDesconto}</td>
        </tr>`;
    $('#tblImoveisJquery>tbody').append(linha);
        })
    })
})

setTimeout(function(){
    $('#tblImoveisJquery').DataTable({
        "order": [[ 4, "desc" ]],
        "columnDefs": [{
        "render": function(data){
         return parseFloat(data).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});},
        "targets": [4,5]
        }],
        "language": {
            "decimal": ",",
            "thousands": ".",
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "Mostrar _MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }       
        }
    });
}, 1000);

