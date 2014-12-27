QUnit.test("Option css_class", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({css_class: 'my-countdown'});

    assert.equal(c.find('.my-countdown').length, 1, 'The .my-countdown has been used');
    assert.equal(c.find('.countdown').length, 0, 'The default class hasn’t been used');

});

QUnit.test("Option always_show_days", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({always_show_days: true});

    assert.equal(c.find('.item').length, 4, "Visible .item elements, correct number");
    assert.equal(c.find('.separator').length, 3, "Visible .separator elements, correct number");

    assert.equal(c.find('.separator').eq(0).text(), ',', "Default separator for days");
    assert.equal(c.find('.separator').eq(1).text(), ':', "Default separator for hours");
    assert.equal(c.find('.separator').eq(2).text(), ':', "Default separator for minutes");

    assert.equal(c.find('.label-dd').text(), 'days', "Default days label");
    assert.equal(c.find('.label-hh').text(), 'hours', "Default hours label");
    assert.equal(c.find('.label-mm').text(), 'minutes', "Default minutes label");
    assert.equal(c.find('.label-ss').text(), 'seconds', "Default seconds label");

});

QUnit.test("Option with_labels", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({with_labels: false});

    assert.equal(c.find('.label-dd').length, 0, "No days label exist");
    assert.equal(c.find('.label-hh').length, 0, "No hours label exist");
    assert.equal(c.find('.label-mm').length, 0, "No minutes label exist");
    assert.equal(c.find('.label-ss').length, 0, "No seconds label exist");

});

QUnit.test("Option with_seconds", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({with_seconds: false});

    assert.equal(c.find('.label-ss').length, 0, "No seconds label exist");

});

QUnit.test("Option with_separators", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({with_separators: false});

    assert.equal(c.find('.separator').length, 0, "No separator exist");

});

QUnit.test("Option labels", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({
        always_show_days: true,
        label_dd: 'jours',
        label_hh: 'heures',
        label_mm: 'minutes',
        label_ss: 'secondes'
    });

    assert.equal(c.find('.label-dd').text(), 'jours', "Correct days label");
    assert.equal(c.find('.label-hh').text(), 'heures', "Correct hours label");
    assert.equal(c.find('.label-mm').text(), 'minutes', "Correct minutes label");
    assert.equal(c.find('.label-ss').text(), 'secondes', "Correct seconds label");

});

QUnit.test("Option separators", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({
        always_show_days: true,
        separator: '-',
        separator_days: '/'
    });

    assert.equal(c.find('.separator').eq(0).text(), '/', "Correct separator for hours");
    assert.equal(c.find('.separator').eq(1).text(), '-', "Correct separator for minutes");
    assert.equal(c.find('.separator').eq(2).text(), '-', "Correct separator for hours");

});
