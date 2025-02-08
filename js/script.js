const apiurl = 'http://127.0.0.1:70/api';

const serialize = (data) => {
    let obj = {};

    for(let [key, value] of data){
        if(obj[key] !== undefined){
            if(!Array.isArray(obj[key])){
                obj[key] = [obj[key]];
            }
            obj[key].push(value);
        }else{
            obj[key] = value;
        }
    }
    return obj;
}

async function loadCombo(type, element){
    await axios.get(http+`/options/${type}`)
    .then(response => {
        const res = response.data;

        const resKeys = Object.keys(res.result);
        console.log(resKeys);
        let option = '';

        for(const prop in res.result){
            option +=  `<option value="${prop}">${res.result[prop]}</option>`;
            // console.log(`${prop} - ${res.result[prop]}`);
        }
        document.getElementById(element).innerHTML = option;
    })
    .catch(error => console.error(error))
}

window.onload = () => {
    // get_data();
    const navLink = document.querySelectorAll('.nav-link');
    navLink.forEach((el) => {
        el.addEventListener('click', (e) => {
            for(let i = 0; i < navLink.length; i++){
                navLink[i].classList.remove('active');
            }
            el.classList.add('active');
        });
    });

    document.getElementById('btn_submit').addEventListener('click', (e) => {
        e.preventDefault();
        let data = new FormData(document.querySelector('#frm_cantact'));

        let formObj = serialize(data);
        
        axios.post(apiurl+'/MasterData', formObj)
        .then(response => {
            const res = response.data.result;
        })
    });
}