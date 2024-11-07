const {IncomingForm} = require('formidable');
const { readTasksFromFile, writeTasksTofile } = require("../utils/fileHandler");
const {copyFileSync } = require('fs');
const path = require('path');

exports.getTasks = (req, res) => {
    const tasks =  readTasksFromFile();
    res.writeHead(200, {'content-type': 'application/json'})
    res.end(JSON.stringify(tasks))
}
exports.createTask = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) =>{
        if(err) {
            res.writeHead(400, {'content=type': 'application/json'});
            res.end(JSON.stringify({
                message: 'error parsing form'
            }))
            return;
        }
        const image = files.image[0]

        const tasks = readTasksFromFile()
        const newTask = {
            id: Date.now(),
            title: fields.title,
            description: fields?.description || '',
            status: fields?.status || 'pending',
            image: files.image ? `/uploads/${image.originalFilename}` : null,
        }
        tasks.push(newTask);
        writeTasksTofile(tasks);
        if(files.image) {
            copyFileSync(image.filepath, path.join(__dirname,'../uploads', image.originalFilename));
            res.end(JSON.stringify(newTask))
        }
    })
}
exports.updateTask = (req, res) => {
    res.end(JSON.stringify({
        message: 'not yet implemented'

    }))
}
exports.deleteTask = (req, res) => {
    res.end(JSON.stringify({
        message: 'not yet implemented'
        
    }))
}