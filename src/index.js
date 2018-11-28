import "./editor-button";

(function () {
    const Container = document.createElement("template");
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
    </style>
    <div class="container">
        <editor-button data-cmd="underline" data-default-ui="false" data-cmd-value="">
        
        </editor-button>
        <div class="editor" contenteditable>
            Simple text editor
        </div>
    </div>
    `;
    
    
    class AdessoTextEditor extends HTMLElement {
        constructor() {
            super();
            
            
            this.attachShadow({mode: "open"});
            
            this.init();
        }
        
        
        init() {
            let container = document.importNode(Container,true).content;
            this.shadowRoot.appendChild(container);
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

