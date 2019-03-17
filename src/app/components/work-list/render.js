export default function render() {
	return `
	<section class="flx-center">
	<div class="text-center">

			<!-- Block 4 (SHA-256 blockchain) -->
			<div class="one-block latest-block">
					<p class="h4 text-center">Block #: 004</p>
					<p><label>Data:</label></p>
					<div class="block-data">
							<p>
									<label>Title:</label><b>Full Stack Developer</b></p>
							<p>
									<label>Company:</label>FarmLead.com</p>
							<p>
									<label>Stack:</label>MySQL, PHP7, JS, HTML5, CSS3, AWS</p>
							<p>
									<label>Time:</label>Feb 2017 - Present</p>
					</div>
					<div>
							<br>
							<p class="truncate">
									<small><label>Hash: </label>2ced301cea95102353465b5c96c2c313ca1ac39c593586fdbcf0692ed50e9538</small>
									<br>
									<small><label>Previous Hash: </label>878d1ef78d76e1cd006b89f323de4dce4064fafe2c38d5c711fe83f5e04bb0b2</small>
							</p>
					</div>
			</div>

			<!-- Block 3 (SHA-256 blockchain) -->
			<div class="one-block">
					<p class="h4 text-center">Block #: 003</p>
					<p><label>Data:</label></p>
					<div class="block-data">
							<p>
									<label>Title:</label><b>Software Application Developer</b></p>
							<p>
									<label>Company:</label>i-Sight Software</p>
							<p>
									<label>Stack:</label>PostgresSQL, Node.js, JS, HTML5, CSS3</p>
							<p>
									<label>Time:</label>Mar 2016 - Feb 2017</p>
					</div>
					<div>
							<br>
							<p class="truncate">
									<small><label>Hash: </label>878d1ef78d76e1cd006b89f323de4dce4064fafe2c38d5c711fe83f5e04bb0b2</small>
									<br>
									<small><label>Previous Hash: </label>830e1d948d6c7dd090e804c9eb94b412f2750ac19cb69d4040ae11dff1d8ef6d</small>
							</p>
					</div>
			</div>

			<br>
			<!-- Block 2 (SHA-256 blockchain) -->
			<div class="one-block">
					<p class="h4 text-center">Block #: 002</p>
					<p><label>Data:</label></p>
					<div class="block-data">
							<p>
									<label>Title:</label><b>Front End Developer</b></p>
							<p>
									<label>Company:</label>FarmLead.com</p>
							<p>
									<label>Stack:</label>Vue.js, CoffeeScript, JS, HTML5, CSS3</p>
							<p>
									<label>Time:</label>June 2016 - Nov 2016</p>
					</div>
					<div>
							<br>
							<p class="truncate">
									<small><label>Hash: </label>830e1d948d6c7dd090e804c9eb94b412f2750ac19cb69d4040ae11dff1d8ef6d</small>
									<br>
									<small><label>Previous Hash: </label>0fdf18af6009579cf35fdc82d130e658bca9037705b3a87142a27daeff138d78</small>
							</p>
					</div>
			</div>

			<!-- Block 1 (SHA-256 blockchain) -->
			<div class="one-block">
					<p class="h4 text-center">Block #: 001</p>
					<p><label>Data:</label></p>
					<div class="block-data">
							<p>
									<label>Title:</label><b>Web Developer</b></p>
							<p>
									<label>Company:</label>Events.com</p>
							<p>
									<label>Stack:</label>LAMP, PHP5, JS, HTML5, CSS3</p>
							<p>
									<label>Time:</label>Mar 2015 - Feb 2016</p>
					</div>
					<div>
							<br>
							<p class="truncate">
									<small><label>Hash: </label>0fdf18af6009579cf35fdc82d130e658bca9037705b3a87142a27daeff138d78</small>
									<br>
									<small><label>&nbsp;</label>"Genesis Block"</small>
							</p>
					</div>
			</div>

			<div class="text-center h5">SHA-256 blockchain</div>
	</div>
</section>
`;
}