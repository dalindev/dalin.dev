export default function render() {
	return `
	<section>
	<div class="about-me">
			<div class="text-center">
					<img class="unselectable" src="img/about-me.png" height="100" width="550">
					<br><br>
			</div>
			<div class="clearfix"></div>
			<div class="about-me__content" id="terminal-start">
					<p>Last login: Thu Oct 12 00:28:38 2017 from
							cpe44d9e79bd14b-cma84e3fd1a7d0.cpe.net.cable.rogers.com</p>
					<pre style="border: none;">
					__|  __|_  )
					_|  (     /   Amazon Linux AMI
					___|\___|___|

					Amazon Linux version 2017.09 is available.
					</pre>
					<br><br>
					<div class="command">
							<!-- email -->
							<p>echo $email</p>
							<span class="hideme">email: dhuan023@gmail.com</span>
							<!-- phone -->
							<p>echo $phone</p>
							<span class="hideme">phone: (647)-927-XXXX</span>
							<!-- address -->
							<p>echo $address</p>
							<span class="hideme">address: Ottawa, ON, Canada</span>
							<!-- education -->
							<p>echo $education</p>
							<span class="hideme">University of Ottawa • 2009 - 2014<br>
									BSc: Specialization in Computer Science; Minor in Economics;</span>
							<!-- eligible_to_work -->
							<p>echo $eligible_to_work</p>
							<span class="hideme">Permanent Resident of Canada</span>
					</div>
			</div>
	</div>
</section>
`;
}