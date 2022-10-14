const router = require('express').Router();
const renderModels = require('../imageRenders/getRenders.js')

router.get('/', async (req, res) => {
    const Info = renderModels();
    const allOptions = []

    for (const option of Info) {
        allOptions.push({name: option.name, render: option.func, options: option.options? option.options : null})
    };
   
    var data = {
        options: allOptions
    }
    if (!data) res.status(404).send({ 'error' : `Something went wrong...`})
    return res.status(200).send(data);
});

module.exports = router;
