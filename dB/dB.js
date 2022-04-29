/* Imports */
const fs = require('fs');

/* Controllers */
class Database {
    constructor (filename){
        this.filename = filename
    }
    async saveData(data){
        try{
            let temp = JSON.stringify(data)
            // console.log(JSON.stringify(data))
            console.log(temp);
            // let temp = 'otra prueba'
            await fs.promises.writeFile(this.filename, JSON.stringify(data));
            console.log('saved!');
        }
        catch(err){
            console.log(JSON.stringify(data));
            console.log(`Ups, file missed ... Error: ${err}`);
            
        }
    }
    async getById(id){
        try{
            let data = await fs.promises.readFile(this.fileName, 'utf-8');
            let dataStrg = JSON.stringify(data);
            for (const product of dataStrg) {
                if (id === product.id){
                    console.log(product);
                }
            }
        }
        catch(err){
            console.log(`Ups, file missed ... Error: ${err}`);
        }
    }
    async getAll() {
        try{
            let data = await fs.promises.readFile(this.filename, 'utf-8');

            if (data != ''){

                data = JSON.parse(data);
            }
            // console.log(dataStrg);
            return data;
        }
        catch(err){
            console.log(`Ups, file missed ... Error: ${err}`);
            console.log(this.filename)
        }
        
    }
    async deleteById(id){
        try{
            let data = await fs.promises.readFile(this.fileName, 'utf-8');
            let dataStrg = JSON.stringify(data);
            for (const product of dataStrg) {
                if (id === product.id){
                    let trash = dataStrg.splice(id,1);
                    console.log(`product eliminated`);
                }
            }
        }
        catch(err){
            console.log(`Ups, file missed ... Error: ${err}`);
        }

    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.fileName, '[]');
            console.log('boom !');
        }
        catch(err){
            console.log(`Ups, file missed ... Error: ${err}`);
        }
    }
}
/* Export */
module.exports = Database;