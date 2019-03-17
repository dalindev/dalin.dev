import MyApp from ".";
import AboutMe from "./app/components/about-me/custom-element";
import ChangeStyle from "./app/components/change-style/custom-element";
import PanelProfile from "./app/components/panel-profile/custom-element";
import SlideNavigation from "./app/components/slide-navigation/custom-element";
import WorkList from "./app/components/work-list/custom-element";


window.customElements.define('my-app', MyApp)
window.customElements.define('about-me', AboutMe);
window.customElements.define('change-style', ChangeStyle);
window.customElements.define('panel-profile', PanelProfile);
window.customElements.define('slide-navigation', SlideNavigation);
window.customElements.define('work-list', WorkList);