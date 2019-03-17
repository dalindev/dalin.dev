import render from "./render";

class SlideNavigation extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = render();
    }
}

export default SlideNavigation;