const int = document.getElementById('tasktext');
const btn = document.getElementById('taskadd');
const todo = document.getElementById('tasklist');

btn.onclick = function()
{
    const currentText = int.value;
    if (currentText != "") {

        const li = document.createElement('li');
        const del = document.createElement('button');
        del.onclick = function(e)
        {
            li.click();
        }
        li.onclick = function (e) {
            e.target.remove();
        }
        del.appendChild(document.createTextNode("Delete"));
        del.className = "btn-danger btn btn-sm float-right delete";
        li.className = "list-group-item";
        li.appendChild(del);
        li.appendChild(document.createTextNode("\t - " + currentText));
        todo.append(li);
        int.value = "";
    }
}
