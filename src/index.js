import "./editor-button";

(function () {
    const Container = document.createElement("div");
    Container.innerHTML = `
    <style>
        :host(.adesso-text-editor) {
            margin:20px;
            flex:1;
        }
        .container {
             border: #dfdfdf 1px solid;
             border-radius: 6px;
             flex:1;
             background-color: #f1f1f1;
             padding: 16px;
        }
        .panel{
            margin-bottom: 20px;
        }
        .editor{
            border: #dfdfdf 1px solid;
            padding:10px;
        }
    </style>
    <div class="container">
        <div class="panel">
            <editor-button data-cmd="underline" data-default-ui="false" data-cmd-value="">
            </editor-button>
        </div>
        <div name="editor" class="editor" contenteditable>
            Simple <em>text</em> editor
        </div>
    </div>
    `;
    
    
    class AdessoTextEditor extends HTMLElement {
        constructor() {
            super();
            
        }
        
        connectedCallback() {
            if (!this.hasChildNodes()) {
                this.appendChild(Container);
            }
        }
        
        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`${name} changed from ${oldValue} to ${newValue}`);
            switch (name) {
                case "some":
                    console.log("some prop changed");
                    break;
                default:
                    break;
            }
        }
        
        static get observedAttributes() {
            return ["some"];
        }
    }
    
    customElements.define("adesso-text-editor", AdessoTextEditor);
}());

