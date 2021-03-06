let totalTodo = 0 ;
let arrayList = [];
let numberItem = 0;
let selectShow = 'all';
const keyEnter = 13;
let select = document.getElementById("select-all");
select.addEventListener('click',selectAll);

function inputKeyPress(event){
    if((event.keyCode === keyEnter||event.which=== keyEnter) ){
        event.preventDefault();
        // create li
        createListItem();
        // select show for active, completed or all
        selectToShowList();
    }
}

function createListItem(){
    const valueInput = document.getElementById("input-todo").value;
        if(valueInput){
            const content = document.createTextNode(valueInput);
            const ul = document.getElementById("list-content");
            // create li
            const li = document.createElement("li");
            li.setAttribute("id","li-component");
            li.setAttribute("numberItem",numberItem);
            numberItem ++;
            // create icon
            createIconCheck(li);
            // create label
            const label = document.createElement("label");
            label.setAttribute("id","content-todo");
            label.appendChild(content);
            label.addEventListener('dblclick',editText);
            li.appendChild(label);
            // button
            createButtonDelete(li);
            // add li
            ul.appendChild(li);
            addList(numberItem-1,valueInput, false);
            // input ="" before add new todo
            document.getElementById("input-todo").value ="";
            totalTodo+=1;
            createItem();   
            totalItem(); 
        }
}

function createButtonDelete(li = {}){
    const button = document.createElement("button");
    button.setAttribute("id", "button");
    const node = document.createTextNode("X");
    button.appendChild(node);
    button.addEventListener('click',deleteTodo,false);
    li.appendChild(button);
}

function createIconCheck(li = {}){
    const i = document.createElement("i");
    i.setAttribute("class", "icon circle");
    i.addEventListener('click',onIconClick,false);
    li.appendChild(i);
}

function createItem(){
    if(totalTodo===1){  
        const ulOption = document.getElementById('option');
        // ulOption.appendChild(itemLeft);
        appendItemLeft(ulOption);
        appendButtonAll(ulOption);
        appendButtonClearAll(ulOption);
        appendButtonClearDone(ulOption);
        appendButtonActive(ulOption);
        appendButtonCompleted(ulOption);
    }
}

function appendButtonClearAll(ulOption = {}){
    const buttonClearAll = document.createElement('input');
    buttonClearAll.setAttribute("type", "button");
    buttonClearAll.setAttribute("value", "Clear All");
    buttonClearAll.setAttribute("class","button-option");
    buttonClearAll.addEventListener('click', deleteAll,false);
    ulOption.appendChild(buttonClearAll);
}

function appendButtonClearDone(ulOption = {}){
    const buttonClearDone = document.createElement('input');
    buttonClearDone.setAttribute("type", "button");
    buttonClearDone.setAttribute("value", "Clear Done");
    buttonClearDone.setAttribute("class","button-option");
    buttonClearDone.addEventListener('click', deleteDone, false);
    ulOption.appendChild(buttonClearDone);
}

function appendButtonActive(ulOption = {}){
    const buttonActive = document.createElement('input');
    buttonActive.setAttribute("type", "button");
    buttonActive.setAttribute("value", "Active");
    buttonActive.setAttribute("class","button-option");
    buttonActive.addEventListener('click', setActiveClick, false);
    ulOption.appendChild(buttonActive);
}

function appendButtonCompleted(ulOption = {}){
    const buttonCompleted = document.createElement('input');
    buttonCompleted.setAttribute("type", "button");
    buttonCompleted.setAttribute("value", "Completed");
    buttonCompleted.setAttribute("class","button-option");
    buttonCompleted.addEventListener('click',setCompletedClick , false);
    ulOption.appendChild(buttonCompleted);

}

function appendButtonAll(ulOption = {}){
    const buttonAll = document.createElement('input');
    buttonAll.setAttribute("type", "button");
    buttonAll.setAttribute("value", "All");
    buttonAll.setAttribute("class","button-option");
    buttonAll.addEventListener('click',showAll , false);
    ulOption.appendChild(buttonAll);
}

function appendItemLeft(ulOption = {}){
    const itemLeft = document.createElement('p');
    const textItemLeft = document.createTextNode("item left: "+totalTodo);
    itemLeft.setAttribute("id", "item-left");
    itemLeft.appendChild(textItemLeft);
    ulOption.appendChild(itemLeft);
}

function selectToShowList(){
    switch(selectShow){
        case 'all':{
            showAll();
            break;
        }
        case 'active':{
            hiddenItem();
            break;
        }
        case 'completed':{
            hiddenItem();
            break;
        }
    }
}

function onIconClick(e){
    // create icon complete and label   
    const iconComplete = document.createElement('i');
    iconComplete.setAttribute("class", "icon check-circle");
    iconComplete.addEventListener('click',onNextClick,false);

    const value = e.target.parentNode.querySelector("#content-todo").innerText;
    const content = document.createTextNode(value);

    const newLabel = document.createElement("label");
    newLabel.setAttribute("id","content-todo");
    newLabel.appendChild(content); 
    newLabel.setAttribute("class", "radioComplete");
    // replace icon uncomplete and label 
    e.target.parentElement.replaceChild(newLabel,e.target.parentNode.querySelector("#content-todo"));
    e.target.parentElement.replaceChild(iconComplete,e.target);
    
    totalItem();
    updateArrFull();
    selectToShowList();
}

