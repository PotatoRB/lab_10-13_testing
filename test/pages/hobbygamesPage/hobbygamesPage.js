const BasePage = require('../Page');
const {waitElemLocated} = require('../../helper/waiters');

class HobbyGamesPage extends BasePage {

    get hobbygamesCart(){
        return $('.with-icon.cart-status.cart-count');
    }
    
    get hobbygamesCartStatus(){
        return $('.header__info__item.active');
    }

    get hobbygamesCartIcon(){
        return $('.cart-icon');
    }

    get gethobbygamesProducts(){
        return $('.col-md-9');
    }

    get gethobbygamesToPrice(){
        return $('[name="price_to"]');
    }

    get gethobbygamesFromPrice(){
        return $('[name="price_from"]');
    }

    get gethobbygamesSeach(){
        return $('[type="search"]');
    }

    get gethobbygameSortBy(){
        return $('.sort-view');
    }

    get gethobbygamesLabelGamesWorkshop(){
        return $('[for="m1319"]');
    }

    get gethobbygamesLabelArmiesOfXenos(){
        return $('[data-id="31142"]');
    }

    get gethobbygamesLabelDrukhari(){
        return $('[data-id="31144"]');
    }
    
    get gethobbygamesAddToCartButton(){
        return $('.buttons.product-cart.add-to-cart');
    }

    async gethobbygamesFilter(elementNumber){
        return $(`.sort-view li:nth-child(${elementNumber})`);
    }

    async gethobbygamesSeachProductAddToCartButton(elementNumber){
        return $(`tr:nth-child(${elementNumber}) div.search__popup__buy-block_button`)
    }

    async gethobbygamesProductsRemoveIcon(elementNumber){
        return $(`.cart-popup__items__item:nth-child(${elementNumber}) .icon-remove`);
    }

    async gethobbygamesProductsPlusIcon(elementNumber){
        return $(`.cart-popup__items__item:nth-child(${elementNumber}) .icon-plus`);
    }

    async gethobbygamesProductsMinusIcon(elementNumber){
        return $(`.cart-popup__items__item:nth-child(${elementNumber}) .icon-minus`);
    }

    async gethobbygamesProductsReturn(elementNumber){
        return $(`.cart-popup__items__item:nth-child(${elementNumber}) [data-action="plus"]`);
    }

    async getHobbyGamesProductItem(elementNumber){
        return $(`.row.products-container .col-lg-4:nth-child(${elementNumber})`);
    }

    async getHobbyGamesProductItemToCart(elementNumber){
        return $(`.row.products-container .col-lg-4:nth-child(${elementNumber}) .to-cart`);
    }

    async open() {
        await super.open('https://hobbygames.by/warhammer-40000/');
    }

    async windowMaximize() {
        await browser.maximizeWindow();
    }

    async clickOnElem(element) {
        await waitElemLocated(element);
        if(await element.waitForClickable({timeout:10000})){
            await element.click();
        }
    }

    async addProductItemToCart(elementNumber){
        const linktoproducts = await waitElemLocated(this.gethobbygamesProducts);
        await linktoproducts.scrollIntoView();
        const linktoproduct = await this.getHobbyGamesProductItemToCart(elementNumber);
        await this.clickOnElem(linktoproduct);
    }

    async removeProductItemToCart(elementNumber){
        await this.openCart();
        await this.clickOnElem(await this.gethobbygamesProductsRemoveIcon(elementNumber));
    }

    async returnProductToCard(elementNumber){
        await this.clickOnElem(await this.gethobbygamesProductsReturn(elementNumber));
    }

    async setPriceBetween(fromvalue, tovalue){
        await this.gethobbygamesToPrice.scrollIntoView();
        await this.gethobbygamesToPrice.setValue(tovalue);
        await browser.pause(1000);
        await this.gethobbygamesFromPrice.scrollIntoView();
        await this.gethobbygamesFromPrice.setValue(fromvalue);
    }

    async openCart(){
        await this.hobbygamesCart.scrollIntoView();
        if (await this.hobbygamesCartStatus.isExisting()){
            return;
        }else{
            await this.clickOnElem(this.hobbygamesCart);
        }
    }

    async howManyProductsInCart(){
        if (await this.hobbygamesCartIcon.isExisting()){
            return await this.hobbygamesCartIcon.getText();
        }else {
            return '0';
        }
    }

    async searchProductAndAddItToCart(productname){
        await this.gethobbygamesSeach.setValue(productname);
        await browser.pause(1000);
        await this.clickOnElem(await this.gethobbygamesSeachProductAddToCartButton(2));
    }

    async addProductsUseCartButton(count){
        await this.openCart();
        var i = 0;
        while (i!=count){
            await this.clickOnElem(await this.gethobbygamesProductsPlusIcon(1));
            await browser.pause(1000);
            i++;
        }
    }

    async removeProductsUseCartButton(count){
        await this.openCart();
        var i = 0;
        while (i!=count){
            await this.clickOnElem(await this.gethobbygamesProductsMinusIcon(1));
            await browser.pause(1000);
            i++;
        }
    }

    async markFilterAndManufacturer(){
        await this.gethobbygamesLabelGamesWorkshop.scrollIntoView();
        await this.clickOnElem(this.gethobbygamesLabelGamesWorkshop);
        await browser.pause(1000);
        await browser.refresh();
        await browser.pause(1000);
        await this.gethobbygameSortBy.scrollIntoView();
        await this.clickOnElem(this.gethobbygameSortBy);
        await this.clickOnElem(await this.gethobbygamesFilter(4));
        await browser.pause(1000);
        await browser.refresh();
    }

    async markCategories(){
        await this.gethobbygamesLabelArmiesOfXenos.scrollIntoView();
        await this.clickOnElem(this.gethobbygamesLabelArmiesOfXenos);
        await browser.pause(1000);
        await browser.refresh();
        await this.gethobbygamesLabelDrukhari.scrollIntoView();
        //await this.clickOnElem(this.gethobbygamesLabelDrukhari);
        await super.open('https://hobbygames.by/drukhari');
        await browser.refresh();
    }

    async openProductItemAndAddToCart(){
        await this.clickOnElem(await this.getHobbyGamesProductItem(2));
        await browser.pause(1000);
        await this.clickOnElem(this.gethobbygamesAddToCartButton);
    }
}

module.exports = new HobbyGamesPage();