// product.js

document.addEventListener('DOMContentLoaded', () => {
    const updateForm = document.getElementById('updateForm');

    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const productId = document.querySelector('#productId').textContent;
        const description = document.querySelector('#editDescription').value;
        const price = document.querySelector('#editPrice').value;
        const stock = document.querySelector('#editStock').value;

        const updatedData = { description, price, stock };

        try {
            const response = await fetch(`/products/update/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error('Hubo un problema al actualizar el producto');
            }

            console.log('Producto actualizado correctamente');
            window.location.href = `/products/${productId}`; // Redirigir a la página del producto
        } catch (error) {
            console.error('Hubo un error:', error);
            // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error al usuario)
        }
    });
});
