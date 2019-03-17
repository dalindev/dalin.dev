import render from "./render";

class ChangeStyle extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = render();
    }
}

export default ChangeStyle;