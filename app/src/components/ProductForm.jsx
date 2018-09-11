import React from 'react';

const ProductForm = props => {
    const {name, price, onFieldChange, onPrSubmit} = props;

    const onSubmit = e => {
        e.preventDefault();

        let prName = name.trim();
        let prPrice = price.trim();

        if (!prName || !prPrice)
        {
            return;
        }

        onPrSubmit({name: prName, price: prPrice});
    }

    return (
        <form className="product-form" onSubmit={onSubmit}>
            <input 
                className="field" 
                name="name" 
                type="text" 
                placeholder="Product Name" 
                value={name} 
                onChange={onFieldChange} 
            />
            <input 
                className="field" 
                name="price" 
                type="text" 
                placeholder="Price" 
                value={price} 
                onChange={onFieldChange} 
            />
            <input 
                className="sub-btn"
                type="submit" 
                value="Save" 
                onChange={onFieldChange} 
            />
        </form>
    );
}

export default ProductForm;