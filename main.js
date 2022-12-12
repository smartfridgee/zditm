let stop_list = [
    { "id": "11535", "name": "Plac Rodła 86" },
    { "id": "11542", "name": "Plac Rodła 5/11" },
    { "id": "13211", "name": "Parkowa 5/11" },
    { "id": "34712", "name": "Osiedle Kaliny 86" },
];

const link = "https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,tablica,slupek,";

function loadStops() {
    let selects = document.querySelectorAll('select');
    selects.forEach((el, i) => {
        if(localStorage.getItem(`rj${i+1}`)) {
            let stop = document.getElementById(`rj${i+1}`);
            let number = localStorage.getItem(`rj${i+1}`);
            stop.src = link + number
            stop.dataset.stop = number;
        }
        if(localStorage.getItem("stops")) {
            stop_list = JSON.parse(localStorage.getItem("stops"));
        }
        el.innerHTML = "";
        stop_list.forEach(stop => {
            let option = document.createElement('option');
            option.value = stop.id;
            option.textContent = `${stop.name} (${stop.id})`;
            
            if(stop.id == document.getElementById(`rj${i+1}`).dataset.stop) { option.selected = true };
            el.appendChild(option);
        })
    })
}

function changeStop(event, num) {
    document.getElementById(`rj${num}`).src = link + event.currentTarget.value;
    localStorage.setItem(`rj${num}`, event.currentTarget.value);
}

function addNewStop() {
    let n_num = document.getElementById('new_number').value;
    let n_name = document.getElementById('new_name').value;
    stop_list.push({ "id": n_num, "name": n_name });
    localStorage.setItem("stops", JSON.stringify(stop_list));
    loadStops();
}

function deleteStop() {
    let d_num = document.getElementById('del_number').value;
    stop_list.splice(stop_list.indexOf(stop_list.find(el => el.id == d_num)), 1);
    localStorage.setItem("stops", JSON.stringify(stop_list));
    loadStops();
}

function clearData() {
    localStorage.removeItem("rj1");
    localStorage.removeItem("rj2");
    localStorage.removeItem("stops");
    window.localStorage.clear();
    window.location.reload(true);
}

window.onload = loadStops;