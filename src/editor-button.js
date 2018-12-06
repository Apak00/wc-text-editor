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
                        this.clearDuplicateTags(editor);
                    }
                }
            );
            
            this.init();
        }
        
        clearDuplicateTags(editor) {
            // replace empty tags with ""
            editor.innerHTML = editor.innerHTML.replace(/<([a-z]*)><\/\1>/g, "");
            // remove adjacent tags with a single tag
            editor.innerHTML = editor.innerHTML.replace(/<\/([a-z]*)><\1>/g, "");
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
                    width: 20px;
                    height: 20px;
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
        
        get tag() {
            return this.getAttribute("data-tag");
        }
        
        set tag(value) {
            this.setAttribute("data-tag", value);
        }
    }
    
    customElements.define("editor-button", EditorButton);
}());

