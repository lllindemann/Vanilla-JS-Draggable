/**
 * Class to describe a Draggable-Object as HTML-Object
 * @param {Object} Target
 */

var Target = class {

    constructor(Object) {

        /*
         * This object's unique identifier
         */
        this.id = Object.data.Id;

        /* Title */
        this.title = Object.data.Title;

         /* Visibility*/
         this.hidden = false;

         /*Icon Type*/
        this.contentType = Object.data.Type;

        /* load icon by Icon OverlayType*/
        switch (this.contentType.toLowerCase()) {

            case "video":
                this.overlaytypeIcon = "video";
                break;
            case "audio":
                this.overlaytypeIcon = "audio";
                break;

            case "3d":
                this.overlaytypeIcon = "cube";
                break;

            case "interactive":
                this.overlaytypeIcon = "hand-tap";
                break;

            case "eye-off":
                this.overlaytypeIcon = "alert";
                this.hidden = true;
                break;
            default:
                break;
        }

        /* HTML-Object */
        this.elementHTML =
            `
            <div class="draggable ${this.contentType.toLowerCase()}" id="${this.id}">
                <div class="icon-container">
                    <iconify-icon id="${this.id}overlaytype" icon="mdi:${this.overlaytypeIcon}" style="z-index: 0; font-size: 70px;"></iconify-icon>
                </div>
                <div id="${this.id}clickhandler" class="clickhandler" style="width:100%;min-height:150px;height:150px; z-index: 1; position: absolute;  color: transparent; ">
                    Click Handler
                    <span id="move-objects-tooltip-${this.id}" class="tooltip top">Activate Switch <i><b>"Move Objects"</b></i>, to be able to drag the Objects</span>
                </div>
            </div>`
            ;

        /*position on map */
        this.x = Object.position.X;
        this.y = Object.position.Y;

        /*Getter*/
        this.getElement = () => {
            return new DOMParser().parseFromString(this.elementHTML, "text/html").body.firstChild;
        };

        this.getX = () => {
            return this.x;
        };

        this.getY = () => {
            return this.y;
        };


    }
};