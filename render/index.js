const router = require('express').Router();
const renderModels = require('../imageRenders/getRenders.js')

router.get('/:type', async (req, res) => {
    const { type } = req.params;

    var data;
    const Info = renderModels();
    console.log('loading')

    for (const option of Info) {
        if (option.name == type) data = await option.func();
    };
   
    return res.status(200).send(data);
});

module.exports = router;
