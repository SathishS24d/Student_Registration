// a function which render all registerd student
const renderAllStudent = () => {
    const student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];//store localstorage data if exist 
    const studentCtn = document.querySelector("#stdCtn");
    studentCtn.innerHTML = '';
    student.map((std) => {
    const article = document.createElement("article");
    article.classList.add(
        "bg-white", "rounded-xl", "shadow-md", "overflow-hidden",
        "hover:shadow-lg", "transition-all", "duration-300",
        "transform", "hover:-translate-y-1", "border", "border-gray-100",
        "flex", "flex-col", "justify-between"
    );
    
    article.innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-900">${std.name}</h3>
                    <span class="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mt-1">
                        ID: ${std.id}
                    </span>
                </div>
                <button onclick="editOpen(${std.id})" class="text-indigo-600 hover:text-indigo-900 transition-colors">
                    <i class="fas fa-pencil-alt"></i>
                </button>
            </div>
            
            <div class="space-y-3 text-gray-700">
                <div class="flex items-center">
                    <i class="fas fa-envelope text-indigo-500 w-5 mr-2"></i>
                    <span>${std.email}</span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-phone-alt text-indigo-500 w-5 mr-2"></i>
                    <span>${std.contact}</span>
                </div>
            </div>
        </div>
        
        <div class="bg-gray-50 px-6 py-3 flex justify-end">
            <button onclick="removeStudent(${std.id})" class="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
                <i class="fas fa-trash-alt mr-2"></i>
                Remove
            </button>
        </div>
    `;
    
    studentCtn.append(article);
});
}
renderAllStudent();

// a function which call when registration form will be submit
const registrantion = (e) => {
    e.preventDefault(); //to ensure that form should submit here


    //collect all input's value  of registration form
    const name = document.querySelector('#name')
    const studentId = document.querySelector('#studentId')
    const email = document.querySelector('#email')
    const contactNo = document.querySelector('#contactNo')
    const validMsg = document.querySelectorAll('.validMsg') //this is that where your validation error should display

    //validate input feilds
    if (name.value.length <= 3) {
        console.log(validMsg)
        validMsg[0].innerHTML = "minimum 3 charater are required";
        return;
    }

    if (studentId.value <= 0) {
        validMsg[0].innerHTML = '';
        validMsg[1].innerHTML = "Id should be greater than 0";
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        validMsg[1].innerHTML = '';
        validMsg[2].innerHTML = 'email should contain altleast 1 charetor,@,. like v@gmail.com'
        return;
    }
    if (contactNo.value.length != 10) {
        validMsg[2].innerHTML = '';
        validMsg[3].innerHTML = "contact no's length should be 10"
        return;
    }
    const student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];
    //prevent to duplicate student registration
    for (let i = 0; i < student.length; i++) {

        if (student[i].id == studentId.value) {
            alert(`student  already registered with ${studentId.value} id `)
            return;
        } else if (student[i].email == email.value) {
            alert(`student already registerd with ${email.value} email`)
            return;
        } else if (student[i].contact == contactNo.value) {
            alert(`student already registed with ${contactNo.value} contact no`);
            return;
        }
    }

    student.push({ name: name.value, id: studentId.value, email: email.value, contact: contactNo.value });
    localStorage.setItem("student", JSON.stringify(student)); //update updated data in localstorage
    name.value = "";
    studentId.value = ""
    email.value = ""
    contactNo.value = ""
    alert("Registration successfully");
    renderAllStudent();

}
//open edit section
const editOpen = (id) => {
    const student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];
    const [editStudent] = student.filter((std) => std.id == id);
   
    const stdName = document.querySelector('#name-edit')
    const studentId = document.querySelector('#studentId-edit')
    const stdEmail = document.querySelector('#email-edit')
    const contactNo = document.querySelector('#contactNo-edit')
   
    stdName.value = editStudent.name;
    studentId.value = editStudent.id;
    stdEmail.value = editStudent.email;
    contactNo.value = editStudent.contact
    const editSection = document.querySelector("#editSection")
    editSection.classList.remove("scale-0");
    console.log("hello world")

}

//save edited data
const editStudent = (e) => {
    e.preventDefault();
    const stdName = document.querySelector('#name-edit')
    const studentId = document.querySelector('#studentId-edit')
    const stdEmail = document.querySelector('#email-edit')
    const contactNo = document.querySelector('#contactNo-edit')
    const validMsg = document.querySelectorAll('.edit-validMsg')

      //validate input feilds
    
      if (stdName.value.length <= 3) {
        console.log("name validate")
        validMsg[0].innerHTML = "minimum 3 charater are required";
        return;
    }
    console.log("name validate")
    if (studentId.value <= 0) {
        validMsg[0].innerHTML = '';
        validMsg[1].innerHTML = "Id should be greater than 0";
        return;
    }
    console.log("id validate")
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(stdEmail.value)) {
        validMsg[1].innerHTML = '';
        validMsg[2].innerHTML = 'email should contain altleast 1 charetor,@,. like v@gmail.com'
        return;
    }
    console.log("email validate")
    if (contactNo.value.length != 10) {
        validMsg[2].innerHTML = '';
        validMsg[3].innerHTML = "contact no's length should be 10"
        return;
    }
    console.log("contact validate")
    const editObj = { name: stdName.value, id: studentId.value, email: stdEmail.value, contact: contactNo.value };
    const student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];
    const newArr = student.map((std) => {
        if (std.id == studentId.value) {
            std = editObj;
        }
        return std;
    })
    localStorage.setItem("student", JSON.stringify(newArr));
    const editSection = document.querySelector("#editSection")
    editSection.classList.add("scale-0")
    renderAllStudent();
}

//close edit section
const closeEdit = () => {
    const editSection = document.querySelector("#editSection")
    editSection.classList.add("scale-0")
}



//remove student
const removeStudent = (id) => {
    const student = JSON.parse(localStorage.getItem("student"));
    const newArr = student.filter((std) => std.id != id);
    localStorage.setItem("student", JSON.stringify(newArr));
    renderAllStudent();
}