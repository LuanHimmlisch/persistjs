(() => {
    const storage = 'persistjs';
    const persist = {
        page: window.location.pathname,
        storage: JSON.parse(localStorage.getItem(storage)),
        elements: document.querySelectorAll('[data-persist]'),
        init() {
            if (!this.storage) {
                this.storage = {};
            }

            if (!this.storage[this.page]) {
                this.storage[this.page] = {};
                if (this.elements.length > 0) {
                    this.save();
                }
            }

            this.check();

            Object.keys(this.elements).forEach((i) => {
                /** @type {HTMLElement} */
                const element = this.elements[i];

                element.addEventListener('change', () => {
                    this.store(element);

                    this.save();
                });
            });
        },
        /** @param {HTMLElement} element  */
        store(element) {
            const id = element.dataset['persist-id'] ?? element.id;
            const now = new Date().getTime();
            const time = typeof (element.dataset['persist-expires'] ?? null) === typeof 0 ? element.dataset['persist-expires'] : 300000;

            this.storage[this.page][id] = {
                value: element.value,
                expires: now + time
            };
        },
        /** @param {HTMLElement} element  */
        update(element) {
            const now = new Date().getTime();
            const id = element.dataset['persist-id'] ?? element.id;
            const data = this.storage[this.page][id] ?? null;

            if (data && now < data.expires && data.value !== '' && data.value !== null) {
                switch (element.dataset.persist) {
                    case 'livewire':
                        let livewire_id = element?.name ?? element?.id;
                        for (let index = 0; index < element.attributes.length; index++) {
                            const attribute = element.attributes.item(index);
                            if (attribute.nodeName.startsWith('wire:model')) {
                                livewire_id = attribute.value;
                                break;
                            }
                        }
                        const livewire = Livewire.components.componentsById[element.closest('[wire\\:id]').getAttribute('wire\:id')];
                        livewire.initialize();
                        setTimeout(() => {
                            element.value = data.value;
                            livewire.set(livewire_id, data.value);
                        }, 100);
                        break;
                    default:
                        element.value = data.value;
                        break;
                }
            }
            element.dispatchEvent(new Event('input'));
        },
        check() {
            Object.keys(this.elements).forEach((i) => {
                /** @type {HTMLElement} */
                const element = this.elements[i];

                this.update(element);
            });
        },
        save() {
            localStorage.setItem(storage, JSON.stringify(this.storage));
        },
        flush() {
            this.delete(this.page);
        },
        /** @param {string} page  */
        delete(page) {
            this.storage[page] = {};
            this.save();
        }
    };

    // TODO: Make this a module
    // export default persist;

    persist.init();
    window.Persist = persist;
})()