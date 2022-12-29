// const url = 'https://nodejs-mysql-restapi-production-a396.up.railway.app/api/employees'
const url = 'https://nodejs-emp-rest-api.onrender.com/api/employees'
const reloadUrl = 'https://nodejs-emp-rest-api.onrender.com/api/reload'


// GET ALL EMPLOYEES

const allEmployees_btn = document.getElementById('allEmployees_btn')
// Las etiquetas de respuesta tienen 'display: block'
const allEmployees_res = document.getElementById('allEmployees_res')
// Las etiquetas de loader tienen 'display: flex'
const allEmployees_loader = document.getElementById('allEmployees_loader')

allEmployees_btn.addEventListener('click', () => {
    allEmployees_res.style.display = 'none'
    allEmployees_loader.style.display = 'flex'

    axios.get(url)
        .then(response => {
            let employees = response.data;

            let ulElem = document.createElement('ul');

            employees.forEach(employee => {
                let liElem = document.createElement('li')
                liElem.appendChild(document.createTextNode(`Id: ${employee.id} | Name: ${employee.name} | Email: ${employee.email} | Salary: ${employee.salary}`))
                ulElem.appendChild(liElem)
            });

            allEmployees_res.innerHTML = ''
            allEmployees_res.appendChild(ulElem)

            setTimeout(() => {
                allEmployees_loader.style.display = 'none'
                allEmployees_res.style.display = 'block'
            }, 1500);
            
        })
        .catch(error => {
            allEmployees_res.innerHTML = ''
            allEmployees_res.appendChild(buildError(error.response.data))

            setTimeout(() => {
                allEmployees_loader.style.display = 'none'
                allEmployees_res.style.display = 'block'
            }, 1500);
        })
})


// GET ONE EMPLOYEE

const getEmployee_form = document.getElementById('getEmployee_form')
const getEmployee_res = document.getElementById('getEmployee_res')
const getEmployee_loader = document.getElementById('getEmployee_loader')

getEmployee_form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    evt.stopPropagation()

    getEmployee_res.style.display = 'none'
    getEmployee_loader.style.display = 'flex'

    let userId = document.getElementById('getEmployee_id').value

    axios.get(url + `/${userId}`)
        .then(response => {
            let h3Elem = document.createElement('h3')
            h3Elem.appendChild(document.createTextNode('Requested employee:'))

            let employee = response.data[0]
            let pElem = document.createElement('p')
            pElem.appendChild(document.createTextNode(`Id: ${employee.id} | Name: ${employee.name} | Email: ${employee.email} | Salary: $${employee.salary}`))

            getEmployee_res.innerHTML = ''
            getEmployee_res.appendChild(h3Elem)
            getEmployee_res.appendChild(pElem)

            setTimeout(() => {
                getEmployee_loader.style.display = 'none'
                getEmployee_res.style.display = 'block'
            }, 1500);

            getEmployee_form.reset()
        })
        .catch(error => {
            getEmployee_res.innerHTML = ''
            getEmployee_res.appendChild(buildError(error.response.data))

            setTimeout(() => {
                getEmployee_loader.style.display = 'none'
                getEmployee_res.style.display = 'block'
            }, 1500);
        })
})


// PUT AN EMPLOYEE

const postEmployee_form = document.getElementById('postEmployee_form')
const postEmployee_res = document.getElementById('postEmployee_res')
const postEmployee_loader = document.getElementById('postEmployee_loader')

postEmployee_form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    evt.stopPropagation()

    postEmployee_res.style.display = 'none'
    postEmployee_loader.style.display = 'flex'

    let values = {
        name: document.getElementById('postEmployee_name').value,
        email: document.getElementById('postEmployee_email').value,
        salary: document.getElementById('postEmployee_salary').value
    }
    
    let jsonValues = JSON.stringify(values)
    
    let axiosHeaders = {
        'Content-Type': 'application/json'
    }
    axios.post(url, jsonValues, {headers: axiosHeaders})
        .then(response => {
            let h3Elem = document.createElement('h3')
            h3Elem.appendChild(document.createTextNode('Added employee:'))

            let addedEmployee = response.data
            let pElem = document.createElement('p')
            pElem.appendChild(document.createTextNode(`Id: ${addedEmployee.id} | Name: ${addedEmployee.name} | Email: ${addedEmployee.email} | Salary: $${addedEmployee.salary}`))

            postEmployee_res.innerHTML = ''
            postEmployee_res.appendChild(h3Elem)
            postEmployee_res.appendChild(pElem)

            setTimeout(() => {
                postEmployee_loader.style.display = 'none'
                postEmployee_res.style.display = 'block'
            }, 1500);

            postEmployee_form.reset()
        })
        .catch(error => {
            postEmployee_res.innerHTML = ''
            postEmployee_res.appendChild(buildError(error.response.data))

            setTimeout(() => {
                postEmployee_loader.style.display = 'none'
                postEmployee_res.style.display = 'block'
            }, 1500);
        })
})


// UPDATE AN EMPLOYEE

const updateEmployee_form = document.getElementById('updateEmployee_form')
const updateEmployee_res = document.getElementById('updateEmployee_res')
const updateEmployee_loader = document.getElementById('updateEmployee_loader')

