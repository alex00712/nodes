const {Router} = require('express')
const Note = require('../models/links')
const auth = require('../middleware/auth.middleware')
const jsonParser = require('express').json();
const router = Router()

router.use(jsonParser)

router.post('/create', auth,  async (req, res)=>{
    console.log('file: ', req.file)
    try{
        let {data, tytle} = req.body
        let userId = req.auth.userId
        if (data && tytle){
            let newNode = await Note({owner: req.auth.userId, tytle, data})
            await newNode.save()
            res.json({message: 'Created', data: newNode})
        }
    } catch(error){
        return res.status(500).json({message: 'Something went wrong. Try it again.'})
    }
})

router.get('/', auth, async (req, res)=>{
    try{   
        let links = await Note.find({owner: req.auth.userId})
        res.json({links: links, id: req.auth.userId})
    } catch(error){
        return res.status(500).json({message: 'Something went wrong. Try it again.'})
    }
})

router.get('/:id', auth, async (req, res)=>{
    try {
        console.log('link: ', req.params.id)
        let link_one = await Note.findById(req.params.id)
        return res.json(link_one)
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong. Try it again.'})
    }
})

router.delete('/', auth, async (req, res)=>{
    try {
        await Note.findByIdAndDelete(req.body.id)
        res.status(201).json({message: 'Deleted'})
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong. Try it again.'})
    }
})

router.put('/status', auth, async (req, res)=>{
    try {
        let update_one = await Note.findById(req.body.id)
        console.log('update_one' ,req.body.id)
        update_one.checked = true
        await update_one.save()
        res.status(201).json({message: 'Updated'})
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong. Try it again.'})
    }
})

router.put('/card', auth, async (req, res)=>{
    try {
        let {id, tytle, data, date} = req.body
        console.log(req.body)
        let update_one = await Note.findById(id)
        update_one.tytle = tytle;
        update_one.data = data;
        update_one.date = date;
        await update_one.save()
        res.status(201).json({message: 'Updated'})
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong. Try it again.'})
    }
})

module.exports = router;