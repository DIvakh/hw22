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
        this.list[index] = { ...this.list[index], ...editedItem };
        return this.list;
    }

    // ======= FIND ITEM BY ID ========

    searchedIndex(id) {
        return this.list.findIndex(el => el.id === +id);
    }
}

// const ololo = new List();
// ololo.createItem({ text: 'one' });
// ololo.createItem({ text: 'two' });
// ololo.createItem({ text: 'three' });
// // // ololo.deleteItem('1001');
// // // ololo.editItem('1001', { text: 'five' });
// console.log(ololo.list);

class ToDoList extends List {
    // ======== CREATE TODO ITEM =======

    createItem(item) {
        item.status = false;
        super.createItem(item);
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

// const ololo = new ToDoList();
// ololo.createItem({ text: 'Сделать 22-ое домашнее задание' });
// ololo.createItem({ text: 'Завтракать надо' });
// ololo.createItem({ text: 'Пойти на работу' });
// ololo.createItem({ text: 'Отдохнуть' });
// ololo.editItem('1002', { text: 'Покакац' });
// ololo.changeStatus('1002');
// console.log(ololo.getStatistics());
// console.log(ololo.list);

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

// const phone = new ContactList();
// phone.createItem({ name: 'Marty', surname: 'McFly', phone: 58848488 });
// phone.createItem({ name: 'Vasya', surname: 'Vasechkin', phone: 380632234513 });
// phone.createItem({ name: 'Emmeth', surname: 'Brown', phone: 70431105 });
// phone.createItem({ name: 'Maria', surname: 'Grande', phone: 49849848494 });
// // phone.editItem(1001, { gender: 'unknown' });
// // phone.deleteItem('1001');
// console.log(phone.list);
// // console.log(phone.searchItem('mar'));
