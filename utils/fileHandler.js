const fs = require('fs');
const path = require('path')

const filePath = './data/tasks.json';

exports.writeTasksTofile = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))
}
exports.readTasksFromFile = () => {
    if(!fs.existsSync(filePath)) {
        this.writeTasksTofile([])
    }

    const data = fs.readFileSync(filePath);
    return JSON.parse(data)
}