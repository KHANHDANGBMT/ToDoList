let totalTodo = 0 ;
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
            // create icon
            const i = document.createElement("i");
            i.setAttribute("class", "far fa-circle");
            i.addEventListener('click',onIconClick,false);
            li.appendChild(i);
            // create label
            const label = document.createElement("label");
            label.setAttribute("id","content-todo");
            label.appendChild(content);
            li.appendChild(label);
            // button
            const button = document.createElement("button");
            button.setAttribute("id", "button");
            const node = document.createTextNode("X");
            button.appendChild(node);
            button.addEventListener('click',deleteTodo,false);
            li.appendChild(button);
            ul.appendChild(li);
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
                const textItemLeft = document.createTextNode("Total Item : "+totalTodo);
                itemLeft.setAttribute("id", "total-item");
                itemLeft.appendChild(textItemLeft);


                ulOption.appendChild(itemLeft);
                ulOption.appendChild(buttonClearAll);
                ulOption.appendChild(buttonClearDone); 
            }
            totalItem();
        }
                
    }
}

function onIconClick(e){
    // create icon complete and label
    const iconComplete = document.createElement('i');
    iconComplete.setAttribute("class", "far fa-check-circle");
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
    const iconUnComplete = document.createElement('i');
    iconUnComplete.setAttribute("class", "far fa-circle");
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
    e.target.parentElement.remove();
    totalTodo = totalTodo - 1;
    if(totalTodo<=0){
        deleteOption();
    }
    totalItem();
}

function deleteAll(){
    let list = document.getElementById('list-content').querySelectorAll(".far");
    list.forEach(element => {
        if(element.getAttribute("class")==="far fa-check-circle"||element.getAttribute("class")==="far fa-circle")
        element.parentElement.remove();
        console.log("djasfsdaf");
    });
    deleteOption();
    
}

function deleteDone(){
    let list = document.getElementById('list-content').querySelectorAll(".far");
    list.forEach(element => {
        if(element.getAttribute("class")==="far fa-check-circle"){
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
    const textItemLeft = document.createTextNode("Total Item : "+totalTodo);
    newItemLeft.setAttribute("id", "total-item");
    newItemLeft.appendChild(textItemLeft);
    if(totalTodo>0)
    itemLeft.parentElement.replaceChild(newItemLeft, itemLeft);
}
