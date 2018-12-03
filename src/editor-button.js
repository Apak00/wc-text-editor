(function () {
    
    class EditorButton extends HTMLElement {
        constructor() {
            super();
            
            Object.defineProperty(this, "cmdEvent", {
                    value: () => {
                        console.log("BUTTON CLICKED");
                        const editor = document.querySelector(".editor");
                        
                        let sel, range, parent;
                        const tag = this.tag;
                        if (window.getSelection()) {
                            sel = window.getSelection();
                            range = sel.getRangeAt(0);
                            if (!range.collapsed && this.isDescendantOrSame(editor, range.commonAncestorContainer)) {
                                
                                const wrapper = document.createElement("span");
                                wrapper.setAttribute("class", "selection-wrapper");
                                wrapper.appendChild(range.extractContents());
                                range.insertNode(wrapper);
                                parent = wrapper.parentNode;
                                
                                if (!this.hasParentTagged(tag, wrapper)) {
                                    console.log("tag does not present");
                                    const regex = new RegExp(`<${tag}>|</${tag}>`, "g");
                                    console.log(regex)
                                    wrapper.outerHTML = `<${tag}>${wrapper.innerHTML.replace(regex, "")}</${tag}>`;
                                } else if (parent.localName === tag && !parent.firstChild.data && !parent.lastChild.data && parent.childNodes.length === 3) {
                                    console.log("tag present and selection encapsulates the content inside of tag");
                                    wrapper.parentNode.outerHTML = wrapper.innerHTML;
                                } else {
                                    console.log("tag present but selection does not encapsulate tag");
                                    parent = this.hasParentTagged(tag, wrapper);
                                    parent.outerHTML = parent.outerHTML.replace(/<span class="selection-wrapper">.*<\/span>/g, `</${tag}>${wrapper.innerHTML}<${tag}>`);
                                }
                            }
                        }
                        // replace empty tags with ""
                        editor.innerHTML = editor.innerHTML.replace(/<([a-z]*)><\/\1>/g, "");
                    }
                }
            );
            
            this.init();
        }
        
        
        isDescendantOrSame(parent, child) {
            if (child) {
                if (child.isEqualNode(parent))
                    return true;
                return this.isDescendantOrSame(parent, child.parentNode)
            }
            return false;
        }
        
        hasParentTagged(parentTag, child) {
            if (child) {
                if (parentTag === child.localName)
                    return child;
                return this.hasParentTagged(parentTag, child.parentNode)
            }
            return false;
        }
        
        
        init() {
            const container = document.createElement("button");
            container.innerHTML = `
                <style>
                i{
                    font-size: 20px;
                    color: steelblue;
                }
                </style>
                <i></i>
                `;
            container.style = "padding:6px;";
            this.appendChild(container);
            this.querySelector("button").addEventListener("click", this.cmdEvent);
        }
        
        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`${name} changed from ${oldValue} to ${newValue}`);
            switch (name) {
                case "data-cmd":
                    console.log("cmd prop changed");
                    this.querySelector("i").setAttribute("class", `fas fa-${newValue}`);
                    break;
                default:
                    break;
            }
        }
        
        static
        get observedAttributes() {
            return ["data-cmd", "data-tag", "data-default-ui", "data-cmd-value"];
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
        
        get tag() {
            return this.getAttribute("data-tag");
        }
        
        set tag(value) {
            this.setAttribute("data-tag", value);
        }
    }
    
    customElements.define("editor-button", EditorButton);
}());

