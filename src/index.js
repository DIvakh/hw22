/* eslint-disable */
class List {
    list = [];
    i = 1000;
    constructor(name) {
        this.name = name;
    }

    // ======= CREATE ITEM =======

    createItem(item) {
        if (typeof item === 'object') {
            this.list.push(item);
            item.id = this.i++;
        } else {
            this.list.push({ text: item, id: this.i++ });
        }
    }

    // ======= DELETE =======

    deleteItem(id) {
        const deleteCount = 1;
        const index = this.searchedIndex(id);
        this.list.splice(index, deleteCount);
        return this.list;
        // добавь проверку на -1 => нечего удалять
    }

    // ======= EDIT ITEM =======

    editItem(id, editedItem) {
        const index = this.searchedIndex(id);
        if (typeof editedItem === 'object') {
            this.list[index] = { ...this.list[index], ...editedItem };
        } else {
            this.list[index].text = editedItem;
        }
        return this.list;
    }

    // ======= FIND ITEM BY ID ========

    searchedIndex(id) {
        return this.list.findIndex(el => el.id === +id);
    }
}

// const ololo = new List();
// ololo.createItem('one');
// ololo.createItem('two');
// ololo.createItem('three');
// // ololo.deleteItem('1001');
// ololo.editItem('1001', 'five');
// console.log(ololo.list);

class ToDoList extends List {
    // ======== CREATE TODO ITEM =======

    createItem(text, id = this.i++) {
        const newItem = {
            text,
            id,
            status: false,
        };
        super.createItem(newItem);
    }

    // ======= CHANGING A STATUS =======

    changeStatus(item) {
        const ItemToComplete = this.list[super.searchedIndex(item)];
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
// ololo.createItem('Сделать 22-ое домашнее задание');
// ololo.createItem('Завтракать надо');
// ololo.createItem('Пойти на работу');
// ololo.createItem('Отдохнуть');
// console.log(ololo.getStatistics());
// ololo.editItem('1002', 'Покакац');
// console.log(ololo.list);

class ContactList extends List {
    // createItem(name, surname, phoneNum) {
    //     const newItem = {
    //         name,
    //         surname,
    //         phoneNum,
    //         id: this.i++,
    //     };
    //     super.createItem(newItem);
    // }

    searchItem(data) {
        const lowerCaseData = data.toString().toLowerCase();
        return this.list.filter(
            el =>
                el.name.toLowerCase().includes(lowerCaseData) ||
                el.surname.toLowerCase().includes(lowerCaseData) ||
                el.phoneNum.toString().includes(lowerCaseData) ||
                el.id.toString().includes(lowerCaseData)
        );
    }
}

const phone = new ContactList();
phone.createItem({ name: 'Vasya', surname: 'Vasechkin', phone: 380632234513 });

// phone.createItem('Marty', 'McFly', 432435345);
// phone.createItem('Vasya', 'Pupkin', 58848488);
// phone.createItem('Emmeth', 'Brown', 70431105);
// phone.deleteItem('1001');
console.log(phone.list);
// // console.log(phone.searchItem('mar'));
