class MyApp extends HTMLElement {

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<!-- Header -->
			<slide-navigation></slide-navigation>
			<!-- Header -->
			<!-- Container -->
			<div class='site-container'>
				<change-style></change-style>
				<panel-profile></panel-profile>
				<div class="parallax-window" data-parallax="scroll" data-image-src="img/Ottawa_1920x1080.jpg"></div>
				<about-me></about-me>
				<div class="parallax-window-half" data-parallax="scroll" data-image-src="img/test-oct.png"></div>
				<work-list></work-list>
				<div class="parallax-window" data-parallax="scroll" data-image-src="img/test-oct-6.png"></div>
			</div>
			<!-- Container -->
`;
	}
}

export default MyApp;