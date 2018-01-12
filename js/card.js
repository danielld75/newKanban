// KLASA KANBAN CARD
function Card(id, name, columnId) {
    var self = this;
    this.id = id;
    this.name = name || 'No name given';
    this.columnId = columnId;
    this.element = createCard();

    function createCard() {
        var card = $('<li class="card"></li>');
        var cardEditDescription = $('<button class="btn-edit">e</button>');
        var cardDeleteBtn = $('<button class="btn-delete">x</button>');
        var cardDescription = $('<p class="card-description"></p>');

        cardDeleteBtn.click(function () {
            self.removeCard();
        });

        cardEditDescription.click(function () {
            var newCardDescription = prompt("Enter new card name");
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'PUT',
                data: {
                    name: newCardDescription,
                    bootcamp_kanban_column_id: self.columnId
                },
                success: function () {
                    cardDescription.text(newCardDescription);
                }
            })
        });

        card.append(cardEditDescription);
        card.append(cardDeleteBtn);
        cardDescription.text(self.name);
        card.append(cardDescription);
        return card;
    }
}

Card.prototype = {
    removeCard: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function () {
                self.element.remove();
            }
        });
    }
};
