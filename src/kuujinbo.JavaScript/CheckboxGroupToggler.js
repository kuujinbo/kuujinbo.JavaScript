function CheckboxGroupToggler() {
    this._checkGroupSelector = '';
}

CheckboxGroupToggler.prototype = {
    constructor: CheckboxGroupToggler,
    getCheckAllHtml: function () {
        return "<span class='glyphicon glyphicon-check'></span> Check All";
    },
    getUncheckAllHtml: function () {
        return "<span class='glyphicon glyphicon-unchecked'></span> Uncheck All";
    },
    getCheckGroup: function () {
        return document.querySelector(this._checkGroupSelector);
    },
    setCheckGroupSelector: function (selector) {
        this._checkGroupSelector = selector;
    },
    addToggleElement: function () {
        var checkGroup = this.getCheckGroup();
        if (checkGroup !== null) {
            var toggler = document.createElement('span');
            toggler.innerHTML = "<button type='button' class='btn btn-primary checked' style='text-align:left;width:120px'>"
                + this.getCheckAllHtml()
                + '</button>';
            toggler.addEventListener(
                'click', this.clickToggleElement.bind(this), false
            );
            // add toggler **immediately** following target element
            checkGroup.parentNode.insertBefore(toggler, checkGroup.nextSibling);
        }
    },
    clickToggleElement: function (e) {
        var checkGroup = this.getCheckGroup();
        if (checkGroup !== null) {
            var toggler = e.target;
            if (toggler.classList.contains('checked')) {
                var elements = checkGroup.querySelectorAll('input[type="checkbox"]:not(:checked)');
                for (i = 0; i < elements.length; ++i) elements[i].checked = true;
                toggler.className = 'btn btn-default';
                toggler.innerHTML = this.getUncheckAllHtml();
            } else {
                var elements = checkGroup.querySelectorAll('input[type="checkbox"]:checked');
                for (i = 0; i < elements.length; ++i) elements[i].checked = false;
                toggler.className = 'btn btn-primary checked';
                toggler.innerHTML = this.getCheckAllHtml();
            }
        }
    }
}