function addElement() {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("New Element"));
    ul.appendChild(li);
}

function removeElement() {
    var list=document.getElementById("list");
    var listItems = list.getElementsByTagName("li");

    var last = listItems[listItems.length - 1];
    last.parentNode.removeChild(last);
}
