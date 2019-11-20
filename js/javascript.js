let totalTodo = 0 ;
let arrayList = [];
let numberItem = 0;
let selectShow = 'all';
let select = document.getElementById("select-all");
select.addEventListener('click',selectAll);

function inputKeyPress(event){
    if((event.keyCode ==13||event.which==13) ){
        event.preventDefault();
        // create li
        const valueInput = document.getElementById("input-todo").value;
        if(valueInput){
            const content = document.createTextNode(valueInput);
            const ul = document.getElementById("list-content");
            const li = document.createElement("li");
            li.setAttribute("id","li-component");
            li.setAttribute("numberItem",numberItem);
            numberItem ++;
            // create icon
            const i = document.createElement("i");
            i.setAttribute("class", "icon circle");
            i.addEventListener('click',onIconClick,false);
            li.appendChild(i);
            // create label
            const label = document.createElement("label");
            label.setAttribute("id","content-todo");
            label.appendChild(content);
            label.addEventListener('dblclick',editText);
            li.appendChild(label);
            // button
            const button = document.createElement("button");
            button.setAttribute("id", "button");
            const node = document.createTextNode("X");
            button.appendChild(node);
            button.addEventListener('click',deleteTodo,false);
            li.appendChild(button);

            ul.appendChild(li);

            addList(numberItem-1,valueInput, false);
            // input ="" before add new todo
            document.getElementById("input-todo").value ="";
            totalTodo+=1;
            // create option if alive todo
            if(totalTodo==1){  
                const ulOption = document.getElementById('option');
                const buttonClearAll = document.createElement('input');
                buttonClearAll.setAttribute("type", "button");
                buttonClearAll.setAttribute("value", "Clear All");
                buttonClearAll.setAttribute("class","button-option");
                buttonClearAll.addEventListener('click', deleteAll,false);
        
                const buttonClearDone = document.createElement('input');
                buttonClearDone.setAttribute("type", "button");
                buttonClearDone.setAttribute("value", "Clear Done");
                buttonClearDone.setAttribute("class","button-option");
                buttonClearDone.addEventListener('click', deleteDone, false);
                
                const itemLeft = document.createElement('p');
                const textItemLeft = document.createTextNode("item left: "+totalTodo);
                itemLeft.setAttribute("id", "total-item");
                itemLeft.appendChild(textItemLeft);

                const buttonActive = document.createElement('input');
                buttonActive.setAttribute("type", "button");
                buttonActive.setAttribute("value", "Active");
                buttonActive.setAttribute("class","button-option");
                buttonActive.addEventListener('click', hiddenCompletedItem, false);
                
                const buttonCompleted = document.createElement('input');
                buttonCompleted.setAttribute("type", "button");
                buttonCompleted.setAttribute("value", "Completed");
                buttonCompleted.setAttribute("class","button-option");
                buttonCompleted.addEventListener('click',hiddenActiveItem , false);

                const buttonAll = document.createElement('input');
                buttonAll.setAttribute("type", "button");
                buttonAll.setAttribute("value", "All");
                buttonAll.setAttribute("class","button-option");
                buttonAll.addEventListener('click',showAll , false);

                ulOption.appendChild(itemLeft);
                ulOption.appendChild(buttonClearAll);
                ulOption.appendChild(buttonClearDone); 
                ulOption.appendChild(buttonActive);
                ulOption.appendChild(buttonCompleted);
                ulOption.appendChild(buttonAll);    
            }
            totalItem(); 
        }
        // select show for active, completed or all
        if(selectShow==='all'){
            showAll();
        }
        if(selectShow==='active'){
            hiddenCompletedItem();
        }
        if(selectShow==='completed'){
            hiddenActiveItem();
        }
                
    }
}

function onIconClick(e){
    // create icon complete and label
    arrayUpdateCheckCompleteItem(e.target.parentElement.getAttribute('numberItem'));
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
}

function onNextClick(e){
    // create icon uncomplete and label
    arrayUpdateCheckCompleteItem(e.target.parentElement.getAttribute('numberItem'));
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
    
}

