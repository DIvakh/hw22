class List {
    list = [];

    constructor(name) {
        this.name = name;
    }

    // ======= CREATE =======

    createItem(item) {
        this.list.push(item);
    }

    // ======= FIND INDEX ========

    itemIndex(item) {
        return this.list.findIndex(el => el === item);
    }

    // ======= DELETE =======

    deleteItem(item) {
        const deleteCount = 1;
        const index = this.itemIndex(item);
        this.list.splice(index, deleteCount);
        return this.list;
        // добавь проверку на -1 => нечего удалять
    }

    // ======= EDIT =======

    editItem(item, editedItem) {
        const index = this.itemIndex(item);
        this.list[index] = editedItem;
        return this.list;
        // добавь проверку на -1 => нечего редактировать
    }
}

// const ololo = new List();
// ololo.createItem('one');
// ololo.createItem('two');
// ololo.createItem('three');
// console.log(ololo.list);
// console.log(ololo.deleteItem('two'));
// console.log(ololo.editItem('two', 'five'));

class ToDoList extends List {
    // ======== CREATE =======

    createItem(text, id = Date.now()) {
        const newItem = {
            text,
            id,
            status: false,
        };
        super.createItem(newItem);
    }

    // ======= SEARCH =======

    searchedItem(item) {
        return this.list.find(el => el.text === item || el.id === item);
    }

    // ======= DELETE =======

    deleteItem(item) {
        const itemToDelete = this.searchedItem(item);
        super.deleteItem(itemToDelete);
        return this.list;
    }

    // ======= EDIT =======

    editItem(item, editedText) {
        const itemToEdit = this.searchedItem(item);

        const newItem = itemToEdit;
        newItem.text = editedText;
        super.editItem(itemToEdit, newItem);
    }

    // ======= Changing a status =======

    changeStatus(item) {
        const ItemToComplete = this.searchedItem(item);
        if (!ItemToComplete.status) {
            ItemToComplete.status = true;
        } else {
            ItemToComplete.status = false;
        }
    }

    // ======= STATISTICS =======

    getStatistics() {
        const total = this.list.length;
        const completed = this.list.filter(el => el.status).length;
        return `Total:${total}, Completed:${completed}`;
    }
}

const ololo = new ToDoList();
ololo.createItem('Сделать 22-ое домашнее задание');
ololo.createItem('Завтракать надо');
ololo.createItem('Пойти на работу');
ololo.createItem('Отдохнуть');

// console.log(ololo.list);
