async function waitElemLocated(element){
    await element.waitForExist({ timeout: 5000 });
    return element;
}

module.exports = {waitElemLocated}