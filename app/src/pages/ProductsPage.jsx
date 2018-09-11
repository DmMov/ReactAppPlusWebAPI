import React, { Component } from 'react';
import ProductForm from '../components/ProductForm';
import ProductsList from '../components/ProductsList';

class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            price: '',
            products: []
        };
    }

    onFieldChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name);
    }

    loadPr = () => {
        let xhr = new XMLHttpRequest();

        xhr.open('get', 'api/products', true);
        xhr.onload = () => {
            let data = JSON.parse(xhr.responseText);
            this.setState({products: data})
        }
        xhr.send();
    }

    addPr = product => {
        if (product) 
        {
            let data = JSON.stringify({
                "name": product.name, 
                "price": product.price
            });
            let xhr = new XMLHttpRequest();
             
            xhr.open('post', 'api/products', true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = () => xhr.status == 200 ? this.loadPr() : null;
            xhr.send(data);
            this.setState({
                name: '',
                price: ''
            })
        }
        
    }

    delPr = product => {
        if (product) 
        {
            let url = 'api/products/' + product.id;
             
            let xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = () => xhr.status == 200 ? this.loadPr() : null;
            xhr.send();
        }
    }

    render() {
        const {name, price, products} = this.state;

        return (
            <div className="page" id="products-page">
                <ProductForm 
                    name={name} 
                    price={price}
                    onFieldChange={this.onFieldChange}
                    onPrSubmit={this.addPr}
                />
                <ProductsList
                    products={products}
                    onRemoveProduct={this.delPr}
                />
            </div>
        );
    }

    componentDidMount() {
        this.loadPr();
    }
    
}

export default ProductsPage;