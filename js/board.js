var board = {
    name: 'Tablica Kanban',
    createColumn: function(column) {
        this.element.append(column.element);
        initSortable();
    },
    element: $('#board .column-container')
};

$('.create-column')
    .click(function() {
        var columnName = prompt('Enter a column name');
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function(response){
                var column = new Column(response.id, columnName);
                board.createColumn(column);
            }
        });
    });

function initSortable() {
    $('.card-list').sortable({
        connectWith: '.card-list',
        placeholder: 'card-placeholder',
        update: function(event, ui) {
            if (ui.sender) {
                var cardId = ui.item.attr("data-card-id");
                var cardDescription = ui.item.find('.card-description').text();
                var columnId = ui.item.parent().parent().attr("data-column-id");
                $.ajax({
                    url: baseUrl + '/card/' + cardId,
                    method: 'PUT',
                    data: {
                        name: cardDescription,
                        bootcamp_kanban_column_id: columnId
                    },
                    success: function () {
                        // 
                    }
                });
            }
        }
    }).disableSelection();
}