function deleteTodo(e){
    arrayUpdateDeleteItem(e.target.parentElement.getAttribute('numberItem'));
    e.target.parentElement.remove();
    totalTodo = totalTodo - 1;
    if(totalTodo<=0){
        deleteOption();
    }
    totalItem();
}

function deleteAll(){
    arrayUpdateDeleteAllItem();
    let list = document.getElementById('list-content').querySelectorAll(".icon");
    list.forEach(element => {
        if(element.getAttribute("class")==="icon check-circle"||element.getAttribute("class")==="icon circle")
        element.parentElement.remove();
    });
    deleteOption();
    
}

function deleteDone(){
    arrayUpdateDeleteCompletedItem();
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
    
}

function deleteOption(){
    const ulOption = document.getElementById('option').querySelectorAll(".button-option");
    ulOption.forEach(element=>{
        element.remove();
    })
    const itemLeft = document.getElementById('total-item');
    itemLeft.remove();
    totalTodo =  0;
}

function totalItem(){
    const itemLeft = document.getElementById('total-item');
    const newItemLeft = document.createElement('p');
    const textItemLeft = document.createTextNode("item left : "+totalTodo);
    newItemLeft.setAttribute("id", "total-item");
    newItemLeft.appendChild(textItemLeft);
    if(totalTodo>0)
    itemLeft.parentElement.replaceChild(newItemLeft, itemLeft);
}

function addList(id, text, status){
    arrayList.push({ id, text, status});
}

function arrayUpdateDeleteItem(numberItem){
    for(let i=0; i<arrayList.length; i++){
        if(arrayList[i].id == numberItem){
            arrayList.splice(i,1);
        }
    } 
}

function arrayUpdateDeleteAllItem(){
    arrayList.splice(0,arrayList.length);
}

function arrayUpdateDeleteCompletedItem(){
    arrayList = arrayList.filter(function(element){
        return element.status===false;
    })
}

function arrayUpdateCheckCompleteItem(id){
    arrayList.forEach(element => {
        if(element.id == id){
            element.status = !element.status;
        }
    });
    
}

function selectAll(){
    let li = document.querySelectorAll("#li-component");
    let countCompleted=0;
    li.forEach(element => {
        if(element.children[0].getAttribute('class')==='icon check-circle'){
            countCompleted++;
        }
    });
    if(countCompleted==(li.length)){
        li.forEach(element => {
            if(element.children[0].getAttribute('class') == 'icon check-circle'){
                element.children[0].removeAttribute('class');
                element.children[1].removeAttribute('class');
                element.children[0].setAttribute('class','icon circle');
            }
        });
    }else{
        li.forEach(element => {
            if(element.children[0].getAttribute('class') == 'icon circle'){
                element.children[1].setAttribute("class","radioComplete");
                element.children[0].removeAttribute('class');
                element.children[0].setAttribute("class","icon check-circle");
            }
        });
    }
    // cap nhat array
   li.forEach(element => {
       arrayList.forEach(value => {
           if(element.getAttribute('numberItem') ==value.id){
              if(element.children[0].getAttribute('class') == 'icon check-circle'){
                  value.status = true;
              }else{
                  value.status = false;
              }
           }
       });
   });
}

function hiddenCompletedItem(){
    showAll();
    selectShow='active';
    let li = document.querySelectorAll('#li-component');
    li.forEach(element => {
        if(element.children[0].getAttribute("class") == "icon check-circle"){
            element.style.height = 0;
            element.style.border = 'none';
            element.children[0].setAttribute("hidden","");
            element.children[1].setAttribute("hidden","");
            element.children[2].setAttribute("hidden","");
        } 
    });
}

function hiddenActiveItem(){
    showAll();
    selectShow='completed';
    let li = document.querySelectorAll('#li-component');
    li.forEach(element => {
        if(element.children[0].getAttribute("class") == "icon circle"){
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
    if(contentEdit===''){
        event.target.parentElement.remove();
        updateArrFull();
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
    console.log(li.length);
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