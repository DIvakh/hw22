class List {
    list = [];

    constructor(name) {
        this.name = name;
    }

    // ======= CREATE ITEM =======

    createItem(item) {
        if (typeof item === 'object') {
            this.list.push(item);
        } else {
            this.list.push({ text: item, id: Date.now() });
        }
    }

    // ======= DELETE =======

    deleteItem(item) {
        const deleteCount = 1;
        const index = this.searchedIndex(item);
        this.list.splice(index, deleteCount);
        return this.list;
        // добавь проверку на -1 => нечего удалять
    }

    // ======= EDIT ITEM =======

    editItem(item, editedItem) {
        const index = this.searchedIndex(item);
        this.list[index].text = editedItem;
        return this.list;
        // добавь проверку на -1 => нечего редактировать
    }

    // ======= FIND ITEM'S INDEX ========

    searchedIndex(item) {
        const searchedItem = this.list.find(el => el.text === item || el.id === +item || el.name === item);
        return this.list.indexOf(searchedItem);
    }
}

// const ololo = new List();
// ololo.createItem('one');
// ololo.createItem('two');
// ololo.createItem('three');
// ololo.deleteItem('two');
// console.log(ololo.list);
// // console.log(ololo.editItem('two', 'five'));

class ToDoList extends List {
    // ======== CREATE TODO ITEM =======

    createItem(text, id = Date.now()) {
        const newItem = {
            text,
            id,
            status: false,
        };
        super.createItem(newItem);
    }

    // ======= CHANGING A STATUS =======

    changeStatus(item) {
        const ItemToComplete = super.searchedItem(item);
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

const ololo = new ToDoList();
ololo.createItem('Сделать 22-ое домашнее задание');
// ololo.createItem('Завтракать надо');
// ololo.createItem('Пойти на работу');
// ololo.createItem('Отдохнуть');
// // console.log(ololo.getStatistics());
// // ololo.deleteItem('Пойти на работу');
// console.log(ololo.list);

class ContactList extends List {
    createItem(name, surname, phoneNum) {
        const newItem = {
            name,
            surname,
            phoneNum,
            id: Date.now(),
        };
        super.createItem(newItem);
    }

    searchItem(data) {
        return this.list.find(
            el => el.name === data || el.surname === data || el.phoneNum === +data || el.id === +data
        );
    }
}

const phone = new ContactList();
phone.createItem('Marty', 'McFly', Date.now());
// phone.createItem('Vasya', 'Pupkin', 58848488);
// phone.createItem('Emmeth', 'Brown', 70431105);
// phone.deleteItem('Vasya');
// console.log(phone.list)
