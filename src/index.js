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
            <editor-button data-cmd="bold" data-tag="strong">
            </editor-button>
            <editor-button data-cmd="underline" data-tag="u">
            </editor-button>
            <editor-button data-cmd="italic" data-tag="em">
            </editor-button>
        </div>
        <div name="editor" class="editor" contenteditable>Simple text editor</div>
    </div>
    `;
    
    
    class AdessoTextEditor extends HTMLElement {
        constructor() {
            super();
            
            Object.defineProperty(this, "onClick", {
                value: (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (window.getSelection()) {
                        let sel = window.getSelection();
                        let range = sel.getRangeAt(0);
                        let ancestorNode = range.commonAncestorContainer;
                        let activeButtonSet = this.addTags(ancestorNode, new Set([]));
                
                        this.querySelectorAll("editor-button").forEach(node => {
                            if (activeButtonSet.has(node.getAttribute("data-tag"))) {
                                node.setAttribute("data-active", "")
                            } else {
                                node.removeAttribute("data-active")
                            }
                        });
                    }
                }
            });
            
        }
        
        
        addTags(node, set) {
            if (node) {
                if (node.isEqualNode(document.querySelector(".editor")))
                    return set;
                if (node.localName)
                    set.add(node.localName);
            }
            return this.addTags(node.parentNode, set)
            
        }
        
        connectedCallback() {
            if (!this.hasChildNodes()) {
                this.appendChild(Container);
                document.querySelector(".editor").addEventListener("click", this.onClick)
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

