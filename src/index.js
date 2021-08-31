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
        const uncompleted = total - completed;
        return `Total: ${total}; <br> Completed: ${completed}; <br> Uncompleted: ${uncompleted}`;
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

class ToDoListDisplay {
    $form = document.querySelector('.toDoForm');
    $ul = document.querySelector('ul');

    constructor() {
        this.toDo = new ToDoList();
        this.formListener();
        this.listListener();
        this.renderStatistics();
    }

    formListener() {
        this.$form.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const [text] = [...formData.values()];

            if (text.trim()) {
                this.toDo.createItem(text);

                this.renderList();
                this.renderStatistics();
                e.target.reset();
            }
        });
    }
    renderList() {
        const fragment = new DocumentFragment();
        this.toDo.list.forEach(el => {
            const $li = document.createElement('li');
            $li.dataset.id = el.id;

            const $span = document.createElement('span');
            $span.className = `text${$li.dataset.id}`;
            $span.innerHTML = el.text;
            const $input = document.createElement('input');
            $input.className = `check${$li.dataset.id} check`;
            $input.setAttribute('type', 'checkbox');

            if (el.status) {
                $input.setAttribute('checked', 'true');
            }

            const $button = document.createElement('button');
            const $edit = document.createElement('button');
            $button.innerHTML = '<i class="fas fa-trash-alt"></i>';
            $edit.innerHTML = '<i class="fas fa-edit"></i>';
            $button.className = `remove${$li.dataset.id}`;
            $edit.className = `edit${$li.dataset.id}`;
            $li.innerHTML = $span.outerHTML + $input.outerHTML + $button.outerHTML + $edit.outerHTML;
            fragment.appendChild($li);
        });
        this.$ul.innerHTML = '';
        this.$ul.appendChild(fragment);
    }

    listListener() {
        this.$ul.addEventListener('click', ({ target }) => {
            const id = target.closest('li').getAttribute('data-id');

            // ======= REMOVE ITEM =======

            if (target.classList.contains('remove' + id) || target.classList.contains('fa-trash-alt')) {
                this.toDo.deleteItem(id);
                this.renderList();
                this.renderStatistics();
            }

            // ======= CHANGE STATUS =======

            if (target.classList.contains('check' + id)) {
                this.toDo.changeStatus(id);
                this.renderStatistics();
            }

            // ======= EDIT ITEM =======
            if (target.classList.contains('edit' + id) || target.classList.contains('fa-edit')) {
                target.closest('li').innerHTML = `<input class=editform${id} type='text'>
                <button class='editConfirm'>Edit Note</button>`;

                this.$form.addEventListener('submit', e => {
                    e.preventDefault();
                    const text = document.querySelector(`.editform${id}`).value;

                    if (text.trim()) {
                        this.toDo.editItem(id, { text: text });
                        e.target.reset();
                        this.renderList();
                        this.renderStatistics();
                    }
                });
            }
        });
    }

    renderStatistics() {
        const $statBox = document.querySelector('.statistics');
        const $div = document.createElement('div');
        $statBox.innerHTML = '';
        const fragment = document.createDocumentFragment();
        $div.innerHTML = this.toDo.getStatistics();

        fragment.appendChild($div);
        $statBox.appendChild(fragment);
    }
}

// ===============================

class ContactListDisplay {
    $form = document.querySelector('.contactForm');
    $list = document.querySelector('.contactList');

    constructor() {
        this.contact = new ContactList();
        this.formListener();
        this.listListener();
        this.searchingContact();
    }

    formListener() {
        this.$form.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.querySelector('.addName').value;
            const surname = document.querySelector('.addSurname').value;
            const phone = document.querySelector('.addPhone').value;
            if (name.trim() && surname.trim() && phone.trim() && !isNaN(phone)) {
                this.contact.createItem({ name, surname, phone });
                e.target.reset();
                this.renderList();
            }
        });
    }

    renderList() {
        const fragment = new DocumentFragment();
        this.contact.list.forEach(el => {
            const $li = document.createElement('li');
            $li.dataset.id = el.id;
            const $span = document.createElement('span');
            const $h6 = document.createElement('h6');
            const $div = document.createElement('div');
            $div.className = 'contactData';
            $span.textContent = el.phone;
            $span.className = `phone${$li.dataset.id}`;
            $h6.textContent = `${el.name} ${el.surname} `;

            const $button = document.createElement('button');
            const $edit = document.createElement('button');
            $button.innerHTML = '<i class="fas fa-trash-alt"></i>';
            $edit.innerHTML = '<i class="fas fa-edit"></i>';
            $button.className = `remove${$li.dataset.id}`;
            $edit.className = `edit${$li.dataset.id}`;
            $div.innerHTML = $h6.outerHTML + $span.outerHTML;
            $li.innerHTML = $div.outerHTML + $button.outerHTML + $edit.outerHTML;
            fragment.appendChild($li);
        });
        this.$list.innerHTML = '';
        this.$list.appendChild(fragment);
    }
    listListener() {
        this.$list.addEventListener('click', ({ target }) => {
            const id = target.closest('li').getAttribute('data-id');

            // ======= REMOVE CONTACT =======

            if (target.classList.contains('remove' + id) || target.classList.contains('fa-trash-alt')) {
                this.contact.deleteItem(id);
                this.renderList();
            }

            // ======= EDIT CONTACT =======

            if (target.classList.contains('edit' + id) || target.classList.contains('fa-edit')) {
                const index = this.contact.searchedIndex(id);
                const item = this.contact.list[index];
                target.closest('li').innerHTML = `<input class=editName${id} value=${item.name} type='text'>
                <input class=editSurname${id} value=${item.surname} type='text'>
                <input class=editPhone${id} value=${item.phone} type='tel'>
                <button class='editConfirm'>Edit</button>`;

                this.$form.addEventListener('submit', e => {
                    e.preventDefault();
                    const name = document.querySelector(`.editName${id}`).value;
                    const surname = document.querySelector(`.editSurname${id}`).value;
                    const phone = document.querySelector(`.editPhone${id}`).value;

                    this.contact.editItem(id, { name, surname, phone });
                    e.target.reset();
                    this.renderList();
                });
            }
        });
    }
    searchingContact() {
        const $searchForm = document.querySelector('.searchForm');
        const $searchField = document.querySelector('.searchField');

        $searchForm.addEventListener('submit', e => {
            e.preventDefault();
            const searchedData = $searchField.value;
            this.contact.searchItem(searchedData);
        });
    }
}

new ToDoListDisplay();
new ContactListDisplay();
