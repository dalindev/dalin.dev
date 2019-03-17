import render from "./render";

class AboutMe extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = render();
    }
}

export default AboutMe;