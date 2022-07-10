const router = require('express').Router();
const renderModels = require('../imageRenders/index')

router.get('/:type', async (req, res) => {
    const { type } = req.params;
    const data = await renderModels[type]();

    return res.status(200).send(data);
});

module.exports = router;
