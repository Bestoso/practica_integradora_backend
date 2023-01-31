const socket = io()
const productsContainer = document.getElementById('products');
const postForm = document.getElementById('form');

socket.on('get:products', products => {
    console.log(products);
    productsContainer.innerHTML = products.map(product => {
        return `
        <div class="product">
            <p>Name: ${product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Description: ${product.description}</p>
            <p>Code: ${product._id}</p> 
            <p>Status: ${product.status}</p>
            <p>Category: ${product.category}</p>
        </div>
        `
    }).join(' ');
});

