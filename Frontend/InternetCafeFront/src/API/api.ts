import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL='https://localhost:7223/';

const responseBody = (response: AxiosResponse)=> response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body : object) => axios.post(url, body).then(responseBody),
    put: (url: string, body : object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Cafe = {
    getCafes : () => requests.get('/GetCafes'),
    getEmployeesByCafe : (name : string) => requests.get(`/GetEmployeesByCafe/${name}`),
    addCafe : (name :string, address : string) => requests.post(`/AddCafe/${name}/${address}`, {}),
    addEmployee : (cafename :string, name : string, salary: number, age : number, email : string) => requests.post(`/AddEmployee/${cafename}/${name}/${salary}/${age}/${email}`, {}),
    deleteCafe : (name : string) =>requests.delete(`/DeleteCafe/${name}`)
}


const Employee = {
    editEmployeeSalary : (email :string, salary: number) => requests.put(`/EditEmployeeSalary/${email}/${salary}`, {}),
    deleteEmployee : (email : string) =>requests.delete(`/DeleteEmployee/${email}`)
}
const Category = {
    getCategories : () => requests.get('/GetCategories'),
    editCategory : (name : string, price : number) => requests.put(`/EditCategory/${name}/${price}`, {}),
    addCategory : (name :string, price : number) => requests.post(`/AddCategory/${name}/${price}`, {}),

}
const Member = {
    getMembers : () => requests.get('/GetMembers'),
    addMember : (username :string, password : string) => requests.post(`/RegisterMember/${username}/${password}`, {}),
    addCredits : (username :string, credits : number) => requests.put(`/AddCredits/${username}/${credits}`, {}),
    deleteMember : (username : string) =>requests.delete(`/DeleteMember/${username}`)
}


const api = {
    Cafe,
    Employee,
    Member,
    Category
}

export default api