//tour data
var targets = [{ Id: 1, Title: "", OverlayType: "3d", position: { X: 100, Y: 100 }, hidden: false, Type: "3d" }, { Id: 2, Title: "", OverlayType: "audio", position: { X: 100, Y: 100 }, hidden: false, Type: "audio" }];

/**
 * mode to activate the moving of the objects
 * true: objects can be dragged
 * false: objects are fixed on floorplan
 */
var editmode = false;

initMap();

/**
 * async function to get data of the selected tour
 */
async function initMap() {

    //activate UI-Elements
    document.getElementById("editMode").style.display = "block";
    document.getElementById("center-btn").style.display = "block";
    document.getElementById("zoomIn-btn").style.display = "block";
    document.getElementById("zoomOut-btn").style.display = "block";
    document.getElementById("bottom-bar").style.display = "flex";

    //reset editmode
    document.getElementById("editModeBtn").checked = false;
    editMode();

    //helpers to calc default position of new targets
    let i = 500;
    let j = 500;
    let col1 = true;

    console.log(targets);
    //create new target Objects
    targets.forEach(target => {
        let el = new Object();
        el.data = new Object();
        el.data.Id = target.Id;
        el.data.Title = target.Title;
        el.data.Type = target.OverlayType;
        el.position = new Object();
        el.position.X = i + "px";
        el.position.Y = j + "px";
        el.hidden = false;
        loadTarget(el);


        //helpers to calc default position of new targets
        col1 = !col1;

        if (col1) {
            i = 500;
            j = j + 250;
        } else {
            i = 100;
        }

    });

    //init Editmode
    editMode();
}

/*FUNCTIONS TO LOAD TARGETS */

/**
 * function to load target as HTML-Object
 * @param {*} obj 
 */
function loadTarget(obj) {

    //create new HTML-Object
    var target = new Target(obj);
    var htmlElement = target.getElement();
    document.getElementById('container-inner').appendChild(htmlElement);
    htmlElement.style.left = obj.position.X;
    htmlElement.style.top = obj.position.Y;
    htmlElement.addEventListener("mousedown", grabTarget);

    //visibility
    if (target.hidden) {
        htmlElement.classList.add("hidden");
    }
}

/* SETTINGS*/
/** 
 * function to set editmode 
*/
function editMode() {
    editmode = document.getElementById("editModeBtn").checked;

    if (editmode) {
        let nodes = document.querySelectorAll(".draggable");
        nodes.forEach(htmlElement => {
            document.getElementById(htmlElement.id + "clickhandler").classList.remove("tooltip-container");
        });
    } else {

        let nodes = document.querySelectorAll(".draggable");
        nodes.forEach(htmlElement => {
            document.getElementById(htmlElement.id + "clickhandler").classList.add("tooltip-container");
        });

    }
}