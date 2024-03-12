


const validarFormulario = () => {

    //obtener los valores

    let email = document.getElementById('inputEmail').value;
    let name = document.getElementById('inputName').value;
    let phone = document.getElementById('inputPhone').value;
    let ciudad = document.getElementById('inputCiudad').value;
    //validar 
    if (email == "") {
        alert("El correo es obligatorio");
        return false;
    } else if (!email.includes("@")) {
        alert("Correo Invalido");
        return false;
    }
    if (name == "") {
        alert("El nombre es obligatorio");
        return false;
    }
    if (phone == "") {
        alert("El teléfono es obligatorio");
        return false;
    }
    if (ciudad == "") {
        alert("La ciudad es obligatoria");
        return false;
    }


    //Si pasa todo
    return true;
}

const addData = () => {

    if (validarFormulario() == true) {
        //obtener los valores

        let email = document.getElementById('inputEmail').value;
        let name = document.getElementById('inputName').value;
        let phone = document.getElementById('inputPhone').value;
        let ciudad = document.getElementById('inputCiudad').value;

        let listPeople;
        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }
        listPeople.push({
            email: email,
            name: name,
            phone: phone,
            ciudad: ciudad
        })
        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        showData();
        document.getElementById('inputEmail').value = "";
        document.getElementById('inputName').value = "";
        document.getElementById('inputPhone').value = "";
        document.getElementById('inputCiudad').value = "";

    }
}


const showData = () => {
    let listPeople;

    if (localStorage.getItem('listPeople') === null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    let html = ""

    listPeople.forEach(function (element, index) {
        html += '<tr>';
        html += '<td>' + element.email + '</td>';
        html += '<td>' + element.name + '</td>';
        html += '<td>' + element.phone + '</td>';
        html += '<td>' + element.ciudad + '</td>';
        html += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar dato</button> <button onclick="updateData('+ index +')" class="btn btn-warning">Editar dato</button></td>';
        html += '</tr>';
    });

    document.querySelector('#tableData tbody').innerHTML = html;

}
document.onload=showData();

const updateData = (index) => {
    //Cambiar visibilidad
    document.getElementById("btnAdd").style.display = 'none';  //escondo agregar

    document.getElementById("btnUpdate").style.display = 'block';

    let listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    //rellenar los campos

    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputPhone').value = listPeople[index].phone;
    document.getElementById('inputCiudad').value = listPeople[index].ciudad;

    //Actualizar datos
    document.querySelector("#btnUpdate").onclick = function () {
        if (validarFormulario() == true) {
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;
            listPeople[index].ciudad = document.getElementById('inputCiudad').value;

            //guardar lista actualizada
            localStorage.setItem('listPeople', JSON.stringify(listPeople));

            //mostrar la data
            showData();

            document.getElementById('inputEmail').value = "";
            document.getElementById('inputName').value = "";
            document.getElementById('inputPhone').value = "";
            document.getElementById('inputCiudad').value = "";

            //cambiar la visibilidad de los botones

            document.getElementById("btnAdd").style.display = 'block';
            document.getElementById("btnUpdate").style.display = 'none';
        }
    }

    
}
const deleteData=(index)=>{
    let listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }
    listPeople.splice(index, 1);
    localStorage.setItem('listPeople',JSON.stringify(listPeople));
    showData();
}