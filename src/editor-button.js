(function () {

    class EditorButton extends HTMLElement {
        constructor() {
            super();

            Object.defineProperty(this, "cmdEvent", {
                value: (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    let paragraph, sel, range, parent;
                    const editor = document.querySelector(".editor");
                    this.active = !this.active;
                    const tag = this.tag;

                    if (window.getSelection()) {
                        sel = window.getSelection();
                        range = sel.getRangeAt(0);

                        if (this.isDescendantOrSame(editor, range.commonAncestorContainer)) {
                            const collapsed = range.collapsed;


                            if (!collapsed) {
                                // wrapped selection in editor node
                                const wrapper = document.createElement("span");
                                wrapper.setAttribute("class", "selection-wrapper");
                                wrapper.appendChild(range.extractContents());
                                range.insertNode(wrapper);
                                paragraph = this.hasParentTagged("div", wrapper);
                                parent = wrapper.parentNode;
                                console.log(wrapper.children.length === 1 && tag === wrapper.firstChild.localName)

                                if (wrapper.children.length === 1 && tag === wrapper.firstChild.localName) {
                                    const regex = new RegExp(`<${tag}>|</${tag}>`, "g");
                                    wrapper.innerHTML = wrapper.innerHTML.replace(regex, "")
                                } else if (!this.hasParentTagged(tag, wrapper)) {
                                    console.log("tag does not present");
                                    const regex = new RegExp(`<${tag}>|</${tag}>`, "g");
                                    wrapper.outerHTML = `<${tag}>${wrapper.outerHTML.replace(regex, "")}</${tag}>`;
                                } else if (parent.localName === tag && !parent.firstChild.data && !parent.lastChild.data && parent.childNodes.length === 3) {
                                    console.log("tag present and selection encapsulates the content inside of tag");
                                    wrapper.parentNode.outerHTML = wrapper.outerHTML;
                                } else {
                                    console.log("tag present but selection does not encapsulate tag");
                                    parent = this.hasParentTagged(tag, wrapper);
                                    parent.outerHTML = parent.outerHTML.replace(/<span class="selection-wrapper">.*<\/span>/g, `</${tag}>${wrapper.outerHTML}<${tag}>`);
                                }
                                this.clearDuplicateTags(paragraph);
                                let wrapperNode = document.querySelector(".selection-wrapper");
                                if (window.getSelection) {
                                    let sel = window.getSelection();
                                    let rr = sel.getRangeAt(0);
                                    rr.selectNode(wrapperNode);
                                    sel.removeAllRanges();
                                    sel.addRange(rr);
                                }
                                const regex = new RegExp(`<span class="selection-wrapper">|<\/span>/`, "g");
                                wrapperNode.outerHTML.replace(regex,"")
                            }
                        }
                    }
                }
            });

            Object.defineProperty(this, "keepFocus", {
                value: (e) => {
                    e.preventDefault();
                }
            });

            this.init();
        }

        clearDuplicateTags(paragraph) {
            // replace empty tags with ""
            paragraph.innerHTML = paragraph.innerHTML.replace(/<([a-z]*)><\/\1>/g, "");
            // remove adjacent tags with a single tag
            paragraph.innerHTML = paragraph.innerHTML.replace(/<\/([a-z]*)><\1>/g, "");
            // remove extra tag
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
                .active, .active > i{
                    background-color: steelblue;
                    color: #f1f1f1;
                }
                button {
                    outline: none;
                }
                </style>
                <i></i>
                `;
            container.style = "padding:6px;";
            this.appendChild(container);
            this.querySelector("button").addEventListener("click", this.cmdEvent);
            this.querySelector("button").addEventListener("mousedown", this.keepFocus);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`${name} changed from ${oldValue} to ${newValue}`);
            switch (name) {
                case "data-cmd":
                    this.querySelector("i").setAttribute("class", `fas fa-${newValue}`);
                    break;
                case "data-active":
                    this.querySelector("button").setAttribute("class", this.active ? "active" : "");
                    break;
                default:
                    break;
            }
        }

        static get observedAttributes() {
            return ["data-cmd", "data-tag", "data-active",];
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

        get active() {
            return this.hasAttribute("data-active");
        }

        set active(value) {
            const active = Boolean(value);
            if (active)
                this.setAttribute('data-active', '');
            else
                this.removeAttribute('data-active');
        }
    }

    customElements.define("editor-button", EditorButton);
}());

