(function () {
    const containerTemplate = document.createElement("template");
    containerTemplate.innerHTML = `
    <style>
        .container{
             border: steelblue 1px solid;
             border-radius: 6px;
             flex:1;
             background-color: red;
        }
    </style>
    <div class="container">
        <button class="tool-items fas fa-stroopwafel"  onclick="document.execCommand('underline', false, '');">
        
        </button>
        <div class="center">
            <div class="editor" contenteditable>
                <h1>Simple Html editor</h1>
            </div>
        </div>
    </div>
    `;
    
    
    class AdessoInput extends HTMLElement {
        constructor() {
            super();
            
            
            this.attachShadow({mode: "open"});
            
            this.init();
        }
        
        
        init() {
            const container = document.createElement("div");
            container.innerHTML = `
            <style>
        .container{
             border: steelblue 1px solid;
             border-radius: 6px;
             flex:1;
             background-color: red;
        }
        .fas{
            color:blue;
        }
    </style>
    <div class="container">
        <button class="tool-items fas fa-stroopwafel"  onclick="document.execCommand('underline', false, '');">
        
        </button>
        <div class="center">
            <div class="editor" contenteditable>
                <h1>Simple Html editor</h1>
            </div>
        </div>
    </div>
            `;
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
    
    customElements.define("adesso-text-editor", AdessoInput);
}());

