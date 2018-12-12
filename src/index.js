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
        .editor:focus{
            outline:none;
        }
        .editor > div {
            padding-top: 20px;
            padding-bottom: 20px;
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
        <div class="editor" contenteditable><div><u>Simple t</u>ext editor</div></div>
    </div>
    `;

    class AdessoTextEditor extends HTMLElement {
        constructor() {
            super();

            Object.defineProperty(this, "calculateActiveTagsOnClick", {
                value: (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (window.getSelection()) {
                        let sel = window.getSelection();
                        let range = sel.getRangeAt(0);
                        let ancestorNode = range.commonAncestorContainer;
                        let activeButtonSet = this.addTags(ancestorNode, new Set());

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
                document.querySelector(".editor").addEventListener("click", this.calculateActiveTagsOnClick);
            }
        }

    }

    customElements.define("adesso-text-editor", AdessoTextEditor);
}());

