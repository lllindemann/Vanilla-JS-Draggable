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
                this.overlaytypeIcon = "fas fa-film";
                break;
            case "audio":
                this.overlaytypeIcon = "fas fa-music";
                break;

            case "3d":
                this.overlaytypeIcon = "fas fa-cube";
                break;

            case "interactive":
                this.overlaytypeIcon = "fas fa-hand-pointer";
                break;

            case "inactive":
                this.overlaytypeIcon = "fas fa-eye-slash";
                this.hidden = true;
                break;
            case "empty":
                this.overlaytypeIcon = "fas fa-eye-slash";
                this.hidden = true;
                break;
            default:
                break;
        }

        /* HTML-Object */
        this.elementHTML =
            `
            <div class="draggable ${this.contentType.toLowerCase()}" id="${this.id}">
                <div class="title-container">
                    <i class="${this.overlaytypeIcon}" id="${this.id}overlaytype" style="font-size: 60px; z-index: 0;  line-height: 140px;">
                     </i>
                </div>
                <div class="title-container">
                    <span class="target-title" id="${this.id}Title">${this.title}</span>
                    <input type="hidden" value="${this.id}">
                </div>

                <div id="${this.id}clickhandler" class="clickhandler" style="width:100%;min-height:150px;height:150px; z-index: 1; position: absolute;  color: transparent;">
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