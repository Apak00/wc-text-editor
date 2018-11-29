(function () {
    const container = document.createElement("button");
    container.innerHTML = `
    <style>
    .fa-underline{
        font-size: 20px;
        color:steelblue;
    }
    </style>
    <i class="fas fa-underline"></i>
    `;
    container.style = "padding:6px;";
    
    
    class EditorButton extends HTMLElement {
        constructor() {
            super();
            
            Object.defineProperty(this, "cmdEvent", {
                value: () => {
                    console.log("BUTTON CLICKED");
                    const editor = document.querySelector(".editor");
                    
                    var sel, range, text;
                    if (window.getSelection()) {
                        sel = window.getSelection();
                        text = sel.toString();
                        range = sel.getRangeAt(0);
                        
                        const serializer = new XMLSerializer();
                        const document_fragment_string = serializer.serializeToString(range.cloneContents());
                        
                        console.log(document_fragment_string);
                        if (this.isDescendantOrSame(editor, range.commonAncestorContainer)) {
                            if (!this.hasParentTagged("u", range.commonAncestorContainer)) {
                                console.log("no parent tag present");
                                let u = document.createElement("u");
                                u.innerHTML = `${document_fragment_string}`;
                                
                                range.deleteContents();
                                range.insertNode(u);
                                
                                
                            } else if (range.commonAncestorContainer.parentNode.textContent.trim() === text) {
                                console.log("tag present and selection capsulates tag");
                                
                            } else {
                                console.log("tag present but selection does not capsulate tag");
                                
                            }
                        }
                    }
                }
            });
            
            this.init();
        }
        
        
        isDescendantOrSame(parent, child) {
            if (child) {
                if (child == parent)
                    return true;
                return this.isDescendantOrSame(parent, child.parentNode)
            }
            return false;
        }
        
        hasParentTagged(parentTag, child) {
            if (child) {
                if (parentTag === child.localName)
                    return true;
                return this.hasParentTagged(parentTag, child.parentNode)
            }
            return false;
        }
        
        
        replaceSelectedTextWith(text, selected, replacement) {
            
            
            return text;
        }
        
        init() {
            this.appendChild(container);
            this.querySelector("button").addEventListener("click", this.cmdEvent);
        }
        
        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`${name} changed from ${oldValue} to ${newValue}`);
            switch (name) {
                case "cmd":
                    console.log("cmd prop changed");
                    break;
                default:
                    break;
            }
        }
        
        static get observedAttributes() {
            return ["data-cmd", "data-default-ui", "data-cmd-value"];
        }
        
        
        get cmd() {
            return this.getAttribute("data-cmd");
        }
        
        set cmd(value) {
            this.setAttribute("data-cmd", value);
        }
        
        get defaultUI() {
            return this.getAttribute("data-default-ui");
        }
        
        set defaultUI(value) {
            const defaultUI = Boolean(value);
            if (defaultUI)
                this.setAttribute('data-default-ui', '');
            else
                this.removeAttribute('data-default-ui');
        }
        
        get cmdValue() {
            return this.getAttribute("data-default-ui");
        }
        
        set cmdValue(value) {
            this.setAttribute("data-cmd-value", value);
        }
    }
    
    customElements.define("editor-button", EditorButton);
}());