function onNextClick(e){
    // create icon uncomplete and label
    const iconUnComplete = document.createElement('i');
    iconUnComplete.setAttribute("class", "icon circle");
    iconUnComplete.addEventListener('click',onIconClick,false);

    const value = e.target.parentNode.querySelector("#content-todo").innerText;
    const content = document.createTextNode(value);

    const label1 = document.createElement("label");
    label1.setAttribute("id","content-todo");
    label1.appendChild(content); 
    // replace icon complete and label
    e.target.parentElement.replaceChild(label1,e.target.parentNode.querySelector("#content-todo"));
    e.target.parentElement.replaceChild(iconUnComplete,e.target);

    totalItem();
    updateArrFull();
    selectToShowList();
}

function deleteTodo(e){
    e.target.parentElement.remove();
    totalTodo = totalTodo - 1;
    if(totalTodo<=0){
        deleteOption();
    }
    totalItem();
    updateArrFull();
}

function deleteAll(){
    arrayList=[];
    totalTodo =0;
    let list = document.getElementById('list-content').querySelectorAll(".icon");
    list.forEach(element => {
        element.parentElement.remove();
    });
    deleteOption();
    totalItem();
}

function deleteDone(){
    let list = document.getElementById('list-content').querySelectorAll(".icon");
    list.forEach(element => {
        if(element.getAttribute("class")==="icon check-circle"){
            element.parentElement.remove();
            totalTodo = totalTodo -1;
            totalItem();
        }
    });
    if(totalTodo<=0){
        deleteOption();
    }
    updateArrFull();
}

function deleteOption(){
    const ulOption = document.getElementById('option').querySelectorAll(".button-option");
    ulOption.forEach(element=>{
        element.remove();
    })
}

function totalItem(){
    let i = document.querySelectorAll("i");
    let itemleft =0;
    i.forEach(element => {
        if(element.getAttribute("class")==="icon circle"){
            itemleft ++;
        }
    });

    const itemLeft = document.getElementById('item-left');
    const newItemLeft = document.createElement('p');
    const textItemLeft = document.createTextNode("item left : "+itemleft);
    newItemLeft.setAttribute("id", "item-left");
    newItemLeft.appendChild(textItemLeft);
    if(totalTodo>0){
        itemLeft.parentElement.replaceChild(newItemLeft, itemLeft);
    }
    else {
        const itemLeft = document.getElementById('item-left');
        itemLeft.remove();
        deleteOption();
    }
    
}

function addList(id, text, status){
    arrayList.push({ id, text, status});
}

function selectAll(){
    let li = document.querySelectorAll("#li-component");
    let countCompleted=0;
    li.forEach(element => {
        if(element.children[0].getAttribute('class')==='icon check-circle'){
            countCompleted++;
        }
    });
    if(countCompleted===(li.length)){
        li.forEach(element => {
            if(element.children[0].getAttribute('class') === 'icon check-circle'){
                element.children[0].removeAttribute('class');
                element.children[1].removeAttribute('class');
                element.children[0].setAttribute('class','icon circle');
            }
        });
    }else{
        li.forEach(element => {
            if(element.children[0].getAttribute('class') === 'icon circle'){
                element.children[1].setAttribute("class","radioComplete");
                element.children[0].removeAttribute('class');
                element.children[0].setAttribute("class","icon check-circle");
            }
        });
    }
   updateArrFull();
   totalItem();
}

function setActiveClick(){
    showAll();
    selectShow = 'active';
    hiddenItem();
}

function setCompletedClick(){
    showAll();
    selectShow ='completed';
    hiddenItem();
}

function hiddenItem(){
    let li = document.querySelectorAll('#li-component');
    console.log(selectShow);
    li.forEach(element => {
        if((element.children[0].getAttribute("class") === "icon check-circle" && selectShow==="active") || 
        (element.children[0].getAttribute("class") === "icon circle" && selectShow ==="completed")){
            element.style.height = 0;
            element.style.border = 'none';
            element.children[0].setAttribute("hidden","");
            element.children[1].setAttribute("hidden","");
            element.children[2].setAttribute("hidden","");
        } 
    });
}

function showAll(){
    selectShow='all';
    let li = document.querySelectorAll('#li-component');
    li.forEach(element=>{
        element.removeAttribute("style");
        element.children[0].removeAttribute("hidden");
        element.children[1].removeAttribute("hidden");
        element.children[2].removeAttribute("hidden");
    });
}

function editText(event){
    const valueContent = event.target.innerText;
    let input = document.createElement('input');
    input.setAttribute("value",valueContent);
    input.setAttribute("autofocus","");
    input.setAttribute("autocomplete","off");
    input.setAttribute('class', 'text-edit');
    input.addEventListener('change',onChangeContent);
    event.target.parentElement.replaceChild(input, event.target);
}

function onChangeContent(event){
    let contentEdit = String(event.target.value);
    if(!contentEdit){
        event.target.parentElement.remove();
        totalTodo = totalTodo-1;
        totalItem();
    }else{
        let content = document.createTextNode(contentEdit);
        let label = document.createElement('lable');
        label.setAttribute("id","content-todo");
        label.appendChild(content);
        label.addEventListener('dblclick',editText);
        event.target.parentElement.replaceChild(label, event.target);
    }
    updateArrFull();
}

function updateArrFull (){
    let li = document.querySelectorAll('li');
    arrayList=[];
    for(let i=0; i<li.length;i++){
        if(li[i].children[0].getAttribute('class')==='icon circle')
        arrayList[i]={
            id: i,
            text: li[i].children[1].innerText,
            status: false
        }
        else
            arrayList[i]={
            id: i,
            text: li[i].children[1].innerText,
            status: true
        }
    }
}