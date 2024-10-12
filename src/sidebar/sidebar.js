let isLeftDragging = false;

function ResetColumnSizes() {
	// when page resizes return to default col sizes
	let page = document.getElementById("pageFrame");
	page.style.gridTemplateColumns = "6fr 6px 6fr";
}

function SetCursor(cursor) {
	let page = document.getElementById("page");
	page.style.cursor = cursor;
}

function StartLeftDrag() {
	isLeftDragging = true;
	SetCursor("ew-resize");
}

function EndDrag() {
	isLeftDragging = false;
	SetCursor("auto");
}

function OnDrag(event) {
	if (isLeftDragging) {
		let page = document.getElementById("page");
		let leftcol = document.getElementById("leftcol");

		let leftColWidth = isLeftDragging ? event.clientX : leftcol.clientWidth;

		let dragbarWidth = 6;

		let cols = [
			leftColWidth,
			dragbarWidth,
			page.clientWidth - dragbarWidth - leftColWidth,
			dragbarWidth
		];

		let newColDefn = cols.map(c => c.toString() + "px").join(" ");

		page.style.gridTemplateColumns = newColDefn;

		event.preventDefault()
	}
}
