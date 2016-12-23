QUnit.test("Option css_class", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({css_class: 'my-countdown'});

    assert.strictEqual(c.find('.my-countdown').length, 1, 'The .my-countdown has been used');
    assert.strictEqual(c.find('.countdown').length, 0, 'The default class hasn’t been used');

});

QUnit.test("Option always_show_days", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({always_show_days: true});

    assert.strictEqual(c.find('.item').length, 4, "Visible .item elements, correct number");
    assert.strictEqual(c.find('.separator').length, 3, "Visible .separator elements, correct number");

    assert.strictEqual(c.find('.separator').eq(0).text(), ',', "Default separator for days");
    assert.strictEqual(c.find('.separator').eq(1).text(), ':', "Default separator for hours");
    assert.strictEqual(c.find('.separator').eq(2).text(), ':', "Default separator for minutes");

    assert.strictEqual(c.find('.label-dd').text(), 'days', "Default days label");
    assert.strictEqual(c.find('.label-hh').text(), 'hours', "Default hours label");
    assert.strictEqual(c.find('.label-mm').text(), 'minutes', "Default minutes label");
    assert.strictEqual(c.find('.label-ss').text(), 'seconds', "Default seconds label");

});

QUnit.test("Option with_labels", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({with_labels: false});

    assert.strictEqual(c.find('.label-dd').length, 0, "No days label exist");
    assert.strictEqual(c.find('.label-hh').length, 0, "No hours label exist");
    assert.strictEqual(c.find('.label-mm').length, 0, "No minutes label exist");
    assert.strictEqual(c.find('.label-ss').length, 0, "No seconds label exist");

});

QUnit.test("Option with_seconds", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({with_seconds: false});

    assert.strictEqual(c.find('.label-ss').length, 0, "No seconds label exist");

});

QUnit.test("Option with_separators", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({with_separators: false});

    assert.strictEqual(c.find('.separator').length, 0, "No separator exist");

});

QUnit.test("Option labels", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({
        always_show_days: true,
        label_dd: 'jours',
        label_hh: 'heures',
        label_mm: 'minutes',
        label_ss: 'secondes'
    });

    assert.strictEqual(c.find('.label-dd').text(), 'jours', "Correct days label");
    assert.strictEqual(c.find('.label-hh').text(), 'heures', "Correct hours label");
    assert.strictEqual(c.find('.label-mm').text(), 'minutes', "Correct minutes label");
    assert.strictEqual(c.find('.label-ss').text(), 'secondes', "Correct seconds label");

});

QUnit.test("Option separators", function (assert) {

    var c = $('<div>00:00:01</div>').countDown({
        always_show_days: true,
        separator: '-',
        separator_days: '/'
    });

    assert.strictEqual(c.find('.separator').eq(0).text(), '/', "Correct separator for hours");
    assert.strictEqual(c.find('.separator').eq(1).text(), '-', "Correct separator for minutes");
    assert.strictEqual(c.find('.separator').eq(2).text(), '-', "Correct separator for hours");

});

QUnit.test("Option with_hh_leading_zero", function (assert) {

    var c = $('<div>09:30:00</div>').countDown({with_hh_leading_zero: true});
    assert.strictEqual(c.find('.hh-1').text(), '0', "Leading 0 for hours");
    assert.strictEqual(c.find('.hh-2').text(), '9', "Correct value for hours");

    var c = $('<div>09:30:00</div>').countDown({with_hh_leading_zero: false});
    assert.strictEqual(c.find('.hh-1').text(), '', "Correct value for hours");
    assert.strictEqual(c.find('.hh-2').text(), '9', "No leading 0 for hours");

});

QUnit.test("Option with_mm_leading_zero", function (assert) {

    var c = $('<div>00:05:30</div>').countDown({with_mm_leading_zero: true});
    assert.strictEqual(c.find('.mm-1').text(), '0', "Leading 0 for hours");
    assert.strictEqual(c.find('.mm-2').text(), '5', "Correct value for hours");

    var c = $('<div>00:05:30</div>').countDown({with_mm_leading_zero: false});
    assert.strictEqual(c.find('.mm-1').text(), '', "Correct value for minutes");
    assert.strictEqual(c.find('.mm-2').text(), '5', "No leading 0 for minutes");

});

QUnit.test("Option with_ss_leading_zero", function (assert) {

    // Don't test the second's value itself because the test suite is sometimes
    // too slow and will fail expecting 8 seconds but displaying 7.

    var c = $('<div>00:00:08</div>').countDown({with_ss_leading_zero: true});
    assert.strictEqual(c.find('.ss-1').text(), '0', "Leading 0 for seconds");

    var c = $('<div>00:00:08</div>').countDown({with_ss_leading_zero: false});
    assert.strictEqual(c.find('.ss-1').text(), '', "No leading 0 for seconds");

});
