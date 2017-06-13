+function ($) {

    var DataTable = function (element, options) {

        var _default = {

            number: 4

        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        this.checkbox = [];

        _rendering.call(this);

        _event.call(this);


    };


    function _rendering() {


        var tableHeader = [];

        tableHeader.push('<div data-role="table-header">');

        tableHeader.push('<table width="100%" class="table table-hover">');

        tableHeader.push('<thead>');

        tableHeader.push('<tr></tr>');

        tableHeader.push('</thead>');

        tableHeader.push('</table>');

        tableHeader.push('</div>');


        var tableBody = [];

        tableBody.push('<div data-role="table-body">');

        tableBody.push('<table width="100%" class="table table-hover">');

        tableBody.push('<colgroup>');

        tableBody.push('</colgroup>');

        tableBody.push('<tbody>');

        tableBody.push('</tbody>');

        tableBody.push('</table>');

        tableBody.push('</div>');

        this.$element.append(tableHeader.join("")).append(tableBody.join(""));

        if (this.options.type) {

            this.$element.find('[data-role=table-body] .table').addClass(this.options.type);

            this.$element.find('[data-role=table-header] .table').addClass(this.options.type)

        }

        _setTitle.call(this);

        _setBodyWidth.call(this);

        _setForm.call(this)


    }

    function _setTitle() {

        var $this = this;

        $.each(this.options.informationTable, function (i, data) {

            var _th = $('<th>');

            _th.text(data.title);

            $('[data-role=table-header] tr', $this.$element).append(_th)

        });

        var elm = $('[data-role=table-header] tr th', $this.$element);

        _setWidth.call(this, elm)


    }

    function _setBodyWidth() {

        var $this = this;

        $.each(this.options.informationTable, function (i) {

            var _col = $('<col>');

            $('[data-role=table-body] colgroup', $this.$element).append(_col)

        });

        var elm = $('[data-role=table-body] colgroup col', $this.$element);

        _setWidth.call(this, elm)


    }

    function _setWidth(elm) {

        var $this = this;

        $.each(this.options.informationTable, function (i, data) {

            $(elm).eq(i).attr('width', data.width)

        })


    }

    function _setTurnPage() {


        var prevAll = $('<a href="javascript:void(0)" data-page="prevAll"><i class="icon-arrow-left-3"></i></a>'),

            nextAll = $('<a href="javascript:void(0)" data-page="nextAll"><i class="icon-arrow-right-3"></i></a>'),

            pageBody = $('<span class="turn-page-body">'),

            prev = $('<a href="javascript:void(0)" data-page="prev" ><i class="icon-arrow-left-1"></i></a>'),

            next = $('<a href="javascript:void(0)" data-page="next"><i class="icon-arrow-right-1"></i></a>'),

            _page = $('<div class="turn-page"></div>'),

            pageData = $('tr[data-role="table-page"] td', this.$element).html();

        pageBody.append(pageData);

        _page.append(prevAll).append(prev).append(pageBody).append(next).append(nextAll);

        this.$element.find('[data-role="table-body"]').after(_page);

        $('tr[data-role="table-page"]', this.$element).remove();


        var number = $('.turn-page > .turn-page-body >a.on', this.$element).index() + 1;

        _setTurnPageStyle.call(this, number);

    }

    //设置分页样式
    function _setTurnPageStyle(number) {

        var _ele = $('.turn-page > .turn-page-body >a', this.$element),

            sum = _ele.length;

        $('.turn-page > .turn-page-body >a', this.$element).css('display', 'inline-block');

        if (number <= (this.options.number * 2 + 1 )) {


            _ele.eq(this.options.number * 2).nextAll().css('display', 'none');

            $('.turn-page > a[data-page="prevAll"]', this.$element).addClass('disabled')


        }
        else if ((sum - number) < (this.options.number * 2 + 1 )) {


            _ele.eq(sum - this.options.number * 2 - 1).prevAll().css('display', 'none');

            $('.turn-page > a[data-page="nextAll"]', this.$element).addClass('disabled')


        }

        else {


            _ele.eq(number - (this.options.number + 1)).prevAll().css('display', 'none');

            _ele.eq(number + (this.options.number - 1)).nextAll().css('display', 'none');


            $('.turn-page > a[data-page="prevAll"]', this.$element).removeClass('disabled');

            $('.turn-page > a[data-page="nextAll"]', this.$element).removeClass('disabled')


        }


    }

    function _event() {

        var $this = this;

        this.$element.on('click', '.turn-page a[data-page="prevAll"]', function () {

            var on = $('.turn-page > .turn-page-body >a:visible', $this.$element).eq($this.options.number).index() + 1,

                number = on - ($this.options.number * 2 + 1);

            if (on > ($this.options.number + 1)) {

                _setTurnPageStyle.call($this, number)

            }

        })

            .on('click', '.turn-page a[data-page="nextAll"]', function () {

                var on = $('.turn-page > .turn-page-body >a:visible', $this.$element).eq($this.options.number).index() + 1,

                    number = on + ($this.options.number * 2 + 1);

                _setTurnPageStyle.call($this, number)

            })

            .on('click', '.turn-page a[data-page="next"]', function () {

                var on = $('.turn-page > .turn-page-body >a.on', $this.$element).index() + 1,

                    number = on + 1;

                _setTurnPageStyle.call($this, number);

                $this.loadData(number)

            })
            .on('click', '.turn-page a[data-page="prev"]', function () {

                var on = $('.turn-page > .turn-page-body >a.on', $this.$element).index() + 1,

                    number = on - 1;

                _setTurnPageStyle.call($this, number);

                $this.loadData(number)

            })

            .on('click', '.turn-page .turn-page-body a', function () {

                var number = $(this).index() + 1;

                _setTurnPageStyle.call($this, number);

                $this.loadData(number)

            })


            .on('click', 'div[data-role=table-body] input[type=checkbox]', function () {

                var _state = $(this).prop("checked"),

                    _val = $(this).val();

                if (_state == true) {

                    $this.checkbox.push(_val);

                } else {

                    $this.checkbox.pop(_val)

                }

                $this.getCheckbox()
            });


        $.each(this.options.btns, function (i, data) {

            $this.$element.on('click', data.btn, function (e) {

                data.callback.call($(this).parents('tr:first'), e, $this.options.modalElm, $this.options.mesageElm, $this)

            })
        })


    }

    function _setForm() {

        function S4() {

            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        $('[data-role=table-body] input[type=checkbox]', this.$element).each(function () {

            var dataId = (S4() + S4());

            $(this).attr('id', dataId).wrap('<div class="check-group">').after('<label for=' + dataId + '>')

        })

    }

    DataTable.prototype.loadData = function (page) {

        var $this = this,

            url = this.options.url,

            _page = page || ( $('.turn-page-body a.on', $this.$element).index() + 1) || 1;

        this.$element.find('.turn-page').remove();

        $('[data-role=table-body] tbody', $this.$element).empty()

            .load(url, {pageNumber: _page}, function () {

                _setTurnPage.call($this);

                _setForm.call($this);

                $this.options.processElm.process('hide');

            });


        this.options.processElm.process('show').process('value', 100).trigger('context', '正在加载')


    };


    DataTable.prototype.getCheckbox = function (fn) {

        fn && fn(Object.keys(this.checkbox))

    };


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.dataTable');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.dataTable', (data = new DataTable(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.dataTable;

    $.fn.dataTable = Plugin;

    $.fn.dataTable.Constructor = DataTable;

    $.fn.dataTable.noConflict = function () {

        $.fn.dataTable = old;

        return this

    }

}
(jQuery);