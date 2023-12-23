const Log = require ( "../models/logs")// importing the model form logs.js file
function registerRoutes(app) {

    app.get('/', (req, res) => {
        res.send("your server is running... better catch it.");
    });


    // all others routes================================

    //--------- Logs index ------------->GET
    // I - INDEX - dsiplays a list of all logs
    app.get('/logs/', async (req, res) => {

        try {
            const foundLogs = await Log.find({});
            res.status(200).render('Index', { logs: foundLogs });
        } catch (err) {
            console.error(err)
            res.status(400).send(err);
        }

    });
    app.get('/logs/new', (req, res) => {
        res.render("New");
    })


    //-------- Destroy --------------------- delete
    // D - DELETE - PERMANENTLY removes logs from the database-----DELETE
    app.delete('/logs/:id', async (req, res) => {
        try {
            const deleteLog = await Log.findByIdAndDelete(req.params.id);
            console.log(deleteLog);
            res.status(200).redirect('/logs');
        } catch (err) {
            res.status(400).send(err);
        }
    })


    // U - UPDATE - makes the actual changes to the database based on the EDIT form---------------->UPDATE
    app.post('/logs/:id', async (req, res) => {
        if (req.body.shipIsBroken === 'on') {
            req.body.shipIsBroken = true;
        } else {
            req.body.shipIsBroken = false;
        }

        try {
            const updatedLog = await Log.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            console.log(updatedLog);
            res.status(200).redirect(`/logs/${req.params.id}`);
        } catch (err) {
            res.status(400).send(err);
        }
    })



    // C - CREATE - update our data store---------CREATE
    app.post('/logs', async (req, res) => {
        if (req.body.shipIsBroken === 'on') { //if checked, req.body.shipIsBroken is set to 'on'
            req.body.shipIsBroken = true;
        } else {  //if not checked, req.body.shipIsBroken is undefined
            req.body.shipIsBroken = false;
        }

        try {
            await Log.create(req.body);
            res.status(200).redirect('/logs');
        } catch (err) {
            res.status(400).send(err);
        }
    });

    // E - EDIT - allow the user to provide the inputs to change the log-----------UPDATE
    app.get('/logs/:id/edit', async (req, res) => {
        try {
            const foundLog = await Log.findById(req.params.id);
            res.status(200).render('Edit', { log: foundLog });
        } catch (err) {
            res.status(400).send(err);
        }
    })


    // S - SHOW - show route displays details of an individual fruit
    app.get('/logs/:id', async (req, res) => {

        try {
            const foundLog = await Log.findById(req.params.id);
            res.render('Show', { log: foundLog });
        } catch (err) {
            res.status(400).send(err);
        }

    })

}

module.exports={
    registerRoutes
}
