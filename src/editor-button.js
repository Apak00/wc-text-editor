(function () {
    const underline = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACmElEQVRIibWVvWsUURTFf2cYFg0hapAQZCNipggWFkEs1UKIja2FheCfINaD4DT2tgqCCFpooY2IhVgGtLIQWYMkUwSRZYlfYVnmWLyZze4k7ojonWKYdz/OvefeuQ/z98/NZCNqspExWZKfNz4LfJfZtugLAY5BLSAGvoHvpZ2FbwBZsjGHuYY0AH6CtwkyZbQqeJl22kVcHiagS4J5RCwAGwsEfaAL/gB6GIAANIV8GoiAE6AZ7AHos0QPeAmECirJkvwkcNf4VBkEwUraab9ggmTJxingma3bErfSTruodFHNdtN2Xn3IHgDrk4KXlptYaxL765o6wABK/i1AzbEBQx/Rw5zAHosZ1SwLoBi67U5g7/yhb7tr+QjSmE9ctwRhgxSyt2kUw0BSDzhY1+3KMBDj4GYiqbkKQd/QtT3TCBA8VMYH8L4mgLTT7gu+S5qqx9wbwAEksKTpJoDg4wF1yncDGKBwRVFwbATIkjxCioGCWs9qAOoDPwJF5YhKs3+QfgwcArYQxaimTtG2cVdQIOMwQkebATQNPma866ccA0g77ULWG+weqBrVlSzJWw0VLIHOYV6VvfhtBSBeg955pw3LwOUsyafqpjeTPMoW8yXQDewvSI/TjwtjFI0tu0qyxfwC4r7NYWGQcuCp4ZHwe1AEPg46A1wE5jDXkZ+nnYV+M0CSR+Bl4DrotO1ZSS1DoXJfYbYRW8AqkAHro1t0IsAIBS3BUknTPHAAXIC+AmuYt4hPaac9+F2MiQD/QmKALMmv2L4qiBguuR3gME0GRLkJsY2GbwgbzCi8HwjdGb0yW0j7GJ0qlffZyEEADaeSyo0yYhPu2ELQKmMNAZ4IXo1Y1oLvUcnQpqpUSJVO3aov/70HvwA+RUfnZ5/mngAAAABJRU5ErkJggg==";
    const container = document.createElement("button");
    container.innerHTML = `
    <style>
        .underline{
            text-decoration: underline;
        }
    </style>
    <img alt="alt"/>
    `;
    
    
    class EditorButton extends HTMLElement {
        constructor() {
            super();
            
            Object.defineProperty(this, "cmdEvent", {
                value: () => {
                    console.log("BUTTON CLICKED");
                    const editor = this.parentElement.querySelector(".editor");
                    let strong = document.createElement("strong");
                    document.createRange()
                    console.log(window.getSelection().getRangeAt(0).toString());
                    window.getSelection().getRangeAt(0).endContainer
                    
                }
            });
            
            this.init();
        }
        
        
        init() {
            this.appendChild(container);
            this.querySelector("button").addEventListener("click", this.cmdEvent);
            this.querySelector("img").src = underline;
        }
        
        
        replaceSelectedTextWith(text, selected, replacement) {
            
            
            
            return text;
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

