function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || "No name given";
    this.element = createColumn();

    function createColumn() {
        // TWORZENIE NOWYCH WĘZŁÓW
        var column = $('<div class="column"></div>').attr("data-column-id", self.id);
        var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
        var columnCardList = $('<ul class="card-list"></ul>');
        var columnDelete = $('<button class="btn-delete">x</button>');
        var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
        var columnUpdateName = $('<button class="column-update-name">Zmień nazwę Kolumny</button>');

        // PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
        columnDelete.click(function () {
            self.deleteColumn();
        });

        columnUpdateName.click(function (event) {
            var columnName = prompt("Enter new column name");
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'PUT',
                data: {
                    name: columnName
                },
                success: function () {
                    columnTitle.text(columnName);
                }
            })
        });

        columnAddCard.click(function (event) {
            var cardName = prompt("Enter the name of the card");
            event.preventDefault();
            if (cardName !== null) {
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: cardName,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function (response) {
                        var card = new Card(response.id, cardName, self.id);
                        self.createCard(card);
                    }
                });
            }
        });

        // KONSTRUOWANIE ELEMENTU KOLUMNY
        column.append(columnTitle)
            .append(columnDelete)
            .append(columnAddCard)
            .append(columnUpdateName)
            .append(columnCardList);
        return column;
    }
}

Column.prototype = {
    createCard: function (card) {
        this.element.children('ul').append(card.element);
    },
    deleteColumn: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function () {
                self.element.remove();
            }
        });
    }
};
