document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    const loadProducts = () => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.category} - Quantidade: ${product.quantity} - Preço: R$ ${product.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => {
                removeProduct(index);
            });
            li.appendChild(removeButton);
            productList.appendChild(li);
        });
    };

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const quantity = document.getElementById('productQuantity').value;
        const price = document.getElementById('productPrice').value;

        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name, category, quantity, price });
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
        productForm.reset();
    });

    const removeProduct = (index) => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    };

    loadProducts();
});