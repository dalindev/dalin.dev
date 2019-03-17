export default function render() {
	return `
	<div class="btn-group" id="changestyle">
		<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
		aria-expanded="false">
			<span id="selstyle">Style Space</span>
		</button>
		<ul class="dropdown-menu">
			<li><a class="dropdown-item" href="#" data-val="default">Style Default</a></li>
			<li><a class="dropdown-item" href="#" data-val="space">Style Space</a></li>
			<li><a class="dropdown-item" href="#" data-val="snow">Style Snow</a></li>
		</ul>
	</div>
`;
}