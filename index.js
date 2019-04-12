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


const getData = async () => {
    try {
        const result = await fetch(`https://script.googleusercontent.com/macros/echo?user_content_key=adAPGf6PEivqPpn1IiOGQ4ReXlmr6SFVdriSCmB8bhHs60eEuHJW75MFpf3cqyTiOSpAQOuDYvq1l5auwJgNAgeZF-91yaRvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBOBjU-9TSGvuOhPqIMTJQKhc7LEJ9fQ02J1-OwLiR8vDgGkFwqf1OH7jbd34yzKwhdIug5zkO6q&lib=MsoO2fZ7GpcAvxSnFqDRWHzPTuxB3ZxFA`);
        const data = await result.json();

        userID = document.querySelector('.search_input').value;
        data.result.forEach(e => {
            results.push(new Client(e[0], e[2], e[3], e[4], e[5], e[6], e[7], e[10], e[11], e[12]));
        }); 
        renderSearch(userID);

    } catch(error) {
        alert(`Такого ID не сущетсвует. ID: ${userID}`);
    }
};

document.querySelector('.search_button').addEventListener('click', e => {    
    getData();
});

let userID;

const renderSearch = param => {
    const currentResult = results.find(cur => cur.id == param);
    document.querySelector('.search_results').innerHTML = `
        <ul>
            <li>Номер заказа (id): ${currentResult.id}</li>
            <li>Клиент: ${currentResult.name}</li>
            <li>Принят в сервис: ${currentResult.dateIn}</li>
            <li>Тип услуги: ${currentResult.type}</li>
            <li>Модель техники: ${currentResult.model}</li>
            <li>Описание неисправности: ${currentResult.descr}</li>
            <li>Выполненные работы: ${currentResult.work}</li>
            <li>Дата выдачи: ${currentResult.dateOut}</li>
            <li>Статус: ${currentResult.status}</li>
        </ul>
    `;
};