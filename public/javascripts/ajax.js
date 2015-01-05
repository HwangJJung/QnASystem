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
        var type = e.currentTarget.firstElementChild.attributes[1].value;
        var url = "/circle";

        if(type === "circle") {
           url = "ajax/circle";
        }
        else if(type === "project") {
           url = "ajax/project";
        }
        else {
            url = "ajax/topic";
        }

        url = addURLParam(url,"id", e.currentTarget.firstElementChild.attributes[2].value);
        request.open("GET" , url , true);
        request.send(null);
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                var projectList = request.responseText;
                console.log(projectList);
                var listContainer = document.getElementById("list_container");
                listContainer.innerHTML = "";
                listContainer.insertAdjacentHTML('beforeend',projectList);
            }
        };
    }
    getData(e);
}

$(document).ready(function() {
    $("#list_container").on("click", function( e ) {
        showProject(e);
    });
});
