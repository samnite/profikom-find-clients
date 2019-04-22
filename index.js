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

        data.result.forEach(e => {
            results.push(new Client(e[0], e[2], e[3], e[4], e[5], e[6], e[7], e[10], e[11], e[12]));
        });
         
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('.search').style.display = 'block';

    } catch(error) {
        errorMsg();
    }
};

window.addEventListener('load', () => {
    document.querySelector('.search').style.display = 'none';
    getData();       
});

document.querySelector('.search_button').addEventListener('click', e => {    
    prerenderResults();
});

document.querySelector('.search').addEventListener('keypress', e => {
    if (event.keyCode === 13 || event.which === 13) prerenderResults();
});

const prerenderResults = () => {
    const userID = document.querySelector('.search_input').value;
    renderSearch(userID);
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.search_input').value = '';
};

const renderSearch = param => {
    const currentResult = results.find(cur => cur.id == param);    
    console.log(currentResult);
    if (currentResult && currentResult.id) {
    document.querySelector('.search_results').innerHTML = `
        <ul class="border">
            <li><span>Номер заказа:</span> <em>${currentResult.id}</em><div style="clear: both;"></div></li>
            <li><span>Принят в сервис:</span> <em>${formatDate(currentResult.dateIn)}</em><div style="clear: both;"></div></li>
            <li><span>Тип услуги:</span> <em>${currentResult.type}</em><div style="clear: both;"></div></li>
            <li><span>Модель техники:</span> <em>${currentResult.model}</em><div style="clear: both;"></div></li>
            <li><span>Описание неисправности: </span><em> ${currentResult.descr}</em><div style="clear: both;"></div></li>
            <li><span>Выполненные работы:</span> <em>${currentResult.work}</em><div style="clear: both;"></div></li>
            <li><span>Дата выдачи:</span> <em>${formatDate(currentResult.dateOut)}</em><div style="clear: both;"></div></li>
            <li><span>Статус:</span> <em>${formatStatus(currentResult.status)}</em><div style="clear: both;"></div></li>
        </ul>
    `;
    } else errorMsg();
};

const formatDate = day => {
    const date = new Date(day); 
    const monthes = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    if (day) return `${date.getDate()} ${monthes[date.getMonth()]} ${date.getFullYear()}`; 
    else return ``;    
};

const formatStatus = status => {
    if (status == '') return `Заказ в работе`;
    else if (status == 'готово') return `Заказ готов к выдаче`;
    else if (status == 'готово/выдано') return `Заказ готов и выдан клиенту`;
    else if (status == 'возврат') return `Отказ, возвращен клиенту`;
};

const errorMsg = () => {
    alert(`Такого заказа не сущетсвует.`);
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.search_input').value = '';
    document.querySelector('.search_results').innerHTML = '';
}