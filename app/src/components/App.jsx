import React from 'react';
import Menu from './Menu';
import Home from '../pages/HomePage';
import Products from '../pages/ProductsPage';
import { BrowserRouter, Route} from 'react-router-dom';

const App = () => (
    <BrowserRouter>
        <div id="app">
            <Menu />
            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
        </div>  
    </BrowserRouter>
);

export default App;