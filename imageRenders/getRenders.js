const fs = require('fs');
const path = require('path');

module.exports = () => {
    // COLLECT FILES FROM SUB-DIRECTORIES   
    const baseFile = 'getRenders.js'

    var data = { };
    data.table = [ ]

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));        
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));

            if (stat.isDirectory()) {
                readCommands(path.join(dir,file));
            } else if (file !== baseFile) {
                
                const option = require(path.join(__dirname, dir, file));
                var obj = option;
                const newname = file.replace('.js','');
                data.table.push({'name': newname, func: obj[newname]});
            };
        };
    };

    readCommands('./');

    data.table.sort((a,b) => a.name.replace("v","") - b.name.replace("v",""))
    return data.table;
};