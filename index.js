const results= [];
class Client {
    constructor (id, dateIn, type, model, descr, tel, name, work, dateOut, status) {
        this.id = id;
        this.dateIn = dateIn;
        this.type = type;
        this.model = model;
        this.descr = descr;
        this.tel = tel;
        this.name = name;
        this.work = work;
        this.dateOut = dateOut;
        this.status = status;
    }
}

async function getData() {
    try {
        const result = await fetch(`https://script.googleusercontent.com/macros/echo?user_content_key=adAPGf6PEivqPpn1IiOGQ4ReXlmr6SFVdriSCmB8bhHs60eEuHJW75MFpf3cqyTiOSpAQOuDYvq1l5auwJgNAgeZF-91yaRvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBOBjU-9TSGvuOhPqIMTJQKhc7LEJ9fQ02J1-OwLiR8vDgGkFwqf1OH7jbd34yzKwhdIug5zkO6q&lib=MsoO2fZ7GpcAvxSnFqDRWHzPTuxB3ZxFA`);
        const data = await result.json();
        
        data.result.forEach(e => {
            results.push(new Client(e[0], e[2], e[3], e[4], e[5], e[6], e[7], e[10], e[11], e[12]));
        }); 
        
        const renderSearch = param => {
            console.log(`
            ID: ${results.find(cur => cur.id == param).id}            
            Имя: ${results.find(cur => cur.id == param).name}            
            Дата приемки: ${results.find(cur => cur.id == param).dateIn}            
            Тип услуги: ${results.find(cur => cur.id == param).type}            
            Модель: ${results.find(cur => cur.id == param).model}            
            Описание неисправности: ${results.find(cur => cur.id == param).descr}            
            Выполненные работы: ${results.find(cur => cur.id == param).work}            
            Дата выдачи: ${results.find(cur => cur.id == param).dateOut}            
            Статус: ${results.find(cur => cur.id == param).status}            
            `);
        }
        renderSearch(2894);

    } catch(error) {
        console.log(error);
    }
}
getData();

