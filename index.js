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

document.querySelector('.loader').style.display = 'none';
const getData = async () => {
    document.querySelector('.loader').style.display = 'block';
    document.querySelector('.search_results').innerHTML = '';
    try {
        const result = await fetch(`https://script.googleusercontent.com/macros/echo?user_content_key=adAPGf6PEivqPpn1IiOGQ4ReXlmr6SFVdriSCmB8bhHs60eEuHJW75MFpf3cqyTiOSpAQOuDYvq1l5auwJgNAgeZF-91yaRvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBOBjU-9TSGvuOhPqIMTJQKhc7LEJ9fQ02J1-OwLiR8vDgGkFwqf1OH7jbd34yzKwhdIug5zkO6q&lib=MsoO2fZ7GpcAvxSnFqDRWHzPTuxB3ZxFA`);
        const data = await result.json();        
        userID = document.querySelector('.search_input').value;

        data.result.forEach(e => {
            results.push(new Client(e[0], e[2], e[3], e[4], e[5], e[6], e[7], e[10], e[11], e[12]));
        });
         
        renderSearch(userID);
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('.search_input').value = '';

    } catch(error) {
        alert(`Такого ID не сущетсвует.`);
    }
};

document.querySelector('.search_button').addEventListener('click', e => {    
    getData();
});

let userID;

const renderSearch = param => {
    const currentResult = results.find(cur => cur.id == param);
    
    document.querySelector('.search_results').innerHTML = `
        <ul class="border">
            <li><span>Номер заказа:</span> <em>${currentResult.id}</em></li>
            <li><span>Принят в сервис:</span> <em>${formatDate(currentResult.dateIn)}</em></li>
            <li><span>Тип услуги:</span> <em>${currentResult.type}</em></li>
            <li><span>Модель техники:</span> <em>${currentResult.model}</em></li>
            <li><span>Описание неисправности:</span> <em>${currentResult.descr}</em></li>
            <li><span>Выполненные работы:</span> <em>${currentResult.work}</em></li>
            <li><span>Дата выдачи:</span> <em>${formatDate(currentResult.dateOut)}</em></li>
            <li><span>Статус:</span> <em>${currentResult.status}</em></li>
        </ul>
    `;
};

const formatDate = day => {
    const date = new Date(day); 
    if(day) return `${date.getDate()} ${date.toLocaleString('ru', {month: 'long'})} ${date.getFullYear()}`; 
    else return `неверная дата`;    
};
