/* Imports */
const fs = require('fs');

/* Controllers */
class Database {
    constructor (filename){
        this.filename = filename
    }
    async saveData(data){
        try{
            console.log(`${data} on db handler`); /** Tester **/
            let temp = JSON.stringify(data)
            // console.log(JSON.stringify(data))
            console.log(temp); /** Tester **/
            // let temp = 'otra prueba'
            await fs.promises.writeFile(this.filename, JSON.stringify(data));
            console.log('saved!');
        }
        catch(err){
            console.log(`Ups, not possible to execute writing ... Error: ${err}`);
            
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
            console.log(`Ups, file missed. Not possible to execute reading ... Error: ${err}`);
        }
    }
    async getAll() {
        try{
            let data = await fs.promises.readFile(this.filename, 'utf-8');

            if (data != ''){

                data = JSON.parse(data);
            }
            return data;
        }
        catch(err){
            console.log(`Ups, file missed. Not possible to execute reading ... Error: ${err}`);
            console.log(this.filename) /** Tester **/
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