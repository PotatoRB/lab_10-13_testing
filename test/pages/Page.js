class BasePage{
    constructor(){}

    async open(path){
        await browser.url(path);
    }
}

module.exports = BasePage;