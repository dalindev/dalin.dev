import render from "./render";

class PanelProfile extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = render();
    }
}

export default PanelProfile;