updateEmployee_form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    evt.stopPropagation()

    let updateEmployee_id = document.getElementById('updateEmployee_id').value
    let updateEmployee_name = document.getElementById('updateEmployee_name').value
    let updateEmployee_email = document.getElementById('updateEmployee_email').value
    let updateEmployee_salary = document.getElementById('updateEmployee_salary').value

    if (!updateEmployee_name && !updateEmployee_salary && !updateEmployee_email) {
        updateEmployee_res.innerHTML = ''
        updateEmployee_res.appendChild(buildError({message: `Put Name, Email or Salary to be updated for the user with id: ${updateEmployee_id}`}))
        return
    }

    updateEmployee_res.style.display = 'none'
    updateEmployee_loader.style.display = 'flex'

    let values = {
        name: updateEmployee_name ? updateEmployee_name : null,
        email: updateEmployee_email ? updateEmployee_email : null,
        salary: updateEmployee_salary ? updateEmployee_salary : null
    }

    let jsonValues = JSON.stringify(values)

    let axiosHeaders = {
        'Content-Type': 'application/json'
    }

    axios.patch(url + `/${updateEmployee_id}`, jsonValues, {headers: axiosHeaders})
        .then(response => {
            let h3Elem = document.createElement('h3')
            h3Elem.appendChild(document.createTextNode('Updated employee:'))

            let employee = response.data[0]
            let pElem = document.createElement('p')
            pElem.appendChild(document.createTextNode(`Id: ${employee.id} | Name: ${employee.name} | Email: ${employee.email} | Salary: $${employee.salary}`))

            updateEmployee_res.innerHTML = ''
            updateEmployee_res.appendChild(h3Elem)
            updateEmployee_res.appendChild(pElem)

            setTimeout(() => {
                updateEmployee_loader.style.display = 'none'
                updateEmployee_res.style.display = 'block'
            }, 1500);

            updateEmployee_form.reset()
        })
        .catch(error => {
            updateEmployee_res.innerHTML = ''
            updateEmployee_res.appendChild(buildError(error.response.data))

            setTimeout(() => {
                updateEmployee_loader.style.display = 'none'
                updateEmployee_res.style.display = 'block'
            }, 1500);
        })
})


// DELETE AN EMPLOYEE

const deleteEmployee_form = document.getElementById('deleteEmployee_form')
const deleteEmployee_res = document.getElementById('deleteEmployee_res')
const deleteEmployee_loader = document.getElementById('deleteEmployee_loader')

deleteEmployee_form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    evt.stopPropagation()

    deleteEmployee_res.style.display = 'none'
    deleteEmployee_loader.style.display = 'flex'

    let userId = document.getElementById('deleteEmployee_id').value

    axios.delete(url + `/${userId}`)
        .then(response => {
            let h3Elem = document.createElement('h3')
            h3Elem.appendChild(document.createTextNode('Deleted employee:'))

            let res = response.data
            let pElem = document.createElement('p')
            pElem.appendChild(document.createTextNode(`${res.message}`))

            deleteEmployee_res.innerHTML = ''
            deleteEmployee_res.appendChild(h3Elem)
            deleteEmployee_res.appendChild(pElem)

            setTimeout(() => {
                deleteEmployee_loader.style.display = 'none'
                deleteEmployee_res.style.display = 'block'
            }, 1500);

            deleteEmployee_form.reset()
        })
        .catch(error => {
            deleteEmployee_res.innerHTML = ''
            deleteEmployee_res.appendChild(buildError(error.response.data))

            setTimeout(() => {
                deleteEmployee_loader.style.display = 'none'
                deleteEmployee_res.style.display = 'block'
            }, 1500);
        })
})


// RELOAD EMPLOYEES

const reloadEmployees_btn = document.getElementById('reloadEmployees_btn')
const reloadEmployees_res = document.getElementById('reloadEmployees_res')
const reloadEmployees_loader = document.getElementById('reloadEmployees_loader')

reloadEmployees_btn.addEventListener('click', () => {
    reloadEmployees_res.style.display = 'none'
    reloadEmployees_loader.style.display = 'flex'

    axios.get(reloadUrl)
        .then(response => {
            let h3Elem = document.createElement('h3')
            h3Elem.appendChild(document.createTextNode('Response:'))

            let res = response.data
            let pElem = document.createElement('p')
            pElem.appendChild(document.createTextNode(`${res.message}`))

            reloadEmployees_res.innerHTML = ''
            reloadEmployees_res.appendChild(h3Elem)
            reloadEmployees_res.appendChild(pElem)

            setTimeout(() => {
                reloadEmployees_loader.style.display = 'none'
                reloadEmployees_res.style.display = 'block'
            }, 1500);
            
        })
        .catch(error => {
            reloadEmployees_res.innerHTML = ''
            reloadEmployees_res.appendChild(buildError(error.response.data))

            setTimeout(() => {
                reloadEmployees_loader.style.display = 'none'
                reloadEmployees_res.style.display = 'block'
            }, 1500);
        })
})


// UTILS --------------------------------------------------------------------------

const buildError = function (e) {
    let divElem = document.createElement('div')
    let pElem = document.createElement('p')
    pElem.appendChild(document.createTextNode('An error ocurred:'))
    let errElem = document.createElement('p')
    errElem.appendChild(document.createTextNode(e.message))
    divElem.appendChild(pElem)
    divElem.appendChild(errElem)
    
    return divElem
}