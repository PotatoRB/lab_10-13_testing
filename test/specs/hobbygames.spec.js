const HobbyGamesPage = require('../pages/hobbygamesPage/hobbygamesPage.js');

describe('Add Product to Card', function(){

    it('should load HobbyGames page', async() => {
        await HobbyGamesPage.open();
        await HobbyGamesPage.windowMaximize();
        await expect(browser).toHaveUrl('https://hobbygames.by/warhammer-40000/');
    })

    //1
    it('should add product in cart and check count products in cart', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.addProductItemToCart(2);
        await browser.pause(1000);
        const countsOfProducts = await HobbyGamesPage.howManyProductsInCart();
        await browser.pause(1000);
        await expect(countsOfProducts).toBe('1');
    })

    //2
    it('should remove product from cart and check count products in cart', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.removeProductItemToCart(1);
        await browser.pause(1000);
        const countsOfProducts = await HobbyGamesPage.howManyProductsInCart();
        await browser.pause(1000);
        await expect(countsOfProducts).toBe('0');
    })

    //3
    it('should set price between 200 and 500', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.setPriceBetween(200,500);
        await browser.pause(1000);
        await expect(browser).toHaveUrlContaining('price_from=200&price_to=500');
    })

    //4
    it('should search "primaris ancient", add it to cart and  check count products in cart', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.searchProductAndAddItToCart('primaris ancient');
        await browser.pause(1000);
        const countsOfProducts = await HobbyGamesPage.howManyProductsInCart();
        await browser.pause(1000);
        await expect(countsOfProducts).toBe('1');
    })

    //5
    it('should add 2 "primaris ancient" in cart use cart button and check count products in cart ', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.addProductsUseCartButton(2);
        await browser.pause(1000);
        const countsOfProducts = await HobbyGamesPage.howManyProductsInCart();
        await browser.pause(1000);
        await expect(countsOfProducts).toBe('3');
    })

    //6
    it('should remove 3 "primaris ancient" from cart use cart button and check count products in cart ', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.removeProductsUseCartButton(3);
        await browser.pause(1000);
        const countsOfProducts = await HobbyGamesPage.howManyProductsInCart();
        await browser.pause(1000);
        await expect(countsOfProducts).toBe('0');
    })

    //7
    it('should mark Cортировать:по цене, Производитель:Games Workshop', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.markFilterAndManufacturer();
        await browser.pause(1000);
        await expect(browser).toHaveUrlContaining('search?sort=price');
        await expect(browser).toHaveUrlContaining('p_manufacturers[0]=1319');
    })

    it('should load HobbyGames page', async() => {
        await HobbyGamesPage.open();
        await HobbyGamesPage.windowMaximize();
        await expect(browser).toHaveUrl('https://hobbygames.by/warhammer-40000/');
    })

    //8
    it('should open https://hobbygames.by/drukhari', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.markCategories();
        await browser.pause(1000);
        await expect(browser).toHaveUrl('https://hobbygames.by/drukhari');
    })

    //9
    it('should open product page and add it ro cart', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.openProductItemAndAddToCart();
        await browser.pause(1000);
        const countsOfProducts = await HobbyGamesPage.howManyProductsInCart();
        await browser.pause(1000);
        await expect(countsOfProducts).toBe('1');
    })

    //10
    it('should remove product from cart and use return to cart', async() => {
        await browser.pause(1000);
        await HobbyGamesPage.removeProductItemToCart(1);
        await browser.pause(1000);
        await HobbyGamesPage.returnProductToCard(1);
        const countsOfProducts = await HobbyGamesPage.howManyProductsInCart();
        await browser.pause(1000);
        await expect(countsOfProducts).toBe('1');
    })
})