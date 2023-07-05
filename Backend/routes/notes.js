const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    obj={
        name:'Baroon',
        phn:70038594945
    }
    res.json(obj)
})

module.exports = router