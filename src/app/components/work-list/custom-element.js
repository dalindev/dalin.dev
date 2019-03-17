import render from "./render";

class WorkList extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = render();
    }
}

export default WorkList;