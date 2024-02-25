//init scale
var scale = 1;

/* add event listeners for zooming and moving the body */
document.body.addEventListener("mousedown", grabBody);
document.body.addEventListener("wheel", scrollBody);

/* add event listeners for moving the objects around */
let objects = document.querySelectorAll(".draggable");
objects.forEach(object => {
    object.addEventListener("mousedown", grabTarget);
});


/* FUNCTIONS FOR DRAGGING TARGETS*/

/**
 * function to grab a object (target)
 * @param {*} event 
 */
function grabTarget(event) {
    event.preventDefault();

    if (editmode) {
        /* add a class for the grabbed element to be able to select it using querySelector */
        event.target.classList.add("grabbed");
        /* calculate the offset of the mouse within the target so the 
        mouse will not always drag the target by its top left x-coordinate */
        event.target.clickOffsetLeft = event.pageX - event.target.getBoundingClientRect().left;
        event.target.clickOffsetTop = event.pageY - event.target.getBoundingClientRect().top;
    }

    /* add event listeners for moving and releasing */
    document.body.addEventListener("mousemove", moveTarget);
    document.body.addEventListener("mouseup", releaseTarget);
}

/**
 * function to handle the moving of objects (target)
 * @param {*} event 
 */
function moveTarget(event) {
    event.preventDefault();
    let element = document.querySelector(".clickhandler.grabbed"); // the dragged element 
    if (element) {
        let containerRect = document.querySelector("#container-inner").getBoundingClientRect();
        /* without scaling, this code would only need (event.pageX - element.clickOffsetLeft)
        but because the inner container changes its X position while scaling, it has to be added to the calculation.
        The entire value must then be divided by the current scale to make the mouse movement relative to it */
        let target = element.parentNode;

        target.style.left = (event.pageX - containerRect.left - element.clickOffsetLeft) / scale + "px";
        target.style.top = (event.pageY - containerRect.top - element.clickOffsetTop) / scale + "px";

    }
}

/**
 * function to release a grabbed object (target)
 * @param {*} event 
 */
function releaseTarget(event) {
    event.preventDefault();
    /* remove the class that marked the grabbed target */
    if (document.querySelector(".clickhandler.grabbed")) document.querySelector(".clickhandler.grabbed").classList.remove("grabbed");

    /* remove event listeners */
    document.body.removeEventListener("mousemove", moveTarget);
    document.body.removeEventListener("mouseup", releaseTarget);

    savePositions();
}

/* FUNCTIONS FOR DRAGGING THE OUTER CONTAINER */

/**
 * function to grab the map (body)
 * @param {*} event 
 */
function grabBody(event) {

    /*if something else as the map is grabbed do nothing */
    if (event.target.id == "container-outer" || event.target.id == null || event.target.id == "" || event.target.id == "bottom-bar") {

        //do nothing
    }
    else {
        return;
    };

    /* set the click offset values for the element */
    let container = document.querySelector("#container-outer");
    container.clickOffsetLeft = event.pageX - container.getBoundingClientRect().left;
    container.clickOffsetTop = event.pageY - container.getBoundingClientRect().top;


    //add event-listeners for moving and releasing
    document.body.addEventListener("mousemove", moveBody);
    document.body.addEventListener("mouseup", releaseBody);
}

/**
 * function to handle moving the map (body)
 * @param {*} event 
 */
function moveBody(event) {
    event.preventDefault();
    let container = document.querySelector("#container-outer");
    container.style.left = event.pageX - container.clickOffsetLeft + "px";
    container.style.top = event.pageY - container.clickOffsetTop + "px";
}

/**
 * function to release the grabbing of the map (body) after its been moved
 * @param {*} event 
 */
function releaseBody(event) {
    event.preventDefault();
    document.body.removeEventListener("mousemove", moveBody);
    document.body.removeEventListener("mouseup", releaseBody);
}

/* FUNCTION FOR SCROLLING THE BODY */

/**
 * function to handle the zoom by scrolling with the mouse-wheel
 * @param {*} event 
 */
function scrollBody(event) {
    /* get the direction of scrolling so the scroll speed will always be the same */
    let scrollDir = Math.sign(event.deltaY);
    scrollDir = - scrollDir;

    /* parse the current scale from the inner container's styling */
    if (document.querySelector("#container-inner").style.transform) {
        scale = parseFloat(document.querySelector("#container-inner").style.transform.split("scale(")[1]);
    }

    /*get old scale value */
    let oldscale = scale;

    /* update scale value */
    scale += scrollDir * 0.03;

    /* if scale has a small value reduce scale-ratio to prevent rapid scaling */
    if (scale < 0.9) {
        scale += scrollDir * 0.01;
    }

    /* limit minimum scale */
    if (scale < 0.2) {
        scale = oldscale;
    }
    /* limis maximum scale */
    if (scale > 2) {
        scale = oldscale;
    }

    /* apply zoom to the GUI*/
    document.querySelector("#container-inner").style.transform = ` scale(${scale})`;
}

/**
 * function to center the map
 * called by btn-click
 */
function centerOuterContainer() {

    let outerContainer = document.querySelector("#container-outer");

    //transition
    outerContainer.style.transition = "0.2s";
    outerContainer.addEventListener("transitionend", () => {
        outerContainer.style.transition = "";
    });

    // calc new positions
    let x = 0;
    let y = -window.innerHeight / 4;
    outerContainer.style.left = x + "px";
    outerContainer.style.top = y + "px";

    //for floorplan with small height
    let url = document.getElementById("bgdiv").style.backgroundImage.replace('url("', '').replace('")', '');
    let floorplanImage = new Image();
    floorplanImage.src = url;

    floorplanImage.onload = function () {
        if (floorplanImage.height * 0.2 <= (window.innerHeight) * 0.2) {
            outerContainer.style.top = 0;
        }
    };

    //scale to min
    for (i = 0; i < 100; i++) {
        let event = new WheelEvent("wheel", { "deltaY": 0.2 });
        scrollBody(event);
    }

}

/**
 * function to zoom into the map
 * called by btn-click
 */
function zoomIn() {
    let event = new WheelEvent("wheel", { "deltaY": -0.2 });
    scrollBody(event);
}

/**
 * function to zoom out the map
 * called by btn-click
 */
function zoomOut() {
    let event = new WheelEvent("wheel", { "deltaY": 0.2 });
    scrollBody(event);
}
