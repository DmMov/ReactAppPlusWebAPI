import React from 'react';

import Product from './Product';

const ProductsList = props => {
    const { products, onRemoveProduct } = props;

    return (
        <div id="products-list">
            {
                products.map((v) => {
                    return <Product key={v.id} data={v} onRemove={onRemoveProduct} />
                })
            }
        </div>
    );
}

export default ProductsList;