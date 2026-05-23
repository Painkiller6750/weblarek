import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { ProductCatalog } from './components/models/ProductCatalog';
import { ShoppingCart } from './components/models/ShoppingCart';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { ServerApi } from './components/communication/ServerApi';
import { IOrderResultApi } from './types';

// use mocks to check class work
const productsModel = new ProductCatalog();
// save goods for detailed showing
productsModel.saveProduct(apiProducts.items[0]); //
console.log('Get item for its detailed showing : ', productsModel.getProduct());

productsModel.saveProducts(apiProducts.items);
console.log('Catalog goods massive: ', productsModel.getProducts());
console.log('The item found by its id: ', productsModel.getProductByID("854cef69-976d-4c2a-a18c-2aa45046c390"));


const shoppingCartModel = new ShoppingCart();
// add selected item to the bin
shoppingCartModel.addSelectedProduct(apiProducts.items[0]);
shoppingCartModel.addSelectedProduct(apiProducts.items[1]);
shoppingCartModel.addSelectedProduct(apiProducts.items[2]);
console.log('Downloaded Goods from the bin: ', shoppingCartModel.getSelectedProducts());
console.log('Check if smth in the bin (by id): ', shoppingCartModel.checkSelectedProduct("854cef69-976d-4c2a-a18c-2aa45046c390"));
// delete item got from the bin
shoppingCartModel.deleteSelectedProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log('Check if the item in the bin after being deleted ', shoppingCartModel.checkSelectedProduct("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log('Goods massive which in the bin after the deletion: ', shoppingCartModel.getSelectedProducts());
console.log('The number of goods in the bin: ', shoppingCartModel.getSelectedProductsAmount());
console.log('Total goods price from the bin: ', shoppingCartModel.getTotal());
// clean the bin
shoppingCartModel.clearShoppingCart();
console.log('Goods in the bin after the cleaning ', shoppingCartModel.getSelectedProducts());

const buyerModel = new Buyer();
buyerModel.savePaymentType('cash'); // save payment type
buyerModel.saveAddress('Tver, Mira hw'); // save model address
buyerModel.saveEmail('ivanov@mail.ru'); // save email
buyerModel.savePhone('89507164544'); // save phone number
console.log('Buyer data: ', buyerModel.getData()); // get all buyer data
buyerModel.clearBuyerData(); // clean buyer data
console.log('Buyer data after cleaning ', buyerModel.getData());
console.log('Buyer data validation ', buyerModel.validate()); // data validation

// request on the server to get goods catalog
const apiModel = new Api(API_URL);
const serverApiModel = new ServerApi(apiModel);
serverApiModel.getProducts()
    .then((result: IOrderResultApi) => {
        console.log('Goods has been downloaded from the server');
        productsModel.saveProducts(result.items);
        // check productCatalog class
        console.log('Goods from the server ', productsModel.getProducts());
        console.log('Item by id ', productsModel.getProductByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
        console.log("Can't find by id ", productsModel.getProductByID("854cef69-976d-4c2a-a18c-2aa45046c391"));
        productsModel.saveProduct(result.items[0]);
        console.log('Getting for detailed show: ', productsModel.getProduct());

        // check ShoppingCart class
        shoppingCartModel.addSelectedProduct(result.items[0]);
        shoppingCartModel.addSelectedProduct(result.items[1]);
        console.log('Goods in the bin ', shoppingCartModel.getSelectedProducts());
        console.log('Check goods existence int he bin ', shoppingCartModel.checkSelectedProduct("854cef69-976d-4c2a-a18c-2aa45046c390"));
        shoppingCartModel.deleteSelectedProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
        console.log('Check goods existence in the bin after the deletion ', shoppingCartModel.checkSelectedProduct("854cef69-976d-4c2a-a18c-2aa45046c390"));
        console.log('Goods in the bin after deletion ', shoppingCartModel.getSelectedProducts());
        console.log('The number of the goods in the bin ', shoppingCartModel.getSelectedProductsAmount());
        console.log('The total price of all the goods in the bin ', shoppingCartModel.getTotal());
        shoppingCartModel.clearShoppingCart();
        console.log('Goods in the bin after deletion ', shoppingCartModel.getSelectedProducts());
    })
    .catch(error => {
        console.error('Error', error);
    });
