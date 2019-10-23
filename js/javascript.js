function inputKeyPress(event){
    if(event.keyCode ==13||event.which==13 ){
        event.preventDefault();
        const valueInput = document.getElementById("input-todo").value;
        const content = document.createTextNode(valueInput);
        const ul = document.getElementById("list-content");
        const li = document.createElement("li");
        // tag icon
        const i = document.createElement("i");
        i.setAttribute("class", "far fa-circle");
        i.setAttribute("onclick", "javascript:Complete(event);");
        li.appendChild(i);
        // tag label
        const label = document.createElement("label");
        label.setAttribute("id","radio");
        label.appendChild(content);
        li.appendChild(label);
        // button
        const button = document.createElement("button");
        button.setAttribute("id", "button");
        button.setAttribute("onclick","javascript:buttonOnClick();");
        const node = document.createTextNode("X");
        button.appendChild(node);
        li.appendChild(button);

        li.setAttribute("id","li-component");
        li.setAttribute("onmouseover","javascript:liOnMouseOver();");
        li.setAttribute("onmouseout","javascript:liOnMouseOut();");
//        li.style.listStyleType="none";
        ul.appendChild(li);
    }
}
function checkBoxOnclick(){
    alert("checkbox onclick");
}
function liOnMouseOver(){
    const button = document.getElementById("button");
    button.style.color="red";
}
function liOnMouseOut(){
    const button = document.getElementById("button");
    button.style.color="white";
}
function buttonOnClick(event){
    event.preventDefault();
    alert("butotn onclick");
}
function Complete(event){
    event.preventDefault();
    const iold = document.getElementsByClassName("far fa-circle");
    const li = document.getElementById("li-component");
    const i = document.createElement("i");
    i.setAttribute("class","far fa-check-circle");
    i.setAttribute("onclick","javascript:changeComplete(event);");
    //set attribute node
    const label = document.getElementById("radio");
    const att = document.createAttribute("class");
    att.value= "radioComplete";

    label.setAttributeNode(att);
    li.appendChild(i)
    li.replaceChild(i,iold[0]);
}
function changeComplete(event){
    event.preventDefault();
    const iold = document.getElementsByClassName("far fa-check-circle");
    const li = document.getElementById("li-component");
    const i = document.createElement("i");
    //remove attribute
    const label = document.getElementById("radio");
    const att = label.getAttributeNode("class");
    label.removeAttributeNode(att);

    i.setAttribute("class","far fa-circle");
    i.setAttribute("onclick","javascript:Complete(event);");
    li.appendChild(i)
    li.replaceChild(i,iold[0]);
}