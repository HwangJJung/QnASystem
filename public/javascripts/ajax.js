/**
 * Created by jjungmac on 2014. 12. 29..
 */
;

function showProject(e) {
    function addURLParam(url, name, value) {
        url += (url.indexOf("?") === -1 ? "?" : "&");
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    }

    function getData(e){
        var request = new XMLHttpRequest();
        var type = e.currentTarget.attributes[1].value;
        var url = "";
        var dataType = "";


        function _ChangeAddValue(dataType) {

            var addBtn = document.querySelector(".add");
            addBtn.innerText = "ADD " + dataType;
            addBtn.attributes[1].value = dataType;
            var modal = document.getElementById("myModal");
            modal.attributes[1].value = dataType;
            var modalForm = modal.querySelector(".modal-form");
            modalForm.action = modalForm.baseURI + "ajax/" +dataType;
            var modalTitle = modalForm.querySelector(".modal-title");
            modalTitle.innerText = "ADD " + dataType;
        }


        if(type === "circle") {
           url = "ajax/circle";
            dataType = "project";
        }
        else if(type === "project") {
           url = "ajax/project";
            dataType = "topic";
        }
        else {
            url = "ajax/topic";
            dataType = "question";
        }



        console.log("idnum: "+ e.currentTarget.attributes[2].value);

        url = addURLParam(url,"id", e.currentTarget.attributes[2].value);
        request.open("GET" , url , true);
        request.send(null);
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                var projectList = request.responseText;
                console.log(projectList);
                var listContainer = document.getElementById("list_container");
                listContainer.innerHTML = "";
                listContainer.insertAdjacentHTML('beforeend',projectList);
                _ChangeAddValue(dataType);
            }
        };
    }

    getData(e);
}

$(document).ready(function() {
    $( document ).on( "click", "#list_container .list-group", function( e ) {
        showProject(e);
    } );
});
