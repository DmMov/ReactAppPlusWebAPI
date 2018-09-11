import React from 'react';

const Product = props => {
    const onClick = e => {
        props.onRemove(props.data)
    }

    const {name, price} = props.data;

    return (
        <div className="product">
            <span className="name">{name}</span>
            <span className="price">{price} 
                <span className="cur"> hrn.</span>
            </span>
            <button onClick={onClick} className="del-pr-btn">Delete</button>
        </div>
    );
}

export default Product;