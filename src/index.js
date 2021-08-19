/* eslint-disable */
class List {
    list = [];
    constructor(name) {
        this.name = name;
    }

    // ======= CREATE ITEM =======

    createItem(item) {
        this.list.push(item);
        item.id = Date.now();
    }

    // ======= DELETE =======

    deleteItem(id) {
        const deleteCount = 1;
        const index = this.searchedIndex(id);
        this.list.splice(index, deleteCount);
        if (index === -1) throw new Error('Nothing to delete');
        return this.list;
    }

    // ======= EDIT ITEM =======

    editItem(id, editedItem) {
        const index = this.searchedIndex(id);
        if (this.isUnique(editedItem)) {
            this.list[index] = { ...this.list[index], ...editedItem };
        }
        return this.list;
    }

    // ======= FIND ITEM BY ID ========

    searchedIndex(id) {
        return this.list.findIndex(el => el.id === +id);
    }

    // ======= ISUNIQUE =======
    isUnique(text) {
        const item = this.list.find(el => el.text === text);
        return !item;
    }
}

class ToDoList extends List {
    // ======== CREATE TODO ITEM =======

    createItem(text) {
        const item = {
            text,
            status: false,
        };
        if (super.isUnique(text)) {
            super.createItem(item);
        } else throw new Error('This item is already exists');
    }

    // ======= CHANGING A STATUS =======

    changeStatus(id) {
        const ItemToComplete = this.list[super.searchedIndex(id)];
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
        return `Total: ${total}; Completed: ${completed}`;
    }
}

class ContactList extends List {
    searchItem(data) {
        const lowerCaseData = data.toString().toLowerCase();
        return this.list.filter(
            el =>
                el.name.toLowerCase().includes(lowerCaseData) ||
                el.surname.toLowerCase().includes(lowerCaseData) ||
                el.phone.toString().includes(lowerCaseData) ||
                el.id.toString().includes(lowerCaseData)
        );
    }
}

// class toDoListDisplay {
//     constructor() {
//         this toDo = new ToDoList();
//     }
// }

// toDoListDisplay();
