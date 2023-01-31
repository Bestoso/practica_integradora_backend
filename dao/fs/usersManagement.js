const fs = require("fs/promises");

class ProductManager {
    constructor ( path ) {
        this.products = [];
        this.path = path;
    }

    async getItems () {
        const items = await fs.readFile(this.path, 'utf-8');
        const parsedItems = await JSON.parse(items);
        return parsedItems;
    }

    async save ( data ) {
        const stringData = JSON.stringify(data, null, 4);
        return await fs.writeFile(this.path, stringData, 'utf-8');
    }

    async findItemById ( id ) {
        const items = await this.getItems();
        const itemFound = items.find(item => item.id === id);
        if (!itemFound) {
            console.log('Id does not correspond to any item')
        } else {
            return itemFound
        }
    }

    // products methods

    async addItem ( name, price, description, code, status, category, thumbnail ) {
        const items = await this.getItems();
        const values = {
            name,
            price,
            description,
            code,
            status,
            category,
            thumbnail
        }
        const newItem = {
            id: items.length + 1,
            ...values
        }
        if (!name ||!price ||
            !description || !code ||
            !status || !category ||
            !thumbnail) {
            console.log('Must Specify all values', {
                ...values
            })
        } else {
            items.push(newItem);
            await this.save(items);
            return items
        }
    }

    async updateItem ( id, name, price, description, code, status, category, thumbnail ) {
        const items = await this.getItems();
        const itemFoundIndex = items.findIndex(item => item.id === id);
        const values = {
            name,
            price,
            description,
            code,
            status,
            category,
            thumbnail
        }

        items[itemFoundIndex] = {
            id,
            ...values
        }

        await this.save(items);
    }

    async deleteItem ( id ) {
        const items = await this.getItems();
        const filteredItems = items.filter(item => item.id !== id);
        await this.save(filteredItems);
    }

    // cart methods

    async createCart ( id ) {
        const items = await this.getItems();
        const itemFound = await this.findItemById(id);
        const cart = {
            id: items.length + 1,
            items: [itemFound]
        }
        items.push(cart);
        await this.save(items);
        return items
    }

    async addItemToCart ( cartId, itemId ) {
        const items = await this.getItems();
        const cartFound = await this.findItemById(cartId);
        const itemFound = await this.findItemById(itemId);
        cartFound.items.push(itemFound);
        await this.save(items);
    }

    async deleteItemFromCart ( cartId, itemId ) {
        const items = await this.getItems();
        const cartFound = await this.findItemById(cartId);
        const itemFound = await this.findItemById(itemId);
        const filteredItems = cartFound.items.filter(item => item.id !== itemFound.id);
        cartFound.items = filteredItems;
        await this.save(items);
    }

    async deleteCart ( cartId ) {
        const items = await this.getItems();
        const filteredItems = items.filter(item => item.id !== cartId);
        await this.save(filteredItems);
    }

    async getCart ( cartId ) {
        const items = await this.getItems();
        const cartFound = await this.findItemById(cartId);
        return cartFound
    }

    async getCartTotal ( cartId ) {
        const items = await this.getItems();
        const cartFound = await this.findItemById(cartId);
        const total = cartFound.items.reduce((acc, item) => {
            return acc + item.price
        }, 0)
        return total
    }
}

module.exports = ProductManager;