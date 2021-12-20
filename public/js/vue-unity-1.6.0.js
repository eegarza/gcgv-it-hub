

// This function exports all native Unity JS as a module, so it can be used by Vue during mount() time.
// by Luiz L Barreto
//
export function unity() {
	/**
	 * Accordion Activation
	 * 1) Add closed class to all accordion items by default
	 * 2) Add and remove active class to tabs depending on which one you click on
	 * 3) Add the id to the URL
	 */
	(function () {

		var accordionItem = document.querySelectorAll('.em-js-accordion-item');
		var accordionBtn = document.querySelectorAll('.em-js-accordion-trigger');

		for (var i = 0; i < accordionItem.length; i++) {
			accordionItem[i].classList.add('em-is-closed'); /* 1 */
		}

		for (var i = 0; i < accordionBtn.length; i++) {
			accordionBtn[i].addEventListener('click', function (e) {
				e.preventDefault();
				var parent = this.parentNode.parentNode;
				var thisHref = this.getAttribute('href');
				var thisHrefSub = this.getAttribute('href').substring(1);

				toggleAccordion(parent);
			});
		}

		function toggleAccordion(el) {

			if (el.classList.contains('em-is-closed')) {
				el.classList.remove('em-is-closed'); /* 2 */
			}
			else {
				el.classList.add('em-is-closed'); /* 2 */
			}
		}

	})();
	; var alertTriggers = document.querySelectorAll('.em-js-alert-dismiss-trigger');

	//Add click event for each carousel link
	for (var i = 0; i < alertTriggers.length; i++) {
		alertTriggers[i].addEventListener('click', function (event) {
			event.preventDefault();

			this.closest('.em-js-alert').remove();
		});
	}
	;/**
 * Alphabet Filter Activation
 * 1) Add and remove active class to current alphabet filter item depending on which one you click on
 */
	(function () {
		var alphabet = document.querySelectorAll('.em-js-alphabet');
		for (var i = 0; i < alphabet.length; i++) {
			alphabet[i].addEventListener('click', function (e) {
				if (this.classList.contains('em-is-active')) {
					this.classList.remove('em-is-active');
				}
				else {
					for (var j = 0; j < alphabet.length; j++) {
						alphabet[j].classList.remove('em-is-active');
					}
					this.classList.add('em-is-active');
				}

			});
		}
	})();
	;/**
 * Add Body Classes
 * 1) Modernizr-type class used by all styles that are JS dependent.
 */
	(function () {
		document.body.classList.add('em-js');
	})();
	;/**
 * Add Button Bar Button Active State
 * 1) When clicking on a button within button bar, the class of em-is-active is added and removed
 *    Each button toggles itself so multiple buttons can be active.
 */

	(function () {
		var button = document.querySelectorAll('.em-js-btn-selectable');
		for (var i = 0; i < button.length; i++) {
			button[i].addEventListener('click', function (e) {
				if (this.classList.contains('em-is-active')) {
					this.classList.remove('em-is-active');
				}
				else {
					this.classList.add('em-is-active');
				}
			});
		}

	})();
	;/**
 * Character counter functionality
 * 1) Functionality: Twitter-style text counter that checks the number of characters in a textarea
 *    and alert the user if they've exceeded the threshold.
 */
	(function () {
		var characterCounter = document.querySelectorAll('.em-js-character-counter'); // Select all character counters

		for (var i = 0; i < characterCounter.length; i++) {
			characterCounter[i].outerHTML = characterCounter[i].outerHTML.replace(/textarea/, "div"); //Replace textareas with divs
		}

		var characterCounter = document.querySelectorAll('.em-js-character-counter'); // Re-query all character counters since replacing textarea tag wipes out objects

		for (var i = 0; i < characterCounter.length; i++) {
			characterCounter[i].setAttribute("contenteditable", "true");
			characterCounter[i].innerText = "";

			characterCounter[i].addEventListener('keyup', function (e) {
				e.preventDefault();
				var maxlength = this.getAttribute("data-em-textarea-length"); // Character threshold defined in HTML
				var characters = this.innerText.length;
				var remaining = maxlength - characters;
				var thisParent = this.parentNode.parentNode;
				var goodText = this.innerText.slice(0, maxlength); //Select all text before the threshold
				var badText = this.innerText.slice((maxlength)); //Select all text after the threshold
				var cursorPosition = getCursorPosition(this);
				console.log(cursorPosition);
				if (cursorPosition >= maxlength) {
					if (remaining == -1) {
						this.innerHTML = goodText + '<em class="em-js-red" style="color:red; font-style:normal;">' + badText + '</em>';
						setCursorPosition(this.childNodes[1], getCursorPosition(this.childNodes[1]) + 1);
					}
					if (cursorPosition == maxlength) {
						this.innerHTML = goodText + '<em class="em-js-red" style="color:red; font-style:normal;">' + badText + '</em>';
						setCursorPosition(this.childNodes[1], getCursorPosition(this.childNodes[1]));
					}
				} else {
					if (remaining < 0) {
						this.innerHTML = goodText + '<em class="em-js-red" style="color:red; font-style:normal;">' + badText + '</em>';
					}
					setCursorPosition(this.childNodes[0], cursorPosition);
				}
				thisParent.querySelector(".em-c-field__count").innerHTML = remaining;
				if (remaining < 0) { //If character count is over the threshold
					if (!thisParent.classList.contains('em-has-error')) { //If field doesn't yet have error class
						thisParent.classList.add('em-has-error'); //Add error class to field
					}

				} else { //If character count is below the threshold
					thisParent.classList.remove('em-has-error'); //Remove error class
				}
			});
		}

		/**
		 * Get Cursor position
		 * 1) http://stackoverflow.com/questions/6249095/how-to-set-caretcursor-position-in-contenteditable-element-div/6249440#6249440
		 */
		function getCursorPosition(element) {
			var caretOffset = 0;
			var doc = element.ownerDocument || element.document;
			var win = doc.defaultView || doc.parentWindow;
			var sel;
			if (typeof win.getSelection != "undefined") {
				sel = win.getSelection();
				if (sel.rangeCount > 0) {
					var range = win.getSelection().getRangeAt(0);
					var preCaretRange = range.cloneRange();
					preCaretRange.selectNodeContents(element);
					preCaretRange.setEnd(range.endContainer, range.endOffset);
					caretOffset = preCaretRange.toString().length;
				}
			} else if ((sel = doc.selection) && sel.type != "Control") {
				var textRange = sel.createRange();
				var preCaretTextRange = doc.body.createTextRange();
				preCaretTextRange.moveToElementText(element);
				preCaretTextRange.setEndPoint("EndToEnd", textRange);
				caretOffset = preCaretTextRange.text.length;
			}
			return caretOffset;
		}

		function setCursorPosition(element, position) {
			var range = document.createRange();
			var sel = window.getSelection();
			range.setStart(element, position);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	})();
	;/**
 * Checkbox Field Options List Item Activation
 * 1) Add active class to any inputs that are initially checked
 * 2) Add and remove active class depending on whether input is checked or not
 * 3) Active class can apply to multiple option list items
 */
	(function () {
		var checkboxTrigger = document.querySelectorAll('.em-js-checkbox-trigger');
		var checkboxChecked = document.querySelectorAll('.em-js-checkbox-trigger:checked');

		for (var i = 0; i < checkboxChecked.length; i++) {
			var checkboxParent = checkboxChecked[i].parentNode.parentNode;
			checkboxParent.classList.add('em-is-active');
		}

		for (var i = 0; i < checkboxTrigger.length; i++) {
			checkboxTrigger[i].addEventListener('change', function () {
				var checkboxTriggerParent = this.parentNode.parentNode;
				if (checkboxTriggerParent.classList.contains('em-is-active')) {
					checkboxTriggerParent.classList.remove('em-is-active');
				}
				else {
					checkboxTriggerParent.classList.add('em-is-active');
				}
			});
		}
	})();
	;/**
 * Click Outside Elements
 * 1) Certain elements need closed when any area not in the element itself is clicked
 * 2) See: http://stackoverflow.com/questions/152975/how-to-detect-a-click-outside-an-element
 * 3) .em-js-nav-dropdown, .em-js-nav-dropdown-trigger, .em-js-dropdown-check, .em-js-dropdown-trigger:not(.em-js-show-hide-trigger), .em-js-dropdown
 */
	(function () {
		// first grab the list of elements that you need to watch - just the elements, we will take care of child elements in the code below
		var elementsToBeClosed = Array.prototype.slice.call(document.querySelectorAll('.em-js-nav-dropdown, .em-js-nav-dropdown-trigger, .em-js-dropdown-check, .em-js-dropdown-trigger:not(.em-js-show-hide-trigger), .em-js-dropdown, .em-js-dropdown-radio, .em-js-dropdown-radio-trigger'));

		// when someone clicks the body, we run this:
		function handleBodyClick(e) {

			// we loop over every element and check...
			var stayOpen = elementsToBeClosed.some(function (el) {

				// ..if it is the actual element
				if (el === e.target) {
					return true;
				}

				// if it's a nested child element of one of the watched
				if (el.contains(e.target)) {
					return true;
				}

				// otherwise we should close them
				return false;
			});

			if (!stayOpen) {

				// var open = document.querySelectorAll('.em-is-active');

				elementsToBeClosed.forEach(function (el) {
					el.classList.remove('em-is-active');
				});
				var header = document.querySelector('.em-c-header')

				if (header) {
					header.classList.remove('em-is-active');
				}
			}
		}
		document.body.addEventListener('click', handleBodyClick);

	})();
	;/**
* Collapsible Table Rows
* 1) On click of a table row trigger, open the hidden table rows below it.
* 2) While the parent has a next sibling and the parent doesn't have em-js-table-row-parent, add visible and open classes
*/

	(function () {
		var collapseTrigger = document.querySelectorAll('.em-js-collapse-trigger');
		var collapseRows = document.querySelectorAll('.em-js-table-row-collapsible');

		for (var i = 0; i < collapseTrigger.length; i++) {

			collapseTrigger[i].addEventListener('click', function (e) {
				e.preventDefault();

				var thisParent = this.parentNode;
				var collapseTriggers = document.querySelectorAll
				var next = [];

				while (thisParent.nextElementSibling && !thisParent.nextElementSibling.classList.contains('em-js-table-row-parent')) {
					next.push(thisParent = thisParent.nextElementSibling);
					if (thisParent.classList.contains('em-is-visible')) {
						this.parentNode.classList.remove('em-is-open'); /* 2 */
						thisParent.classList.remove('em-is-visible'); /* 2 */
					}
					else {
						this.parentNode.classList.add('em-is-open'); /* 2 */
						thisParent.classList.add('em-is-visible'); /* 2 */
					}
				}
			});
		}
	})();
	;/**
 * Collapsible toolbar
 * Adds active class to toolbar trigger and collapsible toolbar parent when clicked on.
 * Removes active class from toolbar trigger and collapsible toolbar parent when clicked on again.
 */

	(function () {

		var toolbarTrigger = document.querySelectorAll('.em-js-toolbar-trigger');
		var toolbarPanel = document.querySelectorAll('.em-js-collapsible-toolbar');

		for (var i = 0; i < toolbarTrigger.length; i++) {

			toolbarTrigger[i].addEventListener('click', function (e) {
				e.preventDefault();

				if (this.parentElement.classList.contains('em-is-active')) {

					this.classList.remove('em-is-active');
					this.parentElement.classList.remove('em-is-active');
				}
				else {
					for (var j = 0; j < toolbarPanel.length; j++) {
						toolbarPanel[j].classList.remove('em-is-active');
						toolbarTrigger[j].classList.remove('em-is-active');
						this.classList.remove('em-is-active');
					}
					this.classList.add('em-is-active');
					this.parentElement.classList.add('em-is-active');
				}

			});
		}
	})();
	;/**
 * Draggable Table Rows
 */
	(function () {

		var draggableTable = document.querySelectorAll('.em-js-table-draggable');

		for (var j = 0; j < draggableTable.length; j++) {

			var dragged = null;

			function updateRows(rowAtInsert) {
				var thisParent = rowAtInsert.parentElement.parentElement;
				var insertIndex = 0;
				var foundIndex = false;
				var newRows = [];

				var tableBody = thisParent.querySelector('.em-js-table-body');
				var tableRows = tableBody.querySelectorAll('.em-js-table-row-draggable');

				for (var i = 0; i < tableRows.length; i++) {
					var row = tableRows[i];
					if (row !== dragged) {
						newRows.push(row);
					}

					if (row === rowAtInsert) {
						foundIndex = true;
					}
					else if (!foundIndex) {
						insertIndex++;
					}
				}

				newRows.splice(insertIndex, 0, dragged);

				for (var i = 0; i < newRows.length; i++) {
					tableBody.appendChild(newRows[i]);
				}
			}

			// Drag callbacks
			function rowDragStart(e) {
				e.dataTransfer.setData("text/plain", '');
				e.target.classList.add('em-is-dragging');
				e.target.style.opacity = '1';
				e.target.style.background = '#bbbbbd';
				dragged = e.target;
			}

			function rowDragEnd(e) {
				dragged = null;
				e.target.style.opacity = '';
				e.target.style.background = 'inherit';
				e.target.classList.remove('em-is-dragging');
			}

			function rowDrop(e) {
				e.preventDefault();
			}

			function rowDragOver(e) {
				e.preventDefault();
				var tr = e.target.parentElement;
				updateRows(tr);
			}

			// Initialization

			var tableRows = document.querySelectorAll('.em-js-table-row-draggable');
			for (var i = 0; i < tableRows.length; i++) {
				tableRows[i].addEventListener('dragover', rowDragOver);
			}

			document.addEventListener('dragstart', rowDragStart);
			document.addEventListener('dragend', rowDragEnd);
			document.addEventListener('drop', rowDrop);
		}

	})();
	;/**
 * Dropdown check
 * Adds active class to dropdown trigger and dropdown check parent when clicked on.
 * Removes active class from dropdown trigger and dropdown check parent when clicked on again.
 */

	(function () {

		var dropdownTrigger = document.querySelectorAll('.em-js-dropdown-trigger');
		var dropdownPanel = document.querySelectorAll('.em-js-dropdown-check');

		for (var i = 0; i < dropdownTrigger.length; i++) {

			dropdownTrigger[i].addEventListener('click', function (e) {
				e.preventDefault();

				if (this.parentElement.classList.contains('em-is-active')) {

					this.classList.remove('em-is-active');
					this.parentElement.classList.remove('em-is-active');
				}
				else {
					for (var j = 0; j < dropdownPanel.length; j++) {
						dropdownPanel[j].classList.remove('em-is-active');
						dropdownTrigger[j].classList.remove('em-is-active');
						this.classList.remove('em-is-active');
					}
					this.classList.add('em-is-active');
					this.parentElement.classList.add('em-is-active');
				}

			});
		}
	})();
	;/**
 * Dropdown radio
 * 1) On click, remove class from dropdown button and component container if component container is active
 * 2) Otherwise, remove classes from all dropdown radios and add classes to this button and container
 */

	(function () {

		var dropdownRadioTrigger = document.querySelectorAll('.em-js-dropdown-radio-trigger');
		var dropdownRadioPanel = document.querySelectorAll('.em-js-dropdown-radio');

		for (var i = 0; i < dropdownRadioTrigger.length; i++) {

			dropdownRadioTrigger[i].addEventListener('click', function (e) {
				e.preventDefault();

				if (this.parentElement.classList.contains('em-is-active')) {

					this.classList.remove('em-is-active'); /* 1 */
					this.parentElement.classList.remove('em-is-active');  /* 1 */
				}
				else {
					for (var j = 0; j < dropdownRadioPanel.length; j++) {
						dropdownRadioPanel[j].classList.remove('em-is-active');/* 2 */
						dropdownRadioTrigger[j].classList.remove('em-is-active');/* 2 */
						this.classList.remove('em-is-active');/* 2 */
					}
					this.classList.add('em-is-active');/* 2 */
					this.parentElement.classList.add('em-is-active');/* 2 */
				}

			});
		}
	})();
	;/**
 * Editable Table
 * 1) Target the table as event listener
 * 2) If the target or target parent class contains em-js-add, clone first child of table, and start with clean cells unless cell contains actions
 * 3) If the target or target parent class contains em-js-edit, create inputs inside editable cells and change button text to Save.
 *    If button text is already "Save" and you click button again, the data written gets saved and the table is no longer editable.
 * 4) If the target or target parent nodes class contains em-js-delete, then the row will be removed from the table
 * 5) If the input field is focused on, highlight all of the text inside immediately, so it is easier to edit
 * 6) IE only adds
 */
	(function () {

		var table = document.querySelectorAll(".em-js-table-editable");/* 1 */
		for (var i = 0; i < table.length; i++) {
			table[i].addEventListener("click", function (e) { /* 1 */
				e.preventDefault();

				var target = e.target;

				if (target.classList.contains("em-js-add") || target.parentNode.classList.contains("em-js-add")) { /* 2 */
					var tableRow = this.querySelector('.em-js-row-actions');
					var clone = tableRow.cloneNode(true); /* 2 */
					var tableBody = tableRow.parentNode;

					tableBody.insertBefore(clone, tableRow);

					var cloneCells = clone.querySelectorAll('.em-js-cell');

					var thisCells = this.querySelectorAll('.em-js-cell-editable');
					for (var j = 0; j < thisCells.length; j++) {
						var buttonText = this.querySelector('.em-js-btn-text');
						var buttonLabel = buttonText.innerHTML;
						var buttonData = buttonText.getAttribute("data-em-btn-text-swap");

						if (buttonLabel == 'Edit') {
							for (var j = 0; j < cloneCells.length; j++) {
								if (!cloneCells[j].classList.contains('em-js-cell-actions')) {
									cloneCells[j].innerText = "";
								}
							}
						}


						this.classList.add('em-is-editing');
						for (var j = 0; j < thisCells.length; j++) {
							if (thisCells[j].classList.contains('em-js-cell-editable')) {

								var editWrapper = document.createElement('input');
								editWrapper.setAttribute('contenteditable', 'true');
								editWrapper.classList.add('em-c-input'); /* 6 */
								editWrapper.classList.add('em-c-input--small'); /* 6 */
								editWrapper.classList.add('em-js-input-wrapper'); /* 6 */

								if (buttonLabel == 'Edit') {
									var cellContents = thisCells[j].innerText;
									thisCells[j].innerText = "";
									thisCells[j].appendChild(editWrapper);
									editWrapper.setAttribute('value', cellContents);
								}
								var editCell = document.querySelectorAll('.em-js-input-wrapper');
								for (var i = 0; i < editCell.length; i++) {
									editCell[i].addEventListener("input", function (e) {
										this.setAttribute("value", this.value);
									});
								}

							}
							var element = thisCells[0];
							element.childNodes[0].focus();
						}
						buttonText.innerHTML = "Save"; /* 3 */
						buttonText.setAttribute("data-em-btn-text-swap", "Edit");
					}
				}

				else if (target.classList.contains("em-js-edit") || target.parentNode.classList.contains("em-js-edit")) { /* 3 */
					var thisCells = this.querySelectorAll('.em-js-cell-editable');

					var buttonText = this.querySelector('.em-js-btn-text');
					var buttonLabel = buttonText.innerHTML;
					var buttonData = buttonText.getAttribute("data-em-btn-text-swap");

					if (buttonLabel == "Save") { /* 3 */
						this.classList.remove('em-is-editing');
						buttonText.innerHTML = "Edit";
						buttonText.setAttribute("data-em-btn-text-swap", "Save");

						for (var j = 0; j < thisCells.length; j++) {
							if (thisCells[j].classList.contains('em-js-cell-editable')) {
								var inputWrapper = thisCells[j].querySelector('.em-js-input-wrapper');
								var inputValue = inputWrapper.getAttribute("value");
								var cellValue = thisCells[j].innerHTML;
								cellValue = inputValue;
								thisCells[j].innerHTML = cellValue;
							}
						}
					}

					else {
						this.classList.add('em-is-editing');
						buttonText.innerHTML = "Save"; /* 3 */
						buttonText.setAttribute("data-em-btn-text-swap", "Edit");

						for (var j = 0; j < thisCells.length; j++) {
							if (thisCells[j].classList.contains('em-js-cell-editable')) {
								var editWrapper = document.createElement('input');
								editWrapper.setAttribute('contenteditable', 'true');
								editWrapper.classList.add('em-c-input'); /* 6 */
								editWrapper.classList.add('em-c-input--small'); /* 6 */
								editWrapper.classList.add('em-js-input-wrapper'); /* 6 */
								var cellContents = thisCells[j].innerText;
								thisCells[j].innerText = "";
								thisCells[j].appendChild(editWrapper);
								editWrapper.setAttribute('value', cellContents);
								var editCell = document.querySelectorAll('.em-js-input-wrapper');
								for (var i = 0; i < editCell.length; i++) {
									editCell[i].addEventListener("input", function (e) {
										this.setAttribute("value", this.value);
									});
								}
							}
						}
						var element = thisCells[0];
						selectElementContents(element);
						element.childNodes[0].focus();
					}
				}

				else if (target.classList.contains("em-js-delete") || target.parentNode.classList.contains("em-js-delete") || target.parentNode.parentNode.classList.contains("em-js-delete") || target.parentNode.parentNode.parentNode.classList.contains("em-js-delete")) { /* 4 */
					var parents = [];
					while (target.parentElement) {
						parents.push(target = target.parentElement);

						if (target.classList.contains('em-js-row-actions')) {
							target.parentNode.removeChild(target); /* 4 */
						}
					}
				}
			});
		}

		var cells = document.querySelectorAll('.em-js-cell-editable');

		for (var j = 0; j < cells.length; j++) { /* 5 */
			cells[j].addEventListener('focus', function (e) {
				if (this.getAttribute("contenteditable") == "true") {
					var element = this;
					selectElementContents(element);/* 5 */
				}
			});
		}

		function selectElementContents(element) { /* 5 */
			var range = document.createRange();
			range.selectNodeContents(element);
			var selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}

	})();
	; (function () {

		var externalLinkPassages = document.querySelectorAll('.em-js-external-links'); //Apply to text passages containing many links

		/**
		 * 1) For passages of text, get all links and check for external links.
		 *    If link is to external source, append SVG icon.
		 */
		for (var i = 0; i < externalLinkPassages.length; i++) {
			var a = externalLinkPassages[i].getElementsByTagName('a'); //Get all links within passage

			for (var j = 0; j < a.length; j++) {
				var linkToCheck = a[j];
				var linkTarget = linkToCheck.getAttribute("target");

				if (checkExternalLink(linkToCheck) || linkTarget == "_blank") { //If link is external
					addIconToExternalLink(linkToCheck); //Apply SVG icon
				}

			}
		}

		/**
		 * Check to see if link is pointing to external site
		 */
		function checkExternalLink(el) {
			var url = el.getAttribute("href"); //Get link href
			var httpRegex = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
			var linkMatch = url.match(httpRegex);

			console.log("linkMatch: " + linkMatch);

			return linkMatch;
		}

		/**
		 * Add external link SVG icon to link
		 */
		function addIconToExternalLink(el) {
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //Create new <svg> element
			svg.setAttribute("class", "em-c-icon");  //Apply Unity icon class to element

			var use = document.createElementNS("http://www.w3.org/2000/svg", "use"); //Create <use> element
			use.setAttributeNS(
				'http://www.w3.org/1999/xlink', // xlink namespace URI
				'href', // attribute (no 'xlink:' required)
				'../../images/em-icons.svg#icon-external-link'); // value to set
			svg.appendChild(use); //Append <use> to <svg>

			el.appendChild(svg);
		}

		var externalLinks = document.querySelectorAll('.em-js-external-link'); //Individual links that have

		for (var i = 0; i < externalLinks.length; i++) {
			var parentNode = externalLinks[i].parentNode;

			if (!hasSomeParentTheClass(externalLinks[i], 'em-js-external-links')) {  //If link isn't within a em-js-external-links passage
				addIconToExternalLink(externalLinks[i]); //Add SVG icon
			}
		}

		function hasSomeParentTheClass(element, classname) {
			if (element.className.split(' ').indexOf(classname) >= 0) return true;
			return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
		}
	})();
	;/**
 * File Upload
 * 1) Run this function every time you browse the file upload
 * 2) Remove previous file upload list items for every file upload
 * 3) Replace empty list with new files if there are files
 * 4) Get rid of upload files if cancel button is hit and replace with message to upload files
 */

	(function () {

		var fileUpload = document.querySelectorAll('.em-c-field--file-upload');

		for (var i = 0; i < fileUpload.length; i++) {

			fileUpload[i].addEventListener('dragover', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});

			fileUpload[i].addEventListener('dragleave', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});

			fileUpload[i].addEventListener("drop", function (e) {

				updateFileBoxInfo(this, e.dataTransfer.files);
				e.stopPropagation();
			});

			fileUpload[i].addEventListener("change", function (e) {
				var thisInput = this.querySelector('.em-c-file-upload');
				updateFileBoxInfo(this, thisInput.files);
				e.stopPropagation();
			});
		};

		function updateFileBoxInfo(el, files) {
			var input = el.querySelector('.em-c-file-upload');
			var list = el.querySelector('.em-js-field-list');
			var listItems = el.querySelectorAll('.em-js-field-item');

			if (files.length > 0) {
				for (var j = 0; j < listItems.length; j++) {
					list.removeChild(listItems[j]); /* 2 */
				}

				for (var k = 0; k < files.length; k++) {
					var listItem = document.createElement('li');
					listItem.classList.add('em-js-field-item'); /* 3 */
					listItem.innerHTML = 'File ' + (k + 1) + ':  ' + files[k].name; /* 3 */
					list.appendChild(listItem); /* 3 */
				}
			}
			else {
				list.innerHTML = "";
				var listItem = document.createElement('li');
				listItem.classList.add('em-js-field-item'); /* 3 */
				listItem.innerHTML = 'Choose files to upload'; /* 3 */
				list.appendChild(listItem); /* 3 */
			}
		}

	})();
	;/**
 * Hidden Utility
 * 1) Add class of em-u-is-hidden on load to any component with em-js-hidden as a class
 * 2) This hides element when JS is working. Shows element when JS is not working.
 */

	(function () {

		var hiddenElement = document.querySelectorAll('.em-js-hidden');

		for (var i = 0; i < hiddenElement.length; i++) {
			hiddenElement[i].classList.add('em-u-is-hidden');/* 1 */
		}

	})();
	;/**
 * Icon Utility script
 *
 * 1) This script creates a shorthand for applying Unity icons to the UI.
 * 2) <span class="em-js-icon" data-icon="#icon-search" />
 */
	(function () {

		var icons = document.querySelectorAll('.em-js-icon'); //Get all icon shorthand instances

		for (var i = 0; i < icons.length; i++) {
			var iconPath = icons[i].getAttribute('data-icon-path') ? icons[i].getAttribute('data-icon-path') : "../../images/"; //Check for icon path  attribute. If one doesn't exist, fall back to default icon image path
			var iconFile = icons[i].getAttribute('data-icon-file') ? icons[i].getAttribute('data-icon-file') : "em-icons.svg"; //Check for icon file attribute. If one doesn't exist, fall back to default icon file
			var iconVal = icons[i].getAttribute('data-icon'); //This is the icon value, i.e. '#icon-search'
			var iconFullPath = iconPath + iconFile + iconVal; //String together full path to icon, i.e. `../../images/em-icons.svg#icon-search`

			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //Create new <svg> element
			svg.setAttribute("class", "em-c-icon");  //Apply Unity icon class to element

			var use = document.createElementNS("http://www.w3.org/2000/svg", "use"); //Create <use> element
			use.setAttributeNS(
				'http://www.w3.org/1999/xlink', // xlink namespace URI
				'href', // attribute (no 'xlink:' required)
				iconFullPath); // value to set
			svg.appendChild(use); //Append <use> to <svg>

			icons[i].parentNode.replaceChild(svg, icons[i]); //Replace span
		}
	})();
	;/**
 * Infinite scroll functionality
 */
	(function () {

		/**
		 * Boolean to check if window scrolled
		 */
		var didScroll = false;

		/**
		 * First item that has infinite scroll that hasn't already been loaded
		 */
		var infiniteScrollItem = document.querySelector('.em-js-infinite-scroll.em-is-loading');

		/**
		 * Lazy Load Threshold
		 *  1) How many pixels between the item to be lazy loaded and the viewport bottom
		 */
		var lazyLoadThreshold = 600;

		/**
		 * Return if no infiniteScrollItem are found
		 */
		if (!infiniteScrollItem) {
			return;
		}

		/**
		 * Add scroll event
		 */
		window.addEventListener('scroll', function () {
			didScroll = true;
		});

		/**
		 * setInterval to prevent scroll event from over-firing.
		 * 1) See http://ejohn.org/blog/learning-from-twitter/
		 */
		setInterval(function () {
			if (didScroll) {
				didScroll = false;
				detectInfiniteScroll();
			}
		}, 250);

		/**
		 * Detect infinite scroll
		 * 1) Get item position and load content if within viewport threshold
		 */
		function detectInfiniteScroll() {
			infiniteScrollItem = document.querySelector('.em-js-infinite-scroll.em-is-loading');

			if (!infiniteScrollItem) { return; }

			var yPos = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
			var windowHeight = window.innerHeight;
			var windowBottom = yPos + windowHeight;
			var url = infiniteScrollItem.getAttribute('data-url');
			var itemTop = infiniteScrollItem.offsetTop;
			var lazyLoadTriggerValue = itemTop - lazyLoadThreshold;

			/**
			 * 1) Check to see if item is within the lazy load threshold
			 * 2) If it is, load the appropriate element
			 */
			if (windowBottom >= lazyLoadTriggerValue) {
				loadItemUrl(infiniteScrollItem, url);
			}
		}


		//Load appropriate infinite scroll item
		function loadItemUrl(el, url) {

			//Make AJAX request for item's URL
			getCORS(url, function (request) {
				var response = request.currentTarget.response || request.target.responseText;
				el.innerHTML = response;
				el.classList.remove('em-is-loading');
			});
		}

		//AJAX function
		function getCORS(url, success) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onload = success;
			xhr.send();
			return xhr;
		}
	})();
	;/**
 * Input Utility script
 *
 * 1) Polyfill
 * 2) This script adds .em-is-active on the focus event of an input
 */


	/*1*/
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector ||
			Element.prototype.webkitMatchesSelector;
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = function (s) {
			var el = this;

			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}

	/*2*/
	(function () {

		var inputs = document.querySelectorAll('.em-js-input');

		for (var i = 0; i < inputs.length; i++) {
			inputs[i].addEventListener('focus', function (e) {
				e.preventDefault();
				e.currentTarget.closest('.em-c-field').classList.add('em-is-active')
			});
			inputs[i].addEventListener('blur', function (e) {
				e.preventDefault();
				e.currentTarget.closest('.em-c-field').classList.remove('em-is-active');
			});
		}

	})();
	;/**
 * Modal
 * 1) Adds active class to em-js-modal when the Modal's id = em-c-stacked-block__title's href
 * 2) Removes active class from em-js-modal when "close" button is clicked
 * 3) Removes active class from em-js-modal when area around modal window is clicked
 * 4) Removes the hash and href on close
 */

	(function () {

		var modalTrigger = document.querySelectorAll('.em-js-modal-trigger');
		var modalPanel = document.querySelectorAll('.em-js-modal');

		for (var i = 0; i < modalPanel.length; i++) {
			modalPanel[i].setAttribute('aria-hidden', 'true');
			modalPanel[i].setAttribute('tabindex', '-1');
		}

		for (var i = 0; i < modalTrigger.length; i++) {
			modalTrigger[i].addEventListener('click', function (e) {
				var origModalTrigger = this;
				var modalLink = this.getAttribute('href'); /* 1 */
				for (var j = 0; j < modalPanel.length; j++) { /* 1 */
					var modalID = modalPanel[j].getAttribute('id'); /* 1 */
					var modalElement = document.getElementById(modalID); /* 1 */

					if (("#" + modalID) == modalLink) {
						if (modalElement.querySelector('.em-js-video')) {
							var vid = modalElement.querySelector('.em-c-video');
							vid.play();
						}
						modalElement.classList.remove('em-is-closed'); /* 1 */
						document.body.classList.add('em-is-disabled');
						modalElement.setAttribute('tabindex', '0');
						modalElement.setAttribute('aria-hidden', 'false');
					}

					var modalActivePanel = document.querySelector('.em-js-modal:not(.em-is-closed)'); /* 2 */
					var modalCloseTrigger = document.querySelectorAll('.em-js-modal-close-trigger'); /* 2 */
					var modalCancelTrigger = document.querySelectorAll('.em-js-modal-cancel-trigger'); /* 2 */
					var modalConfirmTrigger = document.querySelectorAll('.em-js-modal-confirm-trigger'); /* 2 */

					modalCloseTrigger[j].addEventListener('click', function (e) {
						modalActivePanel.classList.add('em-is-closed'); /* 2 */
						document.body.classList.remove('em-is-disabled');
						modalActivePanel.setAttribute('tabindex', '-1');
						origModalTrigger.focus();
						//window.location.replace("#"); /* 4 */
						if (typeof window.history.replaceState == 'function') { /* 4 */
							history.replaceState({}, '', window.location.href.slice(0, -1)); /* 4 */
						}

						pauseVid(); //Pause the video when modal is closed
					});

					if (modalCancelTrigger[j]) {
						modalCancelTrigger[j].addEventListener('click', function (e) {
							modalActivePanel.classList.add('em-is-closed'); /* 2 */
							document.body.classList.remove('em-is-disabled');
							modalActivePanel.setAttribute('tabindex', '-1');
							origModalTrigger.focus();
							window.location.replace("#"); /* 4 */
							if (typeof window.history.replaceState == 'function') { /* 4 */
								history.replaceState({}, '', window.location.href.slice(0, -1)); /* 4 */
							}
						});
					}

					if (modalConfirmTrigger[j]) {
						modalConfirmTrigger[j].addEventListener('click', function (e) {
							modalActivePanel.classList.add('em-is-closed'); /* 2 */
							document.body.classList.remove('em-is-disabled');
							modalActivePanel.setAttribute('tabindex', '-1');
							origModalTrigger.focus();
							window.location.replace("#"); /* 4 */
							if (typeof window.history.replaceState == 'function') { /* 4 */
								history.replaceState({}, '', window.location.href.slice(0, -1)); /* 4 */
							}
						});
					}

					var modalWindow = modalPanel[j].getElementsByClassName('em-js-modal-window');/* 3 */

					modalPanel[j].addEventListener('click', function (e) { /* 3 */
						if (e.target == modalActivePanel) {
							modalActivePanel.classList.add('em-is-closed'); /* 3 */
							document.body.classList.remove('em-is-disabled');
							modalActivePanel.setAttribute('aria-hidden', 'true');/* 3 */
							modalActivePanel.setAttribute('tabindex', '-1');
							origModalTrigger.focus();
							window.location.replace("#"); /* 4 */
							if (typeof window.history.replaceState == 'function') { /* 4 */
								history.replaceState({}, '', window.location.href.slice(0, -1)); /* 4 */
							}
							pauseVid(); //Pause the video when modal is closed
						}
					});
					document.addEventListener('keyup', function (e) {
						if (e.keyCode == 27) {
							modalActivePanel.classList.add('em-is-closed'); /* 3 */
							document.body.classList.remove('em-is-disabled');
							modalActivePanel.setAttribute('aria-hidden', 'true');
							modalActivePanel.setAttribute('tabindex', '-1');
							origModalTrigger.focus();
							window.location.replace("#"); /* 4 */
							if (typeof window.history.replaceState == 'function') { /* 4 */
								history.replaceState({}, '', window.location.href.slice(0, -1)); /* 4 */
							}
							pauseVid(); //Pause the video when modal is closed
						}
					});
				}
			});
		}

		/**
		 * Pause video player
		 */
		function pauseVid() {
			var vid = document.querySelectorAll(".em-js-modal .em-js-video");
			for (var j = 0; j < vid.length; j++) {
				vid[j].pause();
			}
		}

		/**
		 * Modal Automatically Opened (Not Toggled With Trigger)
		 * 2) Removes modal when "close" button is clicked
		 * 3) Removes modal when area around modal window is clicked
		 */

		var modalOnly = document.querySelector('.em-js-modal-only'); /* 2 */
		var modalOnlyCloseTrigger = document.querySelector('.em-js-modal-only .em-js-modal-close-trigger'); /* 2 */
		var modalOnlyCancelTrigger = document.querySelector('.em-js-modal-only .em-js-modal-cancel-trigger'); /* 2 */
		var modalOnlyConfirmTrigger = document.querySelector('.em-js-modal-only .em-js-modal-confirm-trigger'); /* 2 */
		if (modalOnly) {
			modalOnly.setAttribute('aria-hidden', 'false');
			modalOnly.setAttribute('tab-index', '0');
			modalOnlyCloseTrigger.addEventListener('click', function (e) {
				var modalParent = modalOnly.parentNode;
				modalParent.removeChild(modalOnly);
			});
			if (modalOnlyCancelTrigger) {
				modalOnlyCancelTrigger.addEventListener('click', function (e) {
					var modalParent = modalOnly.parentNode;
					modalParent.removeChild(modalOnly);
				});
			}
			if (modalOnlyConfirmTrigger) {
				modalOnlyConfirmTrigger.addEventListener('click', function (e) {
					var modalParent = modalOnly.parentNode;
					modalParent.removeChild(modalOnly);
				});
			}
			modalOnly.addEventListener('click', function (e) { /* 3 */
				if (e.target == modalOnly) {
					var modalParent = modalOnly.parentNode;
					modalParent.removeChild(modalOnly);
				}
			});
			document.addEventListener('keyup', function (e) {
				if (e.keyCode == 27) {
					console.log('test');
					var modalParent = modalOnly.parentNode;
					modalParent.removeChild(modalOnly);
				}
			});
		}
		else {
			return;
		}
	})();
	;/**
 * Primary Navigation Toggle
 * 1) Add and remove active class (em-is-active) of .em-js-nav-panel with click of the .em-js-nav-trigger
 */
	var loadPrimaryNav = (function primaryNav() {

		var headerOverlay = document.createElement('div');
		headerOverlay.classList.add('em-c-header-overlay');
		var headerNode = document.querySelector('.em-c-header');
		if (headerNode) {
			headerNode.parentNode.insertBefore(headerOverlay, headerNode.nextSibling);
		}

		var menuButton = document.querySelectorAll('.em-js-nav-trigger');

		for (var i = 0; i < menuButton.length; i++) {
			menuButton[i].addEventListener('click', function () {
				var buttonLabel = this.querySelector('.em-js-btn-label');
				var buttonText = buttonLabel.innerHTML;
				var buttonCloseText = buttonLabel.getAttribute('data-em-btn-toggle-text');
				var buttonSwap = this.querySelector('.em-js-btn-swap-icon');
				var iconPath = this.querySelector('.em-js-btn-icon');
				var bodyClass = document.querySelector('body');
				var header = this.parentNode.parentNode.parentNode.parentNode;
				var navPanel = header.querySelector('.em-js-nav-panel');

				if (buttonText == "Close") {
					buttonLabel.innerHTML = "Menu";
					iconPath.setAttribute('class', 'em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-icon');
					buttonSwap.setAttribute('class', 'em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-swap-icon em-u-is-hidden');
					this.classList.remove('em-is-active');
					bodyClass.classList.remove('em-is-disabled-small');
					header.classList.remove('em-is-active');
					navPanel.classList.remove('em-is-active');

				}
				else {
					buttonLabel.innerHTML = "Close";
					iconPath.setAttribute('class', 'em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-icon em-u-is-hidden');
					buttonSwap.setAttribute('class', 'em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-swap-icon');
					this.classList.add('em-is-active');
					bodyClass.classList.add('em-is-disabled-small');
					header.classList.add('em-is-active');
					navPanel.classList.add('em-is-active');

				}

			});
		}


		/**
		 * Hide menu and disable overlay when user clicks outside the menu
		 */
		headerOverlay.addEventListener('click', function (e) {
			var activeMenu = document.querySelector('.em-js-nav-dropdown-trigger.em-is-active');
			if (!activeMenu) return;
			toggle(activeMenu);
		});


		/**
		 * Search Icon Button Trigger
		 * 1) Toggles the header search form
		 */

		var searchTrigger = document.querySelectorAll('.em-js-header-search-trigger');
		for (var j = 0; j < searchTrigger.length; j++) {
			searchTrigger[j].addEventListener('click', function (e) {
				e.preventDefault();
				var buttonSwap = this.querySelector('.em-js-btn-swap-icon');
				var iconPath = this.querySelector('.em-js-btn-icon');
				var navPanel = this.parentNode.parentNode.parentNode.parentNode;
				var searchPanel = navPanel.querySelector('.em-js-header-search');
				if (this.classList.contains('em-is-active')) {
					this.classList.remove('em-is-active');
					iconPath.setAttribute('class', 'em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-icon');
					buttonSwap.setAttribute('class', 'em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-swap-icon em-u-is-hidden');
					searchPanel.classList.remove('em-is-active');
				}

				else {
					this.classList.add('em-is-active');
					iconPath.setAttribute('class', 'em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-icon em-u-is-hidden');
					buttonSwap.setAttribute('class', 'em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-swap-icon');
					searchPanel.classList.add('em-is-active');
					var intervalID = setTimeout(function () { searchPanel.querySelector('input[type=search]').focus(); }, 50);
				}

				var navDropdown = document.querySelectorAll('.em-js-nav-dropdown');
				var navDropdownTrigger = document.querySelectorAll('.em-js-nav-dropdown-trigger');
				for (var k = 0; k < navDropdown.length; k++) {
					navDropdown[k].classList.remove('em-is-active');
				}
				for (var k = 0; k < navDropdownTrigger.length; k++) {
					navDropdownTrigger[k].classList.remove('em-is-active');
				}
			});

		}

		/**
		 * First Level Primary Navigation Dropdown Toggle
		 * 1) Add and remove active class (em-is-active) of .em-js-dropdown and .em-js-dropdown-trigger with click of the .em-js-dropdown-trigger
		 */
		var dropdownTrigger = document.querySelectorAll('.em-js-nav-dropdown-trigger');

		for (var l = 0; l < dropdownTrigger.length; l++) {

			dropdownTrigger[l].addEventListener('click', function (e) {
				e.preventDefault();
				toggle(this);
			});
		}

		function toggle(element) {
			var dropdownPanel = element.nextElementSibling;

			if (element.classList.contains('em-is-active')) {
				element.classList.remove('em-is-active');
				element.setAttribute("aria-expanded", "false");
				element.setAttribute("aria-selected", "false");
				dropdownPanel.classList.remove('em-is-active');
				dropdownPanel.setAttribute('aria-hidden', 'true');
				dropdownPanel.setAttribute('aria-selected', 'false');
				if (headerNode) headerNode.classList.remove('em-is-active');
			}
			else {
				var dropdownTriggers = document.querySelectorAll('.em-js-nav-dropdown-trigger');
				for (var i = 0; i < dropdownTriggers.length; i++) {
					dropdownTriggers[i].classList.remove('em-is-active');
					dropdownTriggers[i].setAttribute('aria-expanded', 'false');
					dropdownTriggers[i].setAttribute('aria-selected', 'false');
				}
				var dropdownPanels = document.querySelectorAll('.em-js-nav-dropdown');
				for (var i = 0; i < dropdownPanels.length; i++) {
					dropdownPanels[i].classList.remove('em-is-active');
					dropdownPanels[i].setAttribute('aria-hidden', 'true');
					dropdownPanels[i].setAttribute('aria-selected', 'false');
				}
				element.classList.add('em-is-active');
				element.setAttribute('aria-expanded', 'true');
				element.setAttribute('aria-selected', 'true');
				dropdownPanel.classList.add('em-is-active');
				dropdownPanel.setAttribute('aria-hidden', 'false');
				dropdownPanel.setAttribute('aria-selected', 'true');
				if (headerNode) headerNode.classList.add('em-is-active');
			}
		}
		/**
		 * Mega Menu positioning
		 * 1) Dynamically position the left offset of the megamenu container to the viewport width
		 */
		function positionMegaMenus() {
			var vw = window.innerWidth;
			var megaMenu = document.querySelectorAll('.em-c-primary-nav__sublist--megamenu');

			for (var m = 0; m < megaMenu.length; m++) {
				var megaMenuParent = megaMenu[m].parentNode,
					bodyRect = document.body.getBoundingClientRect(),
					elemRect = megaMenuParent.getBoundingClientRect(),
					offset = elemRect.left - bodyRect.left;

				megaMenu[m].style.left = "-" + offset + "px";
			}
		}

		setTimeout(positionMegaMenus, 100);

		window.addEventListener("resize", positionMegaMenus);


	})();
	;/**
 * Radio Field Options List Item Activation
 * 1) Add active class to any inputs that are initially selected
 * 2) Add and remove active class of option list item depending on whether radio input is selected or not
 * 3) Active class can only apply to 1 option list item
 */
	(function () {

		var radioTrigger = document.querySelectorAll('.em-js-radio-trigger');
		var radioChecked = document.querySelectorAll('.em-js-radio-trigger:checked');

		for (var i = 0; i < radioChecked.length; i++) {
			var radioParent = radioChecked[i].parentNode.parentNode;
			radioParent.classList.add('em-is-active'); /* 1 */
		}

		for (var i = 0; i < radioTrigger.length; i++) {

			radioTrigger[i].addEventListener('click', function () {
				var radioList = this.parentNode.parentNode.parentNode;
				var radioTriggerParent = radioList.querySelectorAll('.em-js-radio-trigger-parent');

				for (var j = 0; j < radioTriggerParent.length; j++) {
					radioTriggerParent[j].classList.remove('em-is-active'); /* 2 */
				}

				var radioTriggerParent = this.parentNode.parentNode;
				radioTriggerParent.classList.add('em-is-active'); /* 2 */
			});
		}

	})();
	;/**
 * Range slider value update
 * 1) Addd all the sliders to slider var
 * 2) Update slider label value based on the slider handle, addEventListener change for IE
 * 3) Slider value works on multiple option list items
 */
	(function () {

		var slider = document.querySelectorAll('.em-js-range-slider');

		for (var i = 0; i < slider.length; i++) {
			slider[i].addEventListener("input", function () {
				var slidervalue = this.lastElementChild;
				var slideroutput = this.firstElementChild.lastElementChild;
				slideroutput.innerHTML = slidervalue.value;
			});

			slider[i].addEventListener("change", function () {
				var slidervalue = this.lastElementChild;
				var slideroutput = this.firstElementChild.lastElementChild;
				slideroutput.innerHTML = slidervalue.value;
			});
		}

	})();
	;/**
 * Expandable section
 * 1) Add active state to the parent if trigger is clicked when section is collapsed
 * 2) Remove active state if trigger is clicked when section is expanded
 */

	(function () {

		var sectionHeader = document.querySelectorAll('.em-js-section-trigger');

		for (var i = 0; i < sectionHeader.length; i++) {
			sectionHeader[i].parentNode.classList.add('em-is-closed');
			sectionHeader[i].addEventListener('click', function () {
				var thisParent = this.parentNode;
				if (thisParent.classList.contains('em-is-closed')) {
					thisParent.classList.remove('em-is-closed')
				}
				else {
					thisParent.classList.add('em-is-closed');
				}
			});
		}

	})();
	;/**
 * Select Panel Navigation
 * 1) Add active class to the first tab and panel by default
 * 2) On click of new select item, remove all panel's active classes before adding class on related panel
 * 3) Get selected value from select menu and show panel that has the same ID as select value
 */

	(function () {

		var panelContainer = document.querySelectorAll('.em-c-select-panel__body');
		var panelTrigger = document.querySelectorAll('.em-js-select-panel-trigger');

		var tabBtn = document.querySelectorAll('.em-js-tab');
		var tabContent = document.querySelectorAll('.em-js-tabs-panel');

		for (var i = 0; i < panelContainer.length; i++) {
			var panelFirst = panelContainer[i].querySelector('.em-js-select-panel-panel:first-child');
			panelFirst.classList.add('em-is-active'); /* 1 */
		}

		for (var i = 0; i < panelTrigger.length; i++) {
			panelTrigger[i].addEventListener('change', function () {
				var panelPanel = document.querySelectorAll('.em-js-select-panel-panel');
				for (var j = 0; j < panelPanel.length; j++) {
					panelPanel[j].classList.remove('em-is-active'); /* 2 */
				}
				var selectedOption = this.options[this.selectedIndex].value; /* 3 */
				var selectedPanel = document.getElementById(selectedOption); /* 3 */
				selectedPanel.classList.add('em-is-active'); /* 3 */
			});
		}

	})();
	;/**
 * Show/Hide
 * 1) Clicking a trigger toggles the visibility of the target and changes the trigger's label
 */

	(function (document, window, undefined) {
		'use strict';

		// Triggers
		var triggers = document.querySelectorAll('.em-js-show-hide-trigger');
		var targets = document.querySelectorAll('.em-js-show-hide-target');

		for (var i = 0; i < targets.length; i++) {
			targets[i].classList.add('em-u-is-hidden');
		}

		for (var i = 0; i < triggers.length; i++) {
			triggers[i].setAttribute('data-show-hide-initial-label', triggers[i].innerText);
		}

		var displayContent = function (trigger, target) {
			if (target.classList.contains('em-u-is-hidden')) {
				// Show target
				target.classList.remove('em-u-is-hidden');
				trigger.setAttribute('aria-expanded', 'true');
				target.setAttribute('aria-hidden', 'false');
				var btnText = trigger.querySelector('.em-js-btn-text');
				btnText.innerText = trigger.getAttribute('data-show-hide-label');
			} else {
				// Hide target
				target.classList.add('em-u-is-hidden');
				trigger.setAttribute('aria-expanded', 'false');
				target.setAttribute('aria-hidden', 'true');
				var btnText = trigger.querySelector('.em-js-btn-text');
				btnText.innerText = trigger.getAttribute('data-show-hide-initial-label');
			}
		};

		[].forEach.call(triggers, function (trigger, index) {
			// Target var
			var target = trigger.nextElementSibling;

			// Set trigger attributes
			trigger.setAttribute('id', 'trigger-' + index);
			trigger.setAttribute('aria-expanded', 'false');
			trigger.setAttribute('aria-controls', 'content-' + index);

			// Set target attributes
			target.setAttribute('id', 'content-' + index);
			target.setAttribute('aria-hidden', 'true');
			target.setAttribute('aria-labelledby', 'trigger-' + index);

			trigger.addEventListener('click', function () {
				displayContent(this, target);
				return false;
			}, false);

			trigger.addEventListener('keydown', function (event) {
				// Handle 'space' key
				if (event.which === 32) {
					event.preventDefault();
					displayContent(this, target);
				}
			}, false);

		});

	})(document, window);
	;/*!
 * Stickyfill -- `position: sticky` polyfill
 * v. 1.1.4 | https://github.com/wilddeer/stickyfill
 * Copyright Oleg Korsunsky | http://wd.dizaina.net/
 *
 * MIT License
 */
	!function (a, b) { function c() { y = D = z = A = B = C = K } function d(a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) } function e(a) { return parseFloat(a) || 0 } function f() { F = { top: b.pageYOffset, left: b.pageXOffset } } function g() { return b.pageXOffset != F.left ? (f(), void z()) : void (b.pageYOffset != F.top && (f(), i())) } function h(a) { setTimeout(function () { b.pageYOffset != F.top && (F.top = b.pageYOffset, i()) }, 0) } function i() { for (var a = H.length - 1; a >= 0; a--)j(H[a]) } function j(a) { if (a.inited) { var b = F.top <= a.limit.start ? 0 : F.top >= a.limit.end ? 2 : 1; a.mode != b && p(a, b) } } function k() { for (var a = H.length - 1; a >= 0; a--)if (H[a].inited) { var b = Math.abs(t(H[a].clone) - H[a].docOffsetTop), c = Math.abs(H[a].parent.node.offsetHeight - H[a].parent.height); if (b >= 2 || c >= 2) return !1 } return !0 } function l(a) { isNaN(parseFloat(a.computed.top)) || a.isCell || "none" == a.computed.display || (a.inited = !0, a.clone || q(a), "absolute" != a.parent.computed.position && "relative" != a.parent.computed.position && (a.parent.node.style.position = "relative"), j(a), a.parent.height = a.parent.node.offsetHeight, a.docOffsetTop = t(a.clone)) } function m(a) { var b = !0; a.clone && r(a), d(a.node.style, a.css); for (var c = H.length - 1; c >= 0; c--)if (H[c].node !== a.node && H[c].parent.node === a.parent.node) { b = !1; break } b && (a.parent.node.style.position = a.parent.css.position), a.mode = -1 } function n() { for (var a = H.length - 1; a >= 0; a--)l(H[a]) } function o() { for (var a = H.length - 1; a >= 0; a--)m(H[a]) } function p(a, b) { var c = a.node.style; switch (b) { case 0: c.position = "absolute", c.left = a.offset.left + "px", c.right = a.offset.right + "px", c.top = a.offset.top + "px", c.bottom = "auto", c.width = "auto", c.marginLeft = 0, c.marginRight = 0, c.marginTop = 0; break; case 1: c.position = "fixed", c.left = a.box.left + "px", c.right = a.box.right + "px", c.top = a.css.top, c.bottom = "auto", c.width = "auto", c.marginLeft = 0, c.marginRight = 0, c.marginTop = 0; break; case 2: c.position = "absolute", c.left = a.offset.left + "px", c.right = a.offset.right + "px", c.top = "auto", c.bottom = 0, c.width = "auto", c.marginLeft = 0, c.marginRight = 0 }a.mode = b } function q(a) { a.clone = document.createElement("div"); var b = a.node.nextSibling || a.node, c = a.clone.style; c.height = a.height + "px", c.width = a.width + "px", c.marginTop = a.computed.marginTop, c.marginBottom = a.computed.marginBottom, c.marginLeft = a.computed.marginLeft, c.marginRight = a.computed.marginRight, c.padding = c.border = c.borderSpacing = 0, c.fontSize = "1em", c.position = "static", c.cssFloat = a.computed.cssFloat, a.node.parentNode.insertBefore(a.clone, b) } function r(a) { a.clone.parentNode.removeChild(a.clone), a.clone = void 0 } function s(a) { var b = getComputedStyle(a), c = a.parentNode, d = getComputedStyle(c), f = a.style.position; a.style.position = "relative"; var g = { top: b.top, marginTop: b.marginTop, marginBottom: b.marginBottom, marginLeft: b.marginLeft, marginRight: b.marginRight, cssFloat: b.cssFloat, display: b.display }, h = { top: e(b.top), marginBottom: e(b.marginBottom), paddingLeft: e(b.paddingLeft), paddingRight: e(b.paddingRight), borderLeftWidth: e(b.borderLeftWidth), borderRightWidth: e(b.borderRightWidth) }; a.style.position = f; var i = { position: a.style.position, top: a.style.top, bottom: a.style.bottom, left: a.style.left, right: a.style.right, width: a.style.width, marginTop: a.style.marginTop, marginLeft: a.style.marginLeft, marginRight: a.style.marginRight }, j = u(a), k = u(c), l = { node: c, css: { position: c.style.position }, computed: { position: d.position }, numeric: { borderLeftWidth: e(d.borderLeftWidth), borderRightWidth: e(d.borderRightWidth), borderTopWidth: e(d.borderTopWidth), borderBottomWidth: e(d.borderBottomWidth) } }, m = { node: a, box: { left: j.win.left, right: J.clientWidth - j.win.right }, offset: { top: j.win.top - k.win.top - l.numeric.borderTopWidth, left: j.win.left - k.win.left - l.numeric.borderLeftWidth, right: -j.win.right + k.win.right - l.numeric.borderRightWidth }, css: i, isCell: "table-cell" == b.display, computed: g, numeric: h, width: j.win.right - j.win.left, height: j.win.bottom - j.win.top, mode: -1, inited: !1, parent: l, limit: { start: j.doc.top - h.top, end: k.doc.top + c.offsetHeight - l.numeric.borderBottomWidth - a.offsetHeight - h.top - h.marginBottom } }; return m } function t(a) { for (var b = 0; a;)b += a.offsetTop, a = a.offsetParent; return b } function u(a) { var c = a.getBoundingClientRect(); return { doc: { top: c.top + b.pageYOffset, left: c.left + b.pageXOffset }, win: c } } function v() { G = setInterval(function () { !k() && z() }, 500) } function w() { clearInterval(G) } function x() { I && (document[L] ? w() : v()) } function y() { I || (f(), n(), b.addEventListener("scroll", g), b.addEventListener("wheel", h), b.addEventListener("resize", z), b.addEventListener("orientationchange", z), a.addEventListener(M, x), v(), I = !0) } function z() { if (I) { o(); for (var a = H.length - 1; a >= 0; a--)H[a] = s(H[a].node); n() } } function A() { b.removeEventListener("scroll", g), b.removeEventListener("wheel", h), b.removeEventListener("resize", z), b.removeEventListener("orientationchange", z), a.removeEventListener(M, x), w(), I = !1 } function B() { A(), o() } function C() { for (B(); H.length;)H.pop() } function D(a) { for (var b = H.length - 1; b >= 0; b--)if (H[b].node === a) return; var c = s(a); H.push(c), I ? l(c) : y() } function E(a) { for (var b = H.length - 1; b >= 0; b--)H[b].node === a && (m(H[b]), H.splice(b, 1)) } var F, G, H = [], I = !1, J = a.documentElement, K = function () { }, L = "hidden", M = "visibilitychange"; void 0 !== a.webkitHidden && (L = "webkitHidden", M = "webkitvisibilitychange"), b.getComputedStyle || c(); for (var N = ["", "-webkit-", "-moz-", "-ms-"], O = document.createElement("div"), P = N.length - 1; P >= 0; P--) { try { O.style.position = N[P] + "sticky" } catch (Q) { } "" != O.style.position && c() } f(), b.Stickyfill = { stickies: H, add: D, remove: E, init: y, rebuild: z, pause: A, stop: B, kill: C } }(document, window), window.jQuery && !function ($) { $.fn.Stickyfill = function (a) { return this.each(function () { Stickyfill.add(this) }), this } }(window.jQuery);

	/**
	 * Sticky functionality
	 * 1) The sticky functionality uses Stickyfill to provide sticky funcitonality
	 *    for browsers that don't support `position: sticky`
	 */

	var stickyElements = document.getElementsByClassName('em-js-sticky');

	for (var i = stickyElements.length - 1; i >= 0; i--) {
		Stickyfill.add(stickyElements[i]);
	}
	;/**
 * Switch Activation
 * 1) Add active class to any inputs that are initially checked
 * 2) Add and remove active class depending on whether input is checked or not
 * 3) Active class can apply to multiple option list items
 */
	(function () {
		var switchTrigger = document.querySelectorAll('.em-js-switch-trigger');
		var switchChecked = document.querySelectorAll('.em-js-switch-trigger:checked');

		for (var i = 0; i < switchChecked.length; i++) {
			var switchParent = switchChecked[i].parentNode;
			switchParent.classList.add('em-is-active');
		}

		for (var i = 0; i < switchTrigger.length; i++) {
			switchTrigger[i].addEventListener('change', function () {
				var switchTriggerParent = this.parentNode;
				if (switchTriggerParent.classList.contains('em-is-active')) {
					switchTriggerParent.classList.remove('em-is-active');
				}
				else {
					switchTriggerParent.classList.add('em-is-active');
				}
			});
		}
	})();
	;/**
 * Table of Contents Functionality
 * 1) Builds a table of contents navigation and updates headings
 */
	(function () {

		var toc = "",
			level = 0,
			isScrolling = false, //Is window currently animating to a headline?
			scrollSpeed = 500, //Scroll animation duration
			didScroll = false, // Boolean to check if window scrolled
			headingOffsets = [],
			tocBody = document.querySelector(".em-js-table-of-contents-body");

		/**
		 * If no table of contents objects are found, stop executing
		 */
		if (!tocBody) {
			return;
		}

		/**
		 * Add anchors to headings and build Table of Contents nav
		 */
		document.querySelector(".em-js-table-of-contents-body").innerHTML =

			document.querySelector(".em-js-table-of-contents-body").innerHTML.replace(
				/<h([\d])>([^<]+)<\/h([\d])>/gi,

				function (str, openLevel, titleText, closeLevel) {
					if (openLevel != closeLevel) {
						return str;
					}
					if (openLevel > 1) {
						if (openLevel > level) {
							toc += (new Array(openLevel - level + 1)).join("<ol class='em-c-tree__list'><li class='em-c-tree__item'>");
						} else if (openLevel < level) {
							toc += (new Array(level - openLevel + 1)).join("</li></ol>");
						}
					}

					level = parseInt(openLevel);
					if (openLevel > 1) {
						var anchor = titleText.replace(/ /g, "_");
						toc += "<a href=\"#" + anchor + "\" class='em-c-tree__link em-js-table-of-contents-item'>" + titleText
							+ "</a>";
					}

					return "<h" + openLevel + " id=\"" + anchor + "\" class='em-js-table-of-contents-heading'>" + titleText + "</h" + closeLevel + ">";
				}
			);

		if (level) {
			toc += (new Array(level + 1)).join("</ol>");
		}

		var tocElement = document.querySelector(".em-js-table-of-contents");

		if (!tocElement) {
			return;
		}

		tocElement.innerHTML += toc;

		var tocElements = document.querySelectorAll('.em-js-table-of-contents-item');

		if (!tocElements) {
			return;
		}

		/**
		 * Add click event for each table of contents item
		 */
		for (var i = 0; i < tocElements.length; i++) {

			tocElements[i].addEventListener('click', function (event) {
				event.preventDefault();

				removeActiveLinks();
				this.classList.add('em-is-active'); //Add active state to current item
				isScrolling = true;

				// Get anchor link and calculate distance from the top
				var dataID = this.getAttribute('href');
				var dataTarget = document.querySelector(dataID);

				// If the anchor exists
				if (dataTarget) {
					// Scroll to the anchor
					gradualScroll(dataTarget, scrollSpeed || scrollSpeed);
				}

				/**
				 * Set isScrolling back to false after animation completes
				 */
				var scrollTimeout = window.setTimeout(function () {
					isScrolling = false;
				}, scrollSpeed);
			});
		}

		/**
		 * Remove active state from each table of contents link
		 */
		function removeActiveLinks() {
			for (var i = 0; i < tocElements.length; i++) {
				tocElements[i].classList.remove('em-is-active');
			}
		}

		/**
		 * Add window scroll event
		 */
		window.addEventListener('scroll', function () {
			didScroll = true;
		});

		/**
		 * setInterval to prevent scroll event from over-firing.
		 * 1) See http://ejohn.org/blog/learning-from-twitter/
		 */
		setInterval(function () {
			if (didScroll) {
				didScroll = false;
				checkCurrentHeading();
			}
		}, 250);

		/**
		 * Check current document scrollTop position and update table of contents active state to match
		 * closest heading
		 */
		function checkCurrentHeading() {
			var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
			var closest = Number.MAX_VALUE, index = 0;

			var headings = document.querySelectorAll(".em-js-table-of-contents-heading");

			for (i = 1; i < headings.length; i++) {
				var offset = headings[i].offsetTop;
				headingOffsets.push(offset);
			}

			for (var i = 0, c = headingOffsets.length; i < c; i++) {
				var currentClosest = Math.abs(headingOffsets[i] - y);

				if (currentClosest < closest) {
					index = i;
					closest = currentClosest;

					//If window isn't currently scrolling to headline
					if (isScrolling == false) {
						updateHeading(i);
					}
				}
			}
		}

		/**
		 * Remove table of contents active states and apply to current active item
		 */
		function updateHeading(index) {
			removeActiveLinks();
			tocElements[index].classList.add('em-is-active');
		}

		/**
		 * Check to see if element is in viewport
		 */
		function isElementInViewport(el) {
			var rect = el.getBoundingClientRect();

			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
				rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
			);
		}

		/**
		 * Table of Contents Scrolling
		 * Scrolls content to the anchor link gradually instead of going straight to the link
		 */

		// Function to animate the scroll
		var gradualScroll = function (anchor, duration) {

			// Calculate how far and how fast to scroll
			var startLocation = window.pageYOffset;
			var endLocation = anchor.offsetTop;
			var distance = endLocation - startLocation;
			var increments = distance / (duration / 16);
			var stopAnimation;

			// Scroll the page by an increment, and check if it's time to stop
			var animateScroll = function () {
				window.scrollBy(0, increments);
				stopAnimation();
			};

			// If scrolling down
			if (increments >= 0) {
				// Stop animation when you reach the anchor OR the bottom of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
						clearInterval(runAnimation);
					}
				};
			}
			// If scrolling up
			else {
				// Stop animation when you reach the anchor OR the top of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if (travelled <= (endLocation || 0)) {
						clearInterval(runAnimation);
					}
				};
			}

			// Loop the animation function
			var runAnimation = setInterval(animateScroll, 16);

		};

	})();
	;/**
 * Table Active Rows Activation
 * 1) Add and remove active class to tabs depending on which one you click on
 * 2) Add the id to the URL
 * 3) Add active class to the first tab and panel by default
 */
	(function () {

		var tableRow = document.querySelectorAll('.em-js-table-row-selectable');

		for (var i = 0; i < tableRow.length; i++) {

			tableRow[i].addEventListener('click', function (e) {

				if (this.classList.contains('em-is-active')) {
					this.classList.remove('em-is-active');
				}
				else {
					this.classList.add('em-is-active');
				}

			});
		}

	})();
	;/**
 * Tabs Activation
 * 1) Add active class to the first tab and panel by default
 * 2) Add and remove active class to tabs depending on which one you click on
 */

	(function () {

		var tabContainer = document.querySelectorAll('.em-js-tabs');
		var tabBtn = document.querySelectorAll('.em-js-tab');
		var tabContent = document.querySelectorAll('.em-js-tabs-panel');

		for (var i = 0; i < tabContainer.length; i++) {
			var tabFirst = tabContainer[i].querySelector('.em-js-tab:first-child');
			var tabPanelFirst = tabContainer[i].querySelector('.em-js-tabs-panel:first-child');
			tabFirst.classList.add('em-is-active'); /* 1 */
			tabPanelFirst.classList.add('em-is-active'); /* 1 */
		}

		for (var i = 0; i < tabBtn.length; i++) {
			tabBtn[i].addEventListener('click', function (e) {
				e.preventDefault();
				openTab(this);
			});
		}

		function openTab(el) {
			var thisHref = el.getAttribute('href');

			var tabParent = el.parentNode.parentNode.parentNode;
			var tabBtns = tabParent.querySelectorAll('.em-js-tab');

			for (var j = 0; j < tabBtns.length; j++) {
				tabBtns[j].classList.remove('em-is-active'); /* 2 */
			}

			el.classList.add('em-is-active'); /* 2 */

			var newHref = document.querySelector(thisHref);
			var newerHref = newHref.querySelector('.em-js-tabs-panel');
			var firstLink = newHref.querySelector('.em-js-tab');
			if (firstLink) {
				firstLink.classList.add('em-is-active');
			}

			var tabsPanel = tabParent.querySelectorAll('.em-js-tabs-panel');
			for (var j = 0; j < tabsPanel.length; j++) {
				tabsPanel[j].classList.remove('em-is-active'); /* 2 */
				if (newerHref) {
					newerHref.classList.add('em-is-active');
				}
			}

			document.querySelector(thisHref).classList.add('em-is-active'); /* 2 */
		}


	})();
	; (function () {
		var tagsTrigger = document.querySelectorAll('.em-js-tags-trigger');
		var counter = 0;
		//Add click event for each carousel link
		for (var j = 0; j < tagsTrigger.length; j++) {
			tagsTrigger[j].addEventListener('click', function (event) {
				event.preventDefault();
				var parent = this.parentNode;
				var parentParents = parent.parentNode;
				var parentGrandparents = parentParents.parentNode;
				var parentGreatGrandparents = parentGrandparents.parentNode
				parentParents.removeChild(parent); //Regular remove() does not work in IE
				counter++;
				if (counter == tagsTrigger.length) {
					parentGrandparents.removeChild(parentParents);
					parentGreatGrandparents.removeChild(parentGrandparents);
				}
			});
		}

	})();
	;/**
 * Tooltip set attributes
 * 1) Add aria hidden unless hovered or focused on
 * 2) Add tab index of 0 so tooltip can be activated when tabbed to
 * 3) Set aria-hidden to false on hover and true off of hover
 */

	(function () {
		var tooltipTrigger = document.querySelectorAll('.em-js-tooltip-trigger');
		var tooltipPanel = document.querySelectorAll('.em-js-tooltip');

		for (var i = 0; i < tooltipPanel.length; i++) {
			tooltipPanel[i].setAttribute('tabindex', '0'); /* 2 */
			tooltipPanel[i].setAttribute('role', 'tooltip');
		}

		for (var i = 0; i < tooltipTrigger.length; i++) {
			tooltipTrigger[i].setAttribute('aria-hidden', 'true'); /* 1 */
			tooltipTrigger[i].addEventListener("mouseover", function (e) {
				e.preventDefault();
				this.setAttribute('aria-hidden', 'false'); /* 3 */
			});
			tooltipTrigger[i].addEventListener("mouseout", function (e) {
				e.preventDefault();
				this.setAttribute('aria-hidden', 'true');/* 3 */
			});
			tooltipTrigger[i].addEventListener('click', function (e) {
				e.preventDefault();
				var thisParent = this.parentNode;
				if (thisParent.classList.contains('em-is-active')) {
					this.setAttribute('aria-hidden', 'true');
					thisParent.classList.remove('em-is-active');
				}
				else {
					this.setAttribute('aria-hidden', 'false');
					thisParent.classList.add('em-is-active');
				}
			});
		}

	})();
	; (function () {
		/**
		 * First Level Tree Navigation Dropdown Toggle
		 * 1) Remove class of em-is-active of tree dropdown trigger and tree nav panel if tree dropdown trigger contains active class
		 * 2) Add class of em-is-active of tree dropdown trigger and tree nav panel if tree dropdown if tree dropdown does not contain active class
		 * 3) Add ARIA attributes showing hidden, selected, and expanded classes depending on whether the nav is active or not
		 */

		var treeTrigger = document.querySelectorAll('.em-js-tree-dropdown-trigger');
		for (var i = 0; i < treeTrigger.length; i++) {

			treeTrigger[i].addEventListener('click', function (e) {

				e.preventDefault();

				var treePanel = this.nextElementSibling;

				if (this.classList.contains('em-is-active')) {
					this.classList.remove('em-is-active'); /* 1 */
					this.setAttribute("aria-expanded", "false"); /* 3 */
					this.setAttribute("aria-selected", "false"); /* 3 */
					treePanel.classList.remove('em-is-active'); /* 1 */
					treePanel.setAttribute('aria-hidden', 'true'); /* 3 */
					treePanel.setAttribute('aria-selected', 'false'); /* 3 */
				}
				else {

					this.classList.add('em-is-active'); /* 2 */
					this.setAttribute('aria-expanded', 'true'); /* 3 */
					this.setAttribute('aria-selected', 'true'); /* 3 */
					treePanel.classList.add('em-is-active'); /* 2 */
					treePanel.setAttribute('aria-hidden', 'false'); /* 3 */
					treePanel.setAttribute('aria-selected', 'true'); /* 3 */
				}
			});
		}
	})();





}